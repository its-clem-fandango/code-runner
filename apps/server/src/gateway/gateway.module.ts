import { Module } from '@nestjs/common';
import { BattleGateway } from './battles/battlesGateway';
import { BattleService } from 'src/modules/battles/battle.service';

@Module({
  controllers: [],
  providers: [BattleGateway, BattleService],
  imports: [],
})
export class GatewayModule {}
