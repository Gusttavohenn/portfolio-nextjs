"use client";

import { useTranslations, useLocale } from 'next-intl';
import ParticleText from '../ParticleText';

export default function HeroSection() {
  const t = useTranslations('HeroSection');
  const locale = useLocale();

  const cvFile = `Gustavo_Oliveira_${locale.toUpperCase()}.pdf`;

  const words = ['GUSTAVO', 'BACK-END', 'AUTOMAÇÃO', 'IA'];

  return (
    <section id="home" className="hero section">
      <div className="hero-particle-wrap" aria-hidden="true">
        <ParticleText words={words} color="#8b5cf6" />
      </div>

      <h1 className="sr-only">Gustavo Oliveira — {t('titulo')}</h1>

      <p className="hero-role">{t('subtitulo')}</p>
      <p className="hero-tagline">{t('saudacao')}</p>

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

      <a href="#sobre" className="scroll-indicator" aria-label="Rolar para baixo">
        <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </a>
    </section>
  );
}
