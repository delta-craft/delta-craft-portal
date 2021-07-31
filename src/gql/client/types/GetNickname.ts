/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNickname
// ====================================================

export interface GetNickname_user_userConnection {
  __typename: "UserConnections";
  id: string | null;
  name: string | null;
}

export interface GetNickname_user {
  __typename: "User";
  id: string | null;
  userConnection: GetNickname_user_userConnection | null;
}

export interface GetNickname {
  user: GetNickname_user | null;
}
