export default function ContactSection() {
  return (
    <section id="contato" className="section">
      <h2 className="section-title">Contato</h2>
      <p>Pronto para criar algo extraordinário juntos?</p>
      <form id="contact-form" action="https://formspree.io/f/xyzndejv" method="POST" className="contact-form">
        <input type="text" name="name" placeholder="Seu Nome" required />
        <input type="email" name="email" placeholder="Seu E-mail" required />
        <textarea name="message" placeholder="Sua Mensagem" required></textarea>
        <button type="submit" className="cta-button form-button"><span className="button-text">ENVIAR MENSAGEM</span></button>
      </form>
      <p id="form-status"></p>
    </section>
  );
}