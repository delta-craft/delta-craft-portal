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

  type Query {
    test: String
    getUsers: [User]
    getUser: User
    player(nickname: String!): UserConnections
    getTeams: [Team]
    getTeam(id: ID!): Team
    getPlayerPointSummary(id: ID!): PointSummaryWrapper
    getTeamPointSummary(id: ID!): PointSummaryWrapper
    getMajorTeamsSummary: PointSummaryMajor
    loginSession: LoginSession
    consents: [Consent]
  }

  type Mutation {
    updateNickname(nickname: String!): Boolean
    updateTeam(name: String, colour: String): Boolean
    updateConsent: Boolean
    updateLoginSession(confirm: Boolean!): Boolean
    updateFcmToken(token: String!): Boolean
  }
`;

export default typeDefs;
