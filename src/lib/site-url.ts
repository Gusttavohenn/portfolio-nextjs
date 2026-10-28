// Endereço público do site, usado nas prévias de link (Open Graph), sitemap e robots.
// Ordem: variável definida à mão > domínio de produção informado pela Vercel > domínio atual.
export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://portfolio-gusttavohenn.vercel.app");
