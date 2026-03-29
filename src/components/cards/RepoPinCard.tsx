import { CopyButton } from "@/components/ui/CopyButton";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface RepoPinCardProps {
  pinHtml: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

export function RepoPinCard({ pinHtml, copiedId, onCopy }: RepoPinCardProps) {
  return (
    <div className="bg-[#161b22] rounded-xl border border-[#21262d] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#21262d] flex items-center justify-between">
        <h4 className="text-base font-semibold text-white">Repo Pin Card</h4>
        <CopyButton
          copied={copiedId === "pin"}
          onClick={() => onCopy(pinHtml, "pin")}
          label="Copy Markdown"
        />
      </div>
      <div className="px-6 py-4">
        <p className="text-sm text-[#8b949e] mb-3">
          To pin a specific repo, replace{" "}
          <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-xs">
            REPO_NAME
          </code>{" "}
          with your repository name:
        </p>
        <CodeBlock>{pinHtml}</CodeBlock>
      </div>
    </div>
  );
}
