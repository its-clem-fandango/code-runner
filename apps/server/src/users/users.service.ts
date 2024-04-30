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

  async logoutAndDeleteSession(sessionId: string): Promise<void> {
    try {
      await this.sessionModel.findByIdAndDelete(sessionId).exec();
    } catch (error) {
      console.error(
        "Error logging out in users.service, no sessionId found",
        error,
      );
      throw new Error("Error logging out in users.service, no sessionId found");
    }
  }

  async findUserBySessionId(sessionId: string): Promise<User | null> {
    try {
      const session = await this.sessionModel.findById(sessionId).exec();
      console.log("Session data:", session);
      if (!session || session.expiresAt < new Date()) {
        console.log("Session is null or expired");

        return null;
      }
      return this.userModel.findById(session.userId).exec();
    } catch (error) {
      console.error(error);
      throw new Error("Error finding user by session ID in users.service");
    }
  }

  async getUserAnalytics(sessionId: string): Promise<any> {
    const session = await this.sessionModel.findById(sessionId).exec();
    if (!session || session.expiresAt < new Date()) {
      throw new Error("Session expired or not found");
    }

    const user = await this.userModel.findById(session.userId).exec();
    if (!user) {
      throw new Error("User not found");
    }

    const totalGames = user.wins + user.losses;
    const winRate =
      totalGames > 0 ? Math.floor((user.wins / totalGames) * 100) : 0;
    return {
      wins: user.wins,
      losses: user.losses,
      winRate: winRate,
    };
  }

  async updateUserResult(
    sessionId: string,
    result: "true" | "false",
  ): Promise<User> {
    const update =
      result === "true" ? { $inc: { wins: 1 } } : { $inc: { losses: 1 } };
    try {
      const userId = (await this.findUserBySessionId(sessionId)).id;

      const updatedUser = await this.userModel
        .findByIdAndUpdate(userId, update, { new: true })
        .exec();

      console.log(
        "🚀 ~ file: users.service.ts:94 ~ UsersService ~ updatedUser:",
        updatedUser,
      );

      return updatedUser;
    } catch (error) {
      console.error("Error updating user result in users.service", error);
      throw new Error("Error updating user result in users.service");
    }
  }
}

/**
 * function n(n){return n%2===0?"Even":"Odd"}
 */
