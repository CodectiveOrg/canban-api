import "dotenv/config";
import { UserSeeder } from "@/seed/seeders/user.seeder";

import { DatabaseService } from "@/services/database.service";

import { validateEnv } from "@/utils/env.utils";

async function main(): Promise<void> {
  validateEnv();

  const databaseService = new DatabaseService();
  const isDatabaseInitialized = await databaseService.init();

  if (!isDatabaseInitialized) {
    return;
  }

  await new UserSeeder(databaseService).seed();
  console.log("");

  await databaseService.dataSource.destroy();
}

main().then();
