import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("spartan_logs", { schema: "customer_199616_master" })
export class SpartanLogs {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("timestamp", { name: "date", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column("double", { name: "spartan_build", nullable: true, precision: 22 })
  spartanBuild: number | null;

  @Column("varchar", { name: "server_version", nullable: true, length: 7 })
  serverVersion: string | null;

  @Column("double", { name: "server_tps", nullable: true, precision: 22 })
  serverTps: number | null;

  @Column("int", { name: "online_players", nullable: true })
  onlinePlayers: number | null;

  @Column("varchar", { name: "type", nullable: true, length: 32 })
  type: string | null;

  @Column("varchar", { name: "info", nullable: true, length: 512 })
  info: string | null;

  @Column("varchar", { name: "player_uuid", nullable: true, length: 36 })
  playerUuid: string | null;

  @Column("int", { name: "player_x", nullable: true })
  playerX: number | null;

  @Column("int", { name: "player_y", nullable: true })
  playerY: number | null;

  @Column("int", { name: "player_z", nullable: true })
  playerZ: number | null;

  @Column("varchar", { name: "hack_type", nullable: true, length: 32 })
  hackType: string | null;

  @Column("tinyint", { name: "false_positive", nullable: true, width: 1 })
  falsePositive: boolean | null;

  @Column("int", { name: "violation_level", nullable: true })
  violationLevel: number | null;

  @Column("int", { name: "cancel_violation", nullable: true })
  cancelViolation: number | null;

  @Column("tinyint", { name: "silent_check", nullable: true, width: 1 })
  silentCheck: boolean | null;

  @Column("varchar", {
    name: "detection_information",
    nullable: true,
    length: 384,
  })
  detectionInformation: string | null;

  @Column("varchar", { name: "mined_item", nullable: true, length: 32 })
  minedItem: string | null;
}
