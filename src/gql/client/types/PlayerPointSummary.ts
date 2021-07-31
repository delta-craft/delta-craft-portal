/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlayerPointSummary
// ====================================================

export interface PlayerPointSummary_player_pointSummary_summary {
  __typename: "PointSummary";
  crafting: number | null;
  mining: number | null;
  journey: number | null;
  warfare: number | null;
}

export interface PlayerPointSummary_player_pointSummary {
  __typename: "PointSummaryWrapper";
  summary: PlayerPointSummary_player_pointSummary_summary | null;
}

export interface PlayerPointSummary_player {
  __typename: "UserConnections";
  id: string | null;
  pointSummary: PlayerPointSummary_player_pointSummary | null;
}

export interface PlayerPointSummary {
  player: PlayerPointSummary_player | null;
}

export interface PlayerPointSummaryVariables {
  nick: string;
}
