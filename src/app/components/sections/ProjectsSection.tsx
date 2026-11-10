"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { TbArrowRight, TbArrowUpRight, TbChevronDown } from 'react-icons/tb';
import { projects } from '@/lib/projects-data';
import { toLang } from '@/lib/cv';

// Projetos em lista: capa grande de um lado, texto do outro (o lado alterna a cada projeto).
// Mostra os primeiros INITIAL; o resto aparece no botão "ver mais" (a lista não fica gigante).
const INITIAL = 4;
export default function ProjectsSection() {
  const locale = useLocale();
  const lang = toLang(locale);
  const t = useTranslations('ProjectsSection');
  const [open, setOpen] = useState(false);
  const shown = open ? projects : projects.slice(0, INITIAL);
  const hidden = projects.length - INITIAL;

  return (
    <section id="projetos" className="section projects-section">
      <h2 className="section-title">{t('titulo')}</h2>

      <ol className="proj-list">
        {shown.map((project, i) => {
          const href = `/${locale}/projects/${project.slug}`;
          return (
            <li key={project.slug} className={`project-card proj-row${i >= INITIAL ? ' proj-new' : ''}`}>
              <Link href={href} className="proj-cover" aria-label={`${t('verProjeto')}: ${project.title[lang]}`}>
                <Image
                  src={`${project.cover}-${lang}.webp`}
                  alt={project.title[lang]}
                  fill
                  sizes="(max-width: 900px) 100vw, 640px"
                  style={{ objectFit: 'cover' }}
                />
              </Link>

              <div className="proj-body">
                <span className="proj-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="proj-title"><Link href={href}>{project.title[lang]}</Link></h3>
                <p className="proj-desc">{project.description[lang]}</p>
                <p className="proj-stack">{project.tags.join('  ·  ')}</p>
                <div className="proj-links">
                  <Link href={href} className="proj-link main">
                    {t('verProjeto')} <TbArrowRight aria-hidden="true" />
                  </Link>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-link">
                      {t('verDemo')} <TbArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                  {project.codeUrl && (
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="proj-link">
                      {t('verCodigo')} <TbArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {hidden > 0 && !open && (
        <button type="button" className="proj-more" onClick={() => setOpen(true)}>
          {t('verMais', { n: hidden })} <TbChevronDown aria-hidden="true" />
        </button>
      )}
    </section>
  );
}
