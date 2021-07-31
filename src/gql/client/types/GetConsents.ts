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

export interface GetConsents_user_userConnection {
  __typename: "UserConnections";
  id: string | null;
  consent: any | null;
}

export interface GetConsents_user {
  __typename: "User";
  id: string | null;
  userConnection: GetConsents_user_userConnection | null;
}

export interface GetConsents {
  consents: (GetConsents_consents | null)[] | null;
  user: GetConsents_user | null;
}
