import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IDX_045ebf9da6d8b4f751dc8567dc", ["sessionToken"], { unique: true })
@Index("IDX_2b0951cddb28a9c7958bcb791c", ["accessToken"], { unique: true })
@Entity("nextauth_sessions", { schema: "customer_199616_master" })
export class NextauthSessions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("timestamp", {
    name: "expires",
    default: () => "'current_timestamp(6)'",
  })
  expires: Date;

  @Column("varchar", { name: "session_token", unique: true, length: 255 })
  sessionToken: string;

  @Column("varchar", { name: "access_token", unique: true, length: 255 })
  accessToken: string;

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
}
