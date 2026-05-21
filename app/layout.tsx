import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Spotlift — L\'outil IA pour artistes indépendants',
  description: 'Génère des pitches Spotify pro en 10 secondes, planifie tes sorties avec l\'IA et analyse tes performances. 11 outils IA pour artistes indépendants.',
  keywords: 'Spotify, artiste indépendant, pitch generator, playlist, music marketing, IA, croissance Spotify',
  authors: [{ name: 'Spotlift' }],
  openGraph: {
    title: 'Spotlift — L\'outil IA pour artistes indépendants',
    description: 'Génère des pitches Spotify pro en 10 secondes, planifie tes sorties avec l\'IA et analyse tes performances.',
    url: 'https://getspotlift.vercel.app',
    siteName: 'Spotlift',
    images: [
      {
        url: 'https://getspotlift.vercel.app/spotlift-icon.svg',
        width: 400,
        height: 400,
        alt: 'Spotlift Logo',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spotlift — L\'outil IA pour artistes indépendants',
    description: 'Génère des pitches Spotify pro en 10 secondes grâce à l\'IA.',
    images: ['https://getspotlift.vercel.app/spotlift-icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}