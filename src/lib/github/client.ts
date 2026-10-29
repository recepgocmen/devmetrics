import { GraphQLResponse } from "./types";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

function getTokens(): string[] {
  const raw = process.env.GITHUB_TOKEN || "";
  const tokens = raw
    .split(/[,;\n]+/)
    .map((t) => t.trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean);

  if (tokens.length === 0) {
    throw new Error(
      "GITHUB_TOKEN is not set. Create a Personal Access Token at https://github.com/settings/tokens",
    );
  }
  return tokens;
}

export async function graphqlQuery<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const tokens = getTokens();
  const startIndex = Math.floor(Math.random() * tokens.length);
  let lastError: Error | null = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[(startIndex + i) % tokens.length];

    try {
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
        const err = new Error(
          `GitHub GraphQL API error: ${response.status} ${response.statusText} - ${text}`,
        );

        // If unauthorized or forbidden (e.g. bad token or rate limited) and we have fallback tokens, retry
        if ((response.status === 401 || response.status === 403) && tokens.length > 1) {
          lastError = err;
          continue;
        }
        throw err;
      }

      const json = (await response.json()) as GraphQLResponse<T>;

      if (json.errors?.length) {
        const msg = json.errors.map((e) => e.message).join("; ");
        throw new Error(`GitHub GraphQL error: ${msg}`);
      }

      return json.data;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (i < tokens.length - 1) {
        continue;
      }
      throw lastError;
    }
  }

  throw lastError ?? new Error("Unknown error while querying GitHub GraphQL API");
}
