"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('ContactSection');
  const [buttonText, setButtonText] = useState<string | null>(null);
  const [buttonState, setButtonState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [statusType, setStatusType] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setButtonState('sending');
    setButtonText(t('enviando'));
    setStatusMsg('');
    setStatusType('');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error();

      setButtonState('success');
      setButtonText(t('enviado'));
      setStatusMsg(t('sucessoMsg'));
      setStatusType('success');
      form.reset();
    } catch {
      setButtonState('idle');
      setButtonText(null);
      setStatusMsg(t('erroMsg'));
      setStatusType('error');
    } finally {
      setTimeout(() => {
        setButtonState('idle');
        setButtonText(null);
        setStatusMsg('');
        setStatusType('');
      }, 3000);
    }
  };

  return (
    <section id="contato" className="section">
      <h2 className="section-title">{t('titulo')}</h2>
      <p>{t('subtitulo')}</p>
      <form
        id="contact-form"
        action="https://formspree.io/f/xyzndejv"
        method="POST"
        className="contact-form"
        onSubmit={handleSubmit}
      >
        <input type="text" name="name" placeholder={t('nomePlaceholder')} required />
        <input type="email" name="email" placeholder={t('emailPlaceholder')} required />
        <input type="tel" name="telefone" placeholder={t('telefonePlaceholder')} required />
        <textarea name="message" placeholder={t('mensagemPlaceholder')} required></textarea>
        <button
          type="submit"
          className={`cta-button form-button ${buttonState !== 'idle' ? buttonState : ''}`}
          disabled={buttonState !== 'idle'}
          aria-describedby="form-status"
        >
          <span className="button-text">{buttonText ?? t('enviar')}</span>
        </button>
      </form>
      {statusMsg && <p id="form-status" className={statusType}>{statusMsg}</p>}
    </section>
  );
}
