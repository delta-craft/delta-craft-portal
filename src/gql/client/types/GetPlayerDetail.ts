/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlayerDetail
// ====================================================

export interface GetPlayerDetail_player_team {
  __typename: "Team";
  id: string | null;
  name: string | null;
  majorTeam: string | null;
}

export interface GetPlayerDetail_player_points_pointTags {
  __typename: "PointTag";
  id: string | null;
  key: string | null;
  value: string | null;
}

export interface GetPlayerDetail_player_points {
  __typename: "Point";
  id: string | null;
  points: number | null;
  pointType: any | null;
  created: any | null;
  description: string | null;
  pointTags: (GetPlayerDetail_player_points_pointTags | null)[] | null;
}

export interface GetPlayerDetail_player {
  __typename: "UserConnections";
  id: string | null;
  name: string | null;
  team: GetPlayerDetail_player_team | null;
  points: (GetPlayerDetail_player_points | null)[] | null;
}

export interface GetPlayerDetail {
  player: GetPlayerDetail_player | null;
}

export interface GetPlayerDetailVariables {
  nick: string;
}
