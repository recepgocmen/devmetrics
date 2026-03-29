import type { CopyButtonProps } from "@/types";

export function CopyButton({
  copied,
  onClick,
  label = "Copy",
}: CopyButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
        copied
          ? "bg-green-600 text-white"
          : "bg-[#21262d] text-[#8b949e] hover:bg-[#30363d]"
      }`}
    >
      {copied ? "Copied!" : label}
    </button>
  );
}
