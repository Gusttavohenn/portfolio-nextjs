import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// Importação de Componentes
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Importação do CSS Global
import "../styles/style.css"; 

// Configuração da Fonte
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

// Metadados da Página 
export const metadata: Metadata = {
  title: "Gustavo Oliveira | Desenvolvedor",
  description: "Portfólio de Gustavo Oliveira, um desenvolvedor júnior apaixonado por criar soluções web modernas e funcionais.",
  openGraph: {
    title: "Gustavo Oliveira | Desenvolvedor",
    description: "Explore meus projetos e minha jornada no mundo do desenvolvimento web.",
    images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c"], 
  },
};

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

  return (
    <html lang={locale}>
      <body className={poppins.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="blob"></div>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        
        {/* Scripts Externos */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/js/all.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}