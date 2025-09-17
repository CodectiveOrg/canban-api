import { Request, Response } from "express";

import { Repository } from "typeorm";

import { z } from "zod";

import { DescriptionSchema } from "@/validation/schemas/description-schema";
import { DueDateSchema } from "@/validation/schemas/due-date-schema";
import { TitleSchema } from "@/validation/schemas/title-schema";

import {
  CreateItemResponseDto,
  GetItemResponseDto,
} from "@/dto/item-response.dto";
import { ResponseDto } from "@/dto/response.dto";

import { Item } from "@/entities/item";
import { List } from "@/entities/list";

import { assignDefinedValues } from "@/utils/object.utils";

export class ItemController {
  private readonly listRepo: Repository<List>;
  private readonly itemRepo: Repository<Item>;

  public constructor() {
    this.listRepo = dataSource.getRepository(List);
    this.itemRepo = dataSource.getRepository(Item);

    this.createItem = this.createItem.bind(this);
    this.getItem = this.getItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  public async createItem(
    req: Request,
    res: Response<CreateItemResponseDto>,
  ): Promise<void> {
    const body = CreateItemBodySchema.parse(req.body);

    const list = await this.listRepo.findOne({
      where: {
        id: body.listId,
        board: { user: { id: res.locals.user.id } },
      },
    });

    if (!list) {
      res.status(404).json({
        message: "List not found.",
        error: "Not Found",
      });

      return;
    }

    const maxPosition = await this.itemRepo.maximum("position", {
      list: { id: list.id },
    });

    const createdItem = await this.itemRepo.save({
      ...body,
      position: (maxPosition ?? 0) + 1,
      list,
    });

    res.status(201).json({
      message: "Item created successfully.",
      result: createdItem.id,
    });
  }

  public async getItem(
    _: Request,
    res: Response<GetItemResponseDto>,
  ): Promise<void> {
    res.json({
      message: "Item fetched successfully.",
      result: res.locals.item,
    });
  }

  public async updateItem(
    req: Request,
    res: Response<ResponseDto>,
  ): Promise<void> {
    const body = UpdateItemBodySchema.parse(req.body);

    const updatedItem = assignDefinedValues(res.locals.item, body);
    await this.itemRepo.save(updatedItem);

    res.json({ message: "Item updated successfully." });
  }

  public async removeItem(
    _: Request,
    res: Response<ResponseDto>,
  ): Promise<void> {
    await this.itemRepo.delete(res.locals.item.id);

    res.json({ message: "Item removed successfully." });
  }
}

const CreateItemBodySchema = z.object({
  listId: z.number(),
  title: TitleSchema,
  description: DescriptionSchema,
  dueDate: DueDateSchema,
});

const UpdateItemBodySchema = z.object({
  title: TitleSchema.optional(),
  description: DescriptionSchema.optional(),
  dueDate: DueDateSchema.optional(),
});
