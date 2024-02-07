import { Module } from '@nestjs/common';
import { BattleGateway } from './battles/battlesGateway';

@Module({
  controllers: [],
  providers: [BattleGateway],
  imports: [],
})
export class GatewayModule {}
