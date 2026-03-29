export function abbreviateNumber(value: number): string {
  if (value < 1000) return String(value);
  const suffixes = ["", "k", "M", "B"];
  const tier = (Math.log10(Math.abs(value)) / 3) | 0;
  if (tier === 0) return String(value);
  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;
  return scaled.toFixed(1).replace(/\.0$/, "") + suffix;
}

export function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function parseBoolean(value: string | null | undefined): boolean {
  return value === "true" || value === "1" || value === "";
}

export function parseArray(value: string | null | undefined): string[] {
  if (!value) return [];
  return value.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
}

export function encodeHTML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function wrapTextMultiline(
  text: string,
  maxCharPerLine: number = 50,
  maxLines: number = 3,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if (lines.length >= maxLines) break;
    if (currentLine.length + word.length + 1 > maxCharPerLine) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += (currentLine ? " " : "") + word;
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine.trim());
  }

  if (lines.length === maxLines && currentLine.length > maxCharPerLine) {
    lines[maxLines - 1] = lines[maxLines - 1].slice(0, maxCharPerLine - 3) + "...";
  }

  return lines;
}
