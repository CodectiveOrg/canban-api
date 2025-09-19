import { Response } from "express";

import { ILike } from "typeorm";

import { User } from "@/entities/user";

import { PasswordlessUser } from "@/types/passwordless-user.type";

export async function fetchUserFromToken(
  res: Response,
): Promise<PasswordlessUser> {
  const userRepo = dataSource.getRepository(User);

  const { username } = res.locals.user;

  const user = await userRepo.findOne({ where: { username: ILike(username) } });

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}

// NOTE: Since some columns aren't selected by default,
//       the easiest way to select all columns is to use this method.
export async function selectUserWithPassword(
  username: string,
): Promise<User | null> {
  const userRepo = dataSource.getRepository(User);

  const columns = userRepo.metadata.columns.map(
    (column) => `user.${column.propertyName}`,
  );

  return userRepo
    .createQueryBuilder("user")
    .select(columns)
    .where({ username: ILike(username) })
    .getOne();
}
