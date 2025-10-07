"use client";

import { useEffect } from 'react';

export default function ContactSection() {

  // Adicionamos a lógica do formulário AQUI, dentro do próprio componente
  useEffect(() => {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    const formButton = form.querySelector('.form-button') as HTMLButtonElement;
    const formButtonText = form.querySelector('.button-text') as HTMLSpanElement;
    const formStatus = document.getElementById('form-status') as HTMLParagraphElement;

    if (!form) return; // Se não achar o form, para a execução

    const handleFormSubmit = (e: Event) => {
        e.preventDefault();
        const formData = new FormData(form);
        formButton.disabled = true;
        formButton.classList.add('sending');
        formButtonText.textContent = 'Enviando...';
        formStatus.textContent = '';

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                formButton.classList.remove('sending');
                formButton.classList.add('success');
                formButtonText.textContent = 'Enviado!';
                formStatus.textContent = 'Obrigado pelo seu contato!';
                formStatus.classList.add('success');
                form.reset();
            } else {
                throw new Error('Network response was not ok.');
            }
        }).catch(error => {
            formButton.classList.remove('sending');
            formStatus.textContent = 'Oops! Houve um problema ao enviar.';
            formStatus.classList.add('error');
        }).finally(() => {
            setTimeout(() => {
                formButton.disabled = false;
                formButton.classList.remove('success');
                formButtonText.textContent = 'ENVIAR MENSAGEM';
                formStatus.textContent = '';
                formStatus.className = '';
            }, 3000);
        });
    };

    form.addEventListener('submit', handleFormSubmit);

    // Função de limpeza para remover o event listener
    return () => {
      form.removeEventListener('submit', handleFormSubmit);
    };
  }, []); // O array vazio garante que rode apenas uma vez

  return (
    <section id="contato" className="section">
      <h2 className="section-title">Contato</h2>
      <p>Pronto para criar algo extraordinário juntos?</p>
      {/* Verifique se a sua URL do Formspree está correta aqui */}
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