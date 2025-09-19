import { RequestHandler } from "express";

import jwt from "jsonwebtoken";

import { HttpError } from "@/errors/http.error";

import { TokenPayloadType } from "@/types/token-payload.type";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.cookies[process.env.TOKEN_KEY!];

  try {
    res.locals.user = jwt.verify(
      token,
      process.env.TOKEN_SECRET!,
    ) as TokenPayloadType;

    next();
  } catch {
    res.clearCookie(process.env.TOKEN_KEY!);
    throw new HttpError(401);
  }
};
