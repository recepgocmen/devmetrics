import { GitHubUserStats } from "@/lib/github/types";
import { CardColors, resolveCardColors } from "@/lib/themes";
import { renderBaseCard } from "@/lib/svg/base-card";
import { getIconSvg } from "@/lib/svg/icons";
import { getStaggerDelay } from "@/lib/svg/animations";
import { abbreviateNumber } from "@/utils/format";
import { calculateRank, RankData } from "@/utils/rank";

export interface StatsCardOptions {
  theme?: string | null;
  title_color?: string | null;
  text_color?: string | null;
  icon_color?: string | null;
  bg_color?: string | null;
  border_color?: string | null;
  ring_color?: string | null;
  hide_border?: boolean;
  hide_title?: boolean;
  hide_rank?: boolean;
  show_icons?: boolean;
  custom_title?: string | null;
  border_radius?: number;
  disable_animations?: boolean;
  hide?: string[];
  line_height?: number;
}

interface StatItem {
  key: string;
  label: string;
  value: number;
  icon: "star" | "commit" | "pr" | "issue" | "contrib";
}

function getStatItems(stats: GitHubUserStats, hide: string[]): StatItem[] {
  const hideSet = new Set(hide.map((s) => s.toLowerCase()));

  const items: StatItem[] = [
    { key: "stars", label: "Total Stars", value: stats.totalStars, icon: "star" },
    { key: "commits", label: "Total Commits", value: stats.totalCommits, icon: "commit" },
    { key: "prs", label: "Total PRs", value: stats.totalPRs, icon: "pr" },
    { key: "issues", label: "Total Issues", value: stats.totalIssues, icon: "issue" },
    { key: "contribs", label: "Contributed to", value: stats.contributedTo, icon: "contrib" },
  ];

  return items.filter((item) => !hideSet.has(item.key));
}

function renderStatRow(
  item: StatItem,
  index: number,
  colors: CardColors,
  showIcons: boolean,
  lineHeight: number,
): string {
  const y = index * lineHeight;
  const delay = getStaggerDelay(index);

  const iconMarkup = showIcons
    ? `<g transform="translate(0, -2)">${getIconSvg(item.icon, colors.iconColor, 16)}</g>`
    : "";

  const textX = showIcons ? 25 : 0;

  return `
    <g transform="translate(25, ${y})">
      <g class="dm-stagger" style="${delay}">
        ${iconMarkup}
        <text x="${textX}" y="12.5" fill="${colors.textColor}" font-size="14">
          ${item.label}:
        </text>
        <text x="220" y="12.5" fill="${colors.textColor}" font-size="14" font-weight="700">
          ${abbreviateNumber(item.value)}
        </text>
      </g>
    </g>`;
}

function renderRankCircle(
  rank: RankData,
  colors: CardColors,
  bodyHeight: number,
): string {
  const cx = 400;
  const cy = bodyHeight / 2;
  const r = 40;
  const circumference = 2 * Math.PI * r;
  const progress = rank.score;
  const dashoffset = circumference * (1 - progress);

  return `
    <g transform="translate(${cx}, ${cy})">
      <circle
        r="${r}"
        cx="0"
        cy="0"
        fill="none"
        stroke="${colors.ringColor}"
        stroke-width="6"
        stroke-opacity="0.2"
      />
      <circle
        class="dm-rank-circle"
        r="${r}"
        cx="0"
        cy="0"
        fill="none"
        stroke="${colors.ringColor}"
        stroke-width="6"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${circumference}"
        stroke-linecap="round"
        transform="rotate(-90)"
        style="--dm-rank-offset-start: ${circumference}; --dm-rank-offset-end: ${dashoffset};"
      />
      <text
        class="dm-rank-text"
        x="0"
        y="-5"
        text-anchor="middle"
        alignment-baseline="central"
        fill="${colors.textColor}"
        font-size="24"
        font-weight="800"
      >${rank.level}</text>
      <text
        class="dm-rank-text"
        x="0"
        y="18"
        text-anchor="middle"
        fill="${colors.textColor}"
        font-size="11"
        font-weight="400"
        opacity="0.7"
      >Top ${Math.round(rank.percentile)}%</text>
    </g>`;
}

export function renderStatsCard(
  stats: GitHubUserStats,
  options: StatsCardOptions = {},
): string {
  const colors = resolveCardColors(options);
  const lineHeight = options.line_height ?? 30;
  const showIcons = options.show_icons ?? false;
  const hideRank = options.hide_rank ?? false;
  const hide = options.hide ?? [];

  const items = getStatItems(stats, hide);
  const rank = calculateRank({
    commits: stats.totalCommits,
    prs: stats.totalPRs,
    issues: stats.totalIssues,
    reviews: stats.totalReviews,
    stars: stats.totalStars,
    followers: stats.followers,
    contributedTo: stats.contributedTo,
  });

  const statRows = items
    .map((item, i) => renderStatRow(item, i, colors, showIcons, lineHeight))
    .join("\n");

  const bodyHeight = items.length * lineHeight;
  const cardHeight = Math.max(bodyHeight + 70, hideRank ? 0 : 200);

  const rankCircle = hideRank ? "" : renderRankCircle(rank, colors, bodyHeight);

  const title = `${stats.name}'s GitHub Stats`;

  return renderBaseCard(
    `${statRows}\n${rankCircle}`,
    {
      width: 495,
      height: cardHeight,
      colors,
      title,
      customTitle: options.custom_title ?? undefined,
      hideBorder: options.hide_border,
      hideTitle: options.hide_title,
      borderRadius: options.border_radius ?? 4.5,
      disableAnimations: options.disable_animations,
    },
  );
}
