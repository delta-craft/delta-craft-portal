import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NextauthUsers } from "./NextauthUsers";
import { Teams } from "./Teams";
import { Points } from "./Points";

@Index("uid", ["uid"], { unique: true })
@Index("FK_user_connections_nextauth_users", ["nextId"], {})
@Index("FK_user_connections_teams", ["teamId"], {})
@Entity("user_connections", { schema: "customer_199616_master" })
export class UserConnections {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "next_id", nullable: true })
  nextId: number | null;

  @Column("int", { name: "team_id", nullable: true })
  teamId: number | null;

  @Column("varchar", { name: "uid", nullable: true, unique: true, length: 36 })
  uid: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 70 })
  name: string | null;

  @Column("datetime", { name: "consent", nullable: true })
  consent: Date | null;

  @ManyToOne(
    () => NextauthUsers,
    (nextauthUsers) => nextauthUsers.userConnections,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "next_id", referencedColumnName: "id" }])
  next: NextauthUsers;

  @ManyToOne(() => Teams, (teams) => teams.userConnections, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "team_id", referencedColumnName: "id" }])
  team: Teams;

  @OneToMany(() => Points, (points) => points.user)
  points: Points[];
}