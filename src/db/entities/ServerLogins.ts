import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserConnections } from "./UserConnections";

@Index("server_logins_user_connections_id_fk", ["connectionId"], {})
@Entity("server_logins", { schema: "customer_199616_master" })
export class ServerLogins {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "connection_id", nullable: true })
  connectionId: number | null;

  @Column("datetime", { name: "connected_on", nullable: true })
  connectedOn: Date | null;

  @Column("varchar", { name: "ip", nullable: true, length: 50 })
  ip: string | null;

  @ManyToOne(
    () => UserConnections,
    (userConnections) => userConnections.serverLogins,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "connection_id", referencedColumnName: "id" }])
  connection: UserConnections;
}
