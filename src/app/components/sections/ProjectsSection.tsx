"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { projects } from '@/lib/projects-data';

export default function ProjectsSection() {
  const locale = useLocale();
  const t = useTranslations('ProjectsSection');
  const [activeFilter, setActiveFilter] = useState('*');

  const filteredProjects = activeFilter === '*'
    ? projects
    : projects.filter(project => project.tags.includes(activeFilter.toLowerCase()));

  const allTags = ['*', ...Array.from(new Set(projects.flatMap(p => p.tags)))];

  return (
    <section id="projetos" className="section">
      <h2 className="section-title">{t('titulo')}</h2>
      <div className="filter-buttons">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`filter-btn ${activeFilter === tag ? 'active' : ''}`}
            onClick={() => setActiveFilter(tag)}
            aria-label={`Filtrar por ${tag === '*' ? t('todos') : tag}`}
          >
            {tag === '*' ? t('todos') : tag}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {filteredProjects.map(project => (
          <div key={project.slug} className="project-card">
            <Link href={`/${locale}/projects/${project.slug}`} className="project-card-link">
              <div className="project-image-container">
                <Image src={project.imageUrl} alt={project.title} fill style={{ objectFit: 'cover' }} />
                <div className="project-hover-overlay">
                  <span>{t('verProjeto')}</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-techs">
                  {project.tags.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </Link>
            <div className="project-card-actions">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-action-btn">
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> {t('verDemo')}
                </a>
              )}
              {project.codeUrl && (
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="project-action-btn">
                  <i className="fab fa-github" aria-hidden="true"></i> {t('verCodigo')}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
