"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('HeroSection');
  const locale = useLocale();

  const cvFile = `Gustavo_Oliveira_${locale.toUpperCase()}.pdf`;
  const fullText = t('titulo');
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let index = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 150);
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [fullText]);

  return (
    <section id="home" className="hero section">
      <h1 className="typing-text">{displayedText}</h1>

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

      <a href="#sobre" className="scroll-indicator" aria-label="Rolar para baixo">
        <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </a>
    </section>
  );
}
