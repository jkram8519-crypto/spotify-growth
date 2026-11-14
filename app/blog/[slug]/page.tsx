import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticles, getArticle, frDate, Section } from '@/lib/articles';

// Pages d'articles générées à partir de content/articles/*.json.
// Les anciens articles (dossiers app/blog/<slug>/) restent servis par leurs propres pages.

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const url = `https://getspotlift.com/blog/${a.slug}`;
  return {
    title: `${a.titre} | Spotlift`,
    description: a.description,
    alternates: { canonical: url },
    openGraph: { title: a.titre, description: a.description, url, type: 'article', locale: 'fr_FR', siteName: 'Spotlift' },
  };
}

const h2: React.CSSProperties = { color: '#fff', fontSize: '26px', fontWeight: 'bold', margin: '40px 0 15px 0', lineHeight: 1.3 };

function Block({ s, slug }: { s: Section; slug: string }) {
  switch (s.type) {
    case 'h2':
      return <h2 style={h2}>{s.text}</h2>;
    case 'p':
      return <p style={{ margin: '0 0 18px 0' }}>{s.text}</p>;
    case 'list': {
      const items = s.items.map((it, i) => <li key={i} style={{ marginBottom: '8px' }}>{it}</li>);
      return s.ordered
        ? <ol style={{ margin: '0 0 18px 0', paddingLeft: '22px' }}>{items}</ol>
        : <ul style={{ margin: '0 0 18px 0', paddingLeft: '22px' }}>{items}</ul>;
    }
    case 'tip':
      return (
        <div style={{ background: '#0d0020', padding: '20px 22px', borderRadius: '15px', border: '1px solid #2d1040', margin: '0 0 20px 0' }}>
          {s.title && <p style={{ color: '#c38be0', fontWeight: 'bold', margin: '0 0 8px 0' }}>{s.title}</p>}
          <p style={{ margin: 0 }}>{s.text}</p>
        </div>
      );
    case 'cta':
      return (
        <div style={{ background: 'linear-gradient(135deg,#6C3483,#9B59B6)', padding: '24px', borderRadius: '18px', margin: '30px 0', textAlign: 'center' }}>
          <p style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '17px' }}>{s.text}</p>
          <a href={`/inscription?utm_source=blog&utm_medium=article&utm_campaign=${slug}`}
            style={{ background: '#fff', color: '#6C3483', padding: '12px 26px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
            Créer mon plan de sortie gratuit →
          </a>
        </div>
      );
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.titre,
    description: a.description,
    datePublished: a.date,
    inLanguage: 'fr-FR',
    author: { '@type': 'Person', name: 'J.K. RAM' },
    publisher: { '@type': 'Organization', name: 'Spotlift', url: 'https://getspotlift.com' },
    mainEntityOfPage: `https://getspotlift.com/blog/${a.slug}`,
  };
  const hasCta = a.sections.some(s => s.type === 'cta');

  return (
    <main style={{ background: '#000', color: '#fff', fontFamily: 'sans-serif', minHeight: '100vh', padding: '60px 20px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <a href="/blog" style={{ color: '#9B59B6', textDecoration: 'none', fontSize: '14px' }}>← Blog</a>
        </div>
        <span style={{ background: '#9B59B6', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', marginBottom: '15px' }}>
          {a.categorie}
        </span>
        <h1 style={{ fontSize: '38px', fontWeight: 'bold', margin: '0 0 15px 0', lineHeight: 1.2 }}>{a.titre}</h1>
        <p style={{ color: '#aaa', margin: '0 0 35px 0', fontSize: '15px' }}>
          Par J.K. RAM, artiste et fondateur de Spotlift · {frDate(a.date)} · {a.temps} de lecture
        </p>

        <div style={{ fontSize: '17px', lineHeight: 1.8, color: '#ccc' }}>
          {a.sections.map((s, i) => <Block key={i} s={s} slug={a.slug} />)}
          {!hasCta && <Block s={{ type: 'cta', text: 'Spotlift te prépare un plan de sortie daté, étape par étape, avec des rappels par email. Gratuit.' }} slug={a.slug} />}
        </div>

        {a.sources.length > 0 && (
          <div style={{ borderTop: '1px solid #2d1040', marginTop: '40px', paddingTop: '20px' }}>
            <p style={{ color: '#888', fontSize: '14px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Sources</p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#888', fontSize: '14px', lineHeight: 1.7 }}>
              {a.sources.map((src, i) => (
                <li key={i}><a href={src.url} rel="noopener" target="_blank" style={{ color: '#9B59B6' }}>{src.titre}</a></li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </main>
  );
}
