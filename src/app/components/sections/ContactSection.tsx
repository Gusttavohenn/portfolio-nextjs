"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { socialLinks } from '@/lib/social-links';

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

  const cards = [
    {
      key: 'whatsapp',
      href: socialLinks.whatsapp,
      icon: 'fab fa-whatsapp',
      label: 'WhatsApp',
      value: t('whatsValue'),
      external: true,
      highlight: true,
    },
    {
      key: 'email',
      href: `mailto:${socialLinks.email}`,
      icon: 'fa-solid fa-envelope',
      label: 'E-mail',
      value: socialLinks.email,
      external: false,
    },
    {
      key: 'linkedin',
      href: socialLinks.linkedin,
      icon: 'fab fa-linkedin-in',
      label: 'LinkedIn',
      value: '/in/gustavo-oliveira',
      external: true,
    },
    {
      key: 'github',
      href: socialLinks.github,
      icon: 'fab fa-github',
      label: 'GitHub',
      value: '@Gusttavohenn',
      external: true,
    },
  ];

  return (
    <section id="contato" className="section contact-section">
      <h2 className="section-title">{t('titulo')}</h2>
      <p className="section-subtitle">{t('subtitulo')}</p>

      <div className="contact-grid">
        {/* Coluna esquerda: canais de contato */}
        <div className="contact-info">
          <div className="contact-status">
            <span className="status-dot" aria-hidden="true"></span>
            {t('disponivel')}
          </div>

          <ul className="contact-cards">
            {cards.map((c) => (
              <li key={c.key}>
                <a
                  href={c.href}
                  className={`contact-card ${c.highlight ? 'highlight' : ''}`}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className="contact-card-icon"><i className={c.icon} aria-hidden="true"></i></span>
                  <span className="contact-card-text">
                    <span className="contact-card-label">{c.label}</span>
                    <span className="contact-card-value">{c.value}</span>
                  </span>
                  <i className="fa-solid fa-arrow-right contact-card-arrow" aria-hidden="true"></i>
                </a>
              </li>
            ))}
          </ul>

          <p className="contact-location">
            <i className="fa-solid fa-location-dot" aria-hidden="true"></i> {t('local')}
          </p>
        </div>

        {/* Coluna direita: formulário em janela de terminal */}
        <div className="contact-terminal">
          <div className="terminal-bar" aria-hidden="true">
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
            <span className="terminal-title">{t('terminalTitle')}</span>
          </div>

          <form
            id="contact-form"
            action="https://formspree.io/f/xyzndejv"
            method="POST"
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <p className="terminal-prompt" aria-hidden="true">
              <span className="prompt-sign">$</span> {t('prompt')}<span className="prompt-cursor">_</span>
            </p>
            <label className="sr-only" htmlFor="cf-name">{t('nomePlaceholder')}</label>
            <input id="cf-name" type="text" name="name" placeholder={t('nomePlaceholder')} required />
            <label className="sr-only" htmlFor="cf-email">{t('emailPlaceholder')}</label>
            <input id="cf-email" type="email" name="email" placeholder={t('emailPlaceholder')} required />
            <label className="sr-only" htmlFor="cf-tel">{t('telefonePlaceholder')}</label>
            <input id="cf-tel" type="tel" name="telefone" placeholder={t('telefonePlaceholder')} />
            <label className="sr-only" htmlFor="cf-msg">{t('mensagemPlaceholder')}</label>
            <textarea id="cf-msg" name="message" placeholder={t('mensagemPlaceholder')} required></textarea>
            <button
              type="submit"
              className={`cta-button form-button ${buttonState !== 'idle' ? buttonState : ''}`}
              disabled={buttonState !== 'idle'}
              aria-describedby="form-status"
            >
              <span className="button-content">{buttonText ?? t('enviar')}</span>
            </button>
            {statusMsg && <p id="form-status" className={statusType}>{statusMsg}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
