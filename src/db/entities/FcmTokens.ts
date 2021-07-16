import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserConnections } from "./UserConnections";

@Index("fcm_tokens_user_connections_id_fk", ["connectionId"], {})
@Entity("fcm_tokens", { schema: "customer_199616_master" })
export class FcmTokens {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "connectionId", nullable: true })
  connectionId: number | null;

  @Column("varchar", { name: "token", nullable: true, length: 255 })
  token: string | null;

  @Column("datetime", { name: "updated", nullable: true })
  updated: Date | null;

  @ManyToOne(
    () => UserConnections,
    (userConnections) => userConnections.fcmTokens,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "connectionId", referencedColumnName: "id" }])
  connection: UserConnections;
}
