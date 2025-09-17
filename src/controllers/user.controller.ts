import { Request, Response } from "express";

import { Repository } from "typeorm";

import { z } from "zod";

import { EmailSchema } from "@/validation/schemas/email.schema";
import { PasswordSchema } from "@/validation/schemas/password.schema";
import { UsernameSchema } from "@/validation/schemas/username.schema";

import { ResponseDto } from "@/dto/response.dto";
import { GetUserResponseDto } from "@/dto/user-response.dto";

import { User } from "@/entities/user";

import { DatabaseService } from "@/services/database.service";
import { FileService } from "@/services/file.service";

import { fetchUserFromToken } from "@/utils/api.utils";
import { hashPassword } from "@/utils/auth.utils";
import { assignDefinedValues } from "@/utils/object.utils";

export class UserController {
  private readonly fileService: FileService;

  private readonly userRepo: Repository<User>;

  public constructor(databaseService: DatabaseService) {
    this.fileService = new FileService("user");

    this.userRepo = databaseService.dataSource.getRepository(User);

    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  public async getUser(
    _: Request,
    res: Response<GetUserResponseDto>,
  ): Promise<void> {
    const user = await fetchUserFromToken(res, this.userRepo);

    if (!user) {
      res.status(404).json({
        message: "User not found.",
        error: "Not Found",
      });

      return;
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
    const user = await fetchUserFromToken(res, this.userRepo);

    if (body.password) {
      body.password = await hashPassword(body.password);
    } else {
      body.password = undefined;
    }

    const updatedUser = assignDefinedValues(user, body);

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
  password: PasswordSchema.optional(),
});
