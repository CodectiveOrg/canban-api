import { ResponseDto } from "@/dto/response.dto";

import { List } from "@/entities/list";

export type CreateListResponseDto = ResponseDto<List["id"]>;
export type GetListResponseDto = ResponseDto<List>;
