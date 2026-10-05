// Le modèle ajoute parfois un titre Markdown ("# Pitch pour ...") ou du gras (**...**).
// Le pitch doit être du texte brut, prêt à coller dans Spotify for Artists ou un email.
export function cleanPitch(text: string): string {
  return text
    .split('\n')
    .filter((line) => !/^\s*#{1,6}\s/.test(line))          // supprime les lignes de titre
    .join('\n')
    .replace(/\*\*(.+?)\*\*/g, '$1')                        // **gras**
    .replace(/__(.+?)__/g, '$1')                            // __gras__
    .replace(/(^|[\s(])\*(\S[^*]*?)\*(?=[\s).,!?;:]|$)/g, '$1$2') // *italique*
    .replace(/^\s*(pitch\s*:)\s*/i, '')                     // "Pitch :" en tête
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
