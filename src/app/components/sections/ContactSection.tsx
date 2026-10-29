"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { socialLinks } from '@/lib/social-links';
import FaIcon from '../FaIcon';

export default function ContactSection() {
  const t = useTranslations('ContactSection');
  const [buttonState, setButtonState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [statusType, setStatusType] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setButtonState('sending');
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
      setStatusMsg(t('sucessoMsg'));
      setStatusType('success');
      form.reset();
    } catch {
      setButtonState('error');
      setStatusMsg(t('erroMsg'));
      setStatusType('error');
    } finally {
      setTimeout(() => {
        setButtonState('idle');
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
                  <span className="contact-card-icon"><FaIcon name={c.icon} /></span>
                  <span className="contact-card-text">
                    <span className="contact-card-label">{c.label}</span>
                    <span className="contact-card-value">{c.value}</span>
                  </span>
                  <FaIcon name="fa-solid fa-arrow-right contact-card-arrow" />
                </a>
              </li>
            ))}
          </ul>

          <p className="contact-location">
            <FaIcon name="fa-solid fa-location-dot" /> {t('local')}
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
              className={`send-btn is-${buttonState}`}
              disabled={buttonState === 'sending' || buttonState === 'success'}
              aria-describedby="form-status"
            >
              <span className="send-label" key={buttonState}>
                {{ idle: t('enviar'), sending: t('enviando'), success: t('enviado'), error: t('tentarNovamente') }[buttonState]}
              </span>
              <span className="send-icon" aria-hidden="true">
                {buttonState === 'success' ? (
                  <svg viewBox="0 0 24 24" className="send-check"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                ) : buttonState === 'error' ? (
                  <svg viewBox="0 0 24 24" className="send-x"><path d="M7 7l10 10M17 7L7 17" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="send-plane"><path d="M3 11.5L21 3l-7.5 18-2.5-7.5L3 11.5z" /><path d="M11 13.5L21 3" /></svg>
                )}
              </span>
              <span className="send-progress" aria-hidden="true"></span>
            </button>
            {statusMsg && <p id="form-status" className={statusType}>{statusMsg}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
