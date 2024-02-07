import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway(8081, { cors: true })
export class EditorGateway {
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
}
