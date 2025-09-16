import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { User } from "@/entities/user";

export class DatabaseService {
  public dataSource: DataSource;

  public constructor(options: Partial<PostgresConnectionOptions> = {}) {
    this.dataSource = new DataSource({
      type: "postgres",
      url: process.env.DATABASE_URL!,
      entities: [User],
      synchronize: true,
      logging: false,
      ...options,
    });
  }

  public async init(): Promise<boolean> {
    return await this.isConnected();
  }

  private async isConnected(): Promise<boolean> {
    try {
      await this.dataSource.initialize();
      console.log("Connection has been established successfully.");
      return true;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return false;
    }
  }
}
