import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UsersService } from "src/users/users.service";

@Controller("session")
export class SessionController {
  constructor(private usersService: UsersService) {}

  @Get("validateSession")
  async validateSession(@Req() req: Request, @Res() res: Response) {
    const sessionId = req.cookies["sessionId"]; // Assuming you're using cookie-parser middleware

    if (!sessionId) {
      const guest = `Guest${Math.floor(Math.random() * 100 + 1)}`;
      console.log("setting guest cookie BE: session.controller: ", guest);
      res.cookie("username", guest, {
        httpOnly: false,
        path: "/",
        sameSite: "lax",
      });
      return res
        .status(401)
        .json({ message: "Session not found, creating guest cookie" });
    } else {
      const user = await this.usersService.findUserBySessionId(sessionId);
      console.log("User from session.controller:", user);
      if (user) {
        res.clearCookie("username", { path: "/" });
      }

      return res.json({
        user: {
          id: user._id,
          username: user.username,
          createdAt: user.createdAt,
          realName: user.realName,
          wins: user.wins,
          losses: user.losses,
        },
      });
    }
  }
}
