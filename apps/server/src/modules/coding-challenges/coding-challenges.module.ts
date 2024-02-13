import { Module } from '@nestjs/common'
import { CodingChallengesService } from './coding-challenges.service'

@Module({
  providers: [CodingChallengesService],
  exports: [CodingChallengesService],
})
export class CodingChallengesModule {}
