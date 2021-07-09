/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTeams
// ====================================================

export interface GetTeams_getTeams_userConnections_next {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface GetTeams_getTeams_userConnections {
  __typename: "UserConnections";
  id: string | null;
  name: string | null;
  next: GetTeams_getTeams_userConnections_next | null;
}

export interface GetTeams_getTeams {
  __typename: "Team";
  id: string | null;
  name: string | null;
  teamColourHex: string | null;
  majorTeam: string | null;
  userConnections: (GetTeams_getTeams_userConnections | null)[] | null;
}

export interface GetTeams {
  getTeams: (GetTeams_getTeams | null)[] | null;
}
