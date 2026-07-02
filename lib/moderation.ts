// lib/moderation.ts
// Modération simple : filtre par mots-clés. Aucune API, aucune config.

const BLOCKED_TERMS: string[] = [
  "connard", "salope", "enculé", "encule", "pute", "batard",
  "negre", "bougnoule", "youpin", "bicot", "sale arabe", "sale noir",
  "sale juif", "sale blanc", "sale race",
  "mort aux",
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function isClean(text: string): boolean {
  if (!text) return true;
  const normalized = normalize(text);
  return !BLOCKED_TERMS.some((term) => normalized.includes(normalize(term)));
}
