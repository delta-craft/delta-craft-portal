import { ApolloServer } from "apollo-server-micro";
import { verifyToken } from "../../../src/gql/utils/user-auth";
import typeDefs from "../../../backend/gql/schema/type-defs";
import resolvers from "../../../backend/gql/resolvers/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const user = await verifyToken(token);

    return { token, user };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
