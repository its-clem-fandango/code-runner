import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswerModule } from './modules/answer/answer.module';
import { GatewayModule } from './gateways/gateway.module';
import { BattleModule } from './modules/battles/battle.module';

@Module({
  imports: [AnswerModule, GatewayModule, BattleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
