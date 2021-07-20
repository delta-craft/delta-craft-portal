import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PollVotes } from "./PollVotes";
import { Polls } from "./Polls";

@Index("poll_options_polls_id_fk", ["pollId"], {})
@Entity("poll_options", { schema: "customer_199616_master" })
export class PollOptions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "poll_id", nullable: true })
  pollId: number | null;

  @Column("varchar", { name: "text", nullable: true, length: 20 })
  text: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 250 })
  description: string | null;

  @Column("varchar", { name: "image", nullable: true, length: 250 })
  image: string | null;

  @OneToMany(() => PollVotes, (pollVotes) => pollVotes.pollOption)
  pollVotes: PollVotes[];

  @ManyToOne(() => Polls, (polls) => polls.pollOptions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "poll_id", referencedColumnName: "id" }])
  poll: Polls;
}
