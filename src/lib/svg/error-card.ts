import { encodeHTML } from "@/utils/format";

export function renderErrorCard(message: string, width = 495): string {
  const cleanMessage = encodeHTML(
    message
      .replace(/<[^>]*>/g, "")
      .replace(/[\r\n\t]+/g, " ")
      .trim(),
  );

  const maxChars = width < 450 ? 55 : 75;
  const displayMsg =
    cleanMessage.length > maxChars
      ? `${cleanMessage.slice(0, maxChars)}...`
      : cleanMessage;

  return `
<svg width="${width}" height="120" viewBox="0 0 ${width} 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>* { font-family: 'Segoe UI', Ubuntu, 'Helvetica Neue', Sans-Serif; }</style>
  <rect x="0.5" y="0.5" rx="4.5" width="${width - 1}" height="119" fill="#141321" stroke="#e4544e" />
  <text x="25" y="45" fill="#e4544e" font-size="16" font-weight="600">Something went wrong!</text>
  <text x="25" y="75" fill="#a9a9a9" font-size="13">${displayMsg}</text>
</svg>`.trim();
}
