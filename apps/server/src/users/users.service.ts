import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../users/schemas/user.schema";
import { Session } from "../users/schemas/session.schema";

export interface UserAnalytics {
  wins: number;
  losses: number;
  winRate: number;
}

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

  async getUserAnalytics(userId: string): Promise<UserAnalytics> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const totalGames = user.wins + user.losses;

      return {
        wins: user.wins,
        losses: user.losses,
        winRate: totalGames > 0 ? (user.wins / totalGames) * 100 : 0,
      };
    } catch (error) {
      console.error("Error getting user analytics in users.service", error);
      throw new Error("Error getting user analytics in users.service");
    }
  }

  async updateUserResult(
    userId: string,
    result: "win" | "loss",
  ): Promise<User> {
    const update =
      result === "win" ? { $inc: { wins: 1 } } : { $inc: { losses: 1 } };
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate({ userId, update }, { new: true })
        .exec();
      return updatedUser;
    } catch (error) {
      console.error("Error updating user result in users.service", error);
      throw new Error("Error updating user result in users.service");
    }
  }
}
