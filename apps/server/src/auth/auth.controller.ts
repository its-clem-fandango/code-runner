import { Controller, Get, Post, Query, Req, Res } from "@nestjs/common";
import * as https from "https";
import * as dotenv from "dotenv";
dotenv.config();

@Controller("auth")
export class AuthController {
  @Get("github")
  githubLogin(@Req() req, @Res() res) {
    const clientID = process.env.GITHUB_CLIENT_ID;
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=http://localhost:8080/auth/github/callback`,
    );
  }

  @Get("github/callback")
  async githubCallback(@Query("code") code: string, @Res() res) {
    const clientID = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const tokenResponse = await this.exchangeCodeForToken(
      code,
      clientID,
      clientSecret,
    );
    const user = await this.fetchGithubUserProfile(tokenResponse.access_token);

    //REPLACE WITH /dashboard ENDPOINT
    console.log(`TOKEN RESPONSE: ${JSON.stringify(tokenResponse)}`);
    console.log(`USER: ${JSON.stringify(user)}`);
    res.redirect("http://localhost:3000/");
  }

  // This method exchanges an authorization code for an access token from GitHub.
  private async exchangeCodeForToken(
    code: string, // The code received from github
    clientID: string, // our client ID
    clientSecret: string, // our secret
  ): Promise<any> {
    // Returns a promise that resolves with the token info
    return new Promise<any>((resolve, reject) => {
      const postData = new URLSearchParams({
        client_id: clientID,
        client_secret: clientSecret,
        code: code,
      }).toString();

      const options = {
        hostname: "github.com",
        path: "/login/oauth/access_token",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json", // Ensures GitHub responds with JSON
        },
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData); // Resolve the promise with parsed data
          } catch (error) {
            reject(error); // Reject the promise in case of an error
          }
        });
      });

      req.on("error", (error) => {
        reject(error); // Reject the promise if there's a request error
      });

      req.write(postData); // Send the request with the encoded data
      req.end(); // End/close the request
    });
  }

  private async fetchGithubUserProfile(accessToken: string): Promise<any> {}
}
