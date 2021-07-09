/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNickname
// ====================================================

export interface GetNickname_getUser_userConnections {
  __typename: "UserConnections";
  id: string | null;
  name: string | null;
}

export interface GetNickname_getUser {
  __typename: "User";
  id: string | null;
  userConnections: (GetNickname_getUser_userConnections | null)[] | null;
}

export interface GetNickname {
  getUser: GetNickname_getUser | null;
}
