import { ILike, Repository } from "typeorm";

import { faker } from "@faker-js/faker";

import { HttpError } from "@/errors/http.error";

import { Board } from "@/entities/board";
import { User } from "@/entities/user";

import { hashPassword } from "@/utils/auth.utils";

export class AuthService {
  public static readonly RANDOM_USER_PASSWORD = "1234";

  private readonly boardRepo: Repository<Board>;
  private readonly userRepo: Repository<User>;

  public constructor() {
    this.boardRepo = dataSource.getRepository(Board);
    this.userRepo = dataSource.getRepository(User);
  }

  public async generateRandomUser(): Promise<User> {
    const allUsers = await this.userRepo.find();
    const allUsernames = new Set(
      allUsers.map((user) => user.username.toLowerCase()),
    );

    let username;
    do {
      username = faker.person.firstName().replaceAll(/[^a-zA-Z0-9_]/g, "");
    } while (allUsernames.has(username.toLowerCase()));

    return this.signUp(username, AuthService.RANDOM_USER_PASSWORD);
  }

  public async signUp(username: string, password: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: [{ username: ILike(username) }],
    });

    if (user) {
      throw new HttpError(409, "Username is already taken.");
    }

    const hashedPassword = await hashPassword(password);
    return await this.userRepo.save({ username, password: hashedPassword });
  }
}
