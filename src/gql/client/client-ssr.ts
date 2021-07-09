import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import jwt from "next-auth/jwt";
import { NextApiRequest } from "next";
import endpoint from "../../utils/endpoints";
import { getSession } from "next-auth/client";
import { verifyToken } from "../utils/user-auth";

const httpLink = createHttpLink({
  uri: `${endpoint}/api/graphql`,
});

const secret = process.env.NEXTAUTH_SECRET;

const getAuthLink = async (request: NextApiRequest) => {
  const session = await getSession({ req: request });
  const accessToken = (session?.accessToken as string) || "";

  return setContext(async (req, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
  });
};

const getClientSsr = async (req: NextApiRequest) =>
  new ApolloClient({
    link: (await getAuthLink(req)).concat(httpLink),
    cache: new InMemoryCache(),
  });

export default getClientSsr;
