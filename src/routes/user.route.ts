import { Router } from "express";

import multer from "multer";

import { UserController } from "@/controllers/user.controller";

import { pictureMiddleware } from "@/middlewares/picture.middleware";

export function generateUserRoutes(): Router {
  const router = Router();
  const upload = multer();
  const controller = new UserController();

  router.patch(
    "/",
    upload.single("picture"),
    pictureMiddleware,
    controller.updateUser,
  );
  router.get("/", controller.getUser);

  return router;
}
