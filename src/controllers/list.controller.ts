import { Request, Response } from "express";

import { Repository } from "typeorm";

import { z } from "zod";

import {
  CreateListResponseDto,
  GetListResponseDto,
} from "@/dto/list-response.dto";
import { ResponseDto } from "@/dto/response.dto";

import { Board } from "@/entities/board";
import { List } from "@/entities/list";

import { assignDefinedValues } from "@/utils/object.utils";

import { DescriptionSchema } from "@/validation/schemas/description.schema";
import { TitleSchema } from "@/validation/schemas/title.schema";

export class ListController {
  private readonly boardRepo: Repository<Board>;
  private readonly listRepo: Repository<List>;

  public constructor() {
    this.boardRepo = dataSource.getRepository(Board);
    this.listRepo = dataSource.getRepository(List);

    this.createList = this.createList.bind(this);
    this.getList = this.getList.bind(this);
    this.updateList = this.updateList.bind(this);
    this.removeList = this.removeList.bind(this);
  }

  public async createList(
    req: Request,
    res: Response<CreateListResponseDto>,
  ): Promise<void> {
    const body = CreateListBodySchema.parse(req.body);

    const board = await this.boardRepo.findOne({
      where: {
        id: body.boardId,
        user: { id: res.locals.user.id },
      },
    });

    if (!board) {
      res.status(404).json({
        message: "Board not found.",
        error: "Not Found",
      });

      return;
    }

    const { maxPosition } = await this.listRepo
      .createQueryBuilder("list")
      .select("MAX(list.position)", "maxPosition")
      .where("list.boardId = :boardId", { boardId: board.id })
      .getRawOne();

    const createdList = await this.listRepo.save({
      ...body,
      position: (maxPosition ?? 0) + 1,
      board,
    });

    res.status(201).json({
      message: "List created successfully.",
      result: createdList.id,
    });
  }

  public async getList(
    _: Request,
    res: Response<GetListResponseDto>,
  ): Promise<void> {
    res.json({
      message: "List fetched successfully.",
      result: res.locals.list,
    });
  }

  public async updateList(
    req: Request,
    res: Response<ResponseDto>,
  ): Promise<void> {
    const body = UpdateListBodySchema.parse(req.body);

    const updatedList = assignDefinedValues(res.locals.list, body);
    await this.listRepo.save(updatedList);

    res.json({ message: "List updated successfully." });
  }

  public async removeList(
    _: Request,
    res: Response<ResponseDto>,
  ): Promise<void> {
    await this.listRepo.delete(res.locals.list.id);

    res.json({ message: "List removed successfully." });
  }
}

const CreateListBodySchema = z.object({
  boardId: z.number(),
  title: TitleSchema,
  description: DescriptionSchema,
});

const UpdateListBodySchema = z.object({
  title: TitleSchema.optional(),
  description: DescriptionSchema.optional(),
});
