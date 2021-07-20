import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PollOptions } from "./PollOptions";
import { UserConnections } from "./UserConnections";

@Index("poll_votes_poll_options_id_fk", ["pollOptionId"], {})
@Index("poll_votes_user_connections_id_fk", ["connectionId"], {})
@Entity("poll_votes", { schema: "customer_199616_master" })
export class PollVotes {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "poll_option_id", nullable: true })
  pollOptionId: number | null;

  @Column("int", { name: "connection_id", nullable: true })
  connectionId: number | null;

  @Column("tinyint", { name: "voted", nullable: true, width: 1 })
  voted: boolean | null;

  @Column("datetime", { name: "voted_on", nullable: true })
  votedOn: Date | null;

  @ManyToOne(() => PollOptions, (pollOptions) => pollOptions.pollVotes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "poll_option_id", referencedColumnName: "id" }])
  pollOption: PollOptions;

  @ManyToOne(
    () => UserConnections,
    (userConnections) => userConnections.pollVotes,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "connection_id", referencedColumnName: "id" }])
  connection: UserConnections;
}
