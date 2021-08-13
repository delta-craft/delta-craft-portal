/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlayerStats
// ====================================================

export interface PlayerStats_player_stats_mining_data {
  __typename: "CraftingMiningStatData";
  count: number | null;
  material: string | null;
}

export interface PlayerStats_player_stats_mining {
  __typename: "CraftingMiningStat";
  totalPoints: number | null;
  data: (PlayerStats_player_stats_mining_data | null)[] | null;
}

export interface PlayerStats_player_stats_crafting_data {
  __typename: "CraftingMiningStatData";
  count: number | null;
  material: string | null;
}

export interface PlayerStats_player_stats_crafting {
  __typename: "CraftingMiningStat";
  totalPoints: number | null;
  data: (PlayerStats_player_stats_crafting_data | null)[] | null;
}

export interface PlayerStats_player_stats_mob_data {
  __typename: "MobStatData";
  count: number | null;
  entity: string | null;
}

export interface PlayerStats_player_stats_mob {
  __typename: "MobStat";
  totalPoints: number | null;
  data: (PlayerStats_player_stats_mob_data | null)[] | null;
}

export interface PlayerStats_player_stats {
  __typename: "Stats";
  mining: PlayerStats_player_stats_mining | null;
  crafting: PlayerStats_player_stats_crafting | null;
  mob: PlayerStats_player_stats_mob | null;
}

export interface PlayerStats_player {
  __typename: "UserConnections";
  stats: PlayerStats_player_stats | null;
}

export interface PlayerStats {
  player: PlayerStats_player | null;
}

export interface PlayerStatsVariables {
  playerNickname: string;
}
