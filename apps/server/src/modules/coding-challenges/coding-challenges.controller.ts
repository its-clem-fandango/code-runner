import { Controller, Get, Param } from "@nestjs/common";
import { CodingChallengesService } from "./coding-challenges.service";

@Controller("codingchallenges")
export class CodingChallengesController {
  constructor(private readonly challengeService: CodingChallengesService) {}

  @Get(":id")
  async getChallengeById(@Param("id") id: string) {
    const challenge = this.challengeService.getChallengeById(parseInt(id));
    return challenge;
  }
}
