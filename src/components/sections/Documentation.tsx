import { PROD_DOMAIN } from "@/constants";
import { CopyIcon, CheckIcon } from "@/components/icons";
import type { DocSectionProps, DocParamProps } from "@/types";

function DocSection({ title, endpoint, children }: DocSectionProps) {
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

function DocParam({ name, desc, required }: DocParamProps) {
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

interface QuickStartBlockProps {
  username: string;
  theme: string;
  langsLayout: string;
  showIcons: boolean;
  hideBorder: boolean;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

function QuickStartBlock({
  username,
  theme,
  langsLayout,
  showIcons,
  hideBorder,
  copiedId,
  onCopy,
}: QuickStartBlockProps) {
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
                copiedId === line.id
                  ? "bg-green-600 text-white"
                  : "bg-[#21262d] text-[#8b949e] hover:bg-[#30363d] hover:text-white"
              }`}
            >
              {copiedId === line.id ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

interface DocumentationProps {
  username: string;
  theme: string;
  langsLayout: string;
  showIcons: boolean;
  hideBorder: boolean;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

export function Documentation({
  username,
  theme,
  langsLayout,
  showIcons,
  hideBorder,
  copiedId,
  onCopy,
}: DocumentationProps) {
  return (
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
            copiedId={copiedId}
            onCopy={onCopy}
          />
        </div>
      </div>
    </section>
  );
}
