import { Module } from '@nestjs/common'
import { BattleService } from './battle.service'
import { BattleController } from './battle.controller'
import { CodingChallengesModule } from '../coding-challenges/coding-challenges.module'

@Module({
  imports: [CodingChallengesModule],
  providers: [BattleService],
  controllers: [BattleController],
})
export class BattleModule {}
