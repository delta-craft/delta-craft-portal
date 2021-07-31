/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MajorTeamsSumarry
// ====================================================

export interface MajorTeamsSumarry_majorTeamsSummary_blue_summary {
  __typename: "PointSummary";
  crafting: number | null;
  mining: number | null;
  warfare: number | null;
  journey: number | null;
}

export interface MajorTeamsSumarry_majorTeamsSummary_blue {
  __typename: "PointSummaryWrapper";
  summary: MajorTeamsSumarry_majorTeamsSummary_blue_summary | null;
}

export interface MajorTeamsSumarry_majorTeamsSummary_red_summary {
  __typename: "PointSummary";
  crafting: number | null;
  mining: number | null;
  warfare: number | null;
  journey: number | null;
}

export interface MajorTeamsSumarry_majorTeamsSummary_red {
  __typename: "PointSummaryWrapper";
  summary: MajorTeamsSumarry_majorTeamsSummary_red_summary | null;
}

export interface MajorTeamsSumarry_majorTeamsSummary {
  __typename: "PointSummaryMajor";
  blue: MajorTeamsSumarry_majorTeamsSummary_blue | null;
  red: MajorTeamsSumarry_majorTeamsSummary_red | null;
}

export interface MajorTeamsSumarry {
  majorTeamsSummary: MajorTeamsSumarry_majorTeamsSummary | null;
}
