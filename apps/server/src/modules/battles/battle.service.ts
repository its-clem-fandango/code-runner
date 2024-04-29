import { Injectable, Inject } from "@nestjs/common";
import { battles, Battle } from "src/database/battles";
import { CodingChallengesService } from "../coding-challenges/coding-challenges.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class BattleService {
  constructor(
    @Inject(CodingChallengesService)
    private codingChallengesService: CodingChallengesService,
    private usersService: UsersService,
  ) {}

  getBattles() {
    return battles;
  }

  getBattle(id: number) {
    const battle = battles.find((battle) => battle.id === id);
    return battle;
  }

  async updateBattle(
    id: number,
    sessionId?: string,
    guestId?: string,
  ): Promise<{ battle?: Battle; error?: string }> {
    console.log("updateBattle called with:", { id, sessionId, guestId });
    const battleIndex = battles.findIndex((battle) => battle.id === id);
    console.log("**CALLING UPDATEBATTLE FROM BATTLE.SERVICE***");
    if (battleIndex === -1) {
      return { error: "Battle not found" };
    }

    const updatedBattle = { ...battles[battleIndex] };
    if (updatedBattle.playerCount >= 2) {
      return { error: "Battle is already full!" };
    }

    let username;
    try {
      if (sessionId) {
        const user = await this.usersService.findUserBySessionId(sessionId);
        username = user ? user.username : null;
        if (!username) {
          console.log(
            "User not found by session ID, using guest ID in updateBattle",
          );
          username = guestId;
        }
      } else {
        username = guestId;
        console.log("No session ID provided, using guest ID directly");
      }

      if (username && !updatedBattle.players.includes(username)) {
        updatedBattle.players.push(username);
        updatedBattle.playerCount++;
        console.log("Adding player to battle:", username);
      } else {
        console.log("Username already in battle or invalid:", username);
        return { error: "Player cannot be added or already added" };
      }
    } catch (error) {
      console.error("Error processing updateBattle:", error);
      return { error: "Internal server error during update" };
    }

    battles[battleIndex] = updatedBattle;
    return { battle: updatedBattle };
  }

  async createBattle(
    battleName: string,
    difficulty: string,
    join: string,
    sessionId?: string,
    guestId?: string,
  ): Promise<Battle[]> {
    console.log("Attempting to create battle in battle.service:", {
      battleName,
      difficulty,
      join,
      sessionId,
      guestId,
    });

    console.log("GUEST ID FROM BATTLERSERVICE CREATEBATTLE", guestId);
    let creatorUserName;
    if (sessionId) {
      creatorUserName = await this.getUserFromSession(sessionId);
    } else {
      creatorUserName = guestId;
    }

    console.log("Creator username determined as:", creatorUserName);

    const randomChallenge =
      this.codingChallengesService.getRandomChallengeByDificulty(difficulty);

    if (creatorUserName === "") {
      console.log("No user found, returning empty array");
    }
    const battle = {
      id: battles.length + 1,
      battleName,
      difficulty,
      players: [creatorUserName],
      challengeId: randomChallenge.challengeId,
      playerCount: 1,
      join,
    };

    battles.push(battle);
    console.log(
      "Battle created and added to the list, battle.service:",
      battle,
    );
    return battles;
  }

  async getUserFromSession(sessionId: string): Promise<string> {
    const user = await this.usersService.findUserBySessionId(sessionId);
    return user ? user.username : "";
  }
}
