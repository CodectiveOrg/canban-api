import { Router } from "express";

import { ItemController } from "@/controllers/item.controller";

import { itemMiddleware } from "@/middlewares/item.middleware";

export function generateItemRoutes(): Router {
  const router = Router();
  const controller = new ItemController();

  router.post("/", controller.createItem);
  router.get("/:itemId", itemMiddleware, controller.getItem);
  router.patch("/:itemId", itemMiddleware, controller.updateItem);
  router.delete("/:itemId", itemMiddleware, controller.removeItem);
  router.post("/:itemId/move", itemMiddleware, controller.moveItem);

  return router;
}
