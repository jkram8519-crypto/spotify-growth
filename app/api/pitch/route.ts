import { NextRequest, NextResponse } from 'next/server';
import { isClean } from '@/lib/moderation';

export async function POST(req: NextRequest) {
  try {
    const { track, genre } = await req.json();
    if (!isClean(String(track) + ' ' + String(genre || ''))) {
      return NextResponse.json({ error: 'Propos inappropries. Merci de reformuler.' }, { status: 400 });
    }

    const pitches = [
      `"${track}" est un titre ${genre || 'musical'} captivant qui fusionne émotion et énergie. Avec une production soignée et une atmosphère unique, ce track est parfait pour les playlists de découverte. Son son distinctif saura toucher un large public et créer une connexion immédiate avec l'auditeur.`,
      `Découvrez "${track}", un titre ${genre || 'musical'} qui repousse les limites du genre. Sa mélodie accrocheuse et sa production moderne en font un candidat idéal pour vos playlists. Un son frais et authentique qui mérite d'être entendu par le plus grand nombre.`,
      `"${track}" représente une nouvelle vision du ${genre || 'music'} contemporain. Alliant créativité et accessibilité, ce track offre une expérience d'écoute mémorable. Idéal pour les playlists mood et les sessions d'écoute intense.`,
    ];

    const pitch = pitches[Math.floor(Math.random() * pitches.length)];
    return NextResponse.json({ pitch });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}