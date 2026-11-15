import { createClient } from '@supabase/supabase-js';
import type { PlanTask } from './release-plan';

// Lecture d'un plan partagé publiquement. Ne renvoie que ce que l'artiste a choisi de montrer :
// titre, nom d'artiste (facultatif), date de sortie et intitulé des étapes avec leur état.
// Jamais d'email, ni d'identifiant de compte, ni de réponses au questionnaire.

export type SharedPlan = {
  slug: string;
  track: string;
  artist: string | null;
  releaseDate: string;
  steps: { day: number; date: string; title: string; done: boolean }[];
};

export async function getSharedPlan(slug: string): Promise<SharedPlan | null> {
  if (!/^[a-z0-9-]{4,60}$/.test(slug)) return null;
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data } = await admin
    .from('release_plans')
    .select('share_slug, track_name, artist_name, release_date, tasks')
    .eq('share_slug', slug)
    .eq('shared', true)
    .maybeSingle();
  if (!data) return null;
  return {
    slug: data.share_slug,
    track: data.track_name,
    artist: data.artist_name || null,
    releaseDate: data.release_date,
    // Ordre chronologique (J-44 → J+14), plus lisible pour un visiteur que l'ordre des rattrapages.
    steps: (data.tasks as PlanTask[])
      .map(t => ({ day: t.day, date: t.date, title: t.title, done: !!t.done }))
      .sort((a, b) => a.day - b.day),
  };
}

export function shareSlug(track: string): string {
  const base = track
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'sortie';
  const rand = Math.random().toString(36).slice(2, 8);
  return `${base}-${rand}`;
}
