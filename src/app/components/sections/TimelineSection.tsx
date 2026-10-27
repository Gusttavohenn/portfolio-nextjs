"use client";

import { useTranslations } from 'next-intl';

export default function TimelineSection() {
  const t = useTranslations('TimelineSection');

  const jobs = [
    { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }, { n: 6 },
  ];

  return (
    <section id="jornada" className="section">
      <h2 className="section-title">{t('titulo')}</h2>
      <div className="timeline">
        {jobs.map(({ n }) => {
          const isCurrent = n === 6;
          return (
            <div key={n} className={`timeline-item ${isCurrent ? 'current' : ''}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-head">
                  <h3>{t(`job${n}Title` as Parameters<typeof t>[0])}</h3>
                  {isCurrent && <span className="timeline-badge">{t('atual')}</span>}
                </div>
                <span className="timeline-period">{t(`job${n}Period` as Parameters<typeof t>[0])}</span>
                <p>{t(`job${n}Desc` as Parameters<typeof t>[0])}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
