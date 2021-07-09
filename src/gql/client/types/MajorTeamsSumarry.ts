/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MajorTeamsSumarry
// ====================================================

export interface MajorTeamsSumarry_getMajorTeamsSummary_blue_summary {
  __typename: "PointSummary";
  crafting: number | null;
  mining: number | null;
  warfare: number | null;
  journey: number | null;
}

export interface MajorTeamsSumarry_getMajorTeamsSummary_blue {
  __typename: "PointSummaryWrapper";
  summary: MajorTeamsSumarry_getMajorTeamsSummary_blue_summary | null;
}

export interface MajorTeamsSumarry_getMajorTeamsSummary_red_summary {
  __typename: "PointSummary";
  crafting: number | null;
  mining: number | null;
  warfare: number | null;
  journey: number | null;
}

export interface MajorTeamsSumarry_getMajorTeamsSummary_red {
  __typename: "PointSummaryWrapper";
  summary: MajorTeamsSumarry_getMajorTeamsSummary_red_summary | null;
}

export interface MajorTeamsSumarry_getMajorTeamsSummary {
  __typename: "PointSummaryMajor";
  blue: MajorTeamsSumarry_getMajorTeamsSummary_blue | null;
  red: MajorTeamsSumarry_getMajorTeamsSummary_red | null;
}

export interface MajorTeamsSumarry {
  getMajorTeamsSummary: MajorTeamsSumarry_getMajorTeamsSummary | null;
}
