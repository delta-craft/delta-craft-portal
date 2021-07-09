import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IDX_007bd7607ddfdac81562a7cec3", ["token"], { unique: true })
@Entity("nextauth_verification_requests", { schema: "customer_199616_master" })
export class NextauthVerificationRequests {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "identifier", length: 255 })
  identifier: string;

  @Column("varchar", { name: "token", unique: true, length: 255 })
  token: string;

  @Column("timestamp", {
    name: "expires",
    default: () => "'current_timestamp(6)'",
  })
  expires: Date;

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
