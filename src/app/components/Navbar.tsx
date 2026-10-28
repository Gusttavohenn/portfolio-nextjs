"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import SoundToggle from './SoundToggle';
import { TbDeviceGamepad2, TbClockHour4 } from 'react-icons/tb';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const tr = useTranslations('Resumo');
  const c = useTranslations('Common');
  const [themeIcon, setThemeIcon] = useState('fa-moon');

  useEffect(() => {
    // Tema padrão: ESCURO (combina com a identidade). Só fica claro se o usuário escolher.
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        setThemeIcon('fa-sun');
    }

    // Lógica do clique no botão
    const themeToggle = document.getElementById('theme-toggle');
    const handleThemeToggle = () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        setThemeIcon(isLight ? 'fa-sun' : 'fa-moon');
    };

    themeToggle?.addEventListener('click', handleThemeToggle);

    return () => {
        themeToggle?.removeEventListener('click', handleThemeToggle);
    }
  }, []);

  return (
    <header className="navbar">
      <div className="logo">GUSTAVO OLIVEIRA</div>
      <nav>
        <ul>
          <li><a href="#home">{t('inicio')}</a></li>
          <li><a href="#sobre">{t('sobre')}</a></li>
          <li><a href="#servicos">{t('servicos')}</a></li>
          <li><a href="#skills">{t('skills')}</a></li>
          <li><a href="#jornada">{t('jornada')}</a></li>
          <li><a href="#projetos">{t('projetos')}</a></li>
          <li><a href="#certificados">{t('certificados')}</a></li>
          <li><a href="#contato">{t('contato')}</a></li>
        </ul>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          className="qs-nav-btn"
          aria-label={tr('botao')}
          onClick={() => window.dispatchEvent(new Event('open-summary'))}
        >
          <TbClockHour4 aria-hidden="true" /> <span>{tr('botao')}</span>
        </button>
        <LanguageSwitcher />
        <button
          className="theme-toggle arcade-toggle"
          onClick={() => window.dispatchEvent(new Event('open-arcade'))}
          aria-label={c('jogarDeploy')}
          title={c('jogarDeploy')}
        >
          <TbDeviceGamepad2 aria-hidden="true" />
        </button>
        <SoundToggle />
        <button id="theme-toggle" className="theme-toggle" aria-label={c('tema')}>
          <i className={`fa-solid ${themeIcon}`}></i>
        </button>
      </div>
    </header>
  );
}