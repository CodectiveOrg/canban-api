import "dotenv/config";
import "reflect-metadata";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { CanbanDataSource } from "@/database/canban.data-source";

import { globalErrorHandler } from "@/handlers/global-error.handler";

import { generateAuthRoutes } from "@/routes/auth.route";
import { generateBoardRoutes } from "@/routes/board.route";
import { generatePublicRoutes } from "@/routes/public.route";
import { generateUserRoutes } from "@/routes/user.route";

import { validateEnv } from "@/utils/env.utils";

const PORT = process.env.PORT || 5000;

async function main(): Promise<void> {
  validateEnv();

  globalThis.dataSource = new CanbanDataSource();
  const isDatabaseInitialized = await dataSource.init();

  if (!isDatabaseInitialized) {
    return;
  }

  const app = express();
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors({ origin: true, credentials: true }));

  app.use("/api/auth", generateAuthRoutes());
  app.use("/api/board", generateBoardRoutes());
  app.use("/api/public", generatePublicRoutes());
  app.use("/api/user", generateUserRoutes());

  app.use(globalErrorHandler);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

main().then();
