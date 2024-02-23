import { Controller, Get, Query, Req, Res } from "@nestjs/common";
import * as https from "https";
import * as dotenv from "dotenv";
dotenv.config();

@Controller("auth")
export class AuthController {
  @Get("github")
  githubLogin(@Req() req, @Res() res) {
    const clientID = process.env.GITHUB_CLIENT_ID;
    //const callbackURI = process.env.NEXT_PUBLIC_REDIRECT_URI;
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

    //Set access token as a cookie named accessToken (note: response is access_token)
    res.cookie("accessToken", tokenResponse.access_token, {
      httpOnly: true, //makes cookie inaccessible to JS in browser
      secure: true, //ensures cooie is sent only over HTTPS
    });

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
    // This function returns a promise that resolves with the data received from GitHub after exchanging the authorization code.
    return new Promise<any>((resolve, reject) => {
      // The postData is a URL-encoded string containing the necessary parameters for the token exchange.
      const postData = new URLSearchParams({
        client_id: clientID,
        client_secret: clientSecret,
        code: code,
      }).toString();

      // Options for the HTTPS request, including the GitHub API endpoint, method, and headers.
      const options = {
        hostname: "github.com",
        path: "/login/oauth/access_token",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json", // Requests that GitHub responds with JSON
        },
      };

      // Making the HTTPS POST request to GitHub's token endpoint.
      const req = https.request(options, (res) => {
        let data = "";
        // Accumulating the data chunks as they come in.
        res.on("data", (chunk) => (data += chunk));
        // Once all data has been received, parse it from JSON and resolve the promise with it.
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(data); // Parse the JSON string into an object.
            resolve(parsedData); // Resolve the promise with the parsed object.
          } catch (error) {
            reject(error); // If parsing fails, reject the promise with the error.
          }
        });
      });

      // Attach an error handler for the request.
      req.on("error", (error) => {
        reject(error); // Reject the promise if an error occurs during the request.
      });

      req.write(postData); // Send the request body (postData) with the request.
      req.end(); // Signal that the request body has been completely sent.
    });
  }

  // Trade access token for user profile
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
