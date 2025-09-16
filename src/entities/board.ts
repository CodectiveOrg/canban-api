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

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column("text")
  public title!: string;

  @Column("text")
  public description!: string;

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
