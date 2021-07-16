/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlayers
// ====================================================

export interface GetPlayers_players_team {
  __typename: "Team";
  id: string | null;
  name: string | null;
  majorTeam: string | null;
}

export interface GetPlayers_players_pointSummary_ratios {
  __typename: "PointSummary";
  crafting: number | null;
  mining: number | null;
  journey: number | null;
  warfare: number | null;
}

export interface GetPlayers_players_pointSummary_summary {
  __typename: "PointSummary";
  crafting: number | null;
  mining: number | null;
  journey: number | null;
  warfare: number | null;
}

export interface GetPlayers_players_pointSummary {
  __typename: "PointSummaryWrapper";
  ratios: GetPlayers_players_pointSummary_ratios | null;
  summary: GetPlayers_players_pointSummary_summary | null;
}

export interface GetPlayers_players {
  __typename: "UserConnections";
  id: string | null;
  name: string | null;
  team: GetPlayers_players_team | null;
  pointSummary: GetPlayers_players_pointSummary | null;
}

export interface GetPlayers {
  players: (GetPlayers_players | null)[] | null;
}
