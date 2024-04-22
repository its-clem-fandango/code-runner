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

@WebSocketGateway({
  namespace: "/race",
  cors: {
    origin: "http://localhost:3000",
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
    console.log(
      "Received headers in editor.gateway:",
      client.handshake.headers,
    );
    const cookies = client.handshake.headers.cookie;
    const parsedCookies = parse(cookies || "");
    const sessionId = parsedCookies["sessionId"];
    console.log(
      "COOKIES PARSED COOKIES SESSION ID FROM Editor.gateway",
      sessionId,
      typeof sessionId,
    );

    if (sessionId) {
      try {
        console.log("TRYING TO FIND USER BY SESSION ID");
        const user = await this.usersService.findUserBySessionId(sessionId);
        console.log("USER FOUND BY SESSION ID", user);
        if (user) {
          client.data.user = {
            id: user._id,
            username: user.username,
          };
          console.log("USER DATA IN EDITOR.GATEWAY", client.data.user);
        } else {
          client.data.isValidated = false;
          console.log("USER NOT FOUND BY SESSION ID");
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

      if (client.data.user) {
        console.log(
          "USERNAME VALIDATED IN EDITOR.GATEWAY",
          client.data.user.username,
        );
        console.log(
          `Result to be processed: ${result.didAssertPass ? "true" : "false"}`,
        );

        if (result.didAssertPass) {
          await this.usersService.updateUserResult(
            client.data.user.username,
            "true",
          );
        } else if (!result.didAssertPass) {
          await this.usersService.updateUserResult(
            client.data.user.username,
            "false",
          );
        }
      } else {
        console.log("USER DATA NOT SET IN CLIENT DATA");
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
    @MessageBody() data: { id: number },
    @ConnectedSocket() client: Socket,
  ) {
    console.log("Joining battle with ID:", data.id);
    const cookies = client.handshake.headers.cookie;
    const parsedCookies = parse(cookies || "");
    const sessionId = parsedCookies["sessionId"]; // or some other user identifier

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

      try {
        // Await the Promise returned by updateBattle before destructuring
        const { battle, error } = await this.battleService.updateBattle(
          data.id,
          sessionId,
        );

        if (error) {
          console.error(error);
          return;
        }

        if (battle) {
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
