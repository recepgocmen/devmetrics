import { CardColors } from "@/lib/themes";
import { parseGradient, renderGradientDef } from "@/utils/colors";
import { encodeHTML } from "@/utils/format";
import { getAnimationStyle } from "./animations";

export interface BaseCardOptions {
  width?: number;
  height?: number;
  colors: CardColors;
  title?: string;
  customTitle?: string;
  hideBorder?: boolean;
  hideTitle?: boolean;
  borderRadius?: number;
  disableAnimations?: boolean;
}

export function renderBaseCard(
  body: string,
  options: BaseCardOptions,
): string {
  const {
    width = 495,
    height = 195,
    colors,
    title,
    customTitle,
    hideBorder = false,
    hideTitle = false,
    borderRadius = 4.5,
    disableAnimations = false,
  } = options;

  const displayTitle = encodeHTML(customTitle ?? title ?? "");
  const titleHeight = hideTitle ? 0 : 45;
  const gradient = parseGradient(colors.bgColor.replace("#", ""));
  const hasGradient = gradient !== null;
  const bgFill = hasGradient ? `url(#bg-gradient)` : colors.bgColor;
  const gradientDef = hasGradient
    ? renderGradientDef("bg-gradient", gradient)
    : "";

  const borderWidth = hideBorder ? 0 : 1;
  const borderStroke = hideBorder ? "none" : colors.borderColor;

  const animStyle = getAnimationStyle(disableAnimations);

  const fontFamily = `'Segoe UI', Ubuntu, 'Helvetica Neue', Sans-Serif`;

  return `
<svg
  width="${width}"
  height="${height}"
  viewBox="0 0 ${width} ${height}"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-labelledby="dm-card-title"
>
  <title id="dm-card-title">${displayTitle}</title>
  ${gradientDef}
  <style>
    * { font-family: ${fontFamily}; }
    ${animStyle}
  </style>
  <rect
    x="${borderWidth / 2}"
    y="${borderWidth / 2}"
    rx="${borderRadius}"
    ry="${borderRadius}"
    width="${width - borderWidth}"
    height="${height - borderWidth}"
    fill="${bgFill}"
    stroke="${borderStroke}"
    stroke-width="${borderWidth}"
    stroke-opacity="1"
  />

  ${hideTitle ? "" : `
  <g transform="translate(25, 35)">
    <text
      x="0"
      y="0"
      fill="${colors.titleColor}"
      font-size="18"
      font-weight="600"
      data-testid="card-title"
    >${displayTitle}</text>
  </g>`}

  <g transform="translate(0, ${titleHeight + 5})">
    ${body}
  </g>
</svg>`.trim();
}
