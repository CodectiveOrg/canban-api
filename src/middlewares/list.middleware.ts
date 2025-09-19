import { RequestHandler } from "express";

import { z } from "zod";

import { HttpError } from "@/errors/http.error";

import { List } from "@/entities/list";

export const listMiddleware: RequestHandler = async (req, res, next) => {
  const listRepo = dataSource.getRepository(List);

  const params = ListIdParamsSchema.parse(req.params);

  const list = await listRepo.findOne({
    where: {
      id: params.listId,
      board: { user: { id: res.locals.user.id } },
    },
  });

  if (!list) {
    throw new HttpError(404, "List not found.");
  }

  res.locals.list = list;
  next();
};

const ListIdParamsSchema = z.object({
  listId: z.coerce.number(),
});
