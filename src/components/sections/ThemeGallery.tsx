import { THEMES } from "@/constants";

interface ThemeGalleryProps {
  username: string;
  generated: boolean;
  onSelectTheme: (theme: string) => void;
  mounted: boolean;
}

export function ThemeGallery({
  username,
  generated,
  onSelectTheme,
  mounted,
}: ThemeGalleryProps) {
  return (
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
                  onSelectTheme(t);
                  if (generated) window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-[#161b22] rounded-lg border border-[#21262d] p-3 hover:border-blue-500 transition-colors text-left"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/stats?username=${username || "recepgocmen"}&theme=${t}&show_icons=true&hide_border=true`}
                  alt={`${t} theme preview`}
                  className="w-full rounded"
                  loading="lazy"
                />
                <p className="mt-2 text-sm text-[#8b949e] font-mono">{t}</p>
              </button>
            ))}
        </div>
      </div>
    </section>
  );
}
