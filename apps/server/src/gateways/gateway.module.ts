import { Module } from '@nestjs/common';
import { EditorGateway } from './editor.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [EditorGateway],
})
export class GatewayModule {}
