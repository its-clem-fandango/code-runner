import {
  Controller,
  Get,
  Post,
  InternalServerErrorException,
  Req,
  Body,
  UnauthorizedException,
  UnprocessableEntityException,
  BadRequestException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request } from "express";
import { UserAnalytics } from "./users.service";

interface ResultsData {
  userId: string;
  results: "win" | "loss";
}

@Controller("user")
export class UsersController {
  constructor(private usersService: UsersService) {} //Inject UserService

  @Get("profile/avatar")
  async getUserProfile(@Req() request: Request) {
    try {
      const sessionId = request.cookies["sessionId"];
      if (!sessionId) {
        throw new UnauthorizedException("Session ID not found");
      }

      const user = await this.usersService.findUserBySessionId(sessionId);
      if (!user) {
        throw new UnauthorizedException(
          "User not found for the given session ID",
        );
      }

      const avatarURL = user.avatarURL;
      if (!avatarURL) {
        throw new UnprocessableEntityException("Avatar URL not found");
      }
      return { avatarURL };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof UnprocessableEntityException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        "Internal Server Error in users.controller",
      );
    }
  }

  @Get("user-analytics")
  async getUserAnalytics(@Req() req: any): Promise<UserAnalytics> {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException("User not found");
    }
    return this.usersService.getUserAnalytics(userId);
  }

  // Listens for Post requests to update the user results and calls the service to update the user's record in the database
  @Post("update-results")
  async updateResult(@Body() resultsData: ResultsData) {
    if (resultsData.results !== "win" && resultsData.results !== "loss") {
      throw new BadRequestException(
        "Invalid result from update-results Post request",
      );
    }
    return this.usersService.updateUserResult(
      resultsData.userId,
      resultsData.results,
    );
  }
}
