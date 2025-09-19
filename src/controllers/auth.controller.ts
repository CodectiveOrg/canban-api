import { Request, Response } from "express";

import { ILike, Repository } from "typeorm";

import { z } from "zod";

import { HttpError } from "@/errors/http.error";

import { AuthVerifyResponseDto } from "@/dto/auth-response.dto";
import { ResponseDto } from "@/dto/response.dto";

import { User } from "@/entities/user";

import { selectUserWithPassword } from "@/utils/api.utils";
import {
  comparePasswords,
  generateToken,
  hashPassword,
} from "@/utils/auth.utils";
import { mapToTokenPayload } from "@/utils/mapper.utils";

import { PasswordSchema } from "@/validation/schemas/password.schema";
import { UsernameSchema } from "@/validation/schemas/username.schema";

export class AuthController {
  private readonly userRepo: Repository<User>;

  public constructor() {
    this.userRepo = dataSource.getRepository(User);

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.verify = this.verify.bind(this);
  }

  public async signUp(req: Request, res: Response<ResponseDto>): Promise<void> {
    const body = SignUpBodySchema.parse(req.body);
    const { username, password } = body;

    const user = await this.userRepo.findOne({
      where: [{ username: ILike(username) }],
    });

    if (user) {
      throw new HttpError(409, "Username is already taken.");
    }

    const hashedPassword = await hashPassword(password);
    const savedUser = await this.userRepo.save({
      ...body,
      password: hashedPassword,
    });

    generateToken(res, mapToTokenPayload(savedUser));

    res.status(201).json({ message: "Signed up successfully." });
  }

  public async signIn(req: Request, res: Response<ResponseDto>): Promise<void> {
    const body = SignInBodySchema.parse(req.body);
    const { username, password } = body;

    const user = await selectUserWithPassword(username);

    if (!user) {
      throw new HttpError(401, "Username or password is incorrect.");
    }

    const isPasswordCorrect = await comparePasswords(password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpError(401, "Username or password is incorrect.");
    }

    generateToken(res, mapToTokenPayload(user));

    res.json({ message: "Signed in successfully." });
  }

  public async signOut(_: Request, res: Response<ResponseDto>): Promise<void> {
    res.clearCookie(process.env.TOKEN_KEY!);

    res.json({ message: "Signed out successfully." });
  }

  public async verify(
    _: Request,
    res: Response<AuthVerifyResponseDto>,
  ): Promise<void> {
    const { user } = res.locals;

    if (!user) {
      throw new HttpError(401);
    }

    res.json({ message: "Token is valid.", result: user });
  }
}

const SignUpBodySchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});

const SignInBodySchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});
