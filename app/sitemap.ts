import { MetadataRoute } from 'next';
import { getArticles } from '@/lib/articles';

const LEGACY_POSTS = ['comment-pitcher-spotify', 'augmenter-streams-spotify', 'meilleur-outil-artiste-independant', 'musique-jeux-video-gta'];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = [
    { url: 'https://getspotlift.com/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...getArticles().map(a => ({ url: `https://getspotlift.com/blog/${a.slug}`, lastModified: new Date(a.date + 'T12:00:00Z'), changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...LEGACY_POSTS.map(slug => ({ url: `https://getspotlift.com/blog/${slug}`, changeFrequency: 'monthly' as const, priority: 0.5 })),
  ];
  return [
    ...posts,
    {
      url: 'https://getspotlift.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://getspotlift.com/pitch-gratuit',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://getspotlift.com/artistes/jk-ram',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://getspotlift.com/login',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://getspotlift.com/inscription',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://getspotlift.com/pricing',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://getspotlift.com/faq',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://getspotlift.com/a-propos',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://getspotlift.com/cgv',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://getspotlift.com/mentions-legales',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://getspotlift.com/confidentialite',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
