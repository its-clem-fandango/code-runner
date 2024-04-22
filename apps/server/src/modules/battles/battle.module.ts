import { Module } from "@nestjs/common";
import { BattleService } from "./battle.service";
import { BattleController } from "./battle.controller";
import { CodingChallengesModule } from "../coding-challenges/coding-challenges.module";
import { UsersModule } from "src/users/users.module"; // Ensure path is correct

@Module({
  imports: [CodingChallengesModule, UsersModule],
  providers: [BattleService],
  controllers: [BattleController],
})
export class BattleModule {}
