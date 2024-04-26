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
import { GameSchema } from "./schemas/game.schema";

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
  async getUserAnalytics(@Req() req: any) {
    const sessionId = req.cookies["sessionId"];
    if (!sessionId) {
      throw new UnauthorizedException("Session ID not found");
    }
    try {
      return await this.usersService.getUserAnalytics(sessionId);
    } catch (error) {
      throw new UnauthorizedException(
        "User not found for the given session ID",
      );
    }
  }

  // Listens for Post requests to update the user results and calls the service to update the user's record in the database
  @Post("update-results")
  async updateResult(@Body() GameSchema) {
    try {
    } catch (error) {
      console.error("Failed to update user results:", error);
      throw new InternalServerErrorException("Failed to update user results");
    }
  }
}
