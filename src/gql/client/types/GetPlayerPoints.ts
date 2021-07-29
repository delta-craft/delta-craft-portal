/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlayerPoints
// ====================================================

export interface GetPlayerPoints_player_points {
  __typename: "Point";
  id: string | null;
  points: number | null;
  pointType: any | null;
  created: any | null;
  description: string | null;
}

export interface GetPlayerPoints_player {
  __typename: "UserConnections";
  id: string | null;
  points: (GetPlayerPoints_player_points | null)[] | null;
}

export interface GetPlayerPoints {
  player: GetPlayerPoints_player | null;
}

export interface GetPlayerPointsVariables {
  nick: string;
}
