import { Injectable } from "@nestjs/common";
import { codingChallengesList } from "../../database/codingChallenges";

@Injectable()
export class CodingChallengesService {
  getRandomChallengeByDificulty(difficulty: string) {
    const challengesByDifficulty = codingChallengesList.filter(
      (challenge) => challenge.difficultyOfChallenge === difficulty,
    );
    const randomIndex = Math.floor(
      Math.random() * challengesByDifficulty.length,
    );
    return challengesByDifficulty[randomIndex];
  }

  getChallengeById(id: number) {
    const challenge = codingChallengesList.find(
      (challenge) => challenge.challengeId === id,
    );
    return challenge;
  }
}
