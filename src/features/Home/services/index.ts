import { graphqlClient } from "@/shared/api/graphqlClient";
import type { Project } from "@/shared/types";
import query from "../queries/projects.graphql";

export const getPinnedRepos = async (): Promise<Project[]> => {
  const data = await graphqlClient.request(query);
  return data.user.pinnedItems.nodes;
};
