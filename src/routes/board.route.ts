import { Router } from "express";

import { BoardController } from "@/controllers/board.controller";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { boardMiddleware } from "@/middlewares/board.middleware";

export function generateBoardRoutes(): Router {
  const router = Router();
  const controller = new BoardController();

  router.post("/", authMiddleware, controller.createBoard);
  router.get("/:boardId", authMiddleware, boardMiddleware, controller.getBoard);
  router.patch(
    "/:boardId",
    authMiddleware,
    boardMiddleware,
    controller.updateBoard,
  );
  router.delete(
    "/:boardId",
    authMiddleware,
    boardMiddleware,
    controller.removeBoard,
  );

  return router;
}
