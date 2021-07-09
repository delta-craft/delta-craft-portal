import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IDX_24001c8e87581b322780af85b6", ["compoundId"], { unique: true })
@Index("userId", ["userId"], {})
@Index("providerId", ["providerId"], {})
@Index("providerAccountId", ["providerAccountId"], {})
@Entity("nextauth_accounts", { schema: "customer_199616_master" })
export class NextauthAccounts {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "compound_id", unique: true, length: 255 })
  compoundId: string;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "provider_type", length: 255 })
  providerType: string;

  @Column("varchar", { name: "provider_id", length: 255 })
  providerId: string;

  @Column("varchar", { name: "provider_account_id", length: 255 })
  providerAccountId: string;

  @Column("text", { name: "refresh_token", nullable: true })
  refreshToken: string | null;

  @Column("text", { name: "access_token", nullable: true })
  accessToken: string | null;

  @Column("timestamp", { name: "access_token_expires", nullable: true })
  accessTokenExpires: Date | null;

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
