"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { DEFAULT_THEME } from "@/constants";
import { useMounted } from "@/hooks/useMounted";
import { useClipboard } from "@/hooks/useClipboard";
import { useCardUrls } from "@/hooks/useCardUrls";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/layout/HeroSection";
import { CustomizeBar } from "@/components/layout/CustomizeBar";
import { StickyBar } from "@/components/layout/StickyBar";
import { CardResult } from "@/components/cards/CardResult";
import { RepoPinCard } from "@/components/cards/RepoPinCard";
import { SideBySideCard } from "@/components/cards/SideBySideCard";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { ThemeGallery } from "@/components/sections/ThemeGallery";
import { Documentation } from "@/components/sections/Documentation";
import type { Theme, LangsLayout } from "@/constants";

export default function Home() {
  const mounted = useMounted();
  const { copiedId, copy } = useClipboard();

  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);
  const [showIcons, setShowIcons] = useState(true);
  const [hideBorder, setHideBorder] = useState(true);
  const [langsLayout, setLangsLayout] = useState<string>("compact");
  const [generated, setGenerated] = useState(false);
  const [genKey, setGenKey] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  const cardOptions = useMemo(
    () => ({ username, theme, showIcons, hideBorder, langsLayout }),
    [username, theme, showIcons, hideBorder, langsLayout],
  );
  const urls = useCardUrls(cardOptions);

  const bumpKey = useCallback(() => setGenKey((k) => k + 1), []);

  const handleGenerate = useCallback(() => {
    if (!username.trim()) return;
    setGenerated(true);
    bumpKey();
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [username, bumpKey]);

  const handleThemeChange = useCallback(
    (t: Theme) => {
      setTheme(t);
      if (generated) bumpKey();
    },
    [generated, bumpKey],
  );

  const handleLangsLayoutChange = useCallback(
    (l: LangsLayout) => {
      setLangsLayout(l);
      bumpKey();
    },
    [bumpKey],
  );

  const handleShowIconsChange = useCallback(
    (v: boolean) => {
      setShowIcons(v);
      bumpKey();
    },
    [bumpKey],
  );

  const handleHideBorderChange = useCallback(
    (v: boolean) => {
      setHideBorder(v);
      bumpKey();
    },
    [bumpKey],
  );

  const handleSelectTheme = useCallback(
    (t: string) => {
      setTheme(t);
      if (generated) bumpKey();
    },
    [generated, bumpKey],
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection
          username={username}
          onUsernameChange={setUsername}
          onGenerate={handleGenerate}
        />

        {generated && mounted && (
          <section ref={resultsRef} id="results" className="pb-16 px-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                Your Cards for{" "}
                <span className="text-blue-400">@{username}</span>
              </h3>

              <CustomizeBar
                theme={theme}
                langsLayout={langsLayout}
                showIcons={showIcons}
                hideBorder={hideBorder}
                onThemeChange={handleThemeChange}
                onLangsLayoutChange={handleLangsLayoutChange}
                onShowIconsChange={handleShowIconsChange}
                onHideBorderChange={handleHideBorderChange}
              />

              <CardResult
                key={`stats-${genKey}`}
                title="Stats Card"
                previewSrc={urls.statsPreview}
                markdown={urls.statsHtml}
                copiedId={copiedId}
                onCopy={copy}
                id="stats"
              />

              <CardResult
                key={`langs-${genKey}`}
                title="Top Languages"
                previewSrc={urls.langsPreview}
                markdown={urls.langsHtml}
                copiedId={copiedId}
                onCopy={copy}
                id="langs"
              />

              <RepoPinCard
                pinHtml={urls.pinHtml}
                copiedId={copiedId}
                onCopy={copy}
              />

              <SideBySideCard
                sideBySideHtml={urls.sideBySideHtml}
                copiedId={copiedId}
                onCopy={copy}
              />
            </div>
          </section>
        )}

        <HowItWorks />
        <Features />

        <ThemeGallery
          username={username}
          generated={generated}
          onSelectTheme={handleSelectTheme}
          mounted={mounted}
        />

        <Documentation
          username={username}
          theme={theme}
          langsLayout={langsLayout}
          showIcons={showIcons}
          hideBorder={hideBorder}
          copiedId={copiedId}
          onCopy={copy}
        />
      </main>

      <Footer hasExtraPadding={generated} />

      {generated && mounted && (
        <StickyBar
          username={username}
          statsHtml={urls.statsHtml}
          langsHtml={urls.langsHtml}
          pinHtml={urls.pinHtml}
          sideBySideHtml={urls.sideBySideHtml}
          copiedId={copiedId}
          onCopy={copy}
        />
      )}
    </div>
  );
}
