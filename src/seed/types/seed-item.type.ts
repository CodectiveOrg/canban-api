import { Item } from "@/entities/item";

export type SeedItemType = Pick<Item, "title" | "description" | "dueDate">;
