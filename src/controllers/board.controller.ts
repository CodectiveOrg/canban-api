import { Request, Response } from "express";

import { Repository } from "typeorm";

import { z } from "zod";

import {
  CreateBoardResponseDto,
  GetAllBoardsResponseDto,
  GetBoardResponseDto,
} from "@/dto/board-response.dto";
import { ResponseDto } from "@/dto/response.dto";

import { Board } from "@/entities/board";

import { BoardService } from "@/services/board.service";

import { fetchUserFromToken } from "@/utils/api.utils";
import { assignDefinedValues } from "@/utils/object.utils";

import { ColorSchema } from "@/validation/schemas/color.schema";
import { DescriptionSchema } from "@/validation/schemas/description.schema";
import { TitleSchema } from "@/validation/schemas/title.schema";

export class BoardController {
  private readonly boardRepo: Repository<Board>;

  private readonly boardService: BoardService;

  public constructor() {
    this.boardRepo = dataSource.getRepository(Board);

    this.boardService = new BoardService();

    this.getAllBoards = this.getAllBoards.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.seed = this.seed.bind(this);
    this.getBoard = this.getBoard.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.removeBoard = this.removeBoard.bind(this);
  }

  public async getAllBoards(
    _: Request,
    res: Response<GetAllBoardsResponseDto>,
  ): Promise<void> {
    const boards = await this.boardRepo.find({
      where: { user: { id: res.locals.user.id } },
    });

    res.json({
      message: "All boards fetched successfully.",
      result: boards,
    });
  }

  public async createBoard(
    req: Request,
    res: Response<CreateBoardResponseDto>,
  ): Promise<void> {
    const body = CreateBoardBodySchema.parse(req.body);
    const user = await fetchUserFromToken(res);

    const createdBoard = await this.boardRepo.save({ ...body, user });

    res.status(201).json({
      message: "Board created successfully.",
      result: createdBoard.id,
    });
  }

  public async seed(_: Request, res: Response<ResponseDto>): Promise<void> {
    await this.boardService.seedBoard(res.locals.user.username);

    res.json({ message: "Boards created successfully." });
  }

  public async getBoard(
    _: Request,
    res: Response<GetBoardResponseDto>,
  ): Promise<void> {
    const boardWithRelations = await this.boardRepo.findOne({
      where: { id: res.locals.board.id },
      relations: { lists: { items: true } },
      order: { lists: { position: "ASC", items: { position: "ASC" } } },
    });

    res.json({
      message: "Board fetched successfully.",
      result: boardWithRelations!,
    });
  }

  public async updateBoard(
    req: Request,
    res: Response<ResponseDto>,
  ): Promise<void> {
    const body = UpdateBoardBodySchema.parse(req.body);

    const updatedBoard = assignDefinedValues(res.locals.board, body);
    await this.boardRepo.save(updatedBoard);

    res.json({ message: "Board updated successfully." });
  }

  public async removeBoard(
    _: Request,
    res: Response<ResponseDto>,
  ): Promise<void> {
    await this.boardRepo.delete(res.locals.board.id);

    res.json({ message: "Board removed successfully." });
  }
}

const CreateBoardBodySchema = z.object({
  title: TitleSchema,
  description: DescriptionSchema,
  color: ColorSchema,
});

const UpdateBoardBodySchema = z.object({
  title: TitleSchema.optional(),
  description: DescriptionSchema.optional(),
  color: ColorSchema.optional(),
});
