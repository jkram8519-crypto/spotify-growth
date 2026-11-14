import fs from 'fs';
import path from 'path';

// Articles de blog publiés sous forme de fichiers JSON dans content/articles/.
// Un article = un fichier. Le format est vérifié par scripts/check-articles.mjs
// (lancé avant chaque publication par l'agent SEO).

export type Section =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'tip'; title?: string; text: string }
  | { type: 'cta'; text: string };

export type Article = {
  slug: string;
  titre: string; // titre H1, 70 caractères max
  description: string; // meta description, 160 caractères max
  categorie: string;
  date: string; // AAAA-MM-JJ
  temps: string; // ex. « 6 min »
  motCle: string; // requête Google visée
  sections: Section[];
  sources: { titre: string; url: string }[];
};

const DIR = path.join(process.cwd(), 'content', 'articles');

export function getArticles(): Article[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')) as Article)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find(a => a.slug === slug);
}

export function frDate(iso: string): string {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
