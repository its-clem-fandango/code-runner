import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AnswerModule } from "./modules/answer/answer.module";
import { GatewayModule } from "./gateways/gateway.module";
import { BattleModule } from "./modules/battles/battle.module";
import { CodingChallengesModule } from "./modules/coding-challenges/coding-challenges.module";
import { AuthController } from "./auth/auth.controller";
import { UsersService } from "./users/users.service";
import { UsersController } from "./users/users.controller";
import { AuthMiddleware } from "./auth/auth.middleware";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./users/schemas/user.schema";
import { SessionSchema } from "./users/schemas/session.schema";
import { SessionController } from "./auth/session.controller";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Session", schema: SessionSchema },
    ]),
    AnswerModule,
    GatewayModule,
    BattleModule,
    CodingChallengesModule,
    UsersModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    SessionController,
  ],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
