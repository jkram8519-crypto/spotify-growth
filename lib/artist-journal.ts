// Journal public de J.K.RAM, premier artiste Spotlift.
// Pour ajouter une étape ou un résultat : modifie seulement ce fichier.
// Règle : uniquement des faits et des chiffres réels.

export type Step = { date: string; title: string; text: string };
export type Video = { title: string; youtubeId: string };
export type Release = {
  slug: string;
  title: string;
  status: string;
  intro: string;
  links: { label: string; url: string }[];
  pitch?: string;
  videos: Video[];
  steps: Step[];
  results: string[];
};

export const ARTIST = {
  name: 'J.K.RAM',
  city: 'Marseille',
  bio: "Artiste électro indépendant, sans label. J'ai créé Spotlift pour organiser mes propres sorties Spotify, et je documente ici chaque sortie faite avec l'outil : les étapes, les vidéos et les vrais chiffres, même quand ils sont petits.",
  spotifyArtistId: '3fhqwBF7y9ElNA44PKrLFS',
  links: [
    { label: 'Spotify', url: 'https://open.spotify.com/artist/3fhqwBF7y9ElNA44PKrLFS' },
    { label: 'YouTube', url: 'https://www.youtube.com/@J.K.RAM85' },
    { label: 'Instagram', url: 'https://instagram.com/j.k.rams' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@j.k.ra' },
  ],
};

export const RELEASES: Release[] = [
  {
    slug: '8-bit-after-life',
    title: '8-bit After Life',
    status: 'Sortie le 20 novembre 2026',
    intro: "Un titre rétro-électro qui revisite « 8 Bit After Life », sorti en 2024 avec Jeremy Kieffer. Le clip officiel de 2024 a dépassé 66 000 vues sur YouTube. Pour la version 2026, j'ai préparé toute la sortie avec Spotlift.",
    links: [
      { label: 'Pré-enregistrer le titre (pre-save)', url: 'https://distrokid.com/hyperfollow/jkram/8-bit-after-life-rtro-electro-mix' },
      { label: 'Le clip officiel de 2024 sur YouTube', url: 'https://www.youtube.com/watch?v=odKAjagiMCY' },
    ],
    pitch: "Je vous présente « 8-bit After Life », ma création électro qui capture l'essence nostalgique des jeux vidéo rétro. Ce morceau respire l'atmosphère urbaine des années 90 avec ses synthés pixelisés et ses basses qui pulsent comme les rues d'un jeu en 2D. C'est une invitation à revisiter cette époque où les pixels racontaient des histoires captivantes. L'émotion qui s'en dégage ? Une mélancolie électronique teintée d'aventure.",
    videos: [
      { title: 'Les coulisses du clip : 52 plans animés par IA, deux robots, zéro caméra', youtubeId: 'nmCcvSLsO7o' },
      { title: 'Le clip officiel de 2024, avec Jeremy Kieffer', youtubeId: 'odKAjagiMCY' },
    ],
    steps: [
      { date: 'Fin octobre 2026', title: 'Clip et teasers', text: "Clip dans un univers rétro inspiré des années 80, réalisé avec l'IA. Premiers teasers publiés sur TikTok." },
      { date: '27 octobre 2026', title: 'Envoi et pitch', text: "Titre envoyé sur DistroKid, Canvas Spotify ajouté, lien de pre-save HyperFollow créé et pitch envoyé à Spotify for Artists, plus de 3 semaines avant la sortie." },
      { date: '20 novembre 2026', title: 'Sortie', text: 'Sortie sur Spotify et toutes les plateformes.' },
    ],
    results: ['Les chiffres de la sortie seront publiés ici quelques jours après le 20 novembre : écoutes, saves et playlists.'],
  },
  {
    slug: 'nobody-sleeps-tonight',
    title: 'Nobody Sleeps Tonight',
    status: 'Sorti le 31 octobre 2026',
    intro: "Un voyage électro sur la nuit d'Halloween : des revenants qui ne cherchent plus à faire peur, mais à danser jusqu'à l'aube.",
    links: [
      { label: 'Écouter le titre', url: 'https://distrokid.com/hyperfollow/jkram/nobody-sleeps-tonight' },
    ],
    videos: [
      { title: 'La vidéo Halloween', youtubeId: 'UogPW4eWZUI' },
    ],
    steps: [
      { date: 'Fin octobre 2026', title: 'Préparation', text: 'Titre finalisé sous le nom « Nobody Sleeps Tonight », pochette choisie et envoi sur DistroKid.' },
      { date: '31 octobre 2026', title: 'Sortie et vidéo Halloween', text: 'Sortie du titre sur Spotify et toutes les plateformes, le soir d\'Halloween, avec une vidéo de danse publiée sur YouTube, Instagram et TikTok.' },
    ],
    results: ['Les chiffres seront ajoutés ici dès qu\'ils seront disponibles.'],
  },
];
