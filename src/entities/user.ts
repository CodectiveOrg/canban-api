import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Board } from "@/entities/board";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column("text")
  public username!: string;

  @Column("text", { nullable: true })
  public email!: string | null;

  @Column("text", { select: false })
  public password!: string;

  @Column("text", { nullable: true })
  public picture!: string | null;

  @OneToMany(() => Board, (board) => board.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  public boards!: Board[];

  @CreateDateColumn({ select: false })
  public createdAt!: Date;

  @UpdateDateColumn({ select: false })
  public updatedAt!: Date;
}
