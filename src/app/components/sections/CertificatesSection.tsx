"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TbArrowUpRight, TbChevronDown } from 'react-icons/tb';
import SectionHead from '../SectionHead';

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

// IA e C#/.NET aparecem primeiro; o resto fica recolhido em "ver todos"
const FIRST = ["ai", "csharp"] as const;
const REST = ["frontend", "database", "tools"] as const;
const LABEL: Record<string, string> = {
  frontend: "catFrontend", database: "catDatabase", tools: "catTools", csharp: "catCsharp", ai: "catAI",
};

function CertList({ certs, open }: { certs: Certificate[]; open: string }) {
  return (
    <ul className="ct-list">
      {certs.map((cert) => (
        <li key={cert.title}>
          <a href={cert.url} target="_blank" rel="noopener noreferrer" className="ct-row">
            <span className="ct-title">{cert.title}</span>
            <span className="ct-meta">{cert.platform}{cert.hours.trim() ? ` · ${cert.hours}` : ''}</span>
            <TbArrowUpRight className="ct-arrow" aria-label={open} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function CertificatesSection() {
  const t = useTranslations('CertificatesSection');
  const [all, setAll] = useState(false);
  const label = (id: string) => t(LABEL[id] as Parameters<typeof t>[0]);
  const restCount = REST.reduce((n, id) => n + (certsByCategory[id]?.length ?? 0), 0);

  return (
    <section id="certificados" className="section">
      <SectionHead label={t('rotulo')} title={t('titulo')} />

      <div className="ct-wrap">
        {FIRST.map((id) => (
          <div key={id} className="ct-group">
            <h3 className="ct-h">{label(id)}</h3>
            <CertList certs={certsByCategory[id] ?? []} open={t('abrir')} />
          </div>
        ))}

        <div className="ct-more">
          <button type="button" className="ct-toggle" aria-expanded={all} aria-controls="certs-resto" onClick={() => setAll((v) => !v)}>
            {all ? t('verMenos') : t('verTodos', { n: restCount })}
            <TbChevronDown className={`ct-chev${all ? ' up' : ''}`} aria-hidden="true" />
          </button>
          <div id="certs-resto" hidden={!all}>
            {REST.map((id) => (
              <div key={id} className="ct-group">
                <h3 className="ct-h">{label(id)}</h3>
                <CertList certs={certsByCategory[id] ?? []} open={t('abrir')} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
