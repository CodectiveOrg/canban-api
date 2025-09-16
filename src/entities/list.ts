import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Board } from "@/entities/board";
import { Item } from "@/entities/item";

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int" })
  public position!: number;

  @Column("text")
  public title!: string;

  @Column("text")
  public description!: string;

  @ManyToOne(() => Board, (board) => board.lists, { onDelete: "CASCADE" })
  public board!: Board;

  @OneToMany(() => Item, (item) => item.list, {
    cascade: true,
    onDelete: "CASCADE",
  })
  public items!: Item[];

  @CreateDateColumn({ select: false })
  public createdAt!: Date;

  @UpdateDateColumn({ select: false })
  public updatedAt!: Date;
}
