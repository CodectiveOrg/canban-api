import { RequestHandler } from "express";

import { z } from "zod";

import { HttpError } from "@/errors/http.error";

import { Board } from "@/entities/board";

export const boardMiddleware: RequestHandler = async (req, res, next) => {
  const boardRepo = dataSource.getRepository(Board);

  const params = BoardIdParamsSchema.parse(req.params);

  const board = await boardRepo.findOne({
    where: {
      id: params.boardId,
      user: { id: res.locals.user.id },
    },
  });

  if (!board) {
    throw new HttpError(404, "Board not found.");
  }

  res.locals.board = board;
  next();
};

const BoardIdParamsSchema = z.object({
  boardId: z.coerce.number(),
});
