import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
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
