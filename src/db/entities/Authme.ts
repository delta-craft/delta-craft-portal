import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("username", ["username"], { unique: true })
@Entity("authme", { schema: "customer_199616_master" })
export class Authme {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "username", unique: true, length: 255 })
  username: string;

  @Column("varchar", { name: "realname", length: 255 })
  realname: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "ip", nullable: true, length: 40 })
  ip: string | null;

  @Column("bigint", { name: "lastlogin", nullable: true })
  lastlogin: string | null;

  @Column("double", { name: "x", precision: 22, default: () => "'0'" })
  x: number;

  @Column("double", { name: "y", precision: 22, default: () => "'0'" })
  y: number;

  @Column("double", { name: "z", precision: 22, default: () => "'0'" })
  z: number;

  @Column("varchar", { name: "world", length: 255, default: () => "'world'" })
  world: string;

  @Column("bigint", { name: "regdate", default: () => "'0'" })
  regdate: string;

  @Column("varchar", { name: "regip", nullable: true, length: 40 })
  regip: string | null;

  @Column("float", { name: "yaw", nullable: true, precision: 12 })
  yaw: number | null;

  @Column("float", { name: "pitch", nullable: true, precision: 12 })
  pitch: number | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("smallint", { name: "isLogged", default: () => "'0'" })
  isLogged: number;

  @Column("smallint", { name: "hasSession", default: () => "'0'" })
  hasSession: number;

  @Column("varchar", { name: "totp", nullable: true, length: 32 })
  totp: string | null;
}
