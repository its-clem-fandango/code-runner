/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { codingChallengesList } from "src/database/codingChallenges";
import { strict as assert } from "assert";
import * as Mocha from "mocha";

interface TestResult {
  name: string;
  input: any[];
  expected: any;
  result: any;
  error?: any;
  passed: boolean;
}
interface TestResults {
  didAssertPass: boolean;
  testResults: any[];
}

@Injectable()
export class AnswerService {
  findChallenge(challengeId: number) {
    const codingChallenge = codingChallengesList.find(
      (challenge) => challenge.challengeId === challengeId,
    );
    return codingChallenge;
  }

  async runTest(userFunction, codingChallenge): Promise<TestResults> {
    const mocha = new Mocha();
    let didAssertPass = false;
    const testResults: TestResult[] = [];

    mocha.suite.emit("pre-require", global, "", mocha);

    codingChallenge.tests.forEach((testCase) => {
      const inputValues = testCase.input;
      const expected = testCase.expected;

      describe(testCase.name, function () {
        it(testCase.description, function (done) {
          const actual = userFunction(...inputValues);
          try {
            assert.deepStrictEqual(actual, expected);
            testResults.push({
              name: testCase.name,
              input: inputValues,
              expected,
              result: actual,
              passed: true,
            });
            done();
          } catch (err) {
            testResults.push({
              name: testCase.name,
              input: inputValues,
              expected,
              result: actual,
              error: err,
              passed: false,
            });
            done(err);
          }
        });
      });
    });

    const runner = mocha.run();

    await new Promise<void>((resolve) => {
      runner.on("end", () => {
        didAssertPass = testResults.every((test) => test.passed) && testResults.length === codingChallenge.tests.length;
        resolve();
      });
    });

    return { didAssertPass, testResults };
  }
}
