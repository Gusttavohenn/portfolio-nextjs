export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <h2 className="section-title">Minhas Skills</h2>
      <div className="skills-container">
        <div className="skill-category"><h3><i className="fa-solid fa-code"></i> Frontend</h3><div className="skills-list"><span className="skill-item"><i className="fab fa-html5"></i> HTML5</span><span className="skill-item"><i className="fab fa-css3-alt"></i> CSS3</span><span className="skill-item"><i className="fab fa-js"></i> JavaScript</span><span className="skill-item"><i className="fab fa-react"></i> React</span></div></div>
        <div className="skill-category"><h3><i className="fa-solid fa-server"></i> Backend</h3><div className="skills-list"><span className="skill-item"><i className="fab fa-node-js"></i> Node.js</span><span className="skill-item"><i className="fab fa-python"></i> Python</span></div></div>
        <div className="skill-category"><h3><i className="fa-solid fa-screwdriver-wrench"></i> Ferramentas & DB</h3><div className="skills-list"><span className="skill-item"><i className="fab fa-git-alt"></i> Git</span><span className="skill-item"><i className="fab fa-github"></i> GitHub</span><span className="skill-item"><i className="fab fa-docker"></i> Docker</span><span className="skill-item"><i className="fa-solid fa-database"></i> MongoDB</span></div></div>
      </div>
    </section>
  );
}