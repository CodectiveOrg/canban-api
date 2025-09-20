import { Response } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { TokenPayloadType } from "@/types/token-payload.type";

const TOKEN_LIFETIME_IN_DAYS = 3;

export function generateToken(res: Response, payload: TokenPayloadType): void {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
    expiresIn: `${TOKEN_LIFETIME_IN_DAYS}d`,
  });

  res.cookie(process.env.TOKEN_KEY!, token, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: TOKEN_LIFETIME_IN_DAYS * 24 * 3600 * 1000,
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

export async function comparePasswords(
  password: string,
  hashed: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashed);
}
