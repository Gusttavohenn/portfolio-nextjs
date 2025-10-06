export default function TimelineSection() {
  return (
    <section id="sobre" className="section">
      <h2 className="section-title">Minha Jornada</h2>
      <div className="timeline">
        <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-content"><h3>Início dos Estudos (2023)</h3><p>Comecei minha jornada com HTML, CSS e JavaScript, construindo as bases para o desenvolvimento web.</p></div></div>
        <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-content"><h3>Primeiro Projeto com React (2024)</h3><p>Desenvolvi minha primeira aplicação complexa usando React, aprofundando em componentização e estado.</p></div></div>
        <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-content"><h3>Explorando o Backend (2024)</h3><p>Aventurei-me no Node.js e Express, aprendendo a construir APIs REST e a conectar com bancos de dados.</p></div></div>
        <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-content"><h3>Busca por Oportunidades (Hoje)</h3><p>Pronto para aplicar meu conhecimento e paixão em um desafio real como Desenvolvedor Júnior.</p></div></div>
      </div>
    </section>
  );
}