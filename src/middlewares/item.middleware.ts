import { RequestHandler } from "express";

import { z } from "zod";

import { HttpError } from "@/errors/http.error";

import { Item } from "@/entities/item";

export const itemMiddleware: RequestHandler = async (req, res, next) => {
  const itemRepo = dataSource.getRepository(Item);

  const params = ItemIdParamsSchema.parse(req.params);

  const item = await itemRepo.findOne({
    where: {
      id: params.itemId,
      list: { board: { user: { id: res.locals.user.id } } },
    },
  });

  if (!item) {
    throw new HttpError(404, "Item not found.");
  }

  res.locals.item = item;
  next();
};

const ItemIdParamsSchema = z.object({
  itemId: z.coerce.number(),
});
