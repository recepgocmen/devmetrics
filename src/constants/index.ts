export const PROD_DOMAIN = "https://devmetricsforgithub.vercel.app";

export const THEMES = [
  "default",
  "dark",
  "radical",
  "tokyonight",
  "dracula",
  "nord",
  "gruvbox",
  "monokai",
  "cobalt",
  "synthwave",
  "midnight",
  "ocean",
  "sunset",
  "forest",
  "rose",
  "highcontrast",
  "catppuccin",
  "ember",
  "arctic",
  "transparent",
] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "tokyonight";

export const LANGS_LAYOUTS = [
  { value: "normal", label: "Normal" },
  { value: "compact", label: "Compact" },
  { value: "donut", label: "Donut" },
  { value: "pie", label: "Pie" },
] as const;

export type LangsLayout = (typeof LANGS_LAYOUTS)[number]["value"];

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export const NAV_LINKS: readonly NavLink[] = [
  { href: "#how-to-use", label: "How It Works" },
  { href: "#themes", label: "Themes" },
  { href: "#docs", label: "Docs" },
  {
    href: "https://github.com/recepgocmen/devmetrics",
    label: "GitHub",
    external: true,
  },
];

export const STEPS = [
  {
    step: 1,
    title: "Enter Username",
    desc: "Type your GitHub username in the input above.",
  },
  {
    step: 2,
    title: "Pick a Theme",
    desc: "Choose from 20 built-in themes to match your style.",
  },
  {
    step: 3,
    title: "Copy the Code",
    desc: "Click Copy on any card. We give you ready-to-paste HTML img tags.",
  },
  {
    step: 4,
    title: "Paste in README",
    desc: "Paste the HTML into your GitHub profile README.md and commit.",
  },
] as const;

export const FEATURES = [
  {
    title: "Stats Card",
    desc: "Stars, commits, PRs, issues, and rank all in one beautiful card.",
    icon: "chart" as const,
  },
  {
    title: "Top Languages",
    desc: "Display your most used programming languages with multiple layouts.",
    icon: "code" as const,
  },
  {
    title: "Repo Pins",
    desc: "Pin and showcase individual repositories on your profile.",
    icon: "pin" as const,
  },
] as const;
