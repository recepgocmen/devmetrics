import { CopyButton } from "@/components/ui/CopyButton";
import { CodeBlock } from "@/components/ui/CodeBlock";
import type { CardResultProps } from "@/types";

export function CardResult({
  title,
  previewSrc,
  markdown,
  copiedId,
  onCopy,
  id,
}: CardResultProps) {
  return (
    <div className="bg-[#161b22] rounded-xl border border-[#21262d] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#21262d] flex items-center justify-between">
        <h4 className="text-base font-semibold text-white">{title}</h4>
        <CopyButton
          copied={copiedId === id}
          onClick={() => onCopy(markdown, id)}
          label="Copy HTML"
        />
      </div>
      <div className="p-6 flex flex-col items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={previewSrc} alt={title} className="max-w-full" />
        <CodeBlock className="w-full">{markdown}</CodeBlock>
      </div>
    </div>
  );
}
