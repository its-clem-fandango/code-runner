import { Controller, Get, Query, Req, Res } from "@nestjs/common";
import * as https from "https";
import * as dotenv from "dotenv";
import { UsersService } from "src/users/users.service";
dotenv.config();

@Controller("auth")
export class AuthController {
  constructor(private usersService: UsersService) {} //Inject UserService

  @Get("github")
  githubLogin(@Req() req, @Res() res) {
    const clientID = process.env.GITHUB_CLIENT_ID;
    const callbackURI = process.env.NEXT_PUBLIC_REDIRECT_URI;
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${callbackURI}`,
    );
  }

  @Get("github/callback")
  async githubCallback(@Query("code") code: string, @Req() req, @Res() res) {
    const clientID = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const tokenResponse = await this.exchangeCodeForToken(
      code,
      clientID,
      clientSecret,
    );

    // Use the access token to fetch the user's profile from GitHub
    const githubUser = await this.fetchGithubUserProfile(
      tokenResponse.access_token,
    );

    console.log("****GITHUB USER OBJECT******", githubUser);

    //Use usersService to find or create a user and pass it the githubUser object (contains the GH data)
    const user = await this.usersService.findOrCreateUser({
      login: githubUser.login,
      id: githubUser.id,
      email: githubUser.email,
      avatar_url: githubUser.avatar_url,
      name: githubUser.name,
    });

    // After successfully finding or creating a user

    // Instead of making a session make a JWT w/ a secret & validate function
    const session = await this.usersService.createSession(user._id.toString());
    res.cookie("sessionId", session._id.toString(), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 6666666,
      path: "/",
    });

    //Dashboard
    res.redirect(process.env.NEXT_PUBLIC_CLIENT_URL);
  }

  // This method exchanges an authorization code for an access token from GitHub.
  async exchangeCodeForToken(
    code: string,
    clientID: string,
    clientSecret: string,
  ): Promise<any> {
    const url = "https://github.com/login/oauth/access_token";
    const params = new URLSearchParams({
      client_id: clientID,
      client_secret: clientSecret,
      code,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: params,
    });
    const data = await response.json();
    return data;
  }

  // Trade access token for user's profile in GitHub
  private async fetchGithubUserProfile(accessToken: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // Https module request method does not return a promise, so we have to wrap the https request in a promise
      const options = {
        hostname: "api.github.com",
        path: "/user",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "Node.js",
        },
      };

      // Make the HTTP GET request to Github's user endpoint

      const request = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            reject(error);
          }
        });
      });

      request.on("error", (error) => {
        reject(error);
      });
      request.end();
    });
  }
}
