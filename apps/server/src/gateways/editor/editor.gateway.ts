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

//CHANGE TO THIS ORIGIN DURING DEVELOPMENT
/* @WebSocketGateway({
  namespace: "/race",
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
  //a gateway in nestJS is a point for websocket communication, handling real-time events between client and server
  namespace: "/race",
  cors: {
    origin: "https://app.coderacer.xyz",
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
      message: data?.message,
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
      interface TestResult {
        name: string;
        input: any[];
        expected: any;
        result: any;
        error?: any;
        passed: boolean;
      }
      interface TestResults {
        didAssertPass: boolean;
        testResults: TestResult[];
      }

      const runUserFunction = eval(`(${data?.message})`);
      const result = await this.answerService.runTest(
        runUserFunction,
        challenge,
      );
      console.log(
        "emmiging test result",
        { ...result, clientId: client.id },
        `method: ${this.server.emit}`,
      );
      /*       const result: TestResults = {
        didAssertPass: false,
        testResults: [
          {
            name: "test",
            input: [],
            expected: "expected",
            result: "result",
            error: "error",
            passed: false,
          },
        ],
      }; */
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
        error: `${error?.message}`,
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
        console.error("Error updating battle:", e?.message);
      }
    }
  }

  @SubscribeMessage("leaveBattle") //tells nestjs this function should handle a specific websocket event
  async leaveBattle(
    @MessageBody() data: { id: number; username: string }, //extracts the payload of the websocket message from the FE
    @ConnectedSocket() client: Socket, //provides access to the clients socket, allowing interaction w/ the connection
  ) {
    const cookies = client.handshake.headers.cookie;
    const parsedCookies = parse(cookies || "");
    const sessionId = parsedCookies["sessionId"]; // or some other user identifier
    const guestId = data.username;
    console.log("LEAVE BATTLE in editor.gateway", data);
    console.log("SessoinId in LeaveBattle/editor.gateway: ", sessionId);
    console.log("guestId in LeaveBattle/editor.gateway: ", guestId);

    const battleInfo = this.battleService.getBattle(data.id);
    if (!battleInfo) {
      console.log("LeaveBattle Error: Battle not found for ID:", data.id);
      return;
    }

    client.leave(`room${data.id}`); //leave specific room
    console.log("Client left room: ", `room${data.id}`);

    this.server.to(`room${data.id}`).emit("playerLeft"),
      {
        username: data.username,
        battleId: data.id,
        message: "Player has left the race",
      };

    // remove client session from the room object
    if (rooms[data.id]) {
      delete rooms[data.id][client.id]; // Delete the client's session entry

      // Check if the room is empty, if it is remove it

      console.log("Object Keys: ", Object.keys);
      if (Object.keys(rooms[data.id]).length === 0) {
        delete rooms[data.id]; // Delete the room if it's empty
        console.log(`Room ${data.id} is empty and has been deleted.`);
      }
    }

    try {
      // battle and error are destructed from removePlayerFromBattle's return
      const { battle, error } = await this.battleService.removePlayerFromBattle(
        data.id,
        sessionId,
        guestId,
      );

      if (error) {
        console.error(error);
        return;
      }

      if (battle) {
        console.log("BATTLE UPDATED SUCCESSFULLY after player left", battle);
        this.server.to(`room${data.id}`).emit("playerLeft", {
          battle: battle,
          clientId: client.id,
        });
      } else {
        console.error("Battle update failed, battle object not returned.");
      }
    } catch (e) {
      console.error("Error updating battle:", e?.message);
    }
  }
}
