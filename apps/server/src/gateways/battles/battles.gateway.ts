import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { parse } from "cookie";
import { BattleService } from "src/modules/battles/battle.service";

@WebSocketGateway({ namespace: "race-collection", cors: true })
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
    const battles = this.battleService.getBattles();
    client.emit("availableBattles", battles);
  }

  @SubscribeMessage("createBattle")
  async handleCreateBattle(
    @MessageBody() data: { battleName: string; difficulty: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log("Data sent to client:", data); // Add this line to log data sent to the client

    const cookies = client.handshake.headers.cookie;
    const parsedCookies = parse(cookies || "");
    const sessionId = parsedCookies["sessionId"];

    try {
      const battles = await this.battleService.createBattle(
        data.battleName,
        data.difficulty,
        "random-challenge",
        sessionId,
      );
      this.server.emit("availableBattles", battles);
      client.emit("battleCreated", battles[battles.length - 1].id);
      this.handleJoinedBattle(client, battles[battles.length - 1]);
    } catch (error) {
      console.error("Error creating battle:", error);
      client.emit("error", { message: "Failed to create battle" });
    }
  }

  private async handleJoinedBattle(client: Socket, msg: any) {
    console.log("Received message:", msg); // Log received message

    // Emit an event back to the client with the challengeId
    client.emit("joinedBattle", { challengeId: msg.challengeId });
  }
}
