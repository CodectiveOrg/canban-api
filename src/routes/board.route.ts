import { Router } from "express";

import { BoardController } from "@/controllers/board.controller";

import { boardMiddleware } from "@/middlewares/board.middleware";

export function generateBoardRoutes(): Router {
  const router = Router();
  const controller = new BoardController();

  router.get("/", controller.getAllBoards);
  router.post("/", controller.createBoard);
  router.post("/seed", controller.seed);
  router.get("/:boardId", boardMiddleware, controller.getBoard);
  router.patch("/:boardId", boardMiddleware, controller.updateBoard);
  router.delete("/:boardId", boardMiddleware, controller.removeBoard);

  return router;
}
