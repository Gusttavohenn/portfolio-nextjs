"use client";

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('HeroSection');
  const locale = useLocale();

  const titulo = t('titulo');
  const [displayedText, setDisplayedText] = useState('');

  // Re-executa sempre que o título mudar (troca de idioma)
  useEffect(() => {
    setDisplayedText('');
    let index = 0;
    const timeout = setTimeout(() => {
      const type = () => {
        if (index < titulo.length) {
          setDisplayedText(titulo.slice(0, index + 1));
          index++;
          setTimeout(type, 150);
        }
      };
      type();
    }, 500);
    return () => clearTimeout(timeout);
  }, [titulo]);

  const availableCVLocales = ['pt', 'en', 'es'];
  const cvLocale = availableCVLocales.includes(locale) ? locale.toUpperCase() : 'PT';
  const cvFile = `Gustavo_Oliveira_${cvLocale}.pdf`;

  return (
    <section id="home" className="hero section">
      <h1>{displayedText}<span className="cursor">|</span></h1>

      <p>{t('saudacao')}</p>

      <div className="button-group">
        <a href="#projetos" className="cta-button">{t('explorar')}</a>
        <a href={`/${cvFile}`} download className="cta-button secondary">
          {t('downloadCV')}
        </a>
      </div>

      <a href="#sobre" className="scroll-indicator" aria-label="Rolar para baixo">
        <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </a>
    </section>
  );
}
