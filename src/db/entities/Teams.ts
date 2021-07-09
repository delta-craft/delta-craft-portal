import { Column, Entity, OneToMany } from "typeorm";
import { UserConnections } from "./UserConnections";

@Entity("teams", { schema: "customer_199616_master" })
export class Teams {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @Column("varchar", { name: "major_team", nullable: true, length: 50 })
  majorTeam: string | null;

  @Column("varchar", { name: "team_colour_hex", nullable: true, length: 50 })
  teamColourHex: string | null;

  @OneToMany(() => UserConnections, (userConnections) => userConnections.team)
  userConnections: UserConnections[];
}
