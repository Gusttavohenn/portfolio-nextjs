import { projects } from '@/lib/projects-data';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { toLang } from '@/lib/cv';
import FaIcon from '../../../components/FaIcon';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const lang = toLang(locale);
  const t = await getTranslations('ProjectDetail');
  const c = await getTranslations('Common');
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) notFound();

  const prev = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const next = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <article className="case-study-container section">
      <Link href={`/${locale}/#projetos`} className="back-link">
        <FaIcon name="fa-solid fa-arrow-left" /> {t('voltar')}
      </Link>

      <div className="case-study-header">
        <h1>{project.title[lang]}</h1>
        <p className="short-description">{project.shortDescription[lang]}</p>
        <Image
          src={project.imageUrl}
          alt={c('imagem', { nome: project.title[lang] })}
          width={900}
          height={0}
          style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 30px var(--shadow-color)' }}
        />
      </div>

      <div className="case-study-content">
        {/* Tecnologias */}
        <section className="case-study-section">
          <h3><FaIcon name="fa-solid fa-layer-group" /> {t('tecnologias')}</h3>
          <div className="case-study-techs">
            {project.tags.map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </section>

        {/* O Problema */}
        <section className="case-study-section">
          <h3><FaIcon name="fa-solid fa-bullseye" /> {t('problema')}</h3>
          <p>{project.problem[lang]}</p>
        </section>

        {/* A Solução */}
        <section className="case-study-section">
          <h3><FaIcon name="fa-solid fa-lightbulb" /> {t('solucao')}</h3>
          <p>{project.solution[lang]}</p>
        </section>

        {/* Aprendizados */}
        <section className="case-study-section">
          <h3><FaIcon name="fa-solid fa-graduation-cap" /> {t('aprendizados')}</h3>
          <p>{project.learnings[lang]}</p>
        </section>

        <div className="button-group">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cta-button">
              <FaIcon name="fa-solid fa-arrow-up-right-from-square" style={{ marginRight: '0.5rem' }} />
              {t('verAoVivo')}
            </a>
          )}
          {project.codeUrl && (
            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="cta-button secondary">
              <FaIcon name="fab fa-github" style={{ marginRight: '0.5rem' }} />
              {t('verCodigo')}
            </a>
          )}
        </div>
      </div>

      {/* Navegação entre projetos */}
      {(prev || next) && (
        <nav className="project-nav">
          {prev ? (
            <Link href={`/${locale}/projects/${prev.slug}`} className="project-nav-link prev">
              <span><FaIcon name="fa-solid fa-arrow-left" /> {t('anterior')}</span>
              <span>{prev.title[lang]}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/${locale}/projects/${next.slug}`} className="project-nav-link next">
              <span>{t('proximo')} <FaIcon name="fa-solid fa-arrow-right" /></span>
              <span>{next.title[lang]}</span>
            </Link>
          ) : <div />}
        </nav>
      )}
    </article>
  );
}
