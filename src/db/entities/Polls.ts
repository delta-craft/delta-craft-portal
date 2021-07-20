import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PollOptions } from "./PollOptions";

@Entity("polls", { schema: "customer_199616_master" })
export class Polls {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", nullable: true, length: 50 })
  title: string | null;

  @Column("tinyint", { name: "only_one", nullable: true, width: 1 })
  onlyOne: boolean | null;

  @OneToMany(() => PollOptions, (pollOptions) => pollOptions.poll)
  pollOptions: PollOptions[];
}
