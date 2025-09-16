import { Router } from "express";

import { container } from "tsyringe";

import multer from "multer";

import { UserController } from "@/controllers/user.controller";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { pictureMiddleware } from "@/middlewares/picture.middleware";

export function generateUserRoutes(): Router {
  const router = Router();
  const upload = multer();
  const controller = container.resolve(UserController);

  router.patch(
    "/",
    authMiddleware,
    upload.single("picture"),
    pictureMiddleware,
    controller.updateUser,
  );
  router.get("/", authMiddleware, controller.getUser);

  return router;
}
