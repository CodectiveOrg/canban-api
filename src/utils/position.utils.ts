import { EntityTarget } from "typeorm";

import { Item } from "@/entities/item";
import { List } from "@/entities/list";

export async function moveEntities<T extends List | Item>(
  target: EntityTarget<T>,
  active: T,
  over: T,
): Promise<T[]> {
  const repo = dataSource.getRepository(target);

  const entities = await repo
    .createQueryBuilder("entity")
    .where("entity.position BETWEEN :min AND :max", {
      min: Math.min(active.position, over.position),
      max: Math.max(active.position, over.position),
    })
    .getMany();

  for (const entity of entities) {
    if (entity.id === active.id) {
      continue;
    }

    if (entity.position < active.position) {
      entity.position++;
    } else {
      entity.position--;
    }
  }

  active.position = over.position;

  return entities;
}

export async function getMaxPositionAmongLists(
  boardId: number,
): Promise<number> {
  const listRepo = dataSource.getRepository(List);

  const { maxPosition } = await listRepo
    .createQueryBuilder("list")
    .select("MAX(list.position)", "maxPosition")
    .where("list.boardId = :boardId", { boardId })
    .getRawOne();

  return maxPosition;
}
