import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AnswerModule } from "./modules/answer/answer.module";
import { GatewayModule } from "./gateways/gateway.module";
import { BattleModule } from "./modules/battles/battle.module";
import { CodingChallengesModule } from "./modules/coding-challenges/coding-challenges.module";
import { AuthController } from "./auth/auth.controller";

@Module({
  imports: [AnswerModule, GatewayModule, BattleModule, CodingChallengesModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
