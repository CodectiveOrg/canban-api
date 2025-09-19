import { List } from "@/entities/list";

import { SeedItemType } from "@/seed/types/seed-item.type";

export type SeedListType = Pick<List, "title" | "description"> & {
  items: SeedItemType[];
};
