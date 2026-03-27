import { useTranslations } from 'next-intl';

export default function TimelineSection() {
  const t = useTranslations('TimelineSection');

  return (
    <section id="jornada" className="section">
      <h2 className="section-title">{t('titulo')}</h2>
      <div className="timeline">

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>Estágio em TI — Prefeitura de Itaúna-MG</h3>
            <span className="timeline-period">5 meses · 2021</span>
            <p>Suporte de hardware e ao usuário, manutenção de rede e configuração de Raspberry Pi para soluções internas da prefeitura.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>Analista de Sistemas — HTF</h3>
            <span className="timeline-period">6 meses · 2021–2022</span>
            <p>Instalação e suporte em ambientes Linux e Windows, backup e restore de bancos de dados, scripts de fluxograma, Docker Compose, Ruby e suporte ao cliente.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>Analista de ERP — Mercantil Fonte Boa Distribuição</h3>
            <span className="timeline-period">Abr 2022 – Fev 2024</span>
            <p>Acompanhamento e otimização do ERP Consinco (TOTVS), gerenciamento de bancos de dados Oracle, controle de acessos e automação de processos com scripts Python.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>Desenvolvedor Front-end — SGBras</h3>
            <span className="timeline-period">Fev 2024 – Out 2024</span>
            <p>Desenvolvi sistema interno de chamados (tickets) do zero, criei dashboards, trabalhei com arquitetura MVC em Laravel e dei suporte a plataformas de rastreamento veicular com GALILEOSKY.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>TI V — Grupo Minas Port</h3>
            <span className="timeline-period">Fev 2025 – atual</span>
            <p>Administração de redes (Cisco, MikroTik, Sophos), firewalls (pfSense, Fortinet), VPNs, Windows Server com AD/GPO, monitoramento via Zabbix e Grafana, e backup corporativo com Veeam e rsync. Em transição para desenvolvimento com Blazor, React, TypeScript e C#.</p>
            <div className="timeline-sub">
              <span className="timeline-sub-period">Mar 2026</span>
              <span className="timeline-sub-label">Início como Desenvolvedor Júnior</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
