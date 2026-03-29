"use client";

import { useState, useEffect } from "react";

export function useMounted(delayMs = 100) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return mounted;
}
