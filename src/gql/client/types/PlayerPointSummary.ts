/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlayerPointSummary
// ====================================================

export interface PlayerPointSummary_getPlayerPointSummary_summary {
  __typename: "PointSummary";
  crafting: number | null;
  mining: number | null;
  journey: number | null;
  warfare: number | null;
}

export interface PlayerPointSummary_getPlayerPointSummary {
  __typename: "PointSummaryWrapper";
  summary: PlayerPointSummary_getPlayerPointSummary_summary | null;
}

export interface PlayerPointSummary {
  getPlayerPointSummary: PlayerPointSummary_getPlayerPointSummary | null;
}

export interface PlayerPointSummaryVariables {
  ucId: string;
}
