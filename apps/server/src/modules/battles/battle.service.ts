import { Injectable, Inject } from '@nestjs/common'
import { battles } from 'src/database/battles'
import { CodingChallengesService } from '../coding-challenges/coding-challenges.service'

@Injectable()
export class BattleService {
  constructor(
    @Inject(CodingChallengesService)
    private codingChallengesService: CodingChallengesService,
  ) {}

  getBattles() {
    return battles
  }
  getBattle(id: number) {
    const battle = battles.find((battle) => battle.id === id)
    return battle
  }
  updateBattle(id: number) {
    const battle = battles.find((battle) => battle.id === id)
    if (battle.playerCount >= 2) {
      return { error: 'battle already full!' }
    } else {
      battle.playerCount++
    }
    return battle
  }
  createBattle(
    battleName: string,
    userName: string,
    difficulty: string,
    join: string,
  ) {
    const randomChallenge =
      this.codingChallengesService.getRandomChallengeByDificulty(difficulty)

    const battle = {
      id: battles.length + 1,
      BattleName: battleName,
      Username: userName,
      Difficulty: difficulty,
      ChallengeId: randomChallenge.challengeId,
      playerCount: 0,
      Join: join,
    }
    battles.push(battle)
    return battles
  }
}
