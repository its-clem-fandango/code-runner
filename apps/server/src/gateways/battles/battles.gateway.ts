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
    return;
  }
  private async sendBattles(client: any) {
    const battles = await this.battleService.getBattles();
    client.emit('availableBattles', battles);
    return;
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
    return;
  }
  @SubscribeMessage('joinBattle')
  async joinBattle(@MessageBody() data: { id: number }) {
    const battleInfo = this.battleService.getBattle(data.id);
    if (battleInfo.playerCount >= 2) {
      console.log('battle is full!');
      return;
    } else {
      const joinedBattle = this.battleService.updateBattle(data.id);
      console.log(joinedBattle);
    }
  }
}
