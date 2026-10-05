import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Générateur de pitch Spotify gratuit — Spotlift',
  description: 'Génère gratuitement, sans inscription, un pitch professionnel pour présenter ton morceau aux curateurs de playlists Spotify. Outil IA pour artistes indépendants.',
  alternates: { canonical: 'https://getspotlift.com/pitch-gratuit' },
  openGraph: {
    title: 'Générateur de pitch Spotify gratuit — Spotlift',
    description: 'Ton pitch pour les curateurs Spotify en 10 secondes, gratuit et sans inscription.',
    url: 'https://getspotlift.com/pitch-gratuit',
    siteName: 'Spotlift',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function PitchGratuitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
