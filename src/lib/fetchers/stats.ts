import { graphqlQuery } from "@/lib/github/client";
import { STATS_QUERY } from "@/lib/github/queries";
import { StatsGraphQLData, GitHubUserStats } from "@/lib/github/types";

export async function fetchStats(username: string): Promise<GitHubUserStats> {
  let totalStars = 0;
  let hasNextPage = true;
  let cursor: string | null = null;
  let userData: StatsGraphQLData["user"] | null = null;

  while (hasNextPage) {
    const data: StatsGraphQLData = await graphqlQuery<StatsGraphQLData>(STATS_QUERY, {
      login: username,
      after: cursor,
    });

    if (!data.user) {
      throw new Error(`User "${username}" not found on GitHub.`);
    }

    userData = data.user;

    totalStars += data.user.repositories.nodes.reduce(
      (sum, repo) => sum + repo.stargazerCount,
      0,
    );

    hasNextPage = data.user.repositories.pageInfo.hasNextPage;
    cursor = data.user.repositories.pageInfo.endCursor;

    if (!hasNextPage) break;
  }

  if (!userData) {
    throw new Error(`User "${username}" not found on GitHub.`);
  }

  return {
    name: userData.name || userData.login,
    login: userData.login,
    totalStars,
    totalCommits: userData.contributionsCollection.totalCommitContributions,
    totalPRs: userData.pullRequests.totalCount,
    totalPRsMerged: userData.mergedPullRequests.totalCount,
    totalIssues: userData.issues.totalCount,
    totalReviews:
      userData.contributionsCollection.totalPullRequestReviewContributions,
    contributedTo: userData.repositoriesContributedTo.totalCount,
    followers: userData.followers.totalCount,
  };
}
