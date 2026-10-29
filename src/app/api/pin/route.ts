import { NextRequest, NextResponse } from "next/server";
import { fetchRepo } from "@/lib/fetchers/repo";
import { renderRepoCard } from "@/lib/cards/repo-card";
import { parseBoolean } from "@/utils/format";
import { renderErrorCard } from "@/lib/svg/error-card";

const DEFAULT_CACHE_SECONDS = 43200; // 12 hours

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const username = params.get("username")?.trim();
  const repo = params.get("repo")?.trim();

  if (!username || !repo) {
    return new NextResponse(
      renderErrorCard("Missing required parameters: username & repo", 400),
      {
        status: 400,
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
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
    return new NextResponse(renderErrorCard(message, 400), {
      status: 500,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }
}
