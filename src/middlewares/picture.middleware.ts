import { RequestHandler } from "express";

import { fileTypeFromBuffer } from "file-type";

import { HttpError } from "@/errors/http.error";

const MAX_SIZE_MEGABYTE = 3;
const MAX_SIZE_BYTE = MAX_SIZE_MEGABYTE * 1024 * 1024;

const VALID_MIME = ["image/jpeg", "image/png", "image/webp"];
const VALID_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

export const pictureMiddleware: RequestHandler = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  if (req.file.size > MAX_SIZE_BYTE) {
    throw new HttpError(
      413,
      `The file size should not exceed ${MAX_SIZE_MEGABYTE}MB.`,
    );
  }

  if (!(await hasValidFileType(req.file))) {
    throw new HttpError(415, "Please upload a valid jpg, png or webp image.");
  }

  next();
};

export const hasValidFileType = async (
  file: Express.Multer.File,
): Promise<boolean> => {
  const extension = file.originalname.split(".").pop();
  if (!extension || !VALID_EXTENSIONS.includes(extension)) {
    return false;
  }

  try {
    const fileType = await fileTypeFromBuffer(file.buffer);
    return !!fileType && VALID_MIME.includes(fileType.mime);
  } catch {
    return false;
  }
};
