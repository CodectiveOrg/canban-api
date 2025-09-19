import "dotenv/config";

import { CanbanDataSource } from "@/database/canban.data-source";

import { BoardSeeder } from "@/seed/seeders/board.seeder";
import { UserSeeder } from "@/seed/seeders/user.seeder";

import { validateEnv } from "@/utils/env.utils";

async function main(): Promise<void> {
  validateEnv();

  globalThis.dataSource = new CanbanDataSource();
  const isDatabaseInitialized = await dataSource.init();

  if (!isDatabaseInitialized) {
    return;
  }

  await new UserSeeder().seed();
  console.log("");
  await new BoardSeeder().seed();
  console.log("");

  await dataSource.destroy();
}

main().then();
