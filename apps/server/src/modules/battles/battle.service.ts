import { Injectable, Inject } from "@nestjs/common";
import { battles, Battle } from "src/database/battles";
import { CodingChallengesService } from "../coding-challenges/coding-challenges.service";
import { UsersService } from "src/users/users.service";

let counter = 0;

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
  ): Promise<{ battle?: Battle; error?: string }> {
    // Check if the battle exists
    const battleIndex = battles.findIndex((battle) => battle.id === id);
    if (battleIndex === -1) {
      return { error: "Battle not found" };
    }

    // Get the battle object
    const updatedBattle = { ...battles[battleIndex] };

    // Check if the battle is already full
    if (updatedBattle.playerCount >= 2) {
      return { error: "Battle is already full!" };
    }

    try {
      // Check if the user is logged in
      let username;
      if (sessionId) {
        // If sessionId is provided, fetch the username from the session
        const user = await this.usersService.findUserBySessionId(sessionId);
        if (user) {
          username = user.username;
        }
      } else {
        // If no sessionId is provided, and if the battle doesn't already have an anonymous user
        if (
          updatedBattle.players.every(
            (player) => !player.startsWith("Anonymous"),
          )
        ) {
          // Generate an anonymous username
          username = this.generateAnonymousUsername();
        }
      }

      // Add the obtained username to the battle's players list
      if (username && !updatedBattle.players.includes(username)) {
        updatedBattle.players.push(username);
        updatedBattle.playerCount++;
      }
    } catch (error) {
      console.error("Error finding user by session ID:", error);
      return { error: "Failed to update battle due to user session issue." };
    }

    // Update the battle in the battles array
    battles[battleIndex] = updatedBattle;
    return { battle: updatedBattle };
  }

  // Helper method to generate a unique anonymous username
  generateAnonymousUsername(): string {
    counter++;
    console.log("Generate Anon username Counter: ", counter);
    return `Anonymous-${Date.now()}`;
  }

  async createBattle(
    battleName: string,
    difficulty: string,
    join: string,
    sessionId?: string,
  ): Promise<Battle[]> {
    console.log("Attempting to create battle:", {
      battleName,
      difficulty,
      join,
      sessionId,
    });

    let creatorUserName;
    if (sessionId) {
      creatorUserName = await this.getUserFromSession(sessionId);
    } else {
      creatorUserName = this.generateAnonymousUsername();
    }

    console.log("Creator username determined as:", creatorUserName);

    const randomChallenge =
      await this.codingChallengesService.getRandomChallengeByDificulty(
        difficulty,
      );
    console.log("Random challenge selected:", randomChallenge);

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
    console.log("Battle created and added to the list:", battle);
    return battles;
  }

  async getUserFromSession(sessionId: string): Promise<string> {
    const user = await this.usersService.findUserBySessionId(sessionId);
    return user ? user.username : "";
  }
}
