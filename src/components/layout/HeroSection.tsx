import { GithubIcon } from "@/components/icons";

interface HeroSectionProps {
  username: string;
  onUsernameChange: (value: string) => void;
  onGenerate: () => void;
}

export function HeroSection({
  username,
  onUsernameChange,
  onGenerate,
}: HeroSectionProps) {
  return (
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
              <GithubIcon />
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onGenerate()}
              className="w-full pl-10 pr-4 py-3.5 bg-[#0d1117] border border-[#30363d] rounded-xl text-white text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-[#484f58]"
              placeholder="Enter GitHub username"
            />
          </div>
          <button
            onClick={onGenerate}
            disabled={!username.trim()}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors whitespace-nowrap"
          >
            Generate
          </button>
        </div>
      </div>
    </section>
  );
}
