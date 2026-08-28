import { ResponseDto } from "@/dto/response.dto";

import { User } from "@/entities/user";

export type GenerateRandomUserResponseDto = ResponseDto<
  Pick<User, "username" | "password">
>;
