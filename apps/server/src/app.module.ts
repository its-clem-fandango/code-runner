import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswerModule } from './modules/answer/answer.module';

@Module({
  imports: [AnswerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
