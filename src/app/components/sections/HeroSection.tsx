"use client";

import { useTranslations, useLocale } from 'next-intl';

export default function HeroSection() {
  // Hook para buscar as traduções do arquivo .json
  const t = useTranslations('HeroSection');
  
  // Hook para descobrir o idioma atual (ex: 'pt', 'en', 'es')
  const locale = useLocale();

  // Cria o nome do arquivo do CV dinamicamente com base no idioma
  const cvFile = `Gustavo_Oliveira_${locale.toUpperCase()}.pdf`;

  return (
    <section id="home" className="hero section">
      <h1 className="typing-text" data-text={t('titulo')}></h1>

      <p>{t('saudacao')}</p>

      <div className="button-group">
        <a href="#projetos" className="cta-button">{t('explorar')}</a>
        <a 
          href={`/${cvFile}`} 
          download 
          className="cta-button secondary"
        >
          {t('downloadCV')}
        </a>
      </div>
    </section>
  );
}