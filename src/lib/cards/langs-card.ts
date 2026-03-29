import { TopLangsResult } from "@/lib/github/types";
import { resolveCardColors } from "@/lib/themes";
import { renderBaseCard } from "@/lib/svg/base-card";
import { getTopNLanguages, calculateLangPercentages } from "@/lib/fetchers/top-langs";
import { getStaggerDelay } from "@/lib/svg/animations";

export type LangsLayout = "normal" | "compact" | "donut" | "pie";

export interface LangsCardOptions {
  theme?: string | null;
  title_color?: string | null;
  text_color?: string | null;
  icon_color?: string | null;
  bg_color?: string | null;
  border_color?: string | null;
  hide_border?: boolean;
  hide_title?: boolean;
  custom_title?: string | null;
  border_radius?: number;
  disable_animations?: boolean;
  layout?: LangsLayout;
  langs_count?: number;
  hide_progress?: boolean;
}

function renderNormalLayout(
  langs: Array<{ name: string; color: string; percentage: number }>,
  textColor: string,
): { svg: string; height: number } {
  const rows = langs.map((lang, i) => {
    const y = i * 40;
    const delay = getStaggerDelay(i);
    return `
      <g transform="translate(25, ${y})">
        <g class="dm-stagger" style="${delay}">
          <text x="2" y="15" fill="${textColor}" font-size="14" font-weight="600">
            ${lang.name}
          </text>
          <rect x="0" y="24" width="300" height="8" rx="4" fill="${textColor}" opacity="0.15" />
          <rect x="0" y="24" width="${(lang.percentage / 100) * 300}" height="8" rx="4" fill="${lang.color}" />
          <text x="310" y="32" fill="${textColor}" font-size="12" opacity="0.8">
            ${lang.percentage}%
          </text>
        </g>
      </g>`;
  });

  return { svg: rows.join("\n"), height: langs.length * 40 + 10 };
}

function renderCompactLayout(
  langs: Array<{ name: string; color: string; percentage: number }>,
  textColor: string,
): { svg: string; height: number } {
  let barX = 0;
  const barWidth = 440;
  const barSegments = langs.map((lang) => {
    const w = (lang.percentage / 100) * barWidth;
    const segment = `<rect x="${barX}" y="0" width="${w}" height="8" fill="${lang.color}" />`;
    barX += w;
    return segment;
  });

  const bar = `
    <g transform="translate(25, 0)">
      <rect x="0" y="0" width="${barWidth}" height="8" rx="4" fill="${textColor}" opacity="0.15" />
      <clipPath id="lang-bar-clip">
        <rect x="0" y="0" width="${barWidth}" height="8" rx="4" />
      </clipPath>
      <g clip-path="url(#lang-bar-clip)">
        ${barSegments.join("\n")}
      </g>
    </g>`;

  const labelsPerRow = 3;
  const labelWidth = 147;
  const labelRows: string[] = [];

  langs.forEach((lang, i) => {
    const row = Math.floor(i / labelsPerRow);
    const col = i % labelsPerRow;
    const x = 25 + col * labelWidth;
    const y = 25 + row * 25;

    labelRows.push(`
      <g transform="translate(${x}, ${y})">
        <circle cx="5" cy="6" r="5" fill="${lang.color}" />
        <text x="15" y="10" fill="${textColor}" font-size="11">
          ${lang.name} ${lang.percentage}%
        </text>
      </g>`);
  });

  const labelHeight = Math.ceil(langs.length / labelsPerRow) * 25 + 30;
  return { svg: `${bar}\n${labelRows.join("\n")}`, height: labelHeight + 15 };
}

function renderDonutLayout(
  langs: Array<{ name: string; color: string; percentage: number }>,
  textColor: string,
): { svg: string; height: number } {
  const cx = 100;
  const cy = 80;
  const r = 60;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  const arcs = langs.map((lang) => {
    const dashLen = (lang.percentage / 100) * circumference;
    const arc = `
      <circle
        cx="${cx}" cy="${cy}" r="${r}"
        fill="none"
        stroke="${lang.color}"
        stroke-width="20"
        stroke-dasharray="${dashLen} ${circumference - dashLen}"
        stroke-dashoffset="${-offset}"
        transform="rotate(-90 ${cx} ${cy})"
      />`;
    offset += dashLen;
    return arc;
  });

  const labels = langs.map((lang, i) => {
    const y = 15 + i * 22;
    return `
      <g transform="translate(210, ${y})">
        <circle cx="5" cy="6" r="5" fill="${lang.color}" />
        <text x="15" y="10" fill="${textColor}" font-size="12">
          ${lang.name} — ${lang.percentage}%
        </text>
      </g>`;
  });

  const height = Math.max(cy * 2 + 10, langs.length * 22 + 30);
  return {
    svg: `<g transform="translate(25, 0)">${arcs.join("\n")}</g>\n${labels.join("\n")}`,
    height,
  };
}

function renderPieLayout(
  langs: Array<{ name: string; color: string; percentage: number }>,
  textColor: string,
): { svg: string; height: number } {
  const cx = 100;
  const cy = 80;
  const r = 70;
  let cumulative = 0;

  const slices = langs.map((lang) => {
    const startAngle = (cumulative / 100) * 360;
    cumulative += lang.percentage;
    const endAngle = (cumulative / 100) * 360;

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArc = lang.percentage > 50 ? 1 : 0;

    return `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${lang.color}" />`;
  });

  const labels = langs.map((lang, i) => {
    const y = 15 + i * 22;
    return `
      <g transform="translate(210, ${y})">
        <circle cx="5" cy="6" r="5" fill="${lang.color}" />
        <text x="15" y="10" fill="${textColor}" font-size="12">
          ${lang.name} — ${lang.percentage}%
        </text>
      </g>`;
  });

  const height = Math.max(cy * 2 + 10, langs.length * 22 + 30);
  return {
    svg: `<g transform="translate(25, 0)">${slices.join("\n")}</g>\n${labels.join("\n")}`,
    height,
  };
}

export function renderLangsCard(
  topLangs: TopLangsResult,
  options: LangsCardOptions = {},
): string {
  const colors = resolveCardColors(options);
  const layout = options.layout ?? "normal";
  const langsCount = options.langs_count ?? 5;

  const filtered = getTopNLanguages(topLangs, langsCount);
  const percentages = calculateLangPercentages(filtered);

  if (percentages.length === 0) {
    const emptyBody = `
      <g transform="translate(25, 30)">
        <text fill="${colors.textColor}" font-size="14">No language data available</text>
      </g>`;
    return renderBaseCard(emptyBody, {
      width: 300,
      height: 120,
      colors,
      title: "Most Used Languages",
      customTitle: options.custom_title ?? undefined,
      hideBorder: options.hide_border,
      hideTitle: options.hide_title,
      borderRadius: options.border_radius ?? 4.5,
      disableAnimations: options.disable_animations,
    });
  }

  let rendered: { svg: string; height: number };
  switch (layout) {
    case "compact":
      rendered = renderCompactLayout(percentages, colors.textColor);
      break;
    case "donut":
      rendered = renderDonutLayout(percentages, colors.textColor);
      break;
    case "pie":
      rendered = renderPieLayout(percentages, colors.textColor);
      break;
    default:
      rendered = renderNormalLayout(percentages, colors.textColor);
  }

  const width = layout === "normal" ? 400 : 495;
  const cardHeight = rendered.height + 55;

  return renderBaseCard(rendered.svg, {
    width,
    height: cardHeight,
    colors,
    title: "Most Used Languages",
    customTitle: options.custom_title ?? undefined,
    hideBorder: options.hide_border,
    hideTitle: options.hide_title,
    borderRadius: options.border_radius ?? 4.5,
    disableAnimations: options.disable_animations,
  });
}
