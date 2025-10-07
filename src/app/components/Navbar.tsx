"use client";

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [themeIcon, setThemeIcon] = useState('fa-moon');

  useEffect(() => {
    // Lógica para definir o tema inicial
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light' || (currentTheme === null && prefersLight)) {
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
          <li><a href="#home">Início</a></li>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projetos">Projetos</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
      <button id="theme-toggle" className="theme-toggle" aria-label="Mudar tema">
        <i className={`fa-solid ${themeIcon}`}></i>
      </button>
    </header>
  );
}