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

export const updateLoginMutation = gql`
  mutation UpdateLoginSession($confirm: Boolean!) {
    updateLoginSession(confirm: $confirm)
  }
`;

export const updateFcmTokenMutation = gql`
  mutation UpdateFcmToken($token: String!) {
    updateFcmToken(token: $token)
  }
`;

export const createOrUpdateTeamMutation = gql`
  mutation CreateOrUpdateTeam($teamName: String!) {
    createOrUpdateTeam(name: $teamName)
  }
`;

export const joinTeamMutation = gql`
  mutation JoinTeam($code: String!) {
    joinTeam(code: $code)
  }
`;
