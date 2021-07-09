/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetConsents
// ====================================================

export interface GetConsents_consents {
  __typename: "Consent";
  id: string | null;
  title: string | null;
  created: any | null;
  content: string | null;
}

export interface GetConsents_getUser_userConnections {
  __typename: "UserConnections";
  id: string | null;
  consent: any | null;
}

export interface GetConsents_getUser {
  __typename: "User";
  id: string | null;
  userConnections: (GetConsents_getUser_userConnections | null)[] | null;
}

export interface GetConsents {
  consents: (GetConsents_consents | null)[] | null;
  getUser: GetConsents_getUser | null;
}
