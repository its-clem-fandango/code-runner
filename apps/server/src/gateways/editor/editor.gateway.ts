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
@WebSocketGateway(8081, { cors: true })
export class EditorGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly answerService: AnswerService) {}

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
    console.log("log data", data);
    const challenge = await this.answerService.findChallenge(data.challengeId);

    try {
      const runUserFunction = eval(`(${data.message})`);
      const result = await this.answerService.runTest(
        runUserFunction,
        challenge,
      );
      this.server.emit("testResult", { ...result, clientId: data.clientId });
    } catch (error) {
      console.log(error);
      const errorMsg = {
        message: `${error}`,
      };
      console.log(errorMsg);
      this.server.emit("testResult", errorMsg);
    }
  }
}
