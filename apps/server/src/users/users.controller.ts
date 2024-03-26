import { Controller, Get, Req, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request } from "express";

@Controller("user")
export class UsersController {
  constructor(private usersService: UsersService) {} //Inject UserService

  @Get("profile")
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
    return user;
  }
}
