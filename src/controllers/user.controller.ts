import { Request, Response } from "express";

import { Repository } from "typeorm";

import { z } from "zod";

import { HttpError } from "@/errors/http.error";

import { ResponseDto } from "@/dto/response.dto";
import { GetUserResponseDto } from "@/dto/user-response.dto";

import { User } from "@/entities/user";

import { FileService } from "@/services/file.service";

import { fetchUserFromToken, selectUserWithPassword } from "@/utils/api.utils";
import { comparePasswords, hashPassword } from "@/utils/auth.utils";
import { assignDefinedValues } from "@/utils/object.utils";

import { EmailSchema } from "@/validation/schemas/email.schema";
import { PasswordSchema } from "@/validation/schemas/password.schema";
import { UsernameSchema } from "@/validation/schemas/username.schema";

export class UserController {
  private readonly fileService: FileService;

  private readonly userRepo: Repository<User>;

  public constructor() {
    this.fileService = new FileService("user");

    this.userRepo = dataSource.getRepository(User);

    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  public async getUser(
    _: Request,
    res: Response<GetUserResponseDto>,
  ): Promise<void> {
    const user = await fetchUserFromToken(res);

    if (!user) {
      throw new HttpError(404, "User not found.");
    }

    res.json({
      message: "User fetched successfully.",
      result: user,
    });
  }

  public async updateUser(
    req: Request,
    res: Response<ResponseDto>,
  ): Promise<void> {
    const body = UpdateBodySchema.parse(req.body);
    const user = (await selectUserWithPassword(res.locals.user.username))!;

    const values: typeof body & { password?: string } = {
      ...body,
      password: undefined,
    };

    if (values.newPassword) {
      const isPasswordCorrect = await comparePasswords(
        values.currentPassword ?? "",
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new HttpError(401, "Current password is incorrect.");
      }

      values.password = await hashPassword(values.newPassword);
    }

    const updatedUser = assignDefinedValues(user, values);

    if (req.file) {
      await this.fileService.remove(user.picture);
      updatedUser.picture = await this.fileService.save(req.file);
    }

    await this.userRepo.save(updatedUser);

    res.json({ message: "Profile updated successfully." });
  }
}

const UpdateBodySchema = z.object({
  username: UsernameSchema.optional(),
  email: EmailSchema.optional(),
  currentPassword: z.string().optional(),
  newPassword: PasswordSchema.optional(),
});
