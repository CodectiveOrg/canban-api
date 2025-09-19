import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from "typeorm";

import { List } from "@/entities/list";

const dueDateTransformer: ValueTransformer = {
  to: (value: string | null) => (value === "" ? null : value),
  from: (value: string | null) => value,
};

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int" })
  public position!: number;

  @Column("text")
  public title!: string;

  @Column("text")
  public description!: string;

  @Column({ type: "date", nullable: true, transformer: dueDateTransformer })
  public dueDate?: string | null;

  @ManyToOne(() => List, (list) => list.items, { onDelete: "CASCADE" })
  public list!: List;

  @CreateDateColumn({ select: false })
  public createdAt!: Date;

  @UpdateDateColumn({ select: false })
  public updatedAt!: Date;
}
