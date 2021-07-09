import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Points } from "./Points";

@Index("FK_point_tags_points", ["pointId"], {})
@Entity("point_tags", { schema: "customer_199616_master" })
export class PointTags {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "point_id" })
  pointId: number;

  @Column("varchar", { name: "key", length: 200, default: () => "''" })
  key: string;

  @Column("varchar", { name: "value", length: 200, default: () => "''" })
  value: string;

  @ManyToOne(() => Points, (points) => points.pointTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "point_id", referencedColumnName: "id" }])
  point: Points;
}
