import { Router } from "express";

import { container } from "tsyringe";

import { AuthController } from "@/controllers/auth.controller";

import { authMiddleware } from "@/middlewares/auth.middleware";

export function generateAuthRoutes(): Router {
  const router = Router();
  const controller = container.resolve(AuthController);

  router.post("/sign-in", controller.signIn);
  router.post("/sign-up", controller.signUp);
  router.delete("/sign-out", controller.signOut);
  router.get("/verify", authMiddleware, controller.verify);

  return router;
}
