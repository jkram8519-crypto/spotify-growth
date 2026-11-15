// « Kit prêt à chaque étape » : pour certaines étapes du plan de sortie, l'IA prépare
// le contenu à utiliser tel quel (pitch, posts, scripts, messages aux curateurs…).
// Le kit du pitch est inclus dans l'offre gratuite ; les autres sont réservés à Pro.

export type KitBlock = { label: string; text: string };
export type Kit = { blocks: KitBlock[]; created_at: string };

type KitSpec = {
  button: string; // libellé du bouton dans le plan
  free?: boolean; // disponible sans Pro
  ask: string; // ce que l'IA doit produire (blocs attendus)
};

export const KIT_SPECS: Record<string, KitSpec> = {
  pitch: {
    button: 'Écrire mon pitch',
    free: true,
    ask: `Deux blocs :
1. "Pitch éditorial Spotify" : le texte à coller dans Spotify for Artists, 450 caractères maximum. Ambiance, ce qui rend le titre différent, contexte de l'artiste. À la troisième personne.
2. "Version courte pour les curateurs" : 2 à 3 phrases à la première personne, à coller dans un message.`,
  },
  presave: {
    button: 'Préparer mes textes de pre-save',
    ask: `Deux blocs :
1. "Story pre-save" : 2 lignes très courtes pour une story qui annonce le lien de pré-enregistrement.
2. "Ligne de bio" : une phrase de 80 caractères maximum à mettre dans la bio avec le lien.`,
  },
  annonce: {
    button: 'Préparer mon post d\'annonce',
    ask: `Un bloc par réseau social de l'artiste (titre du bloc = "Post Instagram", "Post TikTok" ou "Post YouTube Shorts") : la légende du post qui annonce la sortie avec la date, 3 à 5 lignes, puis 4 à 6 hashtags pertinents pour le genre.`,
  },
  curateurs: {
    button: 'Préparer mes messages aux curateurs',
    ask: `Trois blocs :
1. "Message en français" : message court (6 lignes max) à un curateur de playlist, avec [Prénom] et [nom de la playlist] à remplacer, le lien d'écoute noté [lien], une phrase sur pourquoi le titre colle à sa playlist. Poli, sans flatterie excessive, sans rien promettre.
2. "Message en anglais" : la même chose en anglais.
3. "Objet de l'email" : 3 propositions d'objet, une par ligne.`,
  },
  extrait1: {
    button: 'Préparer 3 idées de vidéos',
    ask: `Trois blocs "Vidéo 1", "Vidéo 2", "Vidéo 3" : chacune une idée de vidéo de 15 secondes avec le passage du morceau. Pour chacune : le texte à afficher à l'écran dans la première seconde (accroche), ce qu'on voit à l'image (simple à tourner avec un téléphone), et la légende du post. Idées différentes entre elles.`,
  },
  coulisses: {
    button: 'Préparer ma vidéo coulisses',
    ask: `Deux blocs :
1. "Déroulé de la vidéo" : 4 à 5 plans courts numérotés pour une vidéo de 30 secondes qui montre les coulisses du titre (création, studio, mix), avec ce que l'artiste dit ou écrit à l'écran.
2. "Légende" : la légende du post, 2 à 3 lignes.`,
  },
  rappel: {
    button: 'Préparer mes relances',
    ask: `Un bloc "Stories de relance" : 3 textes de story différents, très courts, qui rappellent que le titre sort dans 3 jours et renvoient vers le pre-save. Un par ligne, numérotés.`,
  },
  jourj: {
    button: 'Préparer mes publications du jour J',
    ask: `Trois blocs :
1. "Post de sortie" : la légende du post le jour de la sortie, 3 à 4 lignes, avec un appel à écouter et à enregistrer le titre.
2. "Story" : 2 lignes.
3. "Message à tes proches" : un message direct personnel et simple à envoyer à ses proches avec le lien noté [lien].`,
  },
  merci: {
    button: 'Préparer mon message de remerciement',
    ask: `Un bloc "Post de remerciement" : 3 à 4 lignes qui remercient les auditeurs et ceux qui ont partagé, sans chiffres inventés, avec une invitation à continuer à partager.`,
  },
  relance: {
    button: 'Préparer ma relance aux curateurs',
    ask: `Deux blocs :
1. "Relance en français" : 3 à 4 lignes polies pour relancer un curateur qui n'a pas répondu, avec [Prénom] et [lien].
2. "Relance en anglais" : la même chose en anglais.`,
  },
  bilan: {
    button: 'Préparer ma grille de bilan',
    ask: `Deux blocs :
1. "Les chiffres à noter" : 5 lignes, chacune un chiffre à relever dans Spotify for Artists et où le trouver (sources d'écoute, enregistrements, auditeurs, playlists, pays). Pas de valeurs inventées.
2. "Mes questions de bilan" : 4 questions à se poser pour préparer la prochaine sortie, adaptées au genre.`,
  },
};

export function kitPrompt(taskId: string, ctx: { track: string; genre: string; artist: string; daysLeft: number; networks: string[] }): string {
  const spec = KIT_SPECS[taskId];
  const nets = ctx.networks.length ? ctx.networks.join(', ') : 'Instagram';
  return `Tu aides un artiste indépendant francophone à préparer la sortie de son titre.
Titre : « ${ctx.track} »
Artiste : ${ctx.artist || 'l\'artiste (nom non précisé)'}
Genre : ${ctx.genre}
Réseaux sociaux utilisés : ${nets}
Sortie : ${ctx.daysLeft > 0 ? `dans ${ctx.daysLeft} jours` : ctx.daysLeft === 0 ? 'aujourd\'hui' : `il y a ${-ctx.daysLeft} jours`}

Écris le contenu suivant, prêt à copier-coller :
${spec.ask}

Règles :
- Français naturel et direct (sauf les blocs demandés en anglais), adapté au genre, sans jargon du métier.
- N'invente aucun fait sur l'artiste ou le morceau (pas de collaborations, de chiffres, de récompenses, de passages en radio). Si une info manque, reste général ou laisse un repère entre crochets comme [ton anecdote].
- Aucune promesse de streams, d'abonnés ou d'ajout en playlist.
- Emojis avec modération.
- Réponds UNIQUEMENT avec du JSON valide, sans texte autour, au format :
{"blocks":[{"label":"…","text":"…"}]}
Dans "text", utilise \\n pour les retours à la ligne.`;
}

export function parseKit(raw: string): KitBlock[] {
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start < 0 || end <= start) return [];
  try {
    const data = JSON.parse(raw.slice(start, end + 1));
    if (!Array.isArray(data.blocks)) return [];
    return (data.blocks as Partial<KitBlock>[])
      .filter((b): b is KitBlock => typeof b?.label === 'string' && typeof b?.text === 'string' && b.text.trim() !== '')
      .slice(0, 6)
      .map(b => ({ label: b.label.trim().slice(0, 60), text: b.text.trim().slice(0, 1500) }));
  } catch {
    return [];
  }
}
