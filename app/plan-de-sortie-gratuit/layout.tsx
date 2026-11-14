import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rétroplanning de sortie gratuit pour ton single | Spotlift',
  description: 'Entre la date de sortie de ton titre : tu obtiens ton rétroplanning daté, de J-44 à J+14, à ajouter à ton agenda. Gratuit, sans inscription.',
  alternates: { canonical: 'https://getspotlift.com/plan-de-sortie-gratuit' },
  openGraph: {
    title: 'Rétroplanning de sortie gratuit pour ton single',
    description: 'Ton plan de sortie daté en 30 secondes, à ajouter à ton agenda. Gratuit, sans inscription.',
    url: 'https://getspotlift.com/plan-de-sortie-gratuit',
    locale: 'fr_FR',
    siteName: 'Spotlift',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
