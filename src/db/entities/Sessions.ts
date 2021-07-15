import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserConnections } from "./UserConnections";

@Index("sessions_user_connections_id_fk", ["connectionId"], {})
@Entity("sessions", { schema: "customer_199616_master" })
export class Sessions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "connectionId", nullable: true })
  connectionId: number | null;

  @Column("varchar", { name: "ip", nullable: true, length: 20 })
  ip: string | null;

  @Column("datetime", { name: "updated", nullable: true })
  updated: Date | null;

  @Column("tinyint", {
    name: "auth",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  auth: boolean | null;

  @Column("varchar", { name: "code", nullable: true, length: 10 })
  code: string | null;

  @Column("datetime", { name: "auth_request", nullable: true })
  authRequest: Date | null;

  @ManyToOne(
    () => UserConnections,
    (userConnections) => userConnections.sessions,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "connectionId", referencedColumnName: "id" }])
  connection: UserConnections;
}
