import { Module } from '@nestjs/common';
import { EditorGateway } from './editor.gateway';
import { AnswerService } from 'src/modules/answer/answer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EditorGateway, AnswerService],
})
export class GatewayModule {}
