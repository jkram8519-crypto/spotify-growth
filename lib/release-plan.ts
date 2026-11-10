// Plan de sortie personnalisé : construit à partir des réponses de l'artiste,
// de J-44 à J+14. Les dates sont calculées depuis la date de sortie ; si la sortie
// est dans moins de 44 jours, les étapes déjà passées sont ramenées à aujourd'hui.

export type PlanAnswers = {
  genre: string;
  distributor: 'none' | 'ready' | 'sent';
  networks: string[];
  sacem: 'yes' | 'no' | 'unknown';
  adsBudget: boolean;
};

export type PlanTask = {
  id: string;
  day: number;
  date: string; // AAAA-MM-JJ
  title: string;
  detail: string;
  tool?: string; // section du tableau de bord à ouvrir
  tip?: string; // conseil IA adapté au genre
  late?: boolean; // étape qui aurait dû être faite avant aujourd'hui
  done: boolean;
};

export const GENRES = [
  'Électro / EDM', 'Rap / Hip-hop', 'Pop', 'R&B / Soul', 'Rock', 'Afro', 'Lo-fi / Chill',
  'Chanson française', 'Reggae / Dancehall', 'Métal', 'Jazz', 'Autre',
];

const NETWORK_LABELS: Record<string, string> = { tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube Shorts' };

export function cleanAnswers(raw: any): PlanAnswers {
  const genre = typeof raw?.genre === 'string' && GENRES.includes(raw.genre) ? raw.genre : 'Autre';
  const distributor = ['none', 'ready', 'sent'].includes(raw?.distributor) ? raw.distributor : 'ready';
  const networks = Array.isArray(raw?.networks) ? raw.networks.filter((n: any) => typeof n === 'string' && n in NETWORK_LABELS) : [];
  const sacem = ['yes', 'no', 'unknown'].includes(raw?.sacem) ? raw.sacem : 'unknown';
  return { genre, distributor, networks, sacem, adsBudget: raw?.adsBudget === true };
}

export function addDays(iso: string, n: number): string {
  const d = new Date(iso + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((new Date(toIso + 'T12:00:00Z').getTime() - new Date(fromIso + 'T12:00:00Z').getTime()) / 86400000);
}

export function todayParis(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Paris' });
}

function list(items: string[]): string {
  if (items.length === 0) return 'tes réseaux';
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(', ') + ' et ' + items[items.length - 1];
}

export function buildPlan(track: string, releaseDate: string, a: PlanAnswers, today: string): PlanTask[] {
  const nets = list(a.networks.map(n => NETWORK_LABELS[n]));
  const daysLeft = daysBetween(today, releaseDate);
  const steps: Omit<PlanTask, 'date' | 'done' | 'late'>[] = [];
  const add = (id: string, day: number, title: string, detail: string, tool?: string) => steps.push({ id, day, title, detail, tool });

  // Titre déjà chez le distributeur : le master et la pochette sont forcément validés.
  if (a.distributor !== 'sent') {
    add('master', -44, 'Valider le master et la pochette',
      `Écoute « ${track} » sur trois supports (casque, téléphone, voiture). Exporte le master final en WAV et prépare une pochette carrée de 3000 × 3000 px.`);
  }

  if (a.distributor === 'none') {
    add('distrib-choix', -42, 'Choisir un distributeur',
      'Sans distributeur, ton titre ne peut pas arriver sur Spotify. Compare deux ou trois offres (prix annuel, part des revenus, délai de mise en ligne) et crée ton compte.');
  }

  add('profil', -38, 'Mettre ton profil Spotify for Artists à jour',
    'Si ce n\'est pas fait, revendique ton profil sur artists.spotify.com. Mets une photo récente, une bio courte et tes liens vers ' + nets + '.');

  if (a.distributor !== 'sent') {
    add('distrib-envoi', -30, 'Envoyer le titre à ton distributeur',
      'Envoie le master, la pochette et les crédits avec ta date de sortie. Vise quatre semaines d\'avance : c\'est ce qui te laisse le temps de pitcher Spotify.');
  }

  if (a.sacem === 'yes') {
    add('sacem', -28, 'Déposer le titre à la SACEM',
      'Déclare l\'œuvre dans ton espace membre, avec la répartition entre auteurs et compositeurs. Sans dépôt, pas de droits d\'auteur sur les écoutes et les diffusions.');
  } else {
    add('sacem', -28, 'Te renseigner sur la SACEM',
      'Les droits d\'auteur ne passent pas par ton distributeur. Regarde sur sacem.fr les conditions d\'adhésion et décide si c\'est le bon moment pour toi.');
  }

  add('pitch', -24, 'Écrire ton pitch',
    'Un texte court qui présente le titre, son ambiance et son histoire. Il te servira pour Spotify et pour les curateurs.', 'pitch');

  if (daysLeft >= 7) {
    add('editorial', -21, 'Pitcher les playlists éditoriales de Spotify',
      'Dès que le titre apparaît dans Spotify for Artists (rubrique « À venir »), soumets-le avec ton pitch. Date limite : 7 jours avant la sortie. Plus tôt, c\'est mieux.');
  } else {
    add('editorial', -21, 'Pitch éditorial Spotify : trop tard pour ce titre',
      'Il reste moins de 7 jours avant la sortie, Spotify n\'accepte plus le pitch. Mets ton énergie sur les curateurs indépendants, et prévois quatre semaines d\'avance pour le prochain titre.');
  }

  add('presave', -18, 'Créer ton lien de pré-enregistrement',
    'Un lien pre-save permet à tes abonnés d\'ajouter le titre avant sa sortie. Mets-le dans ta bio sur ' + nets + '.');

  add('playlists', -16, 'Repérer 15 playlists indépendantes',
    'Cherche des playlists de ton style avec de vrais abonnés et des ajouts récents. Méfie-toi de celles qui font payer un placement.', 'playlists');

  add('annonce', -14, 'Annoncer la sortie',
    `Publie la pochette et la date de « ${track} » sur ${nets}. Une seule information : le titre arrive, voici quand.`, 'contenu');

  add('curateurs', -12, 'Contacter les curateurs',
    'Envoie ton pitch aux playlists repérées : un message court, personnalisé, avec le lien d\'écoute. Note qui tu as contacté.');

  add('extrait1', -10, 'Publier un premier extrait de 15 secondes',
    'Choisis le passage le plus fort du morceau et publie-le sur ' + nets + '.', 'script');

  add('coulisses', -5, 'Montrer les coulisses',
    'Une vidéo simple : comment le titre est né, un passage en studio, ton écran pendant le mix. Les gens suivent une personne avant de suivre un morceau.', 'contenu');

  add('rappel', -3, 'Relancer le pre-save',
    'Rappelle la date en story et vérifie une dernière fois ta photo, ta bio et tes liens sur Spotify for Artists.');

  add('veille', -1, 'Préparer le jour J',
    'Prépare tes publications de demain (texte, visuel, lien) pour n\'avoir plus qu\'à appuyer sur « publier ».');

  add('jourj', 0, `Sortie de « ${track} »`,
    'Publie le lien partout, épingle-le, envoie-le directement à tes proches et réponds à chaque commentaire aujourd\'hui.');

  add('merci', 1, 'Remercier et partager',
    'Partage les premières réactions et les playlists qui t\'ont ajouté. Un merci public donne envie aux autres d\'écouter.');

  add('relance', 3, a.adsBudget ? 'Relancer les curateurs et tester une petite pub' : 'Relancer les curateurs',
    a.adsBudget
      ? 'Relance une fois ceux qui n\'ont pas répondu. Lance une publicité à petit budget sur ton meilleur extrait, vers ton lien Spotify, et regarde le coût par clic après trois jours.'
      : 'Relance une fois, poliment, ceux qui n\'ont pas répondu. Une seule relance suffit.');

  add('stats', 7, 'Lire tes premières stats',
    'Dans Spotify for Artists, regarde d\'où viennent les écoutes, le nombre d\'enregistrements et les playlists. Note ce qui a marché.', 'analytics');

  add('bilan', 14, 'Faire le bilan et fixer la prochaine sortie',
    'Écris trois choses à refaire et une à changer. Puis choisis la date de ton prochain titre : sortir régulièrement nourrit ton Release Radar.');

  const tasks: PlanTask[] = steps.map(s => {
    const planned = addDays(releaseDate, s.day);
    const late = planned < today;
    return { ...s, date: late ? today : planned, late: late || undefined, done: false };
  });

  // Sortie proche : le pitch éditorial a une vraie date limite (J-7). S'il est à rattraper,
  // il passe en tête du plan avec sa date butoir, pour ne pas se perdre parmi les autres rattrapages.
  const editorial = tasks.find(t => t.id === 'editorial');
  if (editorial && editorial.late && daysLeft >= 7) {
    const limit = new Date(addDays(releaseDate, -7) + 'T12:00:00Z')
      .toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
    editorial.title = `Urgent : pitcher les playlists éditoriales de Spotify avant ${limit}`;
    editorial.detail = `Spotify n'accepte plus le pitch à moins de 7 jours de la sortie : il te reste ${daysLeft - 7 === 0 ? 'aujourd\'hui seulement' : daysLeft - 7 === 1 ? 'jusqu\'à demain' : (daysLeft - 7) + ' jours'}. Dans Spotify for Artists, rubrique « À venir », soumets le titre avec ton pitch.`;
    const pitch = tasks.find(t => t.id === 'pitch');
    const rest = tasks.filter(t => t.id !== 'editorial' && t.id !== 'pitch');
    return [...(pitch ? [pitch] : []), editorial, ...rest];
  }
  return tasks;
}
