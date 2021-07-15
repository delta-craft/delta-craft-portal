import { Column, Entity, Index } from "typeorm";

@Index("codes_uuid_uindex", ["uuid"], { unique: true })
@Entity("discordsrv_codes", { schema: "customer_199616_master" })
export class DiscordsrvCodes {
  @Column("char", { primary: true, name: "code", length: 4 })
  code: string;

  @Column("varchar", { name: "uuid", unique: true, length: 36 })
  uuid: string;

  @Column("bigint", { name: "expiration" })
  expiration: string;
}
