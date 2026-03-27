import { projects } from '@/lib/projects-data';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

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
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
          <Image src={project.imageUrl} alt={`Imagem do projeto ${project.title}`} fill style={{ objectFit: 'cover' }} />
        </div>
      </div>

      <div className="case-study-content">
        <section className="case-study-section">
          <h3><i className="fa-solid fa-bullseye" aria-hidden="true"></i> O Problema</h3>
          <p>{project.problem}</p>
        </section>

        <div className="button-group">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cta-button">VER AO VIVO</a>}
          {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="cta-button secondary">VER CÓDIGO</a>}
        </div>
      </div>
    </article>
  );
}
