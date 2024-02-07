import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8082, { cors: true })
export class BattleGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('createBattle')
  createBattle(@MessageBody() data: { roomName: string; difficulty: string }) {
    console.log(data);
  }
}
