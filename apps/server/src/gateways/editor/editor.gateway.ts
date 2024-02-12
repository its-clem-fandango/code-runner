import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AnswerService } from 'src/modules/answer/answer.service';
@WebSocketGateway(8081, { cors: true })
export class EditorGateway {
  constructor(private readonly answerService: AnswerService) {}

  @WebSocketServer() server: Server;
  @SubscribeMessage('codeChanged')
  sendToOpponent(
    @MessageBody()
    data: {
      room: number;
      player: number;
      message: string;
    },
    @ConnectedSocket() client: any,
  ) {
    this.server.emit('opponentCode', {
      room: 1,
      clientId: client.id,
      message: data.message,
    });
  }

  @SubscribeMessage('submit')
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
    console.log('log data', data);
    const challenge = await this.answerService.findChallenge(data.challengeId);
    try {
      const runUserFunction = eval(`(${data.message})`);
      const result = await this.answerService.runTest(
        runUserFunction,
        challenge,
      );
      this.server.emit('testResult', { ...result, clientId: data.clientId });
      console.log('result', result);
    } catch (error) {
      const errorMsg = {
        message: `${error}`,
      };
      this.server.emit('testResult', errorMsg);
    }
  }
}
