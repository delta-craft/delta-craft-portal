/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTeam
// ====================================================

export interface GetTeam_getTeam_userConnections_next {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface GetTeam_getTeam_userConnections {
  __typename: "UserConnections";
  id: string | null;
  name: string | null;
  next: GetTeam_getTeam_userConnections_next | null;
}

export interface GetTeam_getTeam {
  __typename: "Team";
  id: string | null;
  teamColourHex: string | null;
  name: string | null;
  majorTeam: string | null;
  userConnections: (GetTeam_getTeam_userConnections | null)[] | null;
}

export interface GetTeam {
  getTeam: GetTeam_getTeam | null;
}

export interface GetTeamVariables {
  id: string;
}
