export interface CardResultProps {
  title: string;
  previewSrc: string;
  markdown: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
  id: string;
}

export interface StepBoxProps {
  step: number;
  title: string;
  desc: string;
}

export type FeatureIcon = "chart" | "code" | "pin";

export interface FeatureBoxProps {
  title: string;
  desc: string;
  icon: FeatureIcon;
}

export interface DocSectionProps {
  title: string;
  endpoint: string;
  children: React.ReactNode;
}

export interface DocParamProps {
  name: string;
  desc: string;
  required?: boolean;
}

export interface SnippetRowProps {
  label: string;
  markdown: string;
  id: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

export interface CopyButtonProps {
  copied: boolean;
  onClick: () => void;
  label?: string;
}

export interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardOptions {
  username: string;
  theme: string;
  showIcons: boolean;
  hideBorder: boolean;
  langsLayout: string;
}

export interface CardUrls {
  statsUrl: string;
  langsUrl: string;
  pinUrl: string;
  statsPreview: string;
  langsPreview: string;
  statsHtml: string;
  langsHtml: string;
  pinHtml: string;
  sideBySideHtml: string;
}
