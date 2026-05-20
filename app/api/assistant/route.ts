import { NextRequest, NextResponse } from 'next/server';

const responses: Record<string, string> = {
  playlist: `Pour obtenir des placements en playlist sur Spotify, voici la methode qui fonctionne :

1. SOUMETS via Spotify for Artists
- Va sur artists.spotify.com
- Soumets ton track au moins 7 jours avant la sortie
- Remplis TOUS les champs : genre, humeur, instruments, langue

2. CONTACTE les curateurs independants
- Utilise le Playlist Finder de Spotlift pour trouver les playlists compatibles
- Envoie un pitch personnalise via SubmitHub ou directement sur Instagram
- Mentionne le % de match avec leur playlist

3. OPTIMISE ton track
- Intro courte (moins de 15 secondes)
- Hook memorable avant 30 secondes
- Taux de save superieur a 10%

4. TIMING parfait
- Sors le vendredi (jour recommande par Spotify)
- Soumets aux curateurs 14 jours avant la sortie

Resultat attendu : 3 a 5 placements en playlist dans les 30 premiers jours.`,

  tiktok: `Strategie TikTok pour artistes independants en 2026 :

1. LE BON EXTRAIT (crucial)
- Utilise les 15 premieres secondes les plus accrocheuses
- Commence directement par le drop ou le refrain
- Evite les intros longues

2. LES FORMATS QUI MARCHENT
- POV : tu decouvres ce son pour la premiere fois
- Making of / behind the scenes
- Reaction a ton propre track
- Challenge dance si applicable

3. LA REGULARITE
- Poste au moins 3 fois par semaine
- Meilleurs horaires : 18h-21h en semaine
- Utilise les sons tendance en background

4. LES HASHTAGS
#NouvelleMusique #Spotify #ArtisteIndependant #FYP #Beatmaker #MusiqueIndependante

5. L'APPEL A L'ACTION
- Dis toujours "Lien en bio" ou "Disponible sur Spotify"
- Reponds a TOUS les commentaires dans les 2 premieres heures

Objectif : 1 video virale = 10 000 streams en 48 heures.`,

  streams: `Pour augmenter tes streams Spotify rapidement :

1. OPTIMISE TON PROFIL
- Photo professionnelle
- Bio complete avec tes influences
- Tous les liens reseaux sociaux
- Artist Pick sur ton dernier track

2. PITCHE INTELLIGEMMENT
- Utilise le Pitch Generator de Spotlift
- Soumets a Spotify Editorial 7 jours avant
- Contacte 20 curateurs independants par sortie

3. CAMPAGNE TIKTOK
- Poste 3 extraits differents de ton track
- Le meilleur extrait = celui avec le hook le plus fort
- 1 video virale peut generer 50 000 streams

4. PUBLICITE META (budget minimal)
- 5 euros par jour sur Instagram
- Cible : fans de artistes similaires, 18-34 ans
- Format : Reels avec ton extrait

5. COLLABORATIONS
- Feat avec un artiste de ta niche
- Acces immediat a sa base de fans
- Les deux artistes beneficient des streams

Avec cette strategie : +300% de streams en 30 jours.`,

  date: `Comment choisir la meilleure date de sortie :

1. LE JOUR IDEAL
- VENDREDI : jour officiel des sorties musicales
- Spotify met a jour ses playlists algorithmiques le vendredi
- Tu apparais dans Release Radar et Discover Weekly

2. LES PERIODES A EVITER
- Noel et Nouvel An (trop de concurrence)
- Grandes sorties d'artistes majeurs
- Periodes de vacances scolaires (audience reduite)

3. LES MEILLEURES PERIODES
- Janvier-Mars : peu de concurrence, audience active
- Septembre-Octobre : rentree musicale
- Evite Juillet-Aout en Europe

4. LE PLANNING IDEAL avec Spotlift Manager IA
- J-30 : Teaser sur Instagram
- J-14 : Pitch aux curateurs
- J-7 : Soumission Spotify Editorial
- J-1 : Teaser final
- JOUR J : Sortie + posts tous reseaux
- J+3 : Lancer les ads Meta

Utilise le Manager IA de Spotlift pour generer automatiquement tout ce planning !`,

  default: `Voici mes conseils en tant que manager IA Spotlift :

1. PRIORITE NUMERO 1 : Optimise ton profil Spotify
- Photo pro, bio complete, liens reseaux sociaux
- Utilise l'outil Optimisation Profil de Spotlift

2. PITCH REGULIER aux curateurs
- Utilise le Pitch Generator pour creer des pitches pro
- Contacte 20 curateurs par mois minimum
- Suis tes resultats avec l'Analytics IA

3. STRATEGIE RESEAUX SOCIAUX
- TikTok : 3 videos par semaine avec extraits de tes tracks
- Instagram : posts reguliers avec le Generateur de Contenu Spotlift
- Reponds a TOUS tes commentaires

4. MESURE TES RESULTATS
- Calcule ton Growth Score chaque mois
- Analyse ton Viral Potentiel avant chaque sortie
- Ajuste ta strategie selon les donnees

5. SORTIE PLANIFIEE
- Utilise le Manager IA pour planifier chaque sortie sur 44 jours
- Sors le vendredi, pitche 14 jours avant

La regularite est la cle du succes sur Spotify. Continue et tu verras des resultats !`
};

function getResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('playlist') || q.includes('curateur') || q.includes('placement')) return responses.playlist;
  if (q.includes('tiktok') || q.includes('viral') || q.includes('video') || q.includes('reels')) return responses.tiktok;
  if (q.includes('stream') || q.includes('ecoute') || q.includes('audience')) return responses.streams;
  if (q.includes('date') || q.includes('sortie') || q.includes('quand') || q.includes('lancer')) return responses.date;
  return responses.default;
}

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    const response = getResponse(question);
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ response: 'Erreur — reessaie.' }, { status: 500 });
  }
}
