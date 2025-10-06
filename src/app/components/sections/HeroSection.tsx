export default function HeroSection() {
  return (
    <section id="home" className="hero section">
      <h1 className="typing-text" data-text="DESENVOLVEDOR JR."></h1>
      <p>Seja bem-vindo ao meu portfólio :)</p>
      <div className="button-group">
        <a href="#projetos" className="cta-button">EXPLORAR PROJETOS</a>
        <a href="/seu-cv.pdf" download className="cta-button secondary">DOWNLOAD CV</a>
      </div>
    </section>
  );
}