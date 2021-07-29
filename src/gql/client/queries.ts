import { gql } from "apollo-boost";

export const getTeamQuery = gql`
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      teamColourHex
      name
      majorTeam
      userConnections {
        id
        name
        next {
          id
          name
        }
      }
    }
  }
`;

export const getTeamsQuery = gql`
  query GetTeams {
    getTeams {
      id
      name
      teamColourHex
      majorTeam
      userConnections {
        id
        name
        next {
          id
          name
        }
      }
    }
  }
`;

export const getNicknameQuery = gql`
  query GetNickname {
    getUser {
      id
      userConnections {
        id
        name
      }
    }
  }
`;

export const getConsentsQuery = gql`
  query GetConsents {
    consents {
      id
      title
      created
      content
    }
    getUser {
      id
      userConnections {
        id
        consent
      }
    }
  }
`;

export const getTeamPointSummaryQuery = gql`
  query GetTeamSummary($teamId: ID!) {
    getTeamPointSummary(id: $teamId) {
      summary {
        crafting
        mining
        warfare
        journey
      }
      ratios {
        crafting
        mining
        warfare
        journey
      }
    }
  }
`;

export const getPlayerPointSummaryQuery = gql`
  query PlayerPointSummary($ucId: ID!) {
    getPlayerPointSummary(id: $ucId) {
      summary {
        crafting
        mining
        journey
        warfare
      }
    }
  }
`;

export const getMajorTeamsSummary = gql`
  query MajorTeamsSumarry {
    getMajorTeamsSummary {
      blue {
        summary {
          crafting
          mining
          warfare
          journey
        }
      }
      red {
        summary {
          crafting
          mining
          warfare
          journey
        }
      }
    }
  }
`;

export const getPlayerPointsQuery = gql`
  query GetPlayerPoints($nick: String!) {
    player(nickname: $nick) {
      id
      points {
        id
        points
        pointType
        created
        description
      }
    }
  }
`;

export const getPointQuery = gql`
  query PointQuery($id: ID!) {
    point(id: $id) {
      id
      points
      pointType
      created
      description
      pointTags {
        id
        key
        value
      }
    }
  }
`;

export const getPlayerDetailsNoPointsQuery = gql`
  query GetPlayerDetailNoPoints($nick: String!) {
    player(nickname: $nick) {
      id
      name
      team {
        id
        name
        majorTeam
      }
    }
  }
`;

export const getLoginQuery = gql`
  query GetLoginSession {
    loginSession {
      id
      ip
      auth
      authRequest
      updated
    }
  }
`;

export const getPlayersQuery = gql`
  query GetPlayers {
    players {
      id
      name
      team {
        id
        name
        majorTeam
      }
      pointSummary {
        ratios {
          crafting
          mining
          journey
          warfare
        }
        summary {
          crafting
          mining
          journey
          warfare
        }
      }
    }
  }
`;

export const getPollQuery = gql`
  query GetPoll($id: ID!) {
    poll(id: $id) {
      id
      title
      pollOptions {
        id
        text
        description
        image
        voted
      }
    }
  }
`;
