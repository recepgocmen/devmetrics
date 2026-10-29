import { NextRequest, NextResponse } from "next/server";
import { fetchStats } from "@/lib/fetchers/stats";
import { renderStatsCard } from "@/lib/cards/stats-card";
import { parseBoolean, parseArray } from "@/utils/format";
import { renderErrorCard } from "@/lib/svg/error-card";

const DEFAULT_CACHE_SECONDS = 14400; // 4 hours

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const username = params.get("username")?.trim();
  if (!username) {
    return new NextResponse(
      renderErrorCard("Missing required parameter: username", 495),
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
    const stats = await fetchStats(username);

    const svg = renderStatsCard(stats, {
      theme: params.get("theme"),
      title_color: params.get("title_color"),
      text_color: params.get("text_color"),
      icon_color: params.get("icon_color"),
      bg_color: params.get("bg_color"),
      border_color: params.get("border_color"),
      ring_color: params.get("ring_color"),
      hide_border: parseBoolean(params.get("hide_border")),
      hide_title: parseBoolean(params.get("hide_title")),
      hide_rank: parseBoolean(params.get("hide_rank")),
      show_icons: parseBoolean(params.get("show_icons")),
      custom_title: params.get("custom_title"),
      border_radius: params.has("border_radius")
        ? Number(params.get("border_radius"))
        : undefined,
      disable_animations: parseBoolean(params.get("disable_animations")),
      hide: parseArray(params.get("hide")),
      line_height: params.has("line_height")
        ? Number(params.get("line_height"))
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
    return new NextResponse(renderErrorCard(message, 495), {
      status: 500,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }
}
