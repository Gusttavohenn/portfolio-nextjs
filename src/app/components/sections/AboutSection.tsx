"use client";

import { useTranslations } from 'next-intl';
import { socialLinks } from '@/lib/social-links';
import FaIcon from '../FaIcon';

export default function AboutSection() {
  const t = useTranslations('AboutSection');
  const c = useTranslations('Common');

  return (
    <section id="sobre" className="section">
      <h2 className="section-title">{t('titulo')}</h2>
      <div className="about-container">

        <div className="about-text">
          <p>{t('bio1')}</p>
          <p>{t('bio2')}</p>
        </div>

        <div className="about-socials">
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="about-social-link" aria-label="GitHub">
            <FaIcon name="fab fa-github" /> GitHub
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="about-social-link" aria-label="LinkedIn">
            <FaIcon name="fab fa-linkedin-in" /> LinkedIn
          </a>
          <a href={`mailto:${socialLinks.email}`} className="about-social-link" aria-label="E-mail">
            <FaIcon name="fa-solid fa-envelope" /> E-mail
          </a>
        </div>

        <div className="about-cards">
          <div className="about-card">
            <FaIcon name="fa-solid fa-location-dot" />
            <div>
              <span className="about-card-label">{t('localLabel')}</span>
              <span className="about-card-value">{c('local')}</span>
            </div>
          </div>
          <div className="about-card">
            <FaIcon name="fa-solid fa-graduation-cap" />
            <div>
              <span className="about-card-label">{t('educacaoLabel')}</span>
              <span className="about-card-value">{c('formacao')}</span>
              <span className="about-card-sub">{t('emAndamento')}</span>
            </div>
          </div>
          <div className="about-card">
            <FaIcon name="fa-solid fa-language" />
            <div>
              <span className="about-card-label">{t('idiomasLabel')}</span>
              <span className="about-card-value">PT · EN · ES</span>
            </div>
          </div>
          <div className="about-card">
            <FaIcon name="fa-solid fa-code" />
            <div>
              <span className="about-card-label">{t('focoLabel')}</span>
              <span className="about-card-value">{c('foco')}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
