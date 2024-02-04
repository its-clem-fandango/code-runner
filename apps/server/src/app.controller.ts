import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
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

    // Find the challenge in the list by its ID and get its details and tests, i.e. returns object in codingChallenges.ts
    const codingChallenge = codingChallengesList.find(
      (challenge) => challenge.challengeId === challengeId,
    );

    let didAssertPass = false;
    const testResults = []; // Declare the testResults array here
    const runUserFunction = eval(`(${submittedAnswer})`);

    // Attempt to run each test case within ID
    try {
      codingChallenge.tests.forEach((testCase) => {
        const [a, b] = testCase.input; //destructured from codingChallenges.ts
        const expected = testCase.expected;
        const result = runUserFunction(a, b);

        console.log('EVALUATE USER FUNCTION: ', runUserFunction);

        assert.strictEqual(result, expected); // Use assert.strictEqual for error reporting intstead of ===

        // If the test case passes without throwing an assertion error, push the pass result
        testResults.push({
          input: [a, b],
          expected,
          result,
          passed: true,
        });
      });

      // If all tests are pushed as passed, then didAssertPass becomes true
      if (testResults.every((test) => test.passed)) {
        didAssertPass = true;
      }
    } catch (error) {
      // If an error is caught, log the failing test case but don't stop the execution.
      // The didAssertPass remains false as initialized.
      testResults.push({
        expected: error.expected,
        result: 'Execution Error',
        passed: false,
        error: error.message,
      });
    }

    // Logging the results for visibility
    console.log('Test Results: ', testResults);
    console.log('Did the test pass?', didAssertPass);

    let responseMessage = `Coding Challenge Description: ${codingChallenge.description}, \nSubmitted Answer: ${submittedAnswer}\n`;
    responseMessage += didAssertPass
      ? 'All tests passed.'
      : 'Some tests failed. Check test results for details.';

    return responseMessage;
  }
}
