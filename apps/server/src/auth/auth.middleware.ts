import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

//checks for presence of accesstoken and validates it
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: NextFunction) {
    const accessToken = req.cookies["accessToken"];
    const excludedAuthPaths = ["/auth/github", "/"];

    if (excludedAuthPaths.includes(req.path)) {
      return next();
    }

    if (!accessToken) {
      return res.status(401).send({ error: "Access Token is missing" });
    }

    // if accessToken is correct, request profile info of user associated with access token to GH
    try {
      const githubResponse = await fetch("https://api.github.com/user", {
        headers: { Authorization: `token ${accessToken}` },
      });

      if (!githubResponse.ok) {
        return res
          .status(401)
          .send({ error: "Invalid or expired access token" });
      }

      const githubUser = await githubResponse.json();
      console.log("USER ID:", (req.user = { id: githubUser.id }));
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
}
