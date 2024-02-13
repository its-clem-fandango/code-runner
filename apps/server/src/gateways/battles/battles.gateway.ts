import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { BattleService } from "src/modules/battles/battle.service";
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { BattleService } from 'src/modules/battles/battle.service'

@WebSocketGateway(8082, { cors: true })
export class BattleGateway implements OnGatewayConnection {
  constructor(private readonly battleService: BattleService) {}
  @WebSocketServer() server: Server

  handleConnection(client: any) {
    this.sendBattles(client)
    return
  }
  private async sendBattles(client: any) {
    const battles = await this.battleService.getBattles();
    client.emit("availableBattles", battles);
    return;
    const battles = await this.battleService.getBattles()
    client.emit('availableBattles', battles)
    return
  }

  @SubscribeMessage("createBattle")
  async createBattle(
    @MessageBody() data: { battleName: string; difficulty: string },
  ) {
    const battles = await this.battleService.createBattle(
      data.battleName,
      "Test",
      data.difficulty,
      "random@email.com",
    );
    this.server.emit("availableBattles", battles);
    return battles[battles.length - 1].id;
      'random-challenge',
    )
    this.server.emit('availableBattles', battles)
    return
  }
  @SubscribeMessage("joinBattle")
  async joinBattle(
    @MessageBody() data: { id: number },
    @ConnectedSocket() client: any,
  ) {
    const battleInfo = this.battleService.getBattle(data.id)
    if (battleInfo.playerCount >= 2) {
      this.server.emit("battleError", { full: true });
      return;
      this.server.emit('battleError', { full: true })
      return
    } else {
      this.server.socketsJoin(`room${data.id}`)
      const joinedBattle = this.battleService.updateBattle(data.id)
      this.server
        .to(`room${data.id}`)
        .emit("joinedBattle", { ...joinedBattle, clientId: client.id });
        .emit('joinedBattle', { ...joinedBattle, clientId: client.id })
    }
  }
}
