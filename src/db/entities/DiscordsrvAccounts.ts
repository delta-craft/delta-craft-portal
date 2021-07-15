import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("accounts_discord_uindex", ["discord"], { unique: true })
@Index("accounts_uuid_uindex", ["uuid"], { unique: true })
@Entity("discordsrv_accounts", { schema: "customer_199616_master" })
export class DiscordsrvAccounts {
  @PrimaryGeneratedColumn({ type: "int", name: "link" })
  link: number;

  @Column("varchar", { name: "discord", unique: true, length: 32 })
  discord: string;

  @Column("varchar", { name: "uuid", unique: true, length: 36 })
  uuid: string;
}
