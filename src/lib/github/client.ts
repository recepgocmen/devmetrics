import { GraphQLResponse } from "./types";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

function getToken(): string {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      "GITHUB_TOKEN is not set. Create a Personal Access Token at https://github.com/settings/tokens",
    );
  }
  return token;
}

export async function graphqlQuery<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const token = getToken();

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "DevMetrics",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `GitHub GraphQL API error: ${response.status} ${response.statusText} - ${text}`,
    );
  }

  const json = (await response.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    const msg = json.errors.map((e) => e.message).join("; ");
    throw new Error(`GitHub GraphQL error: ${msg}`);
  }

  return json.data;
}
