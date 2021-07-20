import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserConnections } from "./UserConnections";

@Index("teams_team_join_code_uindex", ["teamJoinCode"], { unique: true })
@Index("teams_user_connections_id_fk", ["ownerConnId"], {})
@Entity("teams", { schema: "customer_199616_master" })
export class Teams {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 25 })
  name: string | null;

  @Column("varchar", { name: "major_team", nullable: true, length: 50 })
  majorTeam: string | null;

  @Column("varchar", { name: "team_colour_hex", nullable: true, length: 50 })
  teamColourHex: string | null;

  @Column("int", { name: "owner_conn_id", nullable: true })
  ownerConnId: number | null;

  @Column("varchar", {
    name: "team_join_code",
    nullable: true,
    unique: true,
    length: 20,
  })
  teamJoinCode: string | null;

  @OneToMany(() => UserConnections, (userConnections) => userConnections.team)
  userConnections: UserConnections[];

  @ManyToOne(
    () => UserConnections,
    (userConnections) => userConnections.teams,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "owner_conn_id", referencedColumnName: "id" }])
  ownerConn: UserConnections;
}
