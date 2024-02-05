import { Injectable } from '@nestjs/common';
import { codingChallengesList } from 'src/database/codingChallenges';
import { strict as assert } from 'assert';

interface TestResults {
  didAssertPass: boolean;
  testResults: any[];
}

@Injectable()
export class AnswerService {
  // Find the challenge in the list by its ID and get its details and tests, i.e. returns object in codingChallenges.ts for corresponding id

  findChallenge(challengeId: number) {
    const codingChallenge = codingChallengesList.find(
      (challenge) => challenge.challengeId === challengeId,
    );
    return codingChallenge;
  }
  runTest(userFunction, codingChallenge): TestResults {
    let didAssertPass = false;
    const testResults = [];
    try {
      codingChallenge.tests.forEach((testCase) => {
        const inputValues = testCase.input; //destructured from codingChallenges.ts
        const expected = testCase.expected;
        const result = userFunction(...inputValues);

        console.log('EVALUATE USER FUNCTION: ', userFunction);

        assert.strictEqual(result, expected); // Use assert.strictEqual for error reporting intstead of ===

        // If the test case passes without throwing an assertion error, push the pass result
        testResults.push({
          input: inputValues,
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
      console.log(error);
      testResults.push({
        expected: error.expected,
        result: 'Execution Error',
        passed: false,
        error: error.message,
      });
    }
    return { didAssertPass, testResults };
  }
}
