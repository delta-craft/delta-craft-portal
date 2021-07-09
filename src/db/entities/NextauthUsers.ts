import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserConnections } from "./UserConnections";

@Index("IDX_5b6d5b934c6a84a2aded1e1bb1", ["email"], { unique: true })
@Entity("nextauth_users", { schema: "customer_199616_master" })
export class NextauthUsers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("varchar", {
    name: "email",
    nullable: true,
    unique: true,
    length: 255,
  })
  email: string | null;

  @Column("timestamp", { name: "email_verified", nullable: true })
  emailVerified: Date | null;

  @Column("varchar", { name: "image", nullable: true, length: 255 })
  image: string | null;

  @Column("timestamp", {
    name: "created_at",
    default: () => "'current_timestamp(6)'",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "'current_timestamp(6)'",
  })
  updatedAt: Date;

  @OneToMany(() => UserConnections, (userConnections) => userConnections.next)
  userConnections: UserConnections[];
}
