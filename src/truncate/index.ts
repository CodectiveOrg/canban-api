import "dotenv/config";

import fs from "node:fs/promises";

import { CanbanDataSource } from "@/database/canban.data-source";

import { validateEnv } from "@/utils/env.utils";

async function main(): Promise<void> {
  validateEnv();

  console.log("Starting drop and sync...");

  globalThis.dataSource = new CanbanDataSource({
    synchronize: true,
    dropSchema: true,
  });

  const isDatabaseInitialized = await dataSource.init();

  if (!isDatabaseInitialized) {
    return;
  }

  console.log("Drop and sync finished successfully.");

  await wipeFileStorage();

  await dataSource.destroy();
}

async function wipeFileStorage(): Promise<void> {
  console.log("Starting wipe file storage...");

  await fs.rm(process.env.FILE_STORAGE_PATH!, { recursive: true, force: true });
  await fs.mkdir(process.env.FILE_STORAGE_PATH!, { recursive: true });

  console.log("Wipe file storage finished successfully.");
}

main().then();
