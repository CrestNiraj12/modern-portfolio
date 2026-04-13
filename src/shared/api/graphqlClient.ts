import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  "https://api.github.com/graphql",
  {
    headers: {
      Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`,
    },
  },
);
