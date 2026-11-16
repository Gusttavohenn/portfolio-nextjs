"use client";

import { useLocale, useTranslations } from 'next-intl';
import { experienceChrono, loc, toLang, yearsPeriod } from '@/lib/cv';
import SectionHead from '../SectionHead';

// A jornada vem de content/cv.json — a mesma fonte dos PDFs do currículo.
export default function TimelineSection() {
  const t = useTranslations('TimelineSection');
  const lang = toLang(useLocale());
  const jobs = experienceChrono();

  return (
    <section id="jornada" className="section">
      <SectionHead label={t('rotulo')} title={t('titulo')} />
      <div className="timeline">
        {jobs.map((job) => {
          const isCurrent = job.end === null;
          return (
            <div key={`${loc(job.company, 'pt')}-${job.start}`} className={`timeline-item ${isCurrent ? 'current' : ''}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-head">
                  <h3>{job.role[lang]} — {loc(job.company, lang)}</h3>
                  {isCurrent && <span className="timeline-badge">{t('atual')}</span>}
                </div>
                <span className="timeline-period">{yearsPeriod(job, lang)}</span>
                <p>{job.summary[lang]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
