import { graphqlQuery } from "@/lib/github/client";
import { TOP_LANGS_QUERY } from "@/lib/github/queries";
import { TopLangsGraphQLData, TopLangsResult } from "@/lib/github/types";

export async function fetchTopLanguages(
  username: string,
  excludeRepos: string[] = [],
  hiddenLangs: string[] = [],
): Promise<TopLangsResult> {
  const data = await graphqlQuery<TopLangsGraphQLData>(TOP_LANGS_QUERY, {
    login: username,
  });

  if (!data.user) {
    throw new Error(`User "${username}" not found on GitHub.`);
  }

  const excludeSet = new Set(excludeRepos.map((r) => r.toLowerCase()));
  const hiddenSet = new Set(hiddenLangs.map((l) => l.toLowerCase()));

  const langMap: TopLangsResult = {};

  for (const repo of data.user.repositories.nodes) {
    if (excludeSet.has(repo.name.toLowerCase())) continue;

    for (const edge of repo.languages.edges) {
      const langName = edge.node.name;
      if (hiddenSet.has(langName.toLowerCase())) continue;

      if (!langMap[langName]) {
        langMap[langName] = {
          name: langName,
          color: edge.node.color || "#858585",
          size: 0,
          count: 0,
        };
      }

      langMap[langName].size += edge.size;
      langMap[langName].count += 1;
    }
  }

  return langMap;
}

export function getTopNLanguages(
  langs: TopLangsResult,
  count: number = 5,
): TopLangsResult {
  const sorted = Object.entries(langs)
    .sort(([, a], [, b]) => b.size - a.size)
    .slice(0, count);

  const result: TopLangsResult = {};
  for (const [key, val] of sorted) {
    result[key] = val;
  }
  return result;
}

export function calculateLangPercentages(
  langs: TopLangsResult,
): Array<{ name: string; color: string; percentage: number; size: number }> {
  const total = Object.values(langs).reduce((sum, l) => sum + l.size, 0);
  if (total === 0) return [];

  return Object.values(langs).map((lang) => ({
    name: lang.name,
    color: lang.color,
    percentage: parseFloat(((lang.size / total) * 100).toFixed(2)),
    size: lang.size,
  }));
}
