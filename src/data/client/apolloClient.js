import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  }
};

const link = new HttpLink({
  uri: "http://51.83.253.8:8020/graphql"
});

const config = {
  cache: new InMemoryCache({ addTypename: false }),
  link,
  defaultOptions
};

export const client = new ApolloClient(config);
export const getClient = token => {
  const authLink = setContext((_, { headers }) => {
    const authTokenFromCookie = localStorage.getItem("token");
    const authToken = token || authTokenFromCookie || "";
    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : ""
      }
    };
  });

  const config = {
    link: ApolloLink.from([authLink, link]),
    cache: new InMemoryCache({ addTypename: false }),
    defaultOptions
  };

  return new ApolloClient(config);
};

export default client;
