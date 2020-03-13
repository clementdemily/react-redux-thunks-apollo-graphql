import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import * as UserUtils from "../utils/user";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `https://directions-graphql.herokuapp.com/graphql`
});

const authLink = setContext((_, { headers }) => {
  const token = UserUtils.getTokenFromLocalStorage();

  return {
    headers: {
      ...headers,
      authorization: token
    }
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(link)
});

export default client;
