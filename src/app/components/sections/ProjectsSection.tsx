"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { TbArrowRight, TbArrowUpRight } from 'react-icons/tb';
import { projects, type Project, type Category } from '@/lib/projects-data';
import { toLang, type Lang } from '@/lib/cv';
import SectionHead from '../SectionHead';

/*
 * Projetos: filtros no topo, os destaques (featured) em formato grande e o resto numa grade.
 * Tudo visível, sem "ver mais". O filtro vale para os destaques e para a grade.
 * O filtro fica na URL (#projetos-producao, #projetos-site...) para dar para mandar o link direto.
 */
type Filter = 'todos' | Category;
const ALL_FILTERS: Filter[] = ['todos', 'producao', 'sistema', 'site', 'api'];
// só mostra o filtro que tem algum projeto
const FILTERS = ALL_FILTERS.filter((f) => f === 'todos' || projects.some((p) => p.category === f));
const hashFor = (f: Filter) => (f === 'todos' ? '#projetos' : `#projetos-${f}`);
const fromHash = (h: string): Filter | null => {
  const m = /^#projetos-(\w+)$/.exec(h);
  return m && (FILTERS as string[]).includes(m[1]) ? (m[1] as Filter) : null;
};

/** capa com um segundo print do sistema por cima, que aparece ao passar o mouse */
function Cover({ project, href, lang, sizes, label, altLabel }: { project: Project; href: string; lang: Lang; sizes: string; label: string; altLabel: string }) {
  const alt = project.gallery?.[0];
  return (
    <Link href={href} className="proj-cover" aria-label={label}>
      <Image src={`${project.cover}-${lang}.webp`} alt={project.title[lang]} fill sizes={sizes} style={{ objectFit: 'cover' }} />
      {alt && <Image className="proj-alt" src={alt} alt={`${altLabel}: ${project.title[lang]}`} fill sizes={sizes} style={{ objectFit: 'cover' }} />}
    </Link>
  );
}

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
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  // filtro vindo do link (#projetos-producao): aplica e rola até a seção
  useEffect(() => {
    const apply = () => {
      const f = fromHash(window.location.hash);
      if (!f) return;
      setFilter(f);
      document.getElementById('projetos')?.scrollIntoView();
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  const choose = (f: Filter) => {
    setFilter(f);
    history.replaceState(null, '', hashFor(f));
  };

  // setas esquerda/direita, Home e End andam entre os filtros
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = FILTERS.length;
    const next = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    btns.current[next]?.focus();
    choose(FILTERS[next]);
  };

  const count = (f: Filter) => (f === 'todos' ? projects.length : projects.filter((p) => p.category === f).length);
  const list = filter === 'todos' ? projects : projects.filter((p) => p.category === filter);
  const featured = list.filter((p) => p.featured);
  const rest = list.filter((p) => !p.featured);

  return (
    <section id="projetos" className="section projects-section">
      <SectionHead label={t('rotulo')} title={t('titulo')} />

      <div className="proj-filters" role="group" aria-label={t('filtrar')}>
        {FILTERS.map((f, i) => (
          <button
            key={f}
            ref={(el) => { btns.current[i] = el; }}
            type="button"
            className={`proj-filter${filter === f ? ' on' : ''}`}
            aria-pressed={filter === f}
            aria-controls="projetos-lista"
            onClick={() => choose(f)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t(`filtro_${f}`)} <span className="proj-count" aria-label={t('qtd', { n: count(f) })}>{count(f)}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">{t('mostrando', { n: list.length })}</p>
      <div id="projetos-lista" className="proj-results">
      {featured.length > 0 && (
        <ol className="proj-list" key={`f-${filter}`}>
          {featured.map((project) => {
            const href = `/${locale}/projects/${project.slug}`;
            return (
              <li key={project.slug} className="project-card proj-row">
                <Cover project={project} href={href} lang={lang} sizes="(max-width: 900px) 100vw, 640px" label={`${t('verProjeto')}: ${project.title[lang]}`} altLabel={t('outraTela')} />
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
                <Cover project={project} href={href} lang={lang} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px" label={`${t('verProjeto')}: ${project.title[lang]}`} altLabel={t('outraTela')} />
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
      </div>
    </section>
  );
}
