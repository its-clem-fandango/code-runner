import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { testRunner } from './services/testRunner.service';
import { codingChallengesList } from './database/codingChallenges';
import { strict as assert } from 'assert';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('answer')
  submitCode(
    @Body()
    body: {
      userId: number;
      challengeId: number;
      battleId: number;
      submittedAnswer: string;
    },
  ): string {
    const { submittedAnswer, userId, battleId, challengeId } = body;
    const codingChallenge = codingChallengesList.find(
      (challenge) => challenge.challengeId === challengeId,
    );

    console.log('codingChallenge log:', codingChallenge);

    console.log('assert module:', assert);

    let didAssertPass = false;

    try {
      assert.equal(4, 5); // This will pass silently
      didAssertPass = true;
    } catch (error) {
      console.error('Assertion failed:', error.message);
    }

    console.log('Did the assertion pass?', didAssertPass);

    return `Coding Challenge Description: ${codingChallenge.description}, \n Submited Answer: ${submittedAnswer}`;
  }
}
