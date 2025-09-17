import { RequestHandler } from "express";

import { z } from "zod";

import { Board } from "@/entities/board";

import { DatabaseService } from "@/services/database.service";

export const boardMiddleware: RequestHandler = async (req, res, next) => {
  const boardRepo = DatabaseService.dataSource.getRepository(Board);

  const params = BoardIdParamsSchema.parse(req.params);

  const board = await boardRepo.findOne({ where: { id: params.boardId } });

  if (!board) {
    res.status(404).json({
      message: "Board not found.",
      error: "Not Found",
    });

    return;
  }

  res.locals.board = board;
  next();
};

const BoardIdParamsSchema = z.object({
  boardId: z.coerce.number(),
});
