import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/style.css"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Gustavo Oliveira | Desenvolvedor",
  description: "Portfólio de Gustavo Oliveira, um desenvolvedor júnior apaixonado por criar soluções web modernas e funcionais.",
  openGraph: {
    title: "Gustavo Oliveira | Desenvolvedor",
    description: "Explore meus projetos e minha jornada no mundo do desenvolvimento web.",
    images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c"], // Lembre-se de trocar por uma imagem sua
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <div className="blob"></div>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        
        {/* Script de Ícones (Font Awesome) */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/js/all.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}