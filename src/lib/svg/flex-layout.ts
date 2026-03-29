interface FlexItem {
  svg: string;
  height?: number;
}

export function flexLayout(params: {
  items: FlexItem[];
  direction?: "column" | "row";
  gap?: number;
  startX?: number;
  startY?: number;
}): string {
  const { items, direction = "column", gap = 0, startX = 0, startY = 0 } = params;

  let offset = 0;
  const parts: string[] = [];

  for (const item of items) {
    const x = direction === "row" ? startX + offset : startX;
    const y = direction === "column" ? startY + offset : startY;

    parts.push(`<g transform="translate(${x}, ${y})">${item.svg}</g>`);
    offset += (item.height ?? 25) + gap;
  }

  return parts.join("\n");
}

export function measureFlexHeight(items: FlexItem[], gap: number = 0): number {
  if (items.length === 0) return 0;
  return items.reduce((sum, item) => sum + (item.height ?? 25), 0) + gap * (items.length - 1);
}
