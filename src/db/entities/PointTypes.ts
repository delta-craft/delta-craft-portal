import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("point_types", { schema: "customer_199616_master" })
export class PointTypes {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", nullable: true, length: 50 })
  title: string | null;
}
