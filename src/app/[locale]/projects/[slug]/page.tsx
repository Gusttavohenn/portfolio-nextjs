import { projects } from '@/lib/projects-data';
import Link from 'next/link';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  
  const project = projects.find(p => p.slug === params.slug);

  if (!project) {
    return (
      <div className="section">
        <h2>Projeto não encontrado!</h2>
        <Link href="/" className="cta-button">Voltar para o Início</Link>
      </div>
    );
  }

  return (
    <article className="case-study-container section">
      <div className="case-study-header">
        <h1>{project.title}</h1>
        <p className="short-description">{project.shortDescription}</p>
        <img src={project.imageUrl} alt={`Imagem do projeto ${project.title}`} loading="lazy" />
      </div>

      <div className="case-study-content">
        <section className="case-study-section">
          <h3><i className="fa-solid fa-bullseye"></i> O Problema</h3>
          <p>{project.problem}</p>
        </section>

        <div className="button-group">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" className="cta-button">VER AO VIVO</a>}
          {project.codeUrl && <a href={project.codeUrl} target="_blank" className="cta-button secondary">VER CÓDIGO</a>}
        </div>
      </div>
    </article>
  );
}