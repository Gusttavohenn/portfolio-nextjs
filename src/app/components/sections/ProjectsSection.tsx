"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { TbArrowRight, TbArrowUpRight } from 'react-icons/tb';
import { projects, type Project, type Category } from '@/lib/projects-data';
import { toLang, type Lang } from '@/lib/cv';

/*
 * Projetos: filtros no topo, os destaques (featured) em formato grande e o resto numa grade.
 * Tudo visível, sem "ver mais". O filtro vale para os destaques e para a grade.
 */
type Filter = 'todos' | Category;
const FILTERS: Filter[] = ['todos', 'producao', 'sistema', 'site'];

function Links({ project, href, t }: { project: Project; href: string; t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="proj-links">
      <Link href={href} className="proj-link main">{t('verProjeto')} <TbArrowRight aria-hidden="true" /></Link>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-link">{t('verDemo')} <TbArrowUpRight aria-hidden="true" /></a>
      )}
      {project.codeUrl && (
        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="proj-link">{t('verCodigo')} <TbArrowUpRight aria-hidden="true" /></a>
      )}
    </div>
  );
}

function Badge({ project, lang, t }: { project: Project; lang: Lang; t: ReturnType<typeof useTranslations> }) {
  if (!project.production) return null;
  return (
    <div className="proj-meta">
      <span className="proj-badge"><span className="proj-dot" aria-hidden="true" />{t('producao')}</span>
      {project.result && <span className="proj-result">{project.result[lang]}</span>}
    </div>
  );
}

export default function ProjectsSection() {
  const locale = useLocale();
  const lang = toLang(locale);
  const t = useTranslations('ProjectsSection');
  const [filter, setFilter] = useState<Filter>('todos');

  const count = (f: Filter) => (f === 'todos' ? projects.length : projects.filter((p) => p.category === f).length);
  const list = filter === 'todos' ? projects : projects.filter((p) => p.category === filter);
  const featured = list.filter((p) => p.featured);
  const rest = list.filter((p) => !p.featured);

  return (
    <section id="projetos" className="section projects-section">
      <h2 className="section-title">{t('titulo')}</h2>

      <div className="proj-filters" role="group" aria-label={t('filtrar')}>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`proj-filter${filter === f ? ' on' : ''}`}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {t(`filtro_${f}`)} <span className="proj-count">{count(f)}</span>
          </button>
        ))}
      </div>

      {featured.length > 0 && (
        <ol className="proj-list" key={`f-${filter}`}>
          {featured.map((project) => {
            const href = `/${locale}/projects/${project.slug}`;
            return (
              <li key={project.slug} className="project-card proj-row">
                <Link href={href} className="proj-cover" aria-label={`${t('verProjeto')}: ${project.title[lang]}`}>
                  <Image src={`${project.cover}-${lang}.webp`} alt={project.title[lang]} fill sizes="(max-width: 900px) 100vw, 640px" style={{ objectFit: 'cover' }} />
                </Link>
                <div className="proj-body">
                  <Badge project={project} lang={lang} t={t} />
                  <h3 className="proj-title"><Link href={href}>{project.title[lang]}</Link></h3>
                  <p className="proj-desc">{project.description[lang]}</p>
                  <p className="proj-stack">{project.tags.join('  ·  ')}</p>
                  <Links project={project} href={href} t={t} />
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {rest.length > 0 && (
        <ul className="proj-grid" key={`g-${filter}`}>
          {rest.map((project) => {
            const href = `/${locale}/projects/${project.slug}`;
            return (
              <li key={project.slug} className="project-card proj-card">
                <Link href={href} className="proj-cover" aria-label={`${t('verProjeto')}: ${project.title[lang]}`}>
                  <Image src={`${project.cover}-${lang}.webp`} alt={project.title[lang]} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px" style={{ objectFit: 'cover' }} />
                </Link>
                <div className="proj-card-body">
                  <Badge project={project} lang={lang} t={t} />
                  <h3 className="proj-card-title"><Link href={href}>{project.title[lang]}</Link></h3>
                  <p className="proj-card-desc">{project.summary[lang]}</p>
                  <p className="proj-stack">{project.tags.join('  ·  ')}</p>
                  <Links project={project} href={href} t={t} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
