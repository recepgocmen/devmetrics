"use client";

import { useState, useRef, useEffect } from "react";

const PROD_DOMAIN = "https://devmetricsforgithub.vercel.app";

const THEMES = [
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
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("tokyonight");
  const [showIcons, setShowIcons] = useState(true);
  const [hideBorder, setHideBorder] = useState(true);
  const [langsLayout, setLangsLayout] = useState("compact");
  const [generated, setGenerated] = useState(false);
  const [genKey, setGenKey] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [stickyOpen, setStickyOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  function buildParams(extra: Record<string, string> = {}) {
    const p = new URLSearchParams();
    p.set("username", username);
    p.set("theme", theme);
    if (showIcons) p.set("show_icons", "true");
    if (hideBorder) p.set("hide_border", "true");
    for (const [k, v] of Object.entries(extra)) p.set(k, v);
    return p.toString();
  }

  const statsUrl = `${PROD_DOMAIN}/api/stats?${buildParams()}`;
  const langsUrl = `${PROD_DOMAIN}/api/top-langs?${buildParams({ layout: langsLayout })}`;
  const pinExample = `${PROD_DOMAIN}/api/pin?${buildParams({ repo: "REPO_NAME" })}`;

  const statsPreview = `/api/stats?${buildParams()}`;
  const langsPreview = `/api/top-langs?${buildParams({ layout: langsLayout })}`;

  const statsHtml = `<img src="${statsUrl}" alt="GitHub Stats" />`;
  const langsHtml = `<img src="${langsUrl}" alt="Top Languages" />`;
  const pinHtml = `<img src="${pinExample}" alt="Repo Card" />`;
  const sideBySideHtml = `<p>\n  <img width="48%" src="${statsUrl}" alt="GitHub Stats" />\n  <img width="48%" src="${langsUrl}" alt="Top Languages" />\n</p>`;

  function handleGenerate() {
    if (!username.trim()) return;
    setGenerated(true);
    setGenKey((k) => k + 1);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[#21262d] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              D
            </div>
            <h1 className="text-xl font-bold text-white">DevMetrics</h1>
          </div>
          <nav className="flex items-center gap-6 text-sm text-[#8b949e]">
            <a
              href="#how-to-use"
              className="hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a href="#themes" className="hover:text-white transition-colors">
              Themes
            </a>
            <a href="#docs" className="hover:text-white transition-colors">
              Docs
            </a>
            <a
              href="https://github.com/recepgocmen/devmetrics"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero - Generator */}
        <section className="py-16 sm:py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              Generate Your
              <br />
              <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                GitHub Stats Cards
              </span>
            </h2>
            <p className="text-lg text-[#8b949e] mb-10 max-w-lg mx-auto">
              Enter your GitHub username, pick a theme, and get ready-to-use
              markdown for your profile README. Free and open source.
            </p>

            <div className="flex gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b949e]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  className="w-full pl-10 pr-4 py-3.5 bg-[#0d1117] border border-[#30363d] rounded-xl text-white text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-[#484f58]"
                  placeholder="Enter GitHub username"
                />
              </div>
              <button
                onClick={handleGenerate}
                disabled={!username.trim()}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                Generate
              </button>
            </div>
          </div>
        </section>

        {/* Results */}
        {generated && mounted && (
          <section ref={resultsRef} id="results" className="pb-16 px-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                Your Cards for{" "}
                <span className="text-blue-400">@{username}</span>
              </h3>

              {/* Customize bar */}
              <div className="bg-[#161b22] rounded-xl p-5 border border-[#21262d]">
                <div className="flex flex-wrap items-end gap-4">
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-medium text-[#8b949e] mb-1">
                      Theme
                    </label>
                    <select
                      value={theme}
                      onChange={(e) => {
                        setTheme(e.target.value);
                        setGenKey((k) => k + 1);
                      }}
                      className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    >
                      {THEMES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-medium text-[#8b949e] mb-1">
                      Languages Layout
                    </label>
                    <select
                      value={langsLayout}
                      onChange={(e) => {
                        setLangsLayout(e.target.value);
                        setGenKey((k) => k + 1);
                      }}
                      className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="normal">Normal</option>
                      <option value="compact">Compact</option>
                      <option value="donut">Donut</option>
                      <option value="pie">Pie</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-[#8b949e] cursor-pointer pb-0.5">
                    <input
                      type="checkbox"
                      checked={showIcons}
                      onChange={(e) => {
                        setShowIcons(e.target.checked);
                        setGenKey((k) => k + 1);
                      }}
                      className="accent-blue-500"
                    />
                    Icons
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#8b949e] cursor-pointer pb-0.5">
                    <input
                      type="checkbox"
                      checked={hideBorder}
                      onChange={(e) => {
                        setHideBorder(e.target.checked);
                        setGenKey((k) => k + 1);
                      }}
                      className="accent-blue-500"
                    />
                    Borderless
                  </label>
                </div>
              </div>

              {/* Stats Card */}
              <CardResult
                key={`stats-${genKey}`}
                title="Stats Card"
                previewSrc={statsPreview}
                markdown={statsHtml}
                copied={copied}
                onCopy={copyToClipboard}
                id="stats"
              />

              {/* Top Languages */}
              <CardResult
                key={`langs-${genKey}`}
                title="Top Languages"
                previewSrc={langsPreview}
                markdown={langsHtml}
                copied={copied}
                onCopy={copyToClipboard}
                id="langs"
              />

              {/* Repo Pin */}
              <div className="bg-[#161b22] rounded-xl border border-[#21262d] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#21262d] flex items-center justify-between">
                  <h4 className="text-base font-semibold text-white">
                    Repo Pin Card
                  </h4>
                  <button
                    onClick={() => copyToClipboard(pinHtml, "pin")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      copied === "pin"
                        ? "bg-green-600 text-white"
                        : "bg-[#21262d] text-[#8b949e] hover:bg-[#30363d]"
                    }`}
                  >
                    {copied === "pin" ? "Copied!" : "Copy Markdown"}
                  </button>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-[#8b949e] mb-3">
                    To pin a specific repo, replace{" "}
                    <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-xs">
                      REPO_NAME
                    </code>{" "}
                    with your repository name:
                  </p>
                  <pre className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-xs text-[#c9d1d9] overflow-x-auto whitespace-pre-wrap break-all">
                    {pinHtml}
                  </pre>
                </div>
              </div>

              {/* Side by side */}
              <div className="bg-[#161b22] rounded-xl border border-[#21262d] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#21262d] flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-white">
                      Side by Side Layout
                    </h4>
                    <p className="text-xs text-[#8b949e] mt-0.5">
                      Stats + Languages next to each other
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(sideBySideHtml, "side")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      copied === "side"
                        ? "bg-green-600 text-white"
                        : "bg-[#21262d] text-[#8b949e] hover:bg-[#30363d]"
                    }`}
                  >
                    {copied === "side" ? "Copied!" : "Copy HTML"}
                  </button>
                </div>
                <div className="px-6 py-4">
                  <pre className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-xs text-[#c9d1d9] overflow-x-auto whitespace-pre-wrap break-all">
                    {sideBySideHtml}
                  </pre>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How to Use */}
        <section
          id="how-to-use"
          className="py-16 px-6 border-t border-[#21262d]"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-10 text-center">
              How It Works
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StepBox
                step={1}
                title="Enter Username"
                desc="Type your GitHub username in the input above."
              />
              <StepBox
                step={2}
                title="Pick a Theme"
                desc="Choose from 20 built-in themes to match your style."
              />
              <StepBox
                step={3}
                title="Copy the Code"
                desc="Click Copy on any card. We give you ready-to-paste HTML img tags."
              />
              <StepBox
                step={4}
                title="Paste in README"
                desc="Paste the HTML into your GitHub profile README.md and commit."
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-6 border-t border-[#21262d]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureBox
              title="Stats Card"
              desc="Stars, commits, PRs, issues, and rank all in one beautiful card."
              icon="chart"
            />
            <FeatureBox
              title="Top Languages"
              desc="Display your most used programming languages with multiple layouts."
              icon="code"
            />
            <FeatureBox
              title="Repo Pins"
              desc="Pin and showcase individual repositories on your profile."
              icon="pin"
            />
          </div>
        </section>

        {/* Theme Gallery */}
        <section id="themes" className="py-16 px-6 border-t border-[#21262d]">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-2 text-center">
              Theme Gallery
            </h3>
            <p className="text-[#8b949e] text-center mb-10">
              {THEMES.length} built-in themes to match your style
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mounted &&
                THEMES.filter((t) => t !== "transparent").map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTheme(t);
                      if (generated) setGenKey((k) => k + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-[#161b22] rounded-lg border border-[#21262d] p-3 hover:border-blue-500 transition-colors text-left"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/stats?username=${username || "recepgocmen"}&theme=${t}&show_icons=true&hide_border=true`}
                      alt={`${t} theme`}
                      className="w-full rounded"
                      loading="lazy"
                    />
                    <p className="mt-2 text-sm text-[#8b949e] font-mono">{t}</p>
                  </button>
                ))}
            </div>
          </div>
        </section>

        {/* Docs */}
        <section id="docs" className="py-16 px-6 border-t border-[#21262d]">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-10 text-center">
              Documentation
            </h3>

            <div className="space-y-12">
              <DocSection title="Stats Card" endpoint="/api/stats">
                <DocParam name="username" required desc="GitHub username" />
                <DocParam
                  name="theme"
                  desc="Card theme (default, dark, radical, tokyonight, ...)"
                />
                <DocParam
                  name="show_icons"
                  desc="Show icons beside stats (true/false)"
                />
                <DocParam
                  name="hide_border"
                  desc="Hide card border (true/false)"
                />
                <DocParam
                  name="hide_rank"
                  desc="Hide rank circle (true/false)"
                />
                <DocParam
                  name="hide"
                  desc="Comma-separated stats to hide (stars,commits,prs,issues,contribs)"
                />
                <DocParam name="custom_title" desc="Custom card title" />
                <DocParam
                  name="title_color"
                  desc="Title color hex (without #)"
                />
                <DocParam name="text_color" desc="Text color hex" />
                <DocParam name="icon_color" desc="Icon color hex" />
                <DocParam
                  name="bg_color"
                  desc="Background color hex or gradient (angle,color1,color2)"
                />
                <DocParam name="border_color" desc="Border color hex" />
                <DocParam name="ring_color" desc="Rank ring color hex" />
                <DocParam
                  name="cache_seconds"
                  desc="Cache duration in seconds (min 1800)"
                />
                <DocParam
                  name="disable_animations"
                  desc="Disable animations (true/false)"
                />
              </DocSection>

              <DocSection title="Top Languages" endpoint="/api/top-langs">
                <DocParam name="username" required desc="GitHub username" />
                <DocParam name="theme" desc="Card theme" />
                <DocParam
                  name="layout"
                  desc="Layout: normal, compact, donut, pie"
                />
                <DocParam
                  name="langs_count"
                  desc="Number of languages to show (default: 5)"
                />
                <DocParam
                  name="hide"
                  desc="Comma-separated languages to hide"
                />
                <DocParam
                  name="exclude_repo"
                  desc="Comma-separated repos to exclude"
                />
                <DocParam name="hide_border" desc="Hide card border" />
                <DocParam
                  name="cache_seconds"
                  desc="Cache duration in seconds"
                />
              </DocSection>

              <DocSection title="Repo Pin" endpoint="/api/pin">
                <DocParam name="username" required desc="Repository owner" />
                <DocParam name="repo" required desc="Repository name" />
                <DocParam name="theme" desc="Card theme" />
                <DocParam
                  name="show_owner"
                  desc="Show owner name (true/false)"
                />
                <DocParam name="hide_border" desc="Hide card border" />
                <DocParam
                  name="description_lines"
                  desc="Number of description lines (default: 2)"
                />
                <DocParam
                  name="cache_seconds"
                  desc="Cache duration in seconds"
                />
              </DocSection>

              <QuickStartBlock
                username={username || "YOUR_USERNAME"}
                theme={theme}
                langsLayout={langsLayout}
                showIcons={showIcons}
                hideBorder={hideBorder}
                copied={copied}
                onCopy={copyToClipboard}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`border-t border-[#21262d] py-6 px-6 ${generated ? "pb-20" : ""}`}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#8b949e]">
          <p>DevMetrics &mdash; Free GitHub profile stats generator</p>
          <p>
            Built by{" "}
            <a
              href="https://github.com/recepgocmen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              @recepgocmen
            </a>
          </p>
        </div>
      </footer>

      {/* Sticky bottom bar */}
      {generated && mounted && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          {stickyOpen && (
            <div className="bg-[#161b22] border-t border-[#30363d] shadow-2xl shadow-black/50 px-6 py-4 max-h-[60vh] overflow-y-auto">
              <div className="max-w-4xl mx-auto space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white">
                    Quick Copy for{" "}
                    <span className="text-blue-400">@{username}</span>
                  </h4>
                  <button
                    onClick={() => setStickyOpen(false)}
                    className="text-[#8b949e] hover:text-white text-lg leading-none"
                  >
                    &times;
                  </button>
                </div>
                <SnippetRow
                  label="Stats"
                  markdown={statsHtml}
                  id="qs-stats"
                  copied={copied}
                  onCopy={copyToClipboard}
                />
                <SnippetRow
                  label="Languages"
                  markdown={langsHtml}
                  id="qs-langs"
                  copied={copied}
                  onCopy={copyToClipboard}
                />
                <SnippetRow
                  label="Repo Pin"
                  markdown={pinHtml}
                  id="qs-pin"
                  copied={copied}
                  onCopy={copyToClipboard}
                />
                <div className="pt-1">
                  <button
                    onClick={() => copyToClipboard(sideBySideHtml, "qs-side")}
                    className={`w-full py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      copied === "qs-side"
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {copied === "qs-side"
                      ? "Copied!"
                      : "Copy Side by Side (Stats + Languages)"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {!stickyOpen && (
            <button
              onClick={() => setStickyOpen(true)}
              className="w-full bg-[#161b22] border-t border-[#30363d] shadow-2xl shadow-black/50 px-6 py-3 flex items-center justify-center gap-2 text-sm font-medium text-white hover:bg-[#1c2129] transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Quick Copy Markdown for @{username}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────── */

function CardResult({
  title,
  previewSrc,
  markdown,
  copied,
  onCopy,
  id,
}: {
  title: string;
  previewSrc: string;
  markdown: string;
  copied: string | null;
  onCopy: (text: string, id: string) => void;
  id: string;
}) {
  return (
    <div className="bg-[#161b22] rounded-xl border border-[#21262d] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#21262d] flex items-center justify-between">
        <h4 className="text-base font-semibold text-white">{title}</h4>
        <button
          onClick={() => onCopy(markdown, id)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            copied === id
              ? "bg-green-600 text-white"
              : "bg-[#21262d] text-[#8b949e] hover:bg-[#30363d]"
          }`}
        >
          {copied === id ? "Copied!" : "Copy HTML"}
        </button>
      </div>
      <div className="p-6 flex flex-col items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={previewSrc} alt={title} className="max-w-full" />
        <pre className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-xs text-[#c9d1d9] overflow-x-auto whitespace-pre-wrap break-all">
          {markdown}
        </pre>
      </div>
    </div>
  );
}

function StepBox({
  step,
  title,
  desc,
}: {
  step: number;
  title: string;
  desc: string;
}) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm mx-auto mb-3">
        {step}
      </div>
      <h4 className="text-base font-semibold text-white mb-1">{title}</h4>
      <p className="text-sm text-[#8b949e] leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureBox({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  const iconMap: Record<string, string> = {
    chart: "M3 3v18h18M9 17V9m4 8V5m4 12v-4",
    code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
    pin: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
  };

  return (
    <div className="bg-[#161b22] rounded-xl p-6 border border-[#21262d] hover:border-[#30363d] transition-colors">
      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={iconMap[icon]} />
        </svg>
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-[#8b949e] leading-relaxed">{desc}</p>
    </div>
  );
}

function DocSection({
  title,
  endpoint,
  children,
}: {
  title: string;
  endpoint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#161b22] rounded-xl border border-[#21262d] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#21262d] flex items-center gap-3">
        <h4 className="text-lg font-bold text-white">{title}</h4>
        <code className="text-sm text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
          GET {endpoint}
        </code>
      </div>
      <div className="px-6 py-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[#8b949e] text-left border-b border-[#21262d]">
              <th className="pb-2 font-medium">Parameter</th>
              <th className="pb-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function DocParam({
  name,
  desc,
  required,
}: {
  name: string;
  desc: string;
  required?: boolean;
}) {
  return (
    <tr>
      <td className="py-2.5 pr-4">
        <code className="text-sm text-[#c9d1d9] font-mono">{name}</code>
        {required && (
          <span className="ml-1.5 text-xs text-red-400 font-medium">
            required
          </span>
        )}
      </td>
      <td className="py-2.5 text-[#8b949e]">{desc}</td>
    </tr>
  );
}

function SnippetRow({
  label,
  markdown,
  id,
  copied,
  onCopy,
}: {
  label: string;
  markdown: string;
  id: string;
  copied: string | null;
  onCopy: (text: string, id: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-[#8b949e] w-20 shrink-0">
        {label}
      </span>
      <pre className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-xs text-[#c9d1d9] overflow-x-auto whitespace-nowrap">
        {markdown}
      </pre>
      <button
        onClick={() => onCopy(markdown, id)}
        className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
          copied === id
            ? "bg-green-600 text-white"
            : "bg-[#21262d] text-[#8b949e] hover:bg-[#30363d]"
        }`}
      >
        {copied === id ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

function QuickStartBlock({
  username,
  theme,
  langsLayout,
  showIcons,
  hideBorder,
  copied,
  onCopy,
}: {
  username: string;
  theme: string;
  langsLayout: string;
  showIcons: boolean;
  hideBorder: boolean;
  copied: string | null;
  onCopy: (text: string, id: string) => void;
}) {
  const u = username || "YOUR_USERNAME";
  const extras = [
    showIcons ? "show_icons=true" : "",
    hideBorder ? "hide_border=true" : "",
  ]
    .filter(Boolean)
    .join("&");
  const amp = extras ? `&${extras}` : "";

  const statsUrl = `${PROD_DOMAIN}/api/stats?username=${u}&theme=${theme}${amp}`;
  const langsUrl = `${PROD_DOMAIN}/api/top-langs?username=${u}&theme=${theme}&layout=${langsLayout}${amp}`;
  const pinUrl = `${PROD_DOMAIN}/api/pin?username=${u}&theme=${theme}&repo=REPO_NAME${amp}`;

  const lines = [
    {
      label: "Stats Card",
      id: "doc-stats",
      md: `<img src="${statsUrl}" alt="GitHub Stats" />`,
    },
    {
      label: "Top Languages",
      id: "doc-langs",
      md: `<img src="${langsUrl}" alt="Top Languages" />`,
    },
    {
      label: "Side by Side",
      id: "doc-side",
      md: `<p>\n  <img width="48%" src="${statsUrl}" alt="GitHub Stats" />\n  <img width="48%" src="${langsUrl}" alt="Top Languages" />\n</p>`,
    },
    {
      label: "Repo Pin",
      id: "doc-pin",
      md: `<img src="${pinUrl}" alt="Repo Card" />`,
    },
  ];

  return (
    <div className="bg-[#161b22] rounded-xl p-6 border border-[#21262d]">
      <h4 className="text-lg font-bold text-white mb-3">Quick Start</h4>
      <p className="text-sm text-[#8b949e] mb-4">
        Add these to your GitHub profile README.md
        {u !== "YOUR_USERNAME" && (
          <>
            {" "}
            (ready for <span className="text-blue-400 font-medium">@{u}</span>)
          </>
        )}
        :
      </p>
      <div className="space-y-3">
        {lines.map((line) => (
          <div key={line.id} className="flex items-start gap-3">
            <pre className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2.5 text-xs text-[#c9d1d9] overflow-x-auto whitespace-pre-wrap break-all">
              {line.md}
            </pre>
            <button
              onClick={() => onCopy(line.md, line.id)}
              title={`Copy ${line.label}`}
              className={`shrink-0 mt-1 p-2 rounded-lg transition-colors ${
                copied === line.id
                  ? "bg-green-600 text-white"
                  : "bg-[#21262d] text-[#8b949e] hover:bg-[#30363d] hover:text-white"
              }`}
            >
              {copied === line.id ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
