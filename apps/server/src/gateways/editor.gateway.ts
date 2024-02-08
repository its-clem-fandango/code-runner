import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
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
  ) {
    console.log(data);
    this.server.emit('opponentCode', {
      room: 1,
      player: data.player,
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
    },
  ) {
    console.log('log data', data);
    const challenge = await this.answerService.findChallenge(data.challengeId);
    const runUserFunction = eval(`(${data.message})`);
    const result = await this.answerService.runTest(runUserFunction, challenge);
    this.server.emit('testResult', result);
    console.log('result', result);
  }
}
