/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTeamSummary
// ====================================================

export interface GetTeamSummary_getTeamPointSummary_summary {
  __typename: "PointSummary";
  crafting: number | null;
  mining: number | null;
  warfare: number | null;
  journey: number | null;
}

export interface GetTeamSummary_getTeamPointSummary_ratios {
  __typename: "PointSummary";
  crafting: number | null;
  mining: number | null;
  warfare: number | null;
  journey: number | null;
}

export interface GetTeamSummary_getTeamPointSummary {
  __typename: "PointSummaryWrapper";
  summary: GetTeamSummary_getTeamPointSummary_summary | null;
  ratios: GetTeamSummary_getTeamPointSummary_ratios | null;
}

export interface GetTeamSummary {
  getTeamPointSummary: GetTeamSummary_getTeamPointSummary | null;
}

export interface GetTeamSummaryVariables {
  teamId: string;
}
