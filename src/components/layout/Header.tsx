import { NAV_LINKS } from "@/constants";

export function Header() {
  return (
    <header className="border-b border-[#21262d] px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <h1 className="text-xl font-bold text-white">DevMetrics</h1>
        </div>
        <nav className="flex items-center gap-6 text-sm text-[#8b949e]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
