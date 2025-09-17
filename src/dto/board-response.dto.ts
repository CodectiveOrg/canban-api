import { ResponseDto } from "@/dto/response.dto";

import { Board } from "@/entities/board";

export type GetAllBoardsResponseDto = ResponseDto<Board[]>;
export type CreateBoardResponseDto = ResponseDto<Board["id"]>;
export type GetBoardResponseDto = ResponseDto<Board>;
