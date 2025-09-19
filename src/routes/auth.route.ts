import { Router } from "express";

import { AuthController } from "@/controllers/auth.controller";

import { authMiddleware } from "@/middlewares/auth.middleware";

export function generateAuthRoutes(): Router {
  const router = Router();
  const controller = new AuthController();

  router.post("/random", controller.generateRandomUser);
  router.post("/sign-up", controller.signUp);
  router.post("/sign-in", controller.signIn);
  router.delete("/sign-out", controller.signOut);
  router.get("/verify", authMiddleware, controller.verify);

  return router;
}
