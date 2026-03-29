import type { CodeBlockProps } from "@/types";

export function CodeBlock({ children, className = "" }: CodeBlockProps) {
  return (
    <pre
      className={`bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-xs text-[#c9d1d9] overflow-x-auto whitespace-pre-wrap break-all ${className}`}
    >
      {children}
    </pre>
  );
}
