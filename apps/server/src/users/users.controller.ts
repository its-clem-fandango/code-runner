import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request } from "express";

@Controller("user")
export class UsersController {
  constructor(private usersService: UsersService) {} //Inject UserService

  @Get("profile/avatar")
  async getUserProfile(@Req() request: Request) {
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
  }
}
