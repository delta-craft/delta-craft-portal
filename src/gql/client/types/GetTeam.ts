/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTeam
// ====================================================

export interface GetTeam_team_userConnections_next {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface GetTeam_team_userConnections {
  __typename: "UserConnections";
  id: string | null;
  name: string | null;
  next: GetTeam_team_userConnections_next | null;
}

export interface GetTeam_team {
  __typename: "Team";
  id: string | null;
  teamColourHex: string | null;
  name: string | null;
  majorTeam: string | null;
  userConnections: (GetTeam_team_userConnections | null)[] | null;
}

export interface GetTeam {
  team: GetTeam_team | null;
}

export interface GetTeamVariables {
  id: string;
}
