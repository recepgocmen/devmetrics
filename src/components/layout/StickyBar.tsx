"use client";

import { useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { CopyIcon, ChevronUpIcon } from "@/components/icons";

interface SnippetRowProps {
  label: string;
  markdown: string;
  id: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

function SnippetRow({ label, markdown, id, copiedId, onCopy }: SnippetRowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-[#8b949e] w-20 shrink-0">
        {label}
      </span>
      <pre className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-xs text-[#c9d1d9] overflow-x-auto whitespace-nowrap">
        {markdown}
      </pre>
      <CopyButton
        copied={copiedId === id}
        onClick={() => onCopy(markdown, id)}
      />
    </div>
  );
}

interface StickyBarProps {
  username: string;
  statsHtml: string;
  langsHtml: string;
  pinHtml: string;
  sideBySideHtml: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

export function StickyBar({
  username,
  statsHtml,
  langsHtml,
  pinHtml,
  sideBySideHtml,
  copiedId,
  onCopy,
}: StickyBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {open && (
        <div className="bg-[#161b22] border-t border-[#30363d] shadow-2xl shadow-black/50 px-6 py-4 max-h-[60vh] overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-white">
                Quick Copy for{" "}
                <span className="text-blue-400">@{username}</span>
              </h4>
              <button
                onClick={() => setOpen(false)}
                className="text-[#8b949e] hover:text-white text-lg leading-none"
                aria-label="Close quick copy panel"
              >
                &times;
              </button>
            </div>
            <SnippetRow
              label="Stats"
              markdown={statsHtml}
              id="qs-stats"
              copiedId={copiedId}
              onCopy={onCopy}
            />
            <SnippetRow
              label="Languages"
              markdown={langsHtml}
              id="qs-langs"
              copiedId={copiedId}
              onCopy={onCopy}
            />
            <SnippetRow
              label="Repo Pin"
              markdown={pinHtml}
              id="qs-pin"
              copiedId={copiedId}
              onCopy={onCopy}
            />
            <div className="pt-1">
              <button
                onClick={() => onCopy(sideBySideHtml, "qs-side")}
                className={`w-full py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  copiedId === "qs-side"
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {copiedId === "qs-side"
                  ? "Copied!"
                  : "Copy Side by Side (Stats + Languages)"}
              </button>
            </div>
          </div>
        </div>
      )}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-[#161b22] border-t border-[#30363d] shadow-2xl shadow-black/50 px-6 py-3 flex items-center justify-center gap-2 text-sm font-medium text-white hover:bg-[#1c2129] transition-colors"
        >
          <CopyIcon />
          Quick Copy Markdown for @{username}
          <ChevronUpIcon className="ml-1" />
        </button>
      )}
    </div>
  );
}
