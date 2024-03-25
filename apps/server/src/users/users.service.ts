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
    const { login: username, avatar_url: avatarURL } = githubData;

    const user = await this.userModel.findOneAndUpdate(
      { username },
      { username, avatarURL },
      {
        new: true,
        upsert: true,
      },
    );

    return user;
  }

  async createSession(userId: string): Promise<Session> {
    const session = new this.sessionModel({
      userId,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    await session.save();
    return session;
  }

  async findUserBySessionId(sessionId: string): Promise<User | null> {
    const session = await this.sessionModel.findById(sessionId).exec();
    if (!session || session.expiresAt < new Date()) {
      return null;
    }
    return this.userModel.findById(session.userId).exec();
  }
}
