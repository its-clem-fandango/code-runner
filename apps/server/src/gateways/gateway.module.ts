import { Module } from '@nestjs/common';
import { EditorGateway } from './editor/editor.gateway';
import { AnswerService } from 'src/modules/answer/answer.service';
import { BattleGateway } from './battles/battlesGateway';
import { BattleService } from 'src/modules/battles/battle.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EditorGateway, AnswerService, BattleGateway, BattleService],
})
export class GatewayModule {}
