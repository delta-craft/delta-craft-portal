/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlayerDetailNoPoints
// ====================================================

export interface GetPlayerDetailNoPoints_player_team {
  __typename: "Team";
  id: string | null;
  name: string | null;
  majorTeam: string | null;
}

export interface GetPlayerDetailNoPoints_player {
  __typename: "UserConnections";
  id: string | null;
  name: string | null;
  team: GetPlayerDetailNoPoints_player_team | null;
}

export interface GetPlayerDetailNoPoints {
  player: GetPlayerDetailNoPoints_player | null;
}

export interface GetPlayerDetailNoPointsVariables {
  nick: string;
}
