"use client";

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { TbSparkles } from 'react-icons/tb';
import { getCompany } from '@/lib/visit';
import ParticleField from '../ParticleField';
import FaIcon from '../FaIcon';

export default function HeroSection() {
  const t = useTranslations('HeroSection');
  const tc = useTranslations('Chat');
  const c = useTranslations('Common');
  const locale = useLocale();
  const [company, setCompany] = useState<string | null>(null);
  useEffect(() => { setCompany(getCompany()); }, []);

  const cvFile = `Gustavo_Oliveira_${locale.toUpperCase()}.pdf`;

  return (
    <section id="home" className="hero section">
      <div className="hero-particle-wrap" aria-hidden="true">
        <ParticleField color="#8b5cf6" />
      </div>

      <div className="hero-content">
        {company && (
          <p className="hero-company"><TbSparkles aria-hidden="true" /> {t('paraEmpresa', { empresa: company })}</p>
        )}
        <h1 className="hero-name">GUSTAVO OLIVEIRA</h1>
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

        <button
          className="hero-chat-btn"
          onClick={() => window.dispatchEvent(new Event('open-chat'))}
        >
          <span className="hero-chat-dot" aria-hidden="true"></span>
          {tc('abrir')}
        </button>
      </div>

      <a href="#sobre" className="scroll-indicator" aria-label={c('rolar')}>
        <FaIcon name="fa-solid fa-chevron-down" />
      </a>
    </section>
  );
}
