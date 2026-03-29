export interface GitHubUserStats {
  name: string;
  login: string;
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalPRsMerged: number;
  totalIssues: number;
  totalReviews: number;
  contributedTo: number;
  followers: number;
}

export interface LanguageData {
  name: string;
  color: string;
  size: number;
}

export interface TopLangsResult {
  [langName: string]: {
    name: string;
    color: string;
    size: number;
    count: number;
  };
}

export interface RepoData {
  name: string;
  nameWithOwner: string;
  description: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  stargazerCount: number;
  forkCount: number;
  isArchived: boolean;
  isFork: boolean;
  isTemplate: boolean;
}

export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string; type?: string }>;
}

export interface StatsGraphQLData {
  user: {
    name: string;
    login: string;
    contributionsCollection: {
      totalCommitContributions: number;
      totalPullRequestReviewContributions: number;
    };
    repositoriesContributedTo: {
      totalCount: number;
    };
    pullRequests: {
      totalCount: number;
    };
    mergedPullRequests: {
      totalCount: number;
    };
    issues: {
      totalCount: number;
    };
    followers: {
      totalCount: number;
    };
    repositories: {
      totalCount: number;
      nodes: Array<{
        stargazerCount: number;
      }>;
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
    };
  };
}

export interface TopLangsGraphQLData {
  user: {
    repositories: {
      nodes: Array<{
        name: string;
        languages: {
          edges: Array<{
            size: number;
            node: {
              name: string;
              color: string;
            };
          }>;
        };
      }>;
    };
  };
}

export interface RepoGraphQLData {
  repository: {
    name: string;
    nameWithOwner: string;
    description: string | null;
    primaryLanguage: {
      name: string;
      color: string;
    } | null;
    stargazerCount: number;
    forkCount: number;
    isArchived: boolean;
    isFork: boolean;
    isTemplate: boolean;
  };
}
