import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site-url';

const baseUrl = SITE_URL;
const locales = ['pt', 'en', 'es'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/#sobre', '/#projetos', '/#certificados', '/#contato'];

  return locales.flatMap(locale =>
    routes.map(route => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );
}
