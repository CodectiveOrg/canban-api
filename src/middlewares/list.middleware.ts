import { RequestHandler } from "express";

import { z } from "zod";

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
    res.status(404).json({
      message: "List not found.",
      error: "Not Found",
    });

    return;
  }

  res.locals.list = list;
  next();
};

const ListIdParamsSchema = z.object({
  listId: z.coerce.number(),
});
