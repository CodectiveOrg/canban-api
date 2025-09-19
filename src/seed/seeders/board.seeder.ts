import { usersData } from "@/seed/data/users.data";
import { SeedUserType } from "@/seed/types/seed-user.type";

import { BoardService } from "@/services/board.service";

export class BoardSeeder {
  private readonly boardService: BoardService;

  public constructor() {
    this.boardService = new BoardService();
  }

  public async seed(): Promise<void> {
    await Promise.allSettled(usersData.map(this.seedBoard.bind(this)));
  }

  private async seedBoard(user: SeedUserType): Promise<void> {
    console.log(`Seeding boards for ${user.username}...`);

    try {
      await this.boardService.seedBoard(user.username);
      console.log("Boards created successfully");
    } catch (e) {
      console.error(e);
    }
  }
}
