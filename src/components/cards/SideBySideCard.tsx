import { CopyButton } from "@/components/ui/CopyButton";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface SideBySideCardProps {
  sideBySideHtml: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

export function SideBySideCard({
  sideBySideHtml,
  copiedId,
  onCopy,
}: SideBySideCardProps) {
  return (
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
        <CopyButton
          copied={copiedId === "side"}
          onClick={() => onCopy(sideBySideHtml, "side")}
          label="Copy HTML"
        />
      </div>
      <div className="px-6 py-4">
        <CodeBlock>{sideBySideHtml}</CodeBlock>
      </div>
    </div>
  );
}
