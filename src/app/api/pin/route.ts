import { NextRequest, NextResponse } from "next/server";
import { fetchRepo } from "@/lib/fetchers/repo";
import { renderRepoCard } from "@/lib/cards/repo-card";
import { parseBoolean } from "@/utils/format";

const DEFAULT_CACHE_SECONDS = 43200; // 12 hours

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const username = params.get("username");
  const repo = params.get("repo");

  if (!username || !repo) {
    return new NextResponse(
      renderErrorCard("Missing required parameters: username & repo"),
      {
        status: 400,
        headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
      },
    );
  }

  try {
    const repoData = await fetchRepo(username, repo);

    const svg = renderRepoCard(repoData, {
      theme: params.get("theme"),
      title_color: params.get("title_color"),
      text_color: params.get("text_color"),
      icon_color: params.get("icon_color"),
      bg_color: params.get("bg_color"),
      border_color: params.get("border_color"),
      hide_border: parseBoolean(params.get("hide_border")),
      border_radius: params.has("border_radius")
        ? Number(params.get("border_radius"))
        : undefined,
      show_owner: parseBoolean(params.get("show_owner")),
      disable_animations: parseBoolean(params.get("disable_animations")),
      description_lines: params.has("description_lines")
        ? Number(params.get("description_lines"))
        : undefined,
    });

    const cacheSeconds = Math.max(
      1800,
      Number(params.get("cache_seconds")) || DEFAULT_CACHE_SECONDS,
    );

    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": `public, max-age=${cacheSeconds}, s-maxage=${cacheSeconds}, stale-while-revalidate=${cacheSeconds}`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(renderErrorCard(message), {
      status: 500,
      headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
    });
  }
}

function renderErrorCard(message: string): string {
  return `
<svg width="400" height="120" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>* { font-family: 'Segoe UI', Ubuntu, 'Helvetica Neue', Sans-Serif; }</style>
  <rect x="0.5" y="0.5" rx="4.5" width="399" height="119" fill="#141321" stroke="#e4544e" />
  <text x="25" y="45" fill="#e4544e" font-size="16" font-weight="600">Something went wrong!</text>
  <text x="25" y="75" fill="#a9a9a9" font-size="13">${message.slice(0, 80)}</text>
</svg>`.trim();
}
