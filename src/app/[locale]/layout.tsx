import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { SITE_URL } from "@/lib/site-url";
import { Poppins } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

// Importação de Componentes
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import MascotPixel from "../components/MascotPixel";
import WhatsAppButton from "../components/WhatsAppButton";
import ConsoleGreeting from "../components/ConsoleGreeting";
import Achievements from "../components/Achievements";
import LazyOverlays from "../components/LazyOverlays";

// Importação do CSS Global
import "../styles/style.css";

// Configuração da Fonte
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

// Metadados por locale
const metadataByLocale: Record<string, Metadata> = {
  pt: {
    metadataBase: new URL(SITE_URL),
    title: "Gustavo Oliveira | Portfólio",
    description: "Portfólio de Gustavo Oliveira, desenvolvedor back-end focado em automação, integrações e IA.",
    openGraph: {
      title: "Gustavo Oliveira | Desenvolvedor",
      description: "Explore meus projetos e minha jornada no mundo do desenvolvimento web.",
      locale: "pt_BR",
      type: "website",
      images: [{ url: "/og-pt.png", width: 1200, height: 630, alt: "Gustavo Oliveira — portfólio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gustavo Oliveira | Desenvolvedor",
      description: "Explore meus projetos e minha jornada no mundo do desenvolvimento web.",
      images: ["/og-pt.png"],
    },
    other: { "theme-color": "#0d0d0d" },
  },
  en: {
    metadataBase: new URL(SITE_URL),
    title: "Gustavo Oliveira | Portfolio",
    description: "Portfolio of Gustavo Oliveira, a back-end developer focused on automation, integrations and AI.",
    openGraph: {
      title: "Gustavo Oliveira | Developer",
      description: "Explore my projects and my journey in the world of web development.",
      locale: "en_US",
      type: "website",
      images: [{ url: "/og-en.png", width: 1200, height: 630, alt: "Gustavo Oliveira — portfólio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gustavo Oliveira | Developer",
      description: "Explore my projects and my journey in the world of web development.",
      images: ["/og-en.png"],
    },
    other: { "theme-color": "#0d0d0d" },
  },
  es: {
    metadataBase: new URL(SITE_URL),
    title: "Gustavo Oliveira | Portafolio",
    description: "Portafolio de Gustavo Oliveira, desarrollador back-end enfocado en automatización, integraciones e IA.",
    openGraph: {
      title: "Gustavo Oliveira | Desarrollador",
      description: "Explora mis proyectos y mi trayectoria en el mundo del desarrollo web.",
      locale: "es_ES",
      type: "website",
      images: [{ url: "/og-es.png", width: 1200, height: 630, alt: "Gustavo Oliveira — portfólio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gustavo Oliveira | Desarrollador",
      description: "Explora mis proyectos y mi trayectoria en el mundo del desarrollo web.",
      images: ["/og-es.png"],
    },
    other: { "theme-color": "#0d0d0d" },
  },
};


const LOCALES = ['pt', 'en', 'es'];
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!LOCALES.includes(locale)) notFound();
  const baseUrl = SITE_URL;
  const base = metadataByLocale[locale] ?? metadataByLocale.pt;
  return {
    ...base,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'pt-BR': `${baseUrl}/pt`,
        'en-US': `${baseUrl}/en`,
        'es-ES': `${baseUrl}/es`,
      },
    },
  };
}

// Componente de Layout Principal
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Resolve a Promise do params
  const { locale } = await params;
  // caminho que não é idioma (ex.: /arquivo-qualquer.txt) vira 404, não erro 500
  if (!LOCALES.includes(locale)) notFound();
  
  // Pega as mensagens de tradução para o locale atual
  const messages = await getMessages();
  const c = await getTranslations({ locale, namespace: 'Common' });

  const baseUrl = SITE_URL;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gustavo Oliveira',
    url: `${baseUrl}/${locale}`,
    sameAs: [
      'https://github.com/Gusttavohenn',
      'https://www.linkedin.com/in/gustavo-oliveira-0a96b022a/',
    ],
    jobTitle: 'Systems Analyst / Back-end Developer',
    knowsAbout: ['PHP', 'Laravel', 'C#', '.NET', 'Python', 'SQL', 'Automação', 'IA', 'APIs REST', 'Docker'],
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={poppins.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main-content" className="skip-link">{c('pular')}</a>
          <div className="blob"></div>
          <Navbar />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <BackToTop />
          <MascotPixel />
          <WhatsAppButton />
          <ConsoleGreeting />
          <LazyOverlays />
          <Achievements />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}