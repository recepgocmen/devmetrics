import { graphqlQuery } from "@/lib/github/client";
import { REPO_QUERY } from "@/lib/github/queries";
import { RepoGraphQLData, RepoData } from "@/lib/github/types";

export async function fetchRepo(
  owner: string,
  repoName: string,
): Promise<RepoData> {
  const data = await graphqlQuery<RepoGraphQLData>(REPO_QUERY, {
    owner,
    name: repoName,
  });

  if (!data.repository) {
    throw new Error(`Repository "${owner}/${repoName}" not found on GitHub.`);
  }

  const repo = data.repository;

  return {
    name: repo.name,
    nameWithOwner: repo.nameWithOwner,
    description: repo.description ?? "",
    primaryLanguage: repo.primaryLanguage,
    stargazerCount: repo.stargazerCount,
    forkCount: repo.forkCount,
    isArchived: repo.isArchived,
    isFork: repo.isFork,
    isTemplate: repo.isTemplate,
  };
}
