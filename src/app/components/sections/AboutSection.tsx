"use client";

import { useTranslations } from 'next-intl';
import { socialLinks } from '@/lib/social-links';

export default function AboutSection() {
  const t = useTranslations('AboutSection');

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
            <i className="fab fa-github" aria-hidden="true"></i> GitHub
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="about-social-link" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in" aria-hidden="true"></i> LinkedIn
          </a>
          <a href={`mailto:${socialLinks.email}`} className="about-social-link" aria-label="E-mail">
            <i className="fa-solid fa-envelope" aria-hidden="true"></i> E-mail
          </a>
        </div>

        <div className="about-cards">
          <div className="about-card">
            <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
            <div>
              <span className="about-card-label">{t('localLabel')}</span>
              <span className="about-card-value">Itaúna, MG · Brasil</span>
            </div>
          </div>
          <div className="about-card">
            <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
            <div>
              <span className="about-card-label">{t('educacaoLabel')}</span>
              <span className="about-card-value">ADS · Eng. de Software</span>
              <span className="about-card-sub">{t('emAndamento')}</span>
            </div>
          </div>
          <div className="about-card">
            <i className="fa-solid fa-language" aria-hidden="true"></i>
            <div>
              <span className="about-card-label">{t('idiomasLabel')}</span>
              <span className="about-card-value">PT · EN · ES</span>
            </div>
          </div>
          <div className="about-card">
            <i className="fa-solid fa-code" aria-hidden="true"></i>
            <div>
              <span className="about-card-label">{t('focoLabel')}</span>
              <span className="about-card-value">Blazor · React · C# · TS</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
