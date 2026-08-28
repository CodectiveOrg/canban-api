import { Board } from "@/entities/board";
import { Item } from "@/entities/item";
import { List } from "@/entities/list";

import { TokenPayloadType } from "@/types/token-payload.type";

declare global {
  namespace Express {
    interface Locals {
      user: TokenPayloadType;
      board: Board;
      list: List;
      item: Item;
    }
  }
}

export {};
