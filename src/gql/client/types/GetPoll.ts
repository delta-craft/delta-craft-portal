/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPoll
// ====================================================

export interface GetPoll_poll_pollOptions {
  __typename: "PollOption";
  id: string | null;
  text: string | null;
  description: string | null;
  image: string | null;
  voted: boolean | null;
}

export interface GetPoll_poll {
  __typename: "Poll";
  id: string | null;
  title: string | null;
  pollOptions: (GetPoll_poll_pollOptions | null)[] | null;
}

export interface GetPoll {
  poll: GetPoll_poll | null;
}

export interface GetPollVariables {
  id: string;
}
