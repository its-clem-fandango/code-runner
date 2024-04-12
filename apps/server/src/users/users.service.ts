import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../users/schemas/user.schema";
import { Session } from "../users/schemas/session.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User") private userModel: Model<User>,
    @InjectModel("Session") private sessionModel: Model<Session>,
  ) {}

  async findOrCreateUser(githubData): Promise<User> {
    const username = githubData.login;
    const avatarURL = githubData.avatar_url;
    const realName = githubData.name;

    console.log("USER NAME ****: ", username);
    console.log("AVATAR  ****: ", avatarURL);
    console.log("REAL NAME ****: ", realName);

    const user = await this.userModel.findOneAndUpdate(
      { username }, // search for this username
      { username, avatarURL, realName }, //if found, update with this data
      {
        new: true,
        upsert: true,
      },
    );
    return user;
  }

  async createSession(userId: string): Promise<Session> {
    try {
      const session = new this.sessionModel({
        userId,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      await session.save();
      return session;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating session in users.service");
    }
  }

  async findUserBySessionId(sessionId: string): Promise<User | null> {
    try {
      const session = await this.sessionModel.findById(sessionId).exec();
      if (!session || session.expiresAt < new Date()) {
        return null;
      }
      return this.userModel.findById(session.userId).exec();
    } catch (error) {
      console.error(error);
      throw new Error("Error finding user by session ID in users.service");
    }
  }
}
