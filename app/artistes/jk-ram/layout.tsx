import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'J.K.RAM, premier artiste Spotlift : ses sorties étape par étape',
  description: "Le journal de sortie de J.K.RAM, artiste électro indépendant et créateur de Spotlift : pitch, clips, dates et vrais chiffres de chaque sortie Spotify.",
  alternates: { canonical: 'https://getspotlift.com/artistes/jk-ram' },
  openGraph: {
    title: 'J.K.RAM, premier artiste Spotlift',
    description: 'Chaque sortie Spotify documentée, étape par étape, avec les vrais chiffres.',
    url: 'https://getspotlift.com/artistes/jk-ram',
    siteName: 'Spotlift',
    locale: 'fr_FR',
    type: 'profile',
  },
};

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
