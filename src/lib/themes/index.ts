export interface Theme {
  titleColor: string;
  textColor: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  ringColor?: string;
}

export const themes: Record<string, Theme> = {
  default: {
    titleColor: "#2f80ed",
    textColor: "#434d58",
    iconColor: "#4c71f2",
    bgColor: "#fffefe",
    borderColor: "#e4e2e2",
  },
  dark: {
    titleColor: "#fff",
    textColor: "#9f9f9f",
    iconColor: "#79ff97",
    bgColor: "#151515",
    borderColor: "#e4e2e2",
  },
  radical: {
    titleColor: "#fe428e",
    textColor: "#a9fef7",
    iconColor: "#f8d847",
    bgColor: "#141321",
    borderColor: "#fe428e",
  },
  tokyonight: {
    titleColor: "#70a5fd",
    textColor: "#38bdae",
    iconColor: "#bf91f3",
    bgColor: "#1a1b27",
    borderColor: "#70a5fd",
  },
  dracula: {
    titleColor: "#ff6e96",
    textColor: "#f8f8f2",
    iconColor: "#bd93f9",
    bgColor: "#282a36",
    borderColor: "#6272a4",
  },
  nord: {
    titleColor: "#81a1c1",
    textColor: "#d8dee9",
    iconColor: "#88c0d0",
    bgColor: "#2e3440",
    borderColor: "#4c566a",
  },
  gruvbox: {
    titleColor: "#fabd2f",
    textColor: "#ebdbb2",
    iconColor: "#fe8019",
    bgColor: "#282828",
    borderColor: "#504945",
  },
  monokai: {
    titleColor: "#eb1f6a",
    textColor: "#f1f1eb",
    iconColor: "#e28905",
    bgColor: "#272822",
    borderColor: "#69633e",
  },
  cobalt: {
    titleColor: "#e683d9",
    textColor: "#75eeb2",
    iconColor: "#0480ef",
    bgColor: "#193549",
    borderColor: "#0480ef",
  },
  synthwave: {
    titleColor: "#e2e9ec",
    textColor: "#e5289e",
    iconColor: "#ef8539",
    bgColor: "#2b213a",
    borderColor: "#e5289e",
  },
  midnight: {
    titleColor: "#c9d1d9",
    textColor: "#8b949e",
    iconColor: "#58a6ff",
    bgColor: "#0d1117",
    borderColor: "#30363d",
  },
  ocean: {
    titleColor: "#8be9fd",
    textColor: "#ccd6dd",
    iconColor: "#50fa7b",
    bgColor: "#0a192f",
    borderColor: "#172a45",
  },
  sunset: {
    titleColor: "#ff6b6b",
    textColor: "#ffeaa7",
    iconColor: "#fd79a8",
    bgColor: "#2d1b69",
    borderColor: "#6c5ce7",
  },
  forest: {
    titleColor: "#a8e6cf",
    textColor: "#dcedc1",
    iconColor: "#ffd3b6",
    bgColor: "#1a3c34",
    borderColor: "#2d6a4f",
  },
  rose: {
    titleColor: "#f43f5e",
    textColor: "#fda4af",
    iconColor: "#fb923c",
    bgColor: "#1c1917",
    borderColor: "#44403c",
  },
  highcontrast: {
    titleColor: "#e7f216",
    textColor: "#fff",
    iconColor: "#00ffff",
    bgColor: "#000",
    borderColor: "#e7f216",
  },
  transparent: {
    titleColor: "#006AFF",
    textColor: "#417E87",
    iconColor: "#0579C3",
    bgColor: "#ffffff00",
    borderColor: "#0000001a",
  },
  catppuccin: {
    titleColor: "#cba6f7",
    textColor: "#cdd6f4",
    iconColor: "#f5c2e7",
    bgColor: "#1e1e2e",
    borderColor: "#313244",
  },
  ember: {
    titleColor: "#ff4500",
    textColor: "#ffa07a",
    iconColor: "#ff6347",
    bgColor: "#1a0a00",
    borderColor: "#8b2500",
  },
  arctic: {
    titleColor: "#a5d6ff",
    textColor: "#e0f0ff",
    iconColor: "#7ec8e3",
    bgColor: "#0b1929",
    borderColor: "#1e3a5f",
  },
};

export function getThemeColors(themeName?: string | null): Theme {
  if (!themeName) return themes.default;
  return themes[themeName] ?? themes.default;
}

export interface CardColors {
  titleColor: string;
  textColor: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  ringColor: string;
}

export function resolveCardColors(params: {
  theme?: string | null;
  title_color?: string | null;
  text_color?: string | null;
  icon_color?: string | null;
  bg_color?: string | null;
  border_color?: string | null;
  ring_color?: string | null;
}): CardColors {
  const base = getThemeColors(params.theme);
  return {
    titleColor: params.title_color ? `#${params.title_color}` : base.titleColor,
    textColor: params.text_color ? `#${params.text_color}` : base.textColor,
    iconColor: params.icon_color ? `#${params.icon_color}` : base.iconColor,
    bgColor: params.bg_color ? `#${params.bg_color}` : base.bgColor,
    borderColor: params.border_color ? `#${params.border_color}` : base.borderColor,
    ringColor: params.ring_color ? `#${params.ring_color}` : base.ringColor ?? base.titleColor,
  };
}
