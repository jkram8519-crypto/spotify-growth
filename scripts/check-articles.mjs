// Vérifie les articles de content/articles/ avant publication.
// Usage : node scripts/check-articles.mjs   (sort en erreur au moindre problème)
import fs from 'fs';
import path from 'path';

const DIR = path.join(process.cwd(), 'content', 'articles');
const LEGACY = fs.readdirSync(path.join(process.cwd(), 'app', 'blog'), { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('['))
  .map(d => d.name);
const TYPES = new Set(['h2', 'p', 'list', 'tip', 'cta']);
// Formulations interdites : promesses de résultat, chiffres de croissance, faux témoignages.
const FORBIDDEN = [/\b(résultats?|succès|streams|placements?|écoutes|abonnés|ajouts?) garanti/i, /(on te|nous te|nous vous|on vous) garanti/i, /garanti à 100/i, /\b\d+\s?%\s?de streams/i, /x\d+ (tes|vos) streams/i, /devenir viral à coup sûr/i, /témoignage/i, /des milliers d'artistes utilisent/i];

const errors = [];
const slugs = new Set();
const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter(f => f.endsWith('.json')) : [];

for (const f of files) {
  const where = `content/articles/${f}`;
  let a;
  try { a = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); }
  catch (e) { errors.push(`${where} : JSON invalide (${e.message})`); continue; }

  const req = ['slug', 'titre', 'description', 'categorie', 'date', 'temps', 'motCle', 'sections', 'sources'];
  for (const k of req) if (a[k] === undefined) errors.push(`${where} : champ manquant « ${k} »`);
  if (!a.slug) continue;

  if (`${a.slug}.json` !== f) errors.push(`${where} : le nom du fichier doit être ${a.slug}.json`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug)) errors.push(`${where} : slug invalide (minuscules, chiffres, tirets)`);
  if (slugs.has(a.slug) || LEGACY.includes(a.slug)) errors.push(`${where} : slug déjà utilisé`);
  slugs.add(a.slug);
  if (typeof a.titre !== 'string' || a.titre.length < 20 || a.titre.length > 70) errors.push(`${where} : titre entre 20 et 70 caractères (${a.titre?.length})`);
  if (typeof a.description !== 'string' || a.description.length < 80 || a.description.length > 160) errors.push(`${where} : description entre 80 et 160 caractères (${a.description?.length})`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.date || '')) errors.push(`${where} : date au format AAAA-MM-JJ`);
  if (!Array.isArray(a.sections) || a.sections.length < 6) errors.push(`${where} : au moins 6 sections`);

  let words = 0, h2 = 0;
  for (const [i, s] of (a.sections || []).entries()) {
    if (!TYPES.has(s.type)) { errors.push(`${where} : section ${i} de type inconnu « ${s.type} »`); continue; }
    if (s.type === 'list') {
      if (!Array.isArray(s.items) || s.items.length === 0) errors.push(`${where} : section ${i} liste vide`);
      else words += s.items.join(' ').split(/\s+/).length;
    } else {
      if (typeof s.text !== 'string' || !s.text.trim()) errors.push(`${where} : section ${i} sans texte`);
      else words += s.text.split(/\s+/).length;
    }
    if (s.type === 'h2') h2++;
    const txt = JSON.stringify(s);
    for (const re of FORBIDDEN) if (re.test(txt)) errors.push(`${where} : section ${i} contient une formulation interdite (${re})`);
    if (/<[a-z/][^>]*>/i.test(txt)) errors.push(`${where} : section ${i} contient du HTML (texte brut uniquement)`);
  }
  if (words < 800) errors.push(`${where} : ${words} mots, il en faut au moins 800`);
  if (h2 < 3) errors.push(`${where} : au moins 3 intertitres (h2)`);

  if (!Array.isArray(a.sources) || a.sources.length < 2) errors.push(`${where} : au moins 2 sources`);
  for (const s of a.sources || []) {
    if (!/^https:\/\//.test(s.url || '') || !s.titre) errors.push(`${where} : source invalide ${JSON.stringify(s)}`);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problème(s) :\n- ` + errors.join('\n- '));
  process.exit(1);
}
console.log(`✓ ${files.length} article(s) valides`);
