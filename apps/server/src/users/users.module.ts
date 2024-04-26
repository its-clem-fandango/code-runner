// src/users/users.module.ts
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserSchema } from "./schemas/user.schema";
import { SessionSchema } from "./schemas/session.schema";
import { GameSchema } from "./schemas/game.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Session", schema: SessionSchema },
      { name: "Game", schema: GameSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
