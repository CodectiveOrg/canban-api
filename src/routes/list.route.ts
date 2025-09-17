import { Router } from "express";

import { ListController } from "@/controllers/list.controller";

import { listMiddleware } from "@/middlewares/list.middleware";

export function generateListRoutes(): Router {
  const router = Router();
  const controller = new ListController();

  router.post("/", controller.createList);
  router.get("/:listId", listMiddleware, controller.getList);
  router.patch("/:listId", listMiddleware, controller.updateList);
  router.delete("/:listId", listMiddleware, controller.removeList);

  return router;
}
