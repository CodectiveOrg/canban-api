import { Response } from "express";

import { ILike } from "typeorm";

import { HttpError } from "@/errors/http.error";

import { User } from "@/entities/user";

import { PasswordlessUser } from "@/types/passwordless-user.type";

export async function fetchUserFromToken(
  res: Response,
): Promise<PasswordlessUser> {
  const userRepo = dataSource.getRepository(User);

  const { id } = res.locals.user;

  const user = await userRepo.findOne({ where: { id } });

  if (!user) {
    throw new HttpError(404, "User not found.");
  }

  return user;
}

// NOTE: Since some columns aren't selected by default,
//       the easiest way to select all columns is to use this method.
export async function selectUserWithPassword(
  fields: { id: number } | { username: string },
): Promise<User | null> {
  const userRepo = dataSource.getRepository(User);

  const columns = userRepo.metadata.columns.map(
    (column) => `user.${column.propertyName}`,
  );

  const qb = userRepo.createQueryBuilder("user").select(columns);

  if ("id" in fields) {
    qb.where({ id: fields.id });
  } else {
    qb.where({ username: ILike(fields.username) });
  }

  return qb.getOne();
}
