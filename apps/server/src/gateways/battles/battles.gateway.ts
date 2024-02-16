import { Logger } from "@nestjs/common";
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { BattleService } from "src/modules/battles/battle.service";

@WebSocketGateway(8082, { cors: true })
export class BattleGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly battleService: BattleService) {}
  @WebSocketServer() server: Server;

  handleConnection(client: any) {
    console.log("Client connected", client.id);
    this.sendBattles(client);
  }

  handleDisconnect(client: any) {
    console.log("Client disconnected", client.id);
  }
  private async sendBattles(client: any) {
    const battles = await this.battleService.getBattles();
    client.emit("availableBattles", battles);
  }

  @SubscribeMessage("createBattle")
  async createBattle(
    @MessageBody() data: { battleName: string; difficulty: string },
  ) {
    const battles = await this.battleService.createBattle(
      data.battleName,
      "Test",
      data.difficulty,
      "random-challenge",
    );
    this.server.emit("availableBattles", battles);
    this.server.emit("battleCreated", battles[battles.length - 1].id);
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
