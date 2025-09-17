import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { List } from "@/entities/list";

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

  @Column({ type: "date" })
  public dueDate?: string;

  @ManyToOne(() => List, (list) => list.items, { onDelete: "CASCADE" })
  public list!: List;

  @CreateDateColumn({ select: false })
  public createdAt!: Date;

  @UpdateDateColumn({ select: false })
  public updatedAt!: Date;
}
