import { RepoData } from "@/lib/github/types";
import { resolveCardColors } from "@/lib/themes";
import { renderBaseCard } from "@/lib/svg/base-card";
import { getIconSvg } from "@/lib/svg/icons";
import { abbreviateNumber } from "@/utils/format";
import { encodeHTML, wrapTextMultiline } from "@/utils/format";

export interface RepoCardOptions {
  theme?: string | null;
  title_color?: string | null;
  text_color?: string | null;
  icon_color?: string | null;
  bg_color?: string | null;
  border_color?: string | null;
  hide_border?: boolean;
  border_radius?: number;
  show_owner?: boolean;
  disable_animations?: boolean;
  description_lines?: number;
}

export function renderRepoCard(
  repo: RepoData,
  options: RepoCardOptions = {},
): string {
  const colors = resolveCardColors(options);
  const showOwner = options.show_owner ?? false;
  const descriptionLines = options.description_lines ?? 2;

  const displayName = showOwner ? repo.nameWithOwner : repo.name;
  const repoIcon = getIconSvg("repo", colors.iconColor, 16);
  const description = encodeHTML(repo.description || "No description provided");
  const wrappedDesc = wrapTextMultiline(description, 60, descriptionLines);

  const descriptionMarkup = wrappedDesc
    .map(
      (line, i) =>
        `<text x="0" y="${i * 18}" fill="${colors.textColor}" font-size="13" opacity="0.8">${line}</text>`,
    )
    .join("\n");

  const descHeight = wrappedDesc.length * 18;

  const langDot = repo.primaryLanguage
    ? `<circle cx="0" cy="-4" r="6" fill="${repo.primaryLanguage.color}" />
       <text x="15" y="0" fill="${colors.textColor}" font-size="12">${repo.primaryLanguage.name}</text>`
    : "";
  const langWidth = repo.primaryLanguage
    ? 15 + repo.primaryLanguage.name.length * 7.5
    : 0;

  const starMarkup = `
    <g transform="translate(${langWidth + 10}, -8)">
      ${getIconSvg("star", colors.iconColor, 14)}
      <text x="18" y="10" fill="${colors.textColor}" font-size="12">${abbreviateNumber(repo.stargazerCount)}</text>
    </g>`;

  const forkMarkup = `
    <g transform="translate(${langWidth + 65}, -8)">
      ${getIconSvg("fork", colors.iconColor, 14)}
      <text x="18" y="10" fill="${colors.textColor}" font-size="12">${abbreviateNumber(repo.forkCount)}</text>
    </g>`;

  const archivedBadge = repo.isArchived
    ? `<g transform="translate(350, -5)">
         <rect x="0" y="-10" width="60" height="20" rx="10" fill="${colors.textColor}" opacity="0.15" />
         <text x="10" y="4" fill="${colors.textColor}" font-size="10" opacity="0.7">Archived</text>
       </g>`
    : "";

  const body = `
    <g transform="translate(25, 10)">
      <g>
        <g transform="translate(0, -2)">${repoIcon}</g>
        <text x="25" y="12" fill="${colors.titleColor}" font-size="16" font-weight="700">${encodeHTML(displayName)}</text>
        ${archivedBadge}
      </g>
      <g transform="translate(0, 30)">
        ${descriptionMarkup}
      </g>
      <g transform="translate(0, ${35 + descHeight})">
        ${langDot}
        ${starMarkup}
        ${forkMarkup}
      </g>
    </g>`;

  const cardHeight = 100 + descHeight;

  return renderBaseCard(body, {
    width: 400,
    height: cardHeight,
    colors,
    hideTitle: true,
    hideBorder: options.hide_border,
    borderRadius: options.border_radius ?? 4.5,
    disableAnimations: options.disable_animations,
  });
}
