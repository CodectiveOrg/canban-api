import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column("text")
  public username!: string;

  @Column("text", { nullable: true })
  public email!: string;

  @Column("text", { select: false })
  public password!: string;

  @Column("text", { nullable: true })
  public picture!: string | null;

  @CreateDateColumn({ select: false })
  public createdAt!: Date;

  @UpdateDateColumn({ select: false })
  public updatedAt!: Date;
}
