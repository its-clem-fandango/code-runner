import { Body, Controller, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller('answer') //handles all HTTP requests related to 'answer' endpoint
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}
  @Post()
  submitCode(
    // Body @decorator automatically parses request body and extracts its contents into a defined object structure
    @Body()
    body: {
      userId: number;
      challengeId: number;
      battleId: number;
      submittedAnswer: string;
    },
  ): string {
    // Destructure the received body to get the submitted answer and challengeID
    const { submittedAnswer, challengeId } = body;

    // Find the challenge in the list by its ID and get its details and tests, i.e. returns object in codingChallenges.ts for corresponding id
    const codingChallenge = this.answerService.findChallenge(challengeId);

    const runUserFunction = eval(`(${submittedAnswer})`);
    const result = this.answerService.runTest(runUserFunction, codingChallenge);

    // Logging the results for visibility
    console.log('Test Results: ', result.testResults);
    console.log('Did the test pass?', result.didAssertPass);

    let responseMessage = `Coding Challenge Description: ${codingChallenge.description}, \nSubmitted Answer: ${submittedAnswer}\n`;
    responseMessage += result.didAssertPass
      ? 'All tests passed.'
      : 'Some tests failed. Check test results for details.';

    return responseMessage;
  }
}
