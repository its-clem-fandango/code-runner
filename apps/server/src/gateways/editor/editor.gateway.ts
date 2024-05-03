import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { AnswerService } from "src/modules/answer/answer.service";
import { BattleService } from "src/modules/battles/battle.service";
import { UsersService } from "src/users/users.service";
import { Socket } from "socket.io"; //for autocomplete
import { parse } from "cookie";

const rooms = {};

@WebSocketGateway({
  namespace: "/race",
  cors: {
    origin: process.env.NEXT_PUBLIC_CLIENT_URL,
    credentials: true,
  },
})
export class EditorGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly answerService: AnswerService,
    private readonly battleService: BattleService,
    private readonly usersService: UsersService,
  ) {}

  @WebSocketServer() server: Server;

  async handleConnection(@ConnectedSocket() client: Socket) {
    const cookies = client.handshake.headers.cookie;
    const parsedCookies = parse(cookies || "");
    const sessionId = parsedCookies["sessionId"];

    if (sessionId) {
      try {
        const user = await this.usersService.findUserBySessionId(sessionId);
        if (user) {
          // Add user data to client object
          client.data.user = {
            id: user._id,
            username: user.username,
          };
        } else {
          client.data.isValidated = false;
        }
      } catch (error) {
        console.error("Error during session validation", error);
        client.data.isValidated = false;
      }
    } else {
      client.data.isValidated = false;
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log("Client disconnected", client.id);
  }

  @SubscribeMessage("codeChanged")
  sendToOpponent(
    @MessageBody()
    data: {
      room: number;
      player: number;
      message: string;
    },
    @ConnectedSocket() client: any,
  ) {
    this.server.emit("opponentCode", {
      room: 1,
      clientId: client.id,
      message: data.message,
    });
  }

  @SubscribeMessage("submit")
  async checkCode(
    @MessageBody()
    data: {
      room: number;
      player: number;
      message: string;
      challengeId: number;
      clientId: string;
    },
    @ConnectedSocket() client: any,
  ) {
    const challenge = this.answerService.findChallenge(data.challengeId);
    try {
      const runUserFunction = eval(`(${data.message})`);
      const result = await this.answerService.runTest(
        runUserFunction,
        challenge,
      );

      this.server.emit("testResult", { ...result, clientId: client.id });

      if (result.didAssertPass) {
        // count the win for the author
        if (client.data.user?.username) {
          const sessionId = rooms[data.room][client.id];
          await this.usersService.updateUserResult(sessionId, "true");
        }

        const room = rooms[data.room];
        console.log("roomid", data.room, { room });
        //find the id that is not the current client
        const opponentId = Object.keys(room).find((id) => id !== client.id);
        const opponent = room[opponentId];
        if (!opponent.toLowerCase().startsWith("guest")) {
          await this.usersService.updateUserResult(opponent, "false");
        }
      }
    } catch (error) {
      console.error("Error during code submission handling:", error);
      const errorMsg = {
        error: `${error.message}`,
        clientId: data.clientId,
        didAssertPass: false,
      };
      this.server.emit("testResult", errorMsg);
    }
  }

  @SubscribeMessage("joinBattle")
  async joinBattle(
    @MessageBody() data: { id: number; username: string },
    @ConnectedSocket() client: Socket,
  ) {
    const cookies = client.handshake.headers.cookie;
    const parsedCookies = parse(cookies || "");
    const sessionId = parsedCookies["sessionId"]; // or some other user identifier
    const guestId = data.username;
    console.log("JOIN BATTLE in editor.gateway", data);
    console.log("SessoinId in editor.gateway: ", sessionId);
    console.log("guestId in editor.gateway: ", guestId);

    const battleInfo = this.battleService.getBattle(data.id);
    if (!battleInfo) {
      console.log("Battle not found for ID:", data.id);
      return;
    }

    if (battleInfo.playerCount >= 2) {
      this.server.emit("battleError", { full: true });
      return;
    } else {
      this.server.socketsJoin(`room${data.id}`);
      console.log("Client joined room", `room${data.id}`);

      if (!rooms[data.id]) rooms[data.id] = {};
      rooms[data.id][client.id] = sessionId || guestId;

      try {
        // Await the Promise returned by updateBattle before destructuring
        const { battle, error } = await this.battleService.updateBattle(
          data.id,
          sessionId,
          guestId,
        );

        if (error) {
          console.error(error);
          return;
        }

        if (battle) {
          console.log("BATTLE UPDATED SUCCESSFULLY in editor.gateway", battle);
          this.server.to(`room${data.id}`).emit("joinedBattle", {
            battle: battle,
            challengeId: battle.challengeId,
            clientId: client.id,
          });
        } else {
          console.error("Battle update failed, battle object not returned.");
        }
      } catch (e) {
        console.error("Error updating battle:", e.message);
      }
    }
  }
}
