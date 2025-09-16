import { ResponseDto } from "@/dto/response.dto";

import { PasswordlessUser } from "@/types/passwordless-user.type";

export type GetUserResponseDto = ResponseDto<PasswordlessUser>;
