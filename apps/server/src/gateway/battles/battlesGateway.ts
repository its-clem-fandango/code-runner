import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BattleService } from 'src/modules/battles/battle.service';

@WebSocketGateway(8082, { cors: true })
export class BattleGateway implements OnGatewayConnection {
  constructor(private readonly battleService: BattleService) {}
  @WebSocketServer() server: Server;

  handleConnection(client: any) {
    this.sendBattles(client);
  }
  private async sendBattles(client: any) {
    const battles = await this.battleService.getBattles();
    client.emit('availableBattles', battles);
  }

  @SubscribeMessage('createBattle')
  async createBattle(
    @MessageBody() data: { battleName: string; difficulty: string },
  ) {
    const battles = await this.battleService.createBattle(
      data.battleName,
      'Test',
      data.difficulty,
      'random@email.com',
    );
    this.server.emit('availableBattles', battles);
  }
}
