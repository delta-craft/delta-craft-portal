import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/client";
import endpoint from "../../utils/endpoints";

// const getClient = (token: string) => {
//   const client = new ApolloClient({
//     uri: `${endpoint}/api/graphql/`,
//     cache: new InMemoryCache(),
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

const httpLink = createHttpLink({
  uri: "/api/graphql",
});

const authLink = setContext((req, { headers }) => {
  // get the authentication token from local storage if it exists
  // const s = await getSession();
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
