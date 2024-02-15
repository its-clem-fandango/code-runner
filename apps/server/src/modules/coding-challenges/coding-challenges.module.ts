import { Module } from "@nestjs/common";
import { CodingChallengesService } from "./coding-challenges.service";
import { CodingChallengesController } from "./coding-challenges.controller";

@Module({
  controllers: [CodingChallengesController],
  providers: [CodingChallengesService],
  exports: [CodingChallengesService],
})
export class CodingChallengesModule {}
