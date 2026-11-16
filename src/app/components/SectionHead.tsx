import type { ReactNode } from 'react';

/*
 * Cabeçalho de seção: rótulo pequeno em maiúsculas + título alinhados à esquerda.
 * Substitui os títulos roxos centralizados que se repetiam em todas as seções.
 */
export default function SectionHead({ label, title, lead, aside }: { label: string; title: string; lead?: string; aside?: ReactNode }) {
  return (
    <header className="section-head">
      <div className="section-head-text">
        <p className="section-label">{label}</p>
        <h2 className="section-title">{title}</h2>
        {lead && <p className="section-lead">{lead}</p>}
      </div>
      {aside}
    </header>
  );
}
