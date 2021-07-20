import { gql } from "apollo-server-micro";

const typeDefs = gql`
  scalar Date

  scalar PointType

  enum PointTypeEnum {
    Mining
    Crafting
    Warfare
    Journey
  }

  type PointSummary {
    mining: Float
    crafting: Float
    warfare: Float
    journey: Float
  }

  type PointSummaryWrapper {
    summary: PointSummary
    ratios: PointSummary
  }

  type Point {
    id: ID
    points: Int
    userId: ID
    pointType: PointType
    description: String
    created: Date
    pointTags: [PointTag]
  }

  type PointTag {
    id: ID
    pointId: ID
    key: String
    value: String
  }

  type User {
    id: ID
    name: String
    image: String
    userConnections: [UserConnections]
  }

  type UserConnections {
    id: ID
    team: Team
    teamId: ID
    nextId: ID
    next: User
    name: String
    consent: Date
    points: [Point]
    pointSummary: PointSummaryWrapper
  }

  type LoginSession {
    id: ID
    ip: String
    auth: Boolean
    updated: Date
    authRequest: Date
  }

  type Team {
    id: ID
    name: String
    teamColourHex: String
    majorTeam: String
    userConnections: [UserConnections]
  }

  type PointSummaryMajor {
    blue: PointSummaryWrapper
    red: PointSummaryWrapper
  }

  type Consent {
    id: ID
    title: String
    content: String
    created: Date
  }

  type Poll {
    id: ID
    title: String
    pollOptions: [PollOption]
  }

  type PollOption {
    id: ID
    pollId: ID
    text: String
    description: String
    image: String
    poll: Poll
    voted: Boolean
  }

  type PollVotes {
    id: ID
    connectionId: ID
    pollOptionId: ID
    pollOption: PollOption
    connection: UserConnections
  }

  type Query {
    test: String
    getUsers: [User]
    getUser: User
    player(nickname: String!): UserConnections
    players: [UserConnections]
    getTeams: [Team]
    getTeam(id: ID!): Team
    getPlayerPointSummary(id: ID!): PointSummaryWrapper
    getTeamPointSummary(id: ID!): PointSummaryWrapper
    getMajorTeamsSummary: PointSummaryMajor
    loginSession: LoginSession
    consents: [Consent]
    poll(id: ID!): Poll
    userPollVotes(id: ID!): [PollVotes]
  }

  type Mutation {
    updateNickname(nickname: String!): Boolean
    updateTeam(name: String, colour: String): Boolean
    updateConsent: Boolean
    updateLoginSession(confirm: Boolean!): Boolean
    updateFcmToken(token: String!): Boolean
    createOrUpdateTeam(name: String!): Boolean
    joinTeam(code: String!): Boolean
    updateVote(optionId: ID!): Boolean
  }
`;

export default typeDefs;
