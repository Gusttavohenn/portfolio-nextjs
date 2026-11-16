"use client";

import { useLocale, useTranslations } from 'next-intl';
import { TbChevronDown } from 'react-icons/tb';
import { cv, loc, toLang, yearsPeriod } from '@/lib/cv';
import SectionHead from '../SectionHead';

/*
 * Jornada compacta: cargo, empresa e período numa linha; o resumo abre ao clicar.
 * O cargo atual vem primeiro, em destaque e já aberto. Fonte: content/cv.json (a mesma dos PDFs).
 */
export default function TimelineSection() {
  const t = useTranslations('TimelineSection');
  const lang = toLang(useLocale());

  return (
    <section id="jornada" className="section">
      <SectionHead label={t('rotulo')} title={t('titulo')} />
      <ol className="jr-list">
        {cv.experience.map((job) => {
          const isCurrent = job.end === null;
          return (
            <li key={`${loc(job.company, 'pt')}-${job.start}`} className={`jr-item${isCurrent ? ' current' : ''}`}>
              <details open={isCurrent}>
                <summary className="jr-row">
                  <span className="jr-role">
                    {job.role[lang]}
                    {isCurrent && <span className="jr-badge">{t('atual')}</span>}
                  </span>
                  <span className="jr-company">{loc(job.company, lang)}</span>
                  <span className="jr-period">{yearsPeriod(job, lang)}</span>
                  <TbChevronDown className="jr-chev" aria-hidden="true" />
                </summary>
                <p className="jr-detail">{job.summary[lang]}</p>
              </details>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
