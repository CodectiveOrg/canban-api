import { ILike, Repository } from "typeorm";

import { Board } from "@/entities/board";
import { User } from "@/entities/user";

import { boardsData } from "@/seed/data/boards.data";
import { usersData } from "@/seed/data/users.data";
import { SeedUserType } from "@/seed/types/seed-user.type";

export class BoardSeeder {
  private readonly boardRepo: Repository<Board>;
  private readonly userRepo: Repository<User>;

  public constructor() {
    this.boardRepo = dataSource.getRepository(Board);
    this.userRepo = dataSource.getRepository(User);
  }

  public async seed(): Promise<void> {
    const results = await Promise.allSettled(
      usersData.map(this.seedBoard.bind(this)),
    );

    results
      .filter((result) => result.status === "rejected")
      .map((result) => {
        console.error(result.reason);
      });
  }

  private async seedBoard(user: SeedUserType): Promise<void> {
    const foundUser = await this.userRepo.findOne({
      where: [{ username: ILike(user.username) }],
    });

    if (!foundUser) {
      console.log(`User doesn't exist. Username: ${user.username}`);
      return;
    }

    const doesBoardExist = await this.boardRepo.exists({
      where: [{ user: { id: foundUser.id } }],
    });

    if (doesBoardExist) {
      console.log(`User already have a board. Username: ${user.username}`);
      return;
    }

    const boards = boardsData.map((board) => ({
      ...board,
      user: { id: foundUser.id },
    }));

    await this.boardRepo.save(boards);

    console.log(`Boards saved successfully. Username: ${user.username}`);
  }
}
