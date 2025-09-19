import { ResponseDto } from "@/dto/response.dto";

import { User } from "@/entities/user";

import { TokenPayloadType } from "@/types/token-payload.type";

export type GenerateRandomUserResponseDto = ResponseDto<
  Pick<User, "username" | "password">
>;

export type AuthVerifyResponseDto = ResponseDto<TokenPayloadType>;
