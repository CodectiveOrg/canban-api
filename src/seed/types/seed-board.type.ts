import { Board } from "@/entities/board";

import { SeedListType } from "@/seed/types/seed-list.type";

export type SeedBoardType = Pick<Board, "title" | "description" | "color"> & {
  lists: SeedListType[];
};
