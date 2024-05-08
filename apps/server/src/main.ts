import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  console.log("Client URL:", clientUrl);

  const logger = new Logger("HTTP");

  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.log(`Incoming Request: ${req.method} ${req.path}`);
    logger.debug("Headers: " + JSON.stringify(req.headers));
    next(); // Move to the next middleware or route handler
  });

  if (!clientUrl) {
    throw new Error("Public environment variable is not set.");
  }

  app.enableCors({
    origin: [clientUrl],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Accept",
  });

  app.use(cookieParser());
  await app.listen(8080, "0.0.0.0");
}
bootstrap();
