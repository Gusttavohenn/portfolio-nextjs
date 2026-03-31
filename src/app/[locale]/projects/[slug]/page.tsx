import { projects } from '@/lib/projects-data';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const t = await getTranslations('ProjectDetail');
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className="section">
        <h2>Projeto não encontrado!</h2>
        <Link href={`/${locale}`} className="cta-button">Voltar para o Início</Link>
      </div>
    );
  }

  const prev = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const next = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <article className="case-study-container section">
      <Link href={`/${locale}/#projetos`} className="back-link">
        <i className="fa-solid fa-arrow-left" aria-hidden="true"></i> {t('voltar')}
      </Link>

      <div className="case-study-header">
        <h1>{project.title}</h1>
        <p className="short-description">{project.shortDescription}</p>
        <Image
          src={project.imageUrl}
          alt={`Imagem do projeto ${project.title}`}
          width={900}
          height={0}
          style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 30px var(--shadow-color)' }}
        />
      </div>

      <div className="case-study-content">
        {/* Tecnologias */}
        <section className="case-study-section">
          <h3><i className="fa-solid fa-layer-group" aria-hidden="true"></i> {t('tecnologias')}</h3>
          <div className="case-study-techs">
            {project.tags.map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </section>

        {/* O Problema */}
        <section className="case-study-section">
          <h3><i className="fa-solid fa-bullseye" aria-hidden="true"></i> {t('problema')}</h3>
          <p>{project.problem}</p>
        </section>

        {/* A Solução */}
        <section className="case-study-section">
          <h3><i className="fa-solid fa-lightbulb" aria-hidden="true"></i> {t('solucao')}</h3>
          <p>{project.solution}</p>
        </section>

        {/* Aprendizados */}
        <section className="case-study-section">
          <h3><i className="fa-solid fa-graduation-cap" aria-hidden="true"></i> {t('aprendizados')}</h3>
          <p>{project.learnings}</p>
        </section>

        <div className="button-group">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cta-button">
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
              {t('verAoVivo')}
            </a>
          )}
          {project.codeUrl && (
            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="cta-button secondary">
              <i className="fab fa-github" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
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
              <span><i className="fa-solid fa-arrow-left" aria-hidden="true"></i> {t('anterior')}</span>
              <span>{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/${locale}/projects/${next.slug}`} className="project-nav-link next">
              <span>{t('proximo')} <i className="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
              <span>{next.title}</span>
            </Link>
          ) : <div />}
        </nav>
      )}
    </article>
  );
}
