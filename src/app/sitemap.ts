import { MetadataRoute } from 'next';
import { projects } from '@/lib/projects-data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://portfolio-nextjs-4u6bratup-gustavo-oliveiras-projects-eefa4d93.vercel.app';
const locales = ['pt', 'en', 'es'];

export default function sitemap(): MetadataRoute.Sitemap {
  const localePages = locales.map(locale => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  const projectPages = locales.flatMap(locale =>
    projects.map(project => ({
      url: `${BASE_URL}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...localePages, ...projectPages];
}
