"use client";

import { useTranslations } from 'next-intl';

export default function TimelineSection() {
  const t = useTranslations('TimelineSection');

  return (
    <section id="jornada" className="section">
      <h2 className="section-title">{t('titulo')}</h2>
      <div className="timeline">

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>{t('job1Title')}</h3>
            <span className="timeline-period">{t('job1Period')}</span>
            <p>{t('job1Desc')}</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>{t('job2Title')}</h3>
            <span className="timeline-period">{t('job2Period')}</span>
            <p>{t('job2Desc')}</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>{t('job3Title')}</h3>
            <span className="timeline-period">{t('job3Period')}</span>
            <p>{t('job3Desc')}</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>{t('job4Title')}</h3>
            <span className="timeline-period">{t('job4Period')}</span>
            <p>{t('job4Desc')}</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>{t('job5Title')}</h3>
            <span className="timeline-period">{t('job5Period')}</span>
            <p>{t('job5Desc')}</p>
            <div className="timeline-sub">
              <span className="timeline-sub-period">Mar 2026</span>
              <span className="timeline-sub-label">{t('job5SubLabel')}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
