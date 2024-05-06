import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UsersService } from "src/users/users.service";

@Controller("session")
export class SessionController {
  constructor(private usersService: UsersService) {}

  @Get("logout")
  async logout(@Req() req: Request, @Res() res: Response) {
    const sessionId = req.cookies["sessionId"];

    if (!sessionId) {
      return res.status(400).json({ message: "No session found" });
    }
    try {
      await this.usersService.logoutAndDeleteSession(sessionId);
      console.log("Logging out, updating state...");
      res.clearCookie("sessionId", {
        path: "/",
        domain: process.env.COOKIE_DOMAIN,
      });
      return res.json({ message: "Logged out" }); //need this to return to FE or res.clearCookie wont work
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error logging out" });
    }
  }

  @Get("validateSession")
  async validateSession(@Req() req: Request, @Res() res: Response) {
    const sessionId = req.cookies["sessionId"]; // Assuming you're using cookie-parser middleware

    if (!sessionId) {
      const guest = `Guest${Math.floor(Math.random() * 100 + 1)}`;
      res.cookie("username", guest, {
        httpOnly: false,
        sameSite: "lax",
        domain: process.env.COOKIE_DOMAIN,
        path: "/",
      });
      return res
        .status(401)
        .json({ message: "Session not found, creating guest cookie" });
    } else {
      // Users & Guest sessions

      const user = await this.usersService.findUserBySessionId(sessionId);
      if (user) {
        res.clearCookie("username", {
          path: "/",
          domain: process.env.COOKIE_DOMAIN,
        });
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
}
