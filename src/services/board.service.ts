import { ILike, Repository } from "typeorm";

import { HttpError } from "@/errors/http.error";

import { Board } from "@/entities/board";
import { User } from "@/entities/user";

import { boardsData } from "@/seed/data/boards.data";

export class BoardService {
  private readonly boardRepo: Repository<Board>;
  private readonly userRepo: Repository<User>;

  public constructor() {
    this.boardRepo = dataSource.getRepository(Board);
    this.userRepo = dataSource.getRepository(User);
  }

  public async seedBoard(username: string): Promise<void> {
    const foundUser = await this.userRepo.findOne({
      where: [{ username: ILike(username) }],
    });

    if (!foundUser) {
      throw new HttpError(404, "User not found");
    }

    const currentBoards = await this.boardRepo.find({
      where: [{ user: { id: foundUser.id } }],
    });

    const currentBoardsTitle = new Set(
      currentBoards.map((board) => board.title.toLowerCase()),
    );

    const nonExistingBoards = boardsData.filter(
      (board) => !currentBoardsTitle.has(board.title.toLowerCase()),
    );

    if (nonExistingBoards.length === 0) {
      throw new HttpError(400, "User already have all sample boards.");
    }

    const boards = nonExistingBoards.map((board) => ({
      ...board,
      user: { id: foundUser.id },
    }));

    await this.boardRepo.save(boards);
  }
}
