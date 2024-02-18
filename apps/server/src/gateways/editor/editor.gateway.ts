import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { AnswerService } from "src/modules/answer/answer.service";
import { BattleService } from "src/modules/battles/battle.service";
@WebSocketGateway({ namespace: "race", cors: true })
export class EditorGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly answerService: AnswerService,
    private readonly battleService: BattleService,
  ) {}

  handleConnection(client: any, ...args: any[]) {
    console.log("[EditorGateway] Client connected", client.id);
  }

  handleDisconnect(client: any) {
    console.log("[EditorGateway] Client disconnected", client.id);
  }

  @WebSocketServer() server: Server;
  @SubscribeMessage("codeChanged")
  sendToOpponent(
    @MessageBody()
    data: {
      room: number;
      player: number;
      message: string;
    },
    @ConnectedSocket() client: any,
  ) {
    this.server.emit("opponentCode", {
      room: 1,
      clientId: client.id,
      message: data.message,
    });
  }

  @SubscribeMessage("submit")
  async checkCode(
    @MessageBody()
    data: {
      room: number;
      player: number;
      message: string;
      challengeId: number;
      clientId: string;
    },
  ) {
    const challenge = this.answerService.findChallenge(data.challengeId);
    try {
      const runUserFunction = eval(`(${data.message})`);

      const result = await this.answerService.runTest(
        runUserFunction,
        challenge,
      );
      this.server.emit("testResult", { ...result, clientId: data.clientId });
    } catch (error) {
      const errorMsg = {
        error: `${error}`,
        clientId: data.clientId,
        didAssertPass: false,
      };
      this.server.emit("testResult", errorMsg);
    }
  }

  @SubscribeMessage("joinBattle")
  async joinBattle(
    @MessageBody() data: { id: number },
    @ConnectedSocket() client: any,
  ) {
    const battleInfo = this.battleService.getBattle(data.id);
    if (battleInfo.playerCount >= 2) {
      this.server.emit("battleError", { full: true });
      return;
    } else {
      this.server.socketsJoin(`room${data.id}`);
      const joinedBattle = this.battleService.updateBattle(data.id);
      this.server
        .to(`room${data.id}`)
        .emit("joinedBattle", { ...joinedBattle, clientId: client.id });
    }
  }
}
