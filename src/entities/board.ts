import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { List } from "@/entities/list";
import { User } from "@/entities/user";

import { BOARD_COLORS, BoardColor } from "@/types/board-color.type";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column("text")
  public title!: string;

  @Column("text")
  public description!: string;

  @Column({
    type: "enum",
    enum: BOARD_COLORS,
    default: BOARD_COLORS[0],
  })
  public color!: BoardColor;

  @ManyToOne(() => User, (user) => user.boards, { onDelete: "CASCADE" })
  public user!: User;

  @OneToMany(() => List, (list) => list.board, {
    cascade: true,
    onDelete: "CASCADE",
  })
  public lists!: List[];

  @CreateDateColumn({ select: false })
  public createdAt!: Date;

  @UpdateDateColumn({ select: false })
  public updatedAt!: Date;
}
