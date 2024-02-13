import { Module } from '@nestjs/common'
import { EditorGateway } from './editor/editor.gateway'
import { AnswerService } from 'src/modules/answer/answer.service'
import { BattleGateway } from './battles/battles.gateway'
import { BattleService } from 'src/modules/battles/battle.service'
import { CodingChallengesService } from 'src/modules/coding-challenges/coding-challenges.service'

@Module({
  imports: [],
  controllers: [],
  providers: [
    EditorGateway,
    AnswerService,
    BattleGateway,
    BattleService,
    CodingChallengesService,
  ],
})
export class GatewayModule {}
