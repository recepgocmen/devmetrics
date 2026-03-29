export function isValidHexColor(color: string): boolean {
  return /^#?[0-9A-Fa-f]{3,8}$/.test(color);
}

export function normalizeHex(hex: string): string {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return `#${hex}`;
}

export interface GradientDef {
  angle: number;
  stops: string[];
}

export function parseGradient(bgColor: string): GradientDef | null {
  const parts = bgColor.split(",").map((s) => s.trim());
  if (parts.length < 3) return null;

  const angle = parseInt(parts[0], 10);
  if (isNaN(angle)) return null;

  const stops = parts.slice(1).map((c) => (c.startsWith("#") ? c : `#${c}`));
  if (!stops.every(isValidHexColor)) return null;

  return { angle, stops };
}

export function renderGradientDef(
  id: string,
  gradient: GradientDef,
): string {
  const rad = (gradient.angle * Math.PI) / 180;
  const x1 = Math.round(50 - 50 * Math.cos(rad));
  const y1 = Math.round(50 + 50 * Math.sin(rad));
  const x2 = Math.round(50 + 50 * Math.cos(rad));
  const y2 = Math.round(50 - 50 * Math.sin(rad));

  const stopsSvg = gradient.stops
    .map((color, i) => {
      const offset = gradient.stops.length === 1
        ? "0%"
        : `${Math.round((i / (gradient.stops.length - 1)) * 100)}%`;
      return `<stop offset="${offset}" stop-color="${color}" />`;
    })
    .join("\n      ");

  return `
    <defs>
      <linearGradient id="${id}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
        ${stopsSvg}
      </linearGradient>
    </defs>`;
}
