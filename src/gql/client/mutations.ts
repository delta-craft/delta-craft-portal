import { gql } from "apollo-boost";

export const updateNicknameMutation = gql`
  mutation UpdateNickname($nickname: String!) {
    updateNickname(nickname: $nickname)
  }
`;

export const updateConsentMutation = gql`
  mutation UpdateConsent {
    updateConsent
  }
`;
