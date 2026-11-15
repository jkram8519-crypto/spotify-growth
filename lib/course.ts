import type { Mail } from './emails';

// Formation gratuite « Ta sortie en 6 emails ».
// Un email tous les 2-3 jours (J0, J2, J4, J7, J9, J12), une étape concrète par email.
// Ton : message perso de J.K. RAM, pas de promesse de résultat.

export const COURSE_LENGTH = 6;
// Jours d'attente AVANT l'email n (index = numéro de l'email suivant, 2 à 6)
export const COURSE_GAPS: Record<number, number> = { 2: 2, 3: 2, 4: 3, 5: 2, 6: 3 };

const SITE = 'https://getspotlift.com';
const utm = (n: number) => `utm_source=email&utm_medium=formation&utm_campaign=e${n}`;
const PLAN = (n: number) => `${SITE}/plan-de-sortie-gratuit?${utm(n)}`;

const HELLO = 'Salut,';

export function unsubscribeUrl(token: string) {
  return `${SITE}/api/course/unsubscribe?t=${token}`;
}

export function courseEmail(n: number): Mail | null {
  switch (n) {
    case 1:
      return {
        subject: 'Ta sortie en 6 emails · 1/6 : pars de la date de sortie',
        paragraphs: [
          HELLO,
          'Tu t\'es inscrit à « Ta sortie en 6 emails ». Pendant 12 jours, tu reçois un email tous les 2 ou 3 jours, avec à chaque fois une étape concrète à faire pour ta prochaine sortie.',
          '<b>Étape 1 : choisis ta date de sortie, puis travaille à rebours.</b>',
          'L\'erreur la plus fréquente, c\'est de finir un morceau et de le mettre en ligne la semaine même. Résultat : pas de pitch Spotify possible, personne n\'est prévenu, et le titre sort dans le vide.',
          'La règle simple : vise une date <b>au moins 4 semaines</b> après aujourd\'hui. Ça laisse le temps à ton distributeur de livrer le titre, à toi de le proposer aux éditeurs de Spotify, et d\'annoncer la sortie.',
          'Choisis un <b>vendredi</b> : c\'est le jour où sortent les nouveautés sur les plateformes et où les playlists de nouveautés sont mises à jour.',
          'À faire aujourd\'hui (10 minutes) : entre ton titre et ta date dans le plan de sortie gratuit. Tu obtiens toutes les étapes datées, que tu peux ajouter à ton agenda.',
        ],
        cta: { label: 'Faire mon plan de sortie', url: PLAN(1) },
        after: [
          'Prochain email dans 2 jours : préparer le master et l\'envoyer au distributeur.',
          'Tu peux répondre directement à cet email si tu as une question, je lis tout.',
        ],
      };
    case 2:
      return {
        subject: 'Ta sortie en 6 emails · 2/6 : envoie ton titre 3 semaines avant',
        paragraphs: [
          HELLO,
          '<b>Étape 2 : envoyer ton titre au distributeur environ 3 semaines avant la sortie.</b>',
          'Ton distributeur (DistroKid, TuneCore, CD Baby, Spinnup…) a besoin de plusieurs jours pour vérifier ton titre et le livrer aux plateformes. Et tant que le titre n\'est pas livré à Spotify, tu ne peux pas le proposer aux éditeurs.',
          'Avant d\'envoyer, vérifie ces 4 points :<br/>• le master final en WAV, sans saturation ni silence au début ;<br/>• la pochette en 3000 × 3000 px, sans logo de réseau social ni texte illisible ;<br/>• le titre et ton nom d\'artiste écrits exactement de la même façon partout ;<br/>• les featurings, compositeurs et producteurs bien renseignés.',
          'Une erreur dans ces infos, c\'est souvent un rejet et une semaine de perdue.',
          'Si ce n\'est pas déjà fait, réclame aussi ton profil <b>Spotify for Artists</b> (gratuit). Sans lui, pas de pitch possible.',
        ],
        cta: { label: 'Voir les dates de mon plan', url: PLAN(2) },
        after: ['Dans 2 jours : comment écrire ton pitch pour les éditeurs de Spotify.'],
      };
    case 3:
      return {
        subject: 'Ta sortie en 6 emails · 3/6 : le pitch éditorial Spotify',
        paragraphs: [
          HELLO,
          '<b>Étape 3 : proposer ton titre aux éditeurs de Spotify.</b>',
          'Une fois ton titre livré, il apparaît dans Spotify for Artists, dans les sorties à venir. Tu peux alors le pitcher, c\'est-à-dire le présenter aux éditeurs qui gèrent les playlists officielles. Un seul titre à la fois.',
          'La date limite : <b>au moins 7 jours avant la sortie</b>. C\'est aussi ce qui permet à ton titre d\'arriver dans le Release Radar de tes abonnés. L\'idéal, c\'est 2 à 4 semaines avant.',
          'Ce qui aide dans ton texte (500 caractères max) : l\'ambiance du morceau en une phrase, ce qui le rend différent, ton actualité (concert, clip, EP), et des infos concrètes (instruments, langue, ville). Ce qui n\'aide pas : « mon meilleur son », les superlatifs sans preuve.',
          'Remplis aussi avec soin le genre, l\'ambiance et les instruments.',
          'Pour être honnête : un pitch ne garantit pas d\'entrer en playlist. Mais sans pitch, tu n\'as aucune chance, et tu peux rater le Release Radar.',
          'Si tu bloques sur le texte, le générateur de pitch gratuit te donne un premier jet en quelques secondes, à retoucher avec tes mots.',
        ],
        cta: { label: 'Générer un brouillon de pitch', url: `${SITE}/pitch-gratuit?${utm(3)}` },
        after: [
          `Le détail des dates limites est dans <a href="${SITE}/blog/pitch-editorial-spotify-date-limite?${utm(3)}" style="color:#9B59B6;">ce guide</a>.`,
          'Dans 3 jours : prévenir ton public avant la sortie.',
        ],
      };
    case 4:
      return {
        subject: 'Ta sortie en 6 emails · 4/6 : prévenir ton public avant le jour J',
        paragraphs: [
          HELLO,
          '<b>Étape 4 : annoncer ta sortie dans les 2 semaines qui la précèdent.</b>',
          'Si personne ne sait que ton titre arrive, il n\'y aura personne le jour J. Les premiers jours comptent : c\'est là que les plateformes regardent si les gens écoutent, sauvegardent et réécoutent.',
          'Ce que tu peux faire à partir de J-14 :<br/>• une annonce avec la pochette et la date ;<br/>• un lien de pré-sauvegarde (pre-save), souvent proposé par ton distributeur ;<br/>• 3 extraits courts de 15 secondes : le passage le plus fort du morceau, une coulisse, toi qui réagis au son ;<br/>• un message perso aux 20 personnes qui te soutiennent vraiment.',
          'Ce dernier point est sous-estimé : 20 messages directs valent souvent plus que 10 stories.',
        ],
        cta: { label: 'Voir mes étapes d\'annonce', url: PLAN(4) },
        after: ['Dans 2 jours : le jour de la sortie et la première semaine.'],
      };
    case 5:
      return {
        subject: 'Ta sortie en 6 emails · 5/6 : le jour J et la première semaine',
        paragraphs: [
          HELLO,
          '<b>Étape 5 : faire vivre ta sortie pendant 7 jours.</b>',
          'Le jour J : partage le lien partout (story, post, bio), mets ton titre en avant sur ton profil Spotify for Artists, et remercie publiquement ceux qui partagent.',
          'Pendant la semaine : publie un nouvel extrait tous les 2 ou 3 jours, et propose ton titre à des curateurs de playlists indépendants dont le style correspond vraiment au tien. Écris-leur un message court et personnel.',
          '<b>Attention :</b> n\'achète jamais d\'écoutes ni de places dans des playlists qui promettent un nombre de streams. Spotify peut retirer ton titre et pénaliser ton profil.',
          'Dès le lendemain, regarde dans Spotify for Artists d\'où viennent tes écoutes.',
        ],
        cta: { label: 'Ouvrir mon plan', url: PLAN(5) },
        after: ['Dans 3 jours, dernier email : quoi regarder après la sortie, et préparer la suivante.'],
      };
    case 6:
      return {
        subject: 'Ta sortie en 6 emails · 6/6 : après la sortie, prépare la suivante',
        paragraphs: [
          HELLO,
          '<b>Étape 6 : faire le bilan et caler la prochaine sortie.</b>',
          'À J+7 puis J+28, note 3 chiffres dans Spotify for Artists :<br/>• d\'où viennent les écoutes (playlists, ton profil, recherche…) ;<br/>• combien d\'auditeurs ont sauvegardé le titre ;<br/>• combien d\'auditeurs reviennent.<br/>Ce sont tes repères pour comparer avec la prochaine sortie.',
          'Sur la durée, ce qui compte le plus, c\'est la régularité. Une sortie toutes les 6 à 8 semaines entretient ton Release Radar et garde ton public attentif.',
          'Donc dès maintenant : choisis la date de ta prochaine sortie et recommence l\'étape 1.',
          'C\'est le dernier email de la formation. Si tu veux que tout ça soit suivi pour toi (plan enregistré, étapes à cocher, un email les jours où il y a quelque chose à faire, pitch rédigé par l\'IA), c\'est ce que fait Spotlift. Le compte est gratuit.',
        ],
        cta: { label: 'Créer mon compte gratuit', url: `${SITE}/inscription?${utm(6)}` },
        after: ['Merci d\'avoir suivi la formation. Réponds à cet email pour me dire ce qui t\'a servi ou ce qui t\'a manqué : ça m\'aide à l\'améliorer.'],
      };
    default:
      return null;
  }
}
