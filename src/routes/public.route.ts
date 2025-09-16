import { Router } from "express";

import { container } from "tsyringe";

import { PublicController } from "@/controllers/public.controller";

export function generatePublicRoutes(): Router {
  const router = Router();
  const controller = container.resolve(PublicController);

  router.get("/picture/user/:filename", controller.getPicture("user"));

  return router;
}
