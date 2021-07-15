/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLoginSession
// ====================================================

export interface GetLoginSession_loginSession {
  __typename: "LoginSession";
  id: string | null;
  ip: string | null;
  auth: boolean | null;
  authRequest: any | null;
  updated: any | null;
}

export interface GetLoginSession {
  loginSession: GetLoginSession_loginSession | null;
}
