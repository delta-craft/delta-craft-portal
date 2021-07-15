import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("consents", { schema: "customer_199616_master" })
export class Consents {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "content", nullable: true, length: 2500 })
  content: string | null;

  @Column("datetime", { name: "created", nullable: true })
  created: Date | null;

  @Column("varchar", { name: "title", nullable: true, length: 50 })
  title: string | null;
}
