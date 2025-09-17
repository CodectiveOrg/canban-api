import { Request, Response } from "express";

import { Repository } from "typeorm";

import { z } from "zod";

import { ColorSchema } from "@/validation/schemas/color-schema";
import { DescriptionSchema } from "@/validation/schemas/description-schema";
import { TitleSchema } from "@/validation/schemas/title-schema";

import {
  CreateBoardResponseDto,
  GetBoardResponseDto,
} from "@/dto/board-response.dto";
import { ResponseDto } from "@/dto/response.dto";

import { Board } from "@/entities/board";

import { fetchUserFromToken } from "@/utils/api.utils";
import { assignDefinedValues } from "@/utils/object.utils";

export class BoardController {
  private readonly boardRepo: Repository<Board>;

  public constructor() {
    this.boardRepo = dataSource.getRepository(Board);

    this.createBoard = this.createBoard.bind(this);
    this.getBoard = this.getBoard.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.removeBoard = this.removeBoard.bind(this);
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

  public async getBoard(
    _: Request,
    res: Response<GetBoardResponseDto>,
  ): Promise<void> {
    res.json({
      message: "Board fetched successfully.",
      result: res.locals.board,
    });
  }

  public async updateBoard(
    req: Request,
    res: Response<ResponseDto>,
  ): Promise<void> {
    const body = UpdateBodySchema.parse(req.body);

    const updatedBoard = assignDefinedValues(res.locals.board, body);
    await this.boardRepo.save(updatedBoard);

    res.json({ message: "Board updated successfully." });
  }

  public async removeBoard(
    _: Request,
    res: Response<ResponseDto>,
  ): Promise<void> {
    await this.boardRepo.delete(res.locals.board.id);

    res.json({ message: "Board updated successfully." });
  }
}

const CreateBoardBodySchema = z.object({
  title: TitleSchema,
  description: DescriptionSchema,
  color: ColorSchema,
});

const UpdateBodySchema = z.object({
  title: TitleSchema.optional(),
  description: DescriptionSchema.optional(),
  color: ColorSchema.optional(),
});
