"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Certificate {
  title: string;
  platform: string;
  hours: string;
  url: string; // Adicionado
}

const certsByCategory: Record<string, Certificate[]> = {
  frontend: [
    { title: "Front End & UX/UI Design",                          platform: "Origamid", hours: "82h", url: "https://origamid.com/certificate/ce46d027" },
    { title: "Tipografia Avançada",                               platform: "Origamid", hours: "24h", url: "https://origamid.com/certificate/bbcd2782" },
    { title: "JavaScript e jQuery",                               platform: "Origamid", hours: "18h", url: "https://origamid.com/certificate/beaf87f1" },
    { title: "UX Design Heurísticas",                             platform: "Origamid", hours: "16h", url: "https://origamid.com/certificate/79ac6688" },
    { title: "Bootstrap 4",                                       platform: "Origamid", hours: "10h", url: "https://origamid.com/certificate/6ba2588a" },
    { title: "Introdução a Criação de Websites com HTML5 e CSS3", platform: "DIO",      hours: "6h",  url: "https://www.dio.me/certificate/31DEF1AB/share" },
    { title: "WordPress REST API",                                platform: "Origamid", hours: "4h",  url: "https://origamid.com/certificate/7d7d97f8" },
    { title: "WordPress REST API Dogs",                           platform: "Origamid", hours: "4h",  url: "https://origamid.com/certificate/e633f03d" },
    { title: "Posicionando Elementos com Flexbox em CSS",         platform: "DIO",      hours: "4h",  url: "https://www.dio.me/certificate/2C87C967/share" },
  ],
  database: [
    { title: "O Curso Completo de Banco de Dados e SQL", platform: "Udemy", hours: "58,5h", url: "https://www.udemy.com/certificate/UC-4c0c8801-76ec-41d7-8435-310ae5a34059/" },
    { title: "Banco de Dados SQLite", platform: "Origamid", hours: "16h", url: "https://origamid.com/certificate/792e18a5" },
  ],
  tools: [
    { title: "Introdução ao Git e ao GitHub", platform: "DIO", hours: "5h", url: "https://www.dio.me/certificate/74AE6C62/share" },
  ],
  csharp: [
    { title: "Sintaxe e Tipos de Dados em C#", platform: "DIO", hours: "3h", url: "https://www.dio.me/certificate/YIIH49XM/share" },
  ],
  ai: [
    { title: "Introduction to Subagents", platform: "Anthropic", hours: " ", url: "https://verify.skilljar.com/c/n6whsxdqeqfm" },
    { title: "Claude Code in Action",     platform: "Anthropic", hours: " ", url: "https://verify.skilljar.com/c/7542p662yc56" },
    { title: "Claude 101",     platform: "Anthropic", hours: " ", url: "https://verify.skilljar.com/c/rbp9qehonked" },
  ],
};

const categoryMeta: { id: string; labelKey: string; icon: string }[] = [
  { id: "frontend",  labelKey: "catFrontend", icon: "fa-solid fa-display"            },
  { id: "database",  labelKey: "catDatabase", icon: "fa-solid fa-database"           },
  { id: "tools",     labelKey: "catTools",    icon: "fa-solid fa-screwdriver-wrench" },
  { id: "csharp",    labelKey: "catCsharp",   icon: "fa-solid fa-code"               },
  { id: "ai",        labelKey: "catAI",       icon: "fa-solid fa-robot"              },
];

const platformColors: Record<string, string> = {
  Origamid:  "#e05a3a",
  Udemy:     "#a435f0",
  DIO:       "#00aaff",
  Anthropic: "#cc785c",
};

export default function CertificatesSection() {
  const t = useTranslations('CertificatesSection');
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id);

  return (
    <section id="certificados" className="section">
      <h2 className="section-title">{t('titulo')}</h2>
      <p className="section-subtitle">{t('subtitulo')}</p>

      <div className="cert-accordion">
        {categoryMeta.map(({ id, labelKey, icon }) => {
          const certs = certsByCategory[id] ?? [];
          return (
            <div key={id} className={`cert-group ${openId === id ? 'open' : ''}`}>
              <button className="cert-group-header" onClick={() => toggle(id)} aria-expanded={openId === id} aria-label={`${openId === id ? 'Fechar' : 'Abrir'} categoria ${t(labelKey as Parameters<typeof t>[0])}`}>
                <span className="cert-group-title">
                  <i className={icon} aria-hidden="true"></i>
                  {t(labelKey as Parameters<typeof t>[0])}
                  <span className="cert-count">{certs.length}</span>
                </span>
                <i className="fa-solid fa-chevron-down cert-chevron" aria-hidden="true"></i>
              </button>

              <div className="cert-group-body">
                <div className="certificates-grid">
                  {certs.map(cert => (
                    <a 
                      key={cert.title} 
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="certificate-card"
                      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                    >
                      <span
                        className="certificate-platform"
                        style={{ backgroundColor: platformColors[cert.platform] ?? '#555' }}
                      >
                        {cert.platform}
                      </span>
                      <h3 className="certificate-title">{cert.title}</h3>
                      <span className="certificate-hours">
                        {cert.hours} <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.8rem', marginLeft: '5px' }}></i>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}