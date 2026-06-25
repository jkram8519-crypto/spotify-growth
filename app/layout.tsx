import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/dist/client/script';

export const metadata: Metadata = {
  title: 'Spotlift — L\'outil IA pour artistes indépendants',
  description: 'Génère des pitches Spotify pro en 10 secondes, planifie tes sorties avec l\'IA et analyse tes performances. 11 outils IA pour artistes indépendants.',
  keywords: 'Spotify, artiste indépendant, pitch generator, playlist, music marketing, IA, croissance Spotify, curateur playlist, promotion musicale, pitch Spotify gratuit, outil musique IA, manager musical IA, analytics Spotify, growth score Spotify, viral TikTok musique, beatmaker, producteur indépendant, sortie musicale, streaming musique',
  authors: [{ name: 'Spotlift' }],
  openGraph: {
    title: 'Spotlift — L\'outil IA pour artistes indépendants',
    description: 'Génère des pitches Spotify pro en 10 secondes, planifie tes sorties avec l\'IA et analyse tes performances.',
    url: 'https://getspotlift.com',
    siteName: 'Spotlift',
    images: [
      {
        url: 'https://getspotlift.com/spotlift-icon.svg',
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
    images: ['https://getspotlift.com/spotlift-icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'zV9gBgseiPFnk20Gu70XCFt0CsGQ5W7PA-u0vFS2Dp8',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-18217088729"
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18217088729');
          gtag('config', 'G-QJ3R4P3EWZ');
        `}
      </Script>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const theme = localStorage.getItem('theme');
              if (theme) {
                document.body.classList.add(theme);
              } else {
                document.body.classList.add('light-theme');
              }
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
