import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  console.log("CLIENT+++++++++++++++", clientUrl);

  if (!clientUrl) {
    console.log("CLIENT+++++++++++++++", clientUrl);
    throw new Error("Public environment variable is not set.");
  }

  app.enableCors({
    origin: [clientUrl], // Use the environment variable value here.
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // This is necessary for cookies to be sent and received with CORS requests.
  });

  app.use(cookieParser());
  await app.listen(8080, "0.0.0.0");
}
bootstrap();
