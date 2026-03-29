"use client";

import { useMemo } from "react";
import { PROD_DOMAIN } from "@/constants";
import type { CardOptions, CardUrls } from "@/types";

function buildParams(options: CardOptions, extra: Record<string, string> = {}) {
  const p = new URLSearchParams();
  p.set("username", options.username);
  p.set("theme", options.theme);
  if (options.showIcons) p.set("show_icons", "true");
  if (options.hideBorder) p.set("hide_border", "true");
  for (const [k, v] of Object.entries(extra)) p.set(k, v);
  return p.toString();
}

export function useCardUrls(options: CardOptions): CardUrls {
  return useMemo(() => {
    const base = buildParams(options);
    const langsBase = buildParams(options, { layout: options.langsLayout });
    const pinBase = buildParams(options, { repo: "REPO_NAME" });

    const statsUrl = `${PROD_DOMAIN}/api/stats?${base}`;
    const langsUrl = `${PROD_DOMAIN}/api/top-langs?${langsBase}`;
    const pinUrl = `${PROD_DOMAIN}/api/pin?${pinBase}`;

    const statsPreview = `/api/stats?${base}`;
    const langsPreview = `/api/top-langs?${langsBase}`;

    const statsHtml = `<img src="${statsUrl}" alt="GitHub Stats" />`;
    const langsHtml = `<img src="${langsUrl}" alt="Top Languages" />`;
    const pinHtml = `<img src="${pinUrl}" alt="Repo Card" />`;
    const sideBySideHtml = `<p>\n  <img width="48%" src="${statsUrl}" alt="GitHub Stats" />\n  <img width="48%" src="${langsUrl}" alt="Top Languages" />\n</p>`;

    return {
      statsUrl,
      langsUrl,
      pinUrl,
      statsPreview,
      langsPreview,
      statsHtml,
      langsHtml,
      pinHtml,
      sideBySideHtml,
    };
  }, [options]);
}
