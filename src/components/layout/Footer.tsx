interface FooterProps {
  hasExtraPadding?: boolean;
}

export function Footer({ hasExtraPadding }: FooterProps) {
  return (
    <footer
      className={`border-t border-[#21262d] py-6 px-6 ${hasExtraPadding ? "pb-20" : ""}`}
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
  );
}
