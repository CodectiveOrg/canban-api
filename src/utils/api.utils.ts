import { Response } from "express";

import { Like, Repository } from "typeorm";

import { User } from "@/entities/user";

import { PasswordlessUser } from "@/types/passwordless-user.type";

export async function fetchUserFromToken(
  res: Response,
  userRepo: Repository<User>,
): Promise<PasswordlessUser> {
  const { username } = res.locals.user;

  const user = await userRepo.findOne({ where: { username: Like(username) } });

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}

export async function selectUserWithPassword(
  userRepo: Repository<User>,
  username: string,
): Promise<User | null> {
  const columns = userRepo.metadata.columns.map(
    (column) => `user.${column.propertyName}`,
  );

  return userRepo
    .createQueryBuilder("user")
    .select(columns)
    .where({ username: Like(username) })
    .getOne();
}
