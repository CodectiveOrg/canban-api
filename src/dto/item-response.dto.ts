import { ResponseDto } from "@/dto/response.dto";

import { Item } from "@/entities/item";

export type CreateItemResponseDto = ResponseDto<Item["id"]>;
export type GetItemResponseDto = ResponseDto<Item>;
