import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { Board } from "@/entities/board";
import { Item } from "@/entities/item";
import { List } from "@/entities/list";
import { User } from "@/entities/user";

export class DatabaseService {
  public static dataSource: DataSource;

  public constructor(options: Partial<PostgresConnectionOptions> = {}) {
    if (DatabaseService.dataSource) {
      return;
    }

    DatabaseService.dataSource = new DataSource({
      type: "postgres",
      url: process.env.DATABASE_URL!,
      entities: [Board, Item, List, User],
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
      await DatabaseService.dataSource.initialize();
      console.log("Connection has been established successfully.");
      return true;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return false;
    }
  }
}
