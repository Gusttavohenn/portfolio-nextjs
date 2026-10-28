"use client";

import type { IconType } from "react-icons";
import { useLocale, useTranslations } from "next-intl";
import {
  TbWorldWww, TbLayoutDashboard, TbDeviceMobile, TbSettingsAutomation,
  TbMessageChatbot, TbPlugConnected, TbBrandWhatsapp, TbBriefcase,
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

const WHATSAPP_NUMBER = "5537998730908";

export default function ServicesSection() {
  const t = useTranslations("Servicos");
  const lang = toLang(useLocale());
  const quoteLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("msgOrcamento"))}`;

  return (
    <section id="servicos" className="section services-section">
      <h2 className="section-title">{t("titulo")}</h2>
      <p className="section-subtitle">{t("subtitulo")}</p>

      <ul className="services-grid">
        {cv.services.map((s) => {
          const Icon = ICONS[s.id] ?? TbLayoutDashboard;
          return (
            <li key={s.id} className="service-card">
              <span className="service-icon" aria-hidden="true"><Icon /></span>
              <h3>{s.title[lang]}</h3>
              <p>{s.desc[lang]}</p>
              <ul className="service-tags" aria-label="Tecnologias">
                {s.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </li>
          );
        })}
      </ul>

      <div className="services-cta">
        <a className="qs-btn whats" href={quoteLink} target="_blank" rel="noopener noreferrer">
          <TbBrandWhatsapp aria-hidden="true" /> {t("orcamento")}
        </a>
        <button className="qs-btn" onClick={() => window.dispatchEvent(new Event("open-summary"))}>
          <TbBriefcase aria-hidden="true" /> {t("vaga")}
        </button>
      </div>
    </section>
  );
}
