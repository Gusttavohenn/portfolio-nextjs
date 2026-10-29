"use client";

import type { IconType } from "react-icons";
import { useLocale, useTranslations } from "next-intl";
import {
  TbWorldWww, TbLayoutDashboard, TbDeviceMobile, TbSettingsAutomation,
  TbMessageChatbot, TbPlugConnected, TbBrandWhatsapp, TbBriefcase, TbArrowUpRight, TbArrowRight,
} from "react-icons/tb";
import { cv, toLang } from "@/lib/cv";

// "O que eu construo": os serviços vêm de content/cv.json (a mesma fonte do currículo e da IA).
const ICONS: Record<string, IconType> = {
  sites: TbWorldWww,
  sistemas: TbLayoutDashboard,
  apps: TbDeviceMobile,
  automacao: TbSettingsAutomation,
  ia: TbMessageChatbot,
  integracoes: TbPlugConnected,
};

// ordem do bento: os dois cards largos (com mini demonstração) ficam em diagonal
const ORDER = ["sistemas", "sites", "apps", "automacao", "integracoes", "ia"];
const WIDE = new Set(["sistemas", "ia"]);

const WHATSAPP_NUMBER = "5537998730908";
const wa = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

function DashboardDemo({ label }: { label: string }) {
  return (
    <div className="svc-demo svc-dash" aria-hidden="true">
      <div className="svc-dash-bar"><i /><i /><i /></div>
      <div className="svc-dash-body">
        <div className="svc-dash-side"><i /><i /><i /><i /></div>
        <div className="svc-dash-main">
          <div className="svc-dash-kpi">
            <span>{label}</span>
            <strong>128</strong>
          </div>
          <div className="svc-dash-chart">
            {[40, 65, 50, 85, 60, 95, 75].map((h, i) => (
              <i key={i} style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatDemo({ q, a }: { q: string; a: string }) {
  return (
    <div className="svc-demo svc-chat" aria-hidden="true">
      <p className="svc-msg user">{q}</p>
      <p className="svc-msg bot"><TbMessageChatbot /> {a}</p>
      <p className="svc-typing"><i /><i /><i /></p>
    </div>
  );
}

export default function ServicesSection() {
  const t = useTranslations("Servicos");
  const lang = toLang(useLocale());

  const services = ORDER
    .map((id) => cv.services.find((s) => s.id === id))
    .filter((s): s is (typeof cv.services)[number] => Boolean(s))
    // serviços novos no cv.json (fora da lista) entram no fim
    .concat(cv.services.filter((s) => !ORDER.includes(s.id)));

  return (
    <section id="servicos" className="section services-section">
      <h2 className="section-title">{t("titulo")}</h2>
      <p className="section-subtitle">{t("subtitulo")}</p>

      <ul className="services-grid">
        {services.map((s, i) => {
          const Icon = ICONS[s.id] ?? TbLayoutDashboard;
          const wide = WIDE.has(s.id);
          return (
            <li key={s.id} className={`service-card${wide ? " wide" : ""}`}>
              <div className="service-link">
                <div className="service-text">
                  <div className="service-head">
                    <span className="service-icon" aria-hidden="true"><Icon /></span>
                    <span className="service-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{s.title[lang]}</h3>
                  <p>{s.desc[lang]}</p>
                  <div className="service-foot">
                    <span className="service-tags">{s.tags.join("  ·  ")}</span>
                  </div>
                </div>
                {s.id === "sistemas" && <DashboardDemo label={t("demoPainel")} />}
                {s.id === "ia" && <ChatDemo q={t("demoPergunta")} a={t("demoResposta")} />}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="services-cta">
        <a className="svc-cta freela" href={wa(t("msgOrcamento"))} target="_blank" rel="noopener noreferrer">
          <span className="svc-cta-icon" aria-hidden="true"><TbBrandWhatsapp /></span>
          <span className="svc-cta-text">
            <small>{t("ctaFreelaTag")}</small>
            <strong>{t("orcamento")}</strong>
            <span>{t("ctaFreelaSub")}</span>
          </span>
          <TbArrowUpRight className="svc-cta-arrow" aria-hidden="true" />
        </a>
        <button type="button" className="svc-cta vaga" onClick={() => window.dispatchEvent(new Event("open-summary"))}>
          <span className="svc-cta-icon" aria-hidden="true"><TbBriefcase /></span>
          <span className="svc-cta-text">
            <small>{t("ctaVagaTag")}</small>
            <strong>{t("vaga")}</strong>
            <span>{t("ctaVagaSub")}</span>
          </span>
          <TbArrowRight className="svc-cta-arrow" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
