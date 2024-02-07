import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswerModule } from './modules/answer/answer.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [AnswerModule, GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
