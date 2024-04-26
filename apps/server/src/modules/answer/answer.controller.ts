import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { AnswerService } from "./answer.service";

@Controller("answer") // Handles all HTTP requests related to 'answer' endpoint
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  async submitCode(
    @Body()
    body: {
      userId: number;
      challengeId: number;
      battleId: number;
      submittedAnswer: string;
    },
  ): Promise<string> {
    try {
      const { submittedAnswer, challengeId } = body;
      const codingChallenge = this.answerService.findChallenge(challengeId);
      if (!codingChallenge) {
        throw new HttpException("Challenge not found", HttpStatus.NOT_FOUND);
      }

      let runUserFunction;
      try {
        runUserFunction = eval(`(${submittedAnswer})`);
      } catch (e) {
        throw new HttpException(
          "Error parsing submitted answer",
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.answerService.runTest(
        runUserFunction,
        codingChallenge,
      );

      console.log("Test Results: ", result.testResults);
      console.log("Did the test pass?", result.didAssertPass);

      let responseMessage = `Coding Challenge Description: ${codingChallenge.description}, \nSubmitted Answer: ${submittedAnswer}\n`;
      responseMessage += result.didAssertPass
        ? "All tests passed."
        : "Some tests failed. Check test results for details.";

      return responseMessage;
    } catch (error) {
      // If an error is an instance of HttpException, rethrow it
      if (error instanceof HttpException) {
        throw error;
      }
      // For any other type of error, return a generic server error response
      throw new HttpException(
        "Internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
