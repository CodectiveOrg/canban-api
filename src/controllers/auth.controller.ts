import { Request, Response } from "express";

import { z } from "zod";

import { HttpError } from "@/errors/http.error";

import {
  AuthVerifyResponseDto,
  GenerateRandomUserResponseDto,
} from "@/dto/auth-response.dto";
import { ResponseDto } from "@/dto/response.dto";

import { AuthService } from "@/services/auth.service";

import { selectUserWithPassword } from "@/utils/api.utils";
import { comparePasswords, generateToken } from "@/utils/auth.utils";
import { mapToTokenPayload } from "@/utils/mapper.utils";

import { PasswordSchema } from "@/validation/schemas/password.schema";
import { UsernameSchema } from "@/validation/schemas/username.schema";

export class AuthController {
  private authService!: AuthService;

  public constructor() {
    this.authService = new AuthService();

    this.generateRandomUser = this.generateRandomUser.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.verify = this.verify.bind(this);
  }

  public async generateRandomUser(
    _: Request,
    res: Response<GenerateRandomUserResponseDto>,
  ): Promise<void> {
    const createdUser = await this.authService.generateRandomUser();

    generateToken(res, mapToTokenPayload(createdUser));

    res.status(201).json({
      message: "Signed up successfully.",
      result: {
        username: createdUser.username,
        password: AuthService.RANDOM_USER_PASSWORD,
      },
    });
  }

  public async signUp(req: Request, res: Response<ResponseDto>): Promise<void> {
    const body = SignUpBodySchema.parse(req.body);

    const createdUser = await this.authService.signUp(
      body.username,
      body.password,
    );

    generateToken(res, mapToTokenPayload(createdUser));

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
