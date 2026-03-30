import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// Importação de Componentes
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

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
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
    title: "Gustavo Oliveira | Portfólio",
    description: "Portfólio de Gustavo Oliveira, desenvolvedor júnior apaixonado por criar soluções web modernas e funcionais.",
    openGraph: {
      title: "Gustavo Oliveira | Desenvolvedor",
      description: "Explore meus projetos e minha jornada no mundo do desenvolvimento web.",
      locale: "pt_BR",
      images: [{ url: "/nexo.png", width: 1200, height: 630, alt: "Gustavo Oliveira Portfolio" }],
    },
  },
  en: {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
    title: "Gustavo Oliveira | Portfolio",
    description: "Portfolio of Gustavo Oliveira, a junior developer passionate about building modern and functional web solutions.",
    openGraph: {
      title: "Gustavo Oliveira | Developer",
      description: "Explore my projects and my journey in the world of web development.",
      locale: "en_US",
      images: [{ url: "/nexo.png", width: 1200, height: 630, alt: "Gustavo Oliveira Portfolio" }],
    },
  },
  es: {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
    title: "Gustavo Oliveira | Portafolio",
    description: "Portafolio de Gustavo Oliveira, desarrollador junior apasionado por crear soluciones web modernas y funcionales.",
    openGraph: {
      title: "Gustavo Oliveira | Desarrollador",
      description: "Explora mis proyectos y mi trayectoria en el mundo del desarrollo web.",
      locale: "es_ES",
      images: [{ url: "/nexo.png", width: 1200, height: 630, alt: "Gustavo Oliveira Portfolio" }],
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
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
  
  // Pega as mensagens de tradução para o locale atual
  const messages = await getMessages();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gustavo Oliveira',
    url: `${baseUrl}/${locale}`,
    sameAs: [
      'https://github.com/Gusttavohenn',
      'https://www.linkedin.com/in/gustavo-oliveira-0a96b022a/',
    ],
    jobTitle: 'Junior Developer',
    knowsAbout: ['React', 'TypeScript', 'Next.js', 'C#', 'Blazor', 'SQL'],
  };

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={poppins.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main-content" className="skip-link">Pular para o conteúdo</a>
          <div className="blob"></div>
          <Navbar />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </NextIntlClientProvider>
        
        {/* Font Awesome via CDN — ícones usados em todo o site */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/js/all.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}