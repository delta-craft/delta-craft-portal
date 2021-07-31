/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTeamSummary
// ====================================================

export interface GetTeamSummary_team_pointSummary_summary {
  __typename: "PointSummary";
  crafting: number | null;
  mining: number | null;
  warfare: number | null;
  journey: number | null;
}

export interface GetTeamSummary_team_pointSummary_ratios {
  __typename: "PointSummary";
  crafting: number | null;
  mining: number | null;
  warfare: number | null;
  journey: number | null;
}

export interface GetTeamSummary_team_pointSummary {
  __typename: "PointSummaryWrapper";
  summary: GetTeamSummary_team_pointSummary_summary | null;
  ratios: GetTeamSummary_team_pointSummary_ratios | null;
}

export interface GetTeamSummary_team {
  __typename: "Team";
  id: string | null;
  pointSummary: GetTeamSummary_team_pointSummary | null;
}

export interface GetTeamSummary {
  team: GetTeamSummary_team | null;
}

export interface GetTeamSummaryVariables {
  teamId: string;
}
