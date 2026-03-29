import { THEMES, LANGS_LAYOUTS } from "@/constants";
import type { LangsLayout, Theme } from "@/constants";

interface CustomizeBarProps {
  theme: string;
  langsLayout: string;
  showIcons: boolean;
  hideBorder: boolean;
  onThemeChange: (theme: Theme) => void;
  onLangsLayoutChange: (layout: LangsLayout) => void;
  onShowIconsChange: (value: boolean) => void;
  onHideBorderChange: (value: boolean) => void;
}

export function CustomizeBar({
  theme,
  langsLayout,
  showIcons,
  hideBorder,
  onThemeChange,
  onLangsLayoutChange,
  onShowIconsChange,
  onHideBorderChange,
}: CustomizeBarProps) {
  return (
    <div className="bg-[#161b22] rounded-xl p-5 border border-[#21262d]">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-medium text-[#8b949e] mb-1">
            Theme
          </label>
          <select
            value={theme}
            onChange={(e) => onThemeChange(e.target.value as Theme)}
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
            onChange={(e) =>
              onLangsLayoutChange(e.target.value as LangsLayout)
            }
            className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
          >
            {LANGS_LAYOUTS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-[#8b949e] cursor-pointer pb-0.5">
          <input
            type="checkbox"
            checked={showIcons}
            onChange={(e) => onShowIconsChange(e.target.checked)}
            className="accent-blue-500"
          />
          Icons
        </label>
        <label className="flex items-center gap-2 text-sm text-[#8b949e] cursor-pointer pb-0.5">
          <input
            type="checkbox"
            checked={hideBorder}
            onChange={(e) => onHideBorderChange(e.target.checked)}
            className="accent-blue-500"
          />
          Borderless
        </label>
      </div>
    </div>
  );
}
