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

//CHANGE TO THIS ORIGIN DURING DEVELOPMENT
/* @WebSocketGateway({
  namespace: "race-collection",
  cors: {
    origin: (requestOrigin, callback) => {
      const validOrigins = ["http://localhost:3000", "app.coderacer.xyz"];
      if (validOrigins.includes(requestOrigin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  },
}) */

@WebSocketGateway({
  namespace: "race-collection",
  cors: {
    origin: "https://app.coderacer.xyz",
    credentials: true,
  },
})
export class BattleGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly battleService: BattleService) {
    console.log("whereami", process.env.NEXT_PUBLIC_CLIENT_URL);
  }
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

  // triggered when the client sends a message with the event name "createBattle"
  @SubscribeMessage("createBattle")
  async handleCreateBattle(
    @MessageBody()
    data: { battleName: string; difficulty: string; username: string },
    @ConnectedSocket() client: Socket,
  ) {
    const cookies = client.handshake.headers.cookie;
    const parsedCookies = parse(cookies || "");
    const sessionId = parsedCookies["sessionId"];
    const guestId = data.username;

    console.log("guestId from battles.gateway: ", guestId);

    try {
      const battles = await this.battleService.createBattle(
        data.battleName,
        data.difficulty,
        "random-challenge",
        sessionId,
        guestId,
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
    // Emit an event back to the client (useRace) with the challengeId
    client.emit("joinedBattle", { challengeId: msg.challengeId });
  }
}
