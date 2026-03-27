import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://portfolio-nextjs-4u6bratup-gustavo-oliveiras-projects-eefa4d93.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
