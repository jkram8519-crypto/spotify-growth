// Emails du parcours d'essai, écrits comme des messages perso du fondateur :
// texte court, une seule action, et une vraie invitation à répondre.

const FROM = 'J.K. RAM de Spotlift <contact@getspotlift.com>';
const REPLY_TO = 'contact.spotlift@gmail.com';

// On ne devine plus le prénom depuis l'adresse email (ça donnait "Salut Leupreweutrapra").
// On l'utilise seulement s'il est connu (nom saisi ou compte Google), sinon simple "Salut,".
export function firstName(name?: string | null): string {
  const first = (name || '').trim().split(/\s+/)[0] || '';
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'-]{2,20}$/.test(first)) return '';
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

function hello(prenom: string): string {
  return prenom ? `Salut ${prenom},` : 'Salut,';
}

type Mail = { subject: string; paragraphs: string[]; cta?: { label: string; url: string }; after?: string[] };

function renderHtml(m: Mail): string {
  const p = (t: string) => `<p style="margin:0 0 16px 0;line-height:1.6;">${t}</p>`;
  const button = m.cta
    ? `<p style="margin:24px 0;"><a href="${m.cta.url}" style="background:#9B59B6;color:#ffffff;padding:12px 26px;border-radius:24px;text-decoration:none;font-weight:bold;display:inline-block;">${m.cta.label}</a></p>`
    : '';
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#222222;max-width:560px;margin:0 auto;padding:24px;">`
    + m.paragraphs.map(p).join('')
    + button
    + (m.after || []).map(p).join('')
    + `<p style="margin:24px 0 0 0;line-height:1.5;">J.K. RAM<br/><span style="color:#777777;font-size:13px;">Artiste indépendant et fondateur de Spotlift · <a href="https://getspotlift.com" style="color:#9B59B6;">getspotlift.com</a></span></p>`
    + `</div>`;
}

function renderText(m: Mail): string {
  const strip = (t: string) => t.replace(/<[^>]+>/g, '');
  return [
    ...m.paragraphs.map(strip),
    ...(m.cta ? [`${m.cta.label} : ${m.cta.url}`] : []),
    ...(m.after || []).map(strip),
    'J.K. RAM\nArtiste indépendant et fondateur de Spotlift · getspotlift.com',
  ].join('\n\n');
}

async function send(to: string, m: Mail): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to, reply_to: REPLY_TO, subject: m.subject, html: renderHtml(m), text: renderText(m) }),
  });
  if (!res.ok) console.error('Resend error', res.status, await res.text().catch(() => ''));
  return res.ok;
}

// J0 : juste après l'inscription
export function sendWelcome(email: string, name?: string | null) {
  const prenom = firstName(name);
  return send(email, {
    subject: prenom ? `Bienvenue ${prenom}, c'est J.K. RAM` : `Bienvenue sur Spotlift, c'est J.K. RAM`,
    paragraphs: [
      hello(prenom),
      'Merci de t\'être inscrit sur Spotlift.',
      'Je suis J.K. RAM, artiste électro indépendant. J\'ai créé Spotlift parce que je passais plus de temps à me demander quoi faire pour mes sorties qu\'à faire de la musique.',
      'Ton essai Pro est actif pendant 3 jours. Si tu ne dois faire qu\'une chose aujourd\'hui : génère le pitch de ton prochain titre. Ça prend 10 secondes.',
    ],
    cta: { label: 'Faire mon pitch', url: 'https://getspotlift.com/dashboard' },
    after: ['Une question, un bug, une idée ? Réponds simplement à cet email : c\'est moi qui lis.'],
  });
}

// J+1 : adapté selon que la personne a déjà utilisé un outil ou non
export function sendDay1(email: string, hasUsedTool: boolean, name?: string | null) {
  const prenom = firstName(name);
  if (!hasUsedTool) {
    return send(email, {
      subject: 'Tu as pu faire ton pitch ?',
      paragraphs: [
        hello(prenom),
        'Tu n\'as pas encore eu le temps de tester Spotlift, on dirait. Pas de souci, je sais que le temps file.',
        'Si tu as un titre qui sort bientôt (ou même un titre déjà sorti), ça vaut le coup : tu donnes le titre, l\'ambiance et une phrase, et tu repars avec un pitch prêt à coller dans Spotify for Artists.',
      ],
      cta: { label: 'Faire mon pitch maintenant', url: 'https://getspotlift.com/dashboard' },
      after: ['Et si quelque chose t\'a bloqué, dis-le-moi en répondant à ce mail. Même un mot, ça m\'aide vraiment à améliorer l\'outil.'],
    });
  }
  return send(email, {
    subject: 'Ton pitch est prêt, et maintenant ?',
    paragraphs: [
      hello(prenom),
      'Tu as généré ton premier pitch, bien joué.',
      'L\'étape qui fait vraiment la différence ensuite, c\'est de planifier ta sortie. Le Manager IA te dit quoi faire chaque jour : quand soumettre ton titre dans Spotify for Artists, quand contacter les curateurs, quand publier sur les réseaux.',
    ],
    cta: { label: 'Planifier ma sortie', url: 'https://getspotlift.com/dashboard' },
    after: ['Petite question au passage : qu\'est-ce qui t\'a donné envie de t\'inscrire ? Réponds en une ligne, je lis tout.'],
  });
}

// J+2 : la veille de la fin de l'essai
export function sendDay2(email: string, name?: string | null) {
  const prenom = firstName(name);
  return send(email, {
    subject: 'Ton essai se termine demain',
    paragraphs: [
      hello(prenom),
      'Petit message pour te prévenir : ton essai Pro se termine demain.',
      'Après, tu gardes un compte gratuit avec le générateur de pitch. Si tu veux continuer avec tous les outils (Manager IA, Playlist Finder, contenus pour les réseaux), c\'est 9,99 € par mois, sans engagement.',
    ],
    cta: { label: 'Voir les offres', url: 'https://getspotlift.com/pricing' },
    after: ['Et si Spotlift ne t\'a pas convaincu, j\'aimerais vraiment savoir pourquoi. Réponds à ce mail, même pour me dire ce qui manque.'],
  });
}
