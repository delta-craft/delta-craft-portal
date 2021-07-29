/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PointQuery
// ====================================================

export interface PointQuery_point_pointTags {
  __typename: "PointTag";
  id: string | null;
  key: string | null;
  value: string | null;
}

export interface PointQuery_point {
  __typename: "Point";
  id: string | null;
  points: number | null;
  pointType: any | null;
  created: any | null;
  description: string | null;
  pointTags: (PointQuery_point_pointTags | null)[] | null;
}

export interface PointQuery {
  point: PointQuery_point | null;
}

export interface PointQueryVariables {
  id: string;
}
