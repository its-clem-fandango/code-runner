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
import { UsersService } from "src/users/users.service";
@WebSocketGateway({ namespace: "race", cors: true })
export class EditorGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly answerService: AnswerService,
    private readonly battleService: BattleService,
    private readonly usersService: UsersService,
  ) {}

  handleConnection(client: any) {
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

  // Listens for the updateRaceResult event from the client (useRace) and processes it
  @SubscribeMessage("updateRaceResult")
  async updateRaceResult(
    @MessageBody() data: { userId: string; result: "win" | "loss" }, //pass the users info
    @ConnectedSocket() client: any,
  ) {
    // Call to a service that updates the user's win/loss record in the database
    try {
      const updatedUser = await this.usersService.updateUserResult(
        data.userId,
        data.result,
      );
      client.emit("resultUpdated", updatedUser); // Notify the client of successful update
    } catch (error) {
      client.emit("errorUpdatingResult", error.message); // Handle errors gracefully
    }
  }
}
