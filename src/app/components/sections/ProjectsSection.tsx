"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { projects } from '@/lib/projects-data';

export default function ProjectsSection() {
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState('*');

  const filteredProjects = activeFilter === '*' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter.toLowerCase()));

  const allTags = ['*', ...Array.from(new Set(projects.flatMap(p => p.tags)))];

  return (
    <section id="projetos" className="section">
      <h2 className="section-title">Projetos</h2>
      <div className="filter-buttons">
        {allTags.map(tag => (
          <button 
            key={tag}
            className={`filter-btn ${activeFilter === tag ? 'active' : ''}`}
            onClick={() => setActiveFilter(tag)}
          >
            {tag === '*' ? 'Todos' : tag}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {filteredProjects.map(project => (
          <Link 
            key={project.slug}
            href={`/${locale}/projects/${project.slug}`} 
            className="project-card"
          >
            <div className="project-image-container">
              <img src={project.imageUrl} alt={project.title} loading="lazy" />
              <div className="project-hover-overlay">
                <span>Ver Projeto</span>
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
        ))}
      </div>
    </section>
  );
}