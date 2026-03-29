export const STATS_QUERY = `
  query UserStats($login: String!, $after: String) {
    user(login: $login) {
      name
      login
      contributionsCollection {
        totalCommitContributions
        totalPullRequestReviewContributions
      }
      repositoriesContributedTo(
        first: 1
        contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
      ) {
        totalCount
      }
      pullRequests(first: 1) {
        totalCount
      }
      mergedPullRequests: pullRequests(first: 1, states: MERGED) {
        totalCount
      }
      issues(first: 1) {
        totalCount
      }
      followers(first: 1) {
        totalCount
      }
      repositories(
        first: 100
        ownerAffiliations: OWNER
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $after
      ) {
        totalCount
        nodes {
          stargazerCount
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const TOP_LANGS_QUERY = `
  query TopLanguages($login: String!) {
    user(login: $login) {
      repositories(
        first: 100
        ownerAffiliations: OWNER
        isFork: false
        orderBy: { direction: DESC, field: PUSHED_AT }
      ) {
        nodes {
          name
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

export const REPO_QUERY = `
  query RepoInfo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      nameWithOwner
      description
      primaryLanguage {
        name
        color
      }
      stargazerCount
      forkCount
      isArchived
      isFork
      isTemplate
    }
  }
`;
