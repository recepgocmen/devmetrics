"use client";

import { useState, useCallback, useRef } from "react";

export function useClipboard(resetMs = 2000) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = useCallback(
    (text: string, id: string) => {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopiedId(null), resetMs);
    },
    [resetMs],
  );

  return { copiedId, copy } as const;
}
