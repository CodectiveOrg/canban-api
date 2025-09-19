import { Request, Response } from "express";

import { Repository } from "typeorm";

import { z } from "zod";

import { HttpError } from "@/errors/http.error";

import {
  CreateItemResponseDto,
  GetItemResponseDto,
} from "@/dto/item-response.dto";
import { ResponseDto } from "@/dto/response.dto";

import { Item } from "@/entities/item";
import { List } from "@/entities/list";

import { assignDefinedValues } from "@/utils/object.utils";
import {
  getMaxPositionAmongItems,
  moveEntities,
  moveItemToList,
} from "@/utils/position.utils";

import { DescriptionSchema } from "@/validation/schemas/description.schema";
import { DueDateSchema } from "@/validation/schemas/due-date.schema";
import { TitleSchema } from "@/validation/schemas/title.schema";

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
    this.moveItem = this.moveItem.bind(this);
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
      throw new HttpError(404, "List not found.");
    }

    const maxPosition = await getMaxPositionAmongItems(list.id);

    const createdItem = await this.itemRepo.save({
      ...body,
      position: maxPosition + 1,
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

  public async moveItem(
    req: Request,
    res: Response<ResponseDto>,
  ): Promise<void> {
    const body = MoveItemBodySchema.parse(req.body);

    const activeItem = (await this.itemRepo.findOne({
      where: { id: res.locals.item.id },
      relations: { list: true },
    }))!;

    if ("overListId" in body) {
      const overList = await this.listRepo.findOne({
        where: { id: body.overListId },
      });

      if (!overList) {
        throw new HttpError(404, "Over list not found.");
      }

      await moveItemToList(activeItem, overList.id);
      await this.itemRepo.save(activeItem);
    } else {
      const overItem = await this.itemRepo.findOne({
        where: { id: body.overItemId },
        relations: { list: true },
      });

      if (!overItem) {
        throw new HttpError(404, "Over item not found.");
      }

      await moveItemToList(activeItem, overItem.list.id);
      const items = await moveEntities(Item, activeItem, overItem);
      await this.itemRepo.save([activeItem, overItem, ...items]);
    }

    res.json({ message: "Item moved successfully." });
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

const MoveItemBodySchema = z.union([
  z.object({
    overListId: z.coerce.number(),
  }),
  z.object({
    overItemId: z.coerce.number(),
  }),
]);
