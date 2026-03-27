"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Certificate {
  title: string;
  platform: string;
  hours: string;
}

const certsByCategory: Record<string, Certificate[]> = {
  frontend: [
    { title: "Front End & UX/UI Design",                          platform: "Origamid", hours: "82h" },
    { title: "Tipografia Avançada",                               platform: "Origamid", hours: "24h" },
    { title: "JavaScript e jQuery",                               platform: "Origamid", hours: "18h" },
    { title: "UX Design Heurísticas",                             platform: "Origamid", hours: "16h" },
    { title: "Bootstrap 4",                                       platform: "Origamid", hours: "10h" },
    { title: "Introdução a Criação de Websites com HTML5 e CSS3", platform: "DIO",      hours: "6h"  },
    { title: "WordPress REST API",                                platform: "Origamid", hours: "4h"  },
    { title: "WordPress REST API Dogs",                           platform: "Origamid", hours: "4h"  },
    { title: "Posicionando Elementos com Flexbox em CSS",         platform: "DIO",      hours: "4h"  },
  ],
  database: [
    { title: "O Curso Completo de Banco de Dados e SQL", platform: "Udemy", hours: "58,5h" },
  ],
  tools: [
    { title: "Introdução ao Git e ao GitHub", platform: "DIO", hours: "5h" },
  ],
  csharp: [
    { title: "Sintaxe e Tipos de Dados em C#", platform: "DIO", hours: "3h" },
  ],
  ai: [
    { title: "Introduction to Subagents", platform: "Anthropic", hours: "2025" },
    { title: "Claude Code in Action",     platform: "Anthropic", hours: "2025" },
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
              <button className="cert-group-header" onClick={() => toggle(id)} aria-expanded={openId === id}>
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
                    <div key={cert.title} className="certificate-card">
                      <span
                        className="certificate-platform"
                        style={{ backgroundColor: platformColors[cert.platform] ?? '#555' }}
                      >
                        {cert.platform}
                      </span>
                      <h3 className="certificate-title">{cert.title}</h3>
                      <span className="certificate-hours">{cert.hours}</span>
                    </div>
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
