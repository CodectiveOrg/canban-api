import { Router } from "express";

import { PublicController } from "@/controllers/public.controller";

export function generatePublicRoutes(): Router {
  const router = Router();
  const controller = new PublicController();

  router.get("/picture/user/:filename", controller.getPicture("user"));

  return router;
}
