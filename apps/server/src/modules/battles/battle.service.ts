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
    const battleIndex = battles.findIndex((battle) => battle.id === id);
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
      } else {
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
    let creatorUserName;
    if (sessionId) {
      creatorUserName = await this.getUserFromSession(sessionId);
    } else {
      creatorUserName = guestId;
    }

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
    return battles;
  }

  async getUserFromSession(sessionId: string): Promise<string> {
    const user = await this.usersService.findUserBySessionId(sessionId);
    return user ? user.username : "";
  }
}
