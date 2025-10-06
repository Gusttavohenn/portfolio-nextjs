import Link from 'next/link'; // 1. Importe o Link

export default function ProjectsSection() {
  return (
    <section id="projetos" className="section">
      <h2 className="section-title">Projetos</h2>
      <div className="filter-buttons">
        <button className="filter-btn active" data-filter="*">Todos</button>
        <button className="filter-btn" data-filter="react">React</button>
        <button className="filter-btn" data-filter="nodejs">Node.js</button>
        <button className="filter-btn" data-filter="python">Python</button>
      </div>
      <div className="project-grid">
        {/* 2. Envolva o card com o Link e remova o data-modal-target */}
        <Link href="/projects/plataforma-ecommerce" className="project-card" data-tags="react nodejs mongodb">
          <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070" alt="Projeto E-commerce" loading="lazy" />
          <div className="card-info"><h4>Plataforma E-commerce</h4><p>REACT, NODE.JS, MONGODB</p></div>
        </Link>
        
        {/* 3. Faça o mesmo para o outro projeto */}
        <Link href="/projects/app-mobile-produtividade" className="project-card" data-tags="react firebase">
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2070" alt="App Mobile" loading="lazy" />
          <div className="card-info"><h4>App Mobile</h4><p>REACT NATIVE, FIREBASE</p></div>
        </Link>
      </div>
    </section>
  );
}