import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PointTags } from "./PointTags";
import { UserConnections } from "./UserConnections";

@Index("points_user_connections_id_fk", ["userId"], {})
@Entity("points", { schema: "customer_199616_master" })
export class Points {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "points" })
  points: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "point_type" })
  pointType: number;

  @Column("varchar", { name: "description", nullable: true, length: 250 })
  description: string | null;

  @Column("datetime", { name: "created" })
  created: Date;

  @OneToMany(() => PointTags, (pointTags) => pointTags.point)
  pointTags: PointTags[];

  @ManyToOne(
    () => UserConnections,
    (userConnections) => userConnections.points,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: UserConnections;
}
