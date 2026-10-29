"use client";

import type { IconType } from "react-icons";
import { useLocale, useTranslations } from "next-intl";
import { TbMessages, TbFileText, TbCode, TbRocket, TbPlus } from "react-icons/tb";
import { cv, toLang } from "@/lib/cv";

// "Como eu trabalho": etapas e perguntas frequentes vêm de content/cv.json (o Deploy com IA usa os mesmos textos).
const ICONS: Record<string, IconType> = {
  conversa: TbMessages,
  proposta: TbFileText,
  desenvolvimento: TbCode,
  entrega: TbRocket,
};

export default function ProcessSection() {
  const t = useTranslations("Processo");
  const lang = toLang(useLocale());

  return (
    <section id="processo" className="section process-section">
      <h2 className="section-title">{t("titulo")}</h2>
      <p className="section-subtitle">{t("subtitulo")}</p>

      <ol className="process-steps">
        {cv.process.map((step, i) => {
          const Icon = ICONS[step.id] ?? TbCode;
          return (
            <li key={step.id} className="process-step">
              <div className="process-node" aria-hidden="true">
                <span className="process-icon"><Icon /></span>
              </div>
              <span className="process-num">{t("etapa")} {String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title[lang]}</h3>
              <p>{step.desc[lang]}</p>
            </li>
          );
        })}
      </ol>

      <div className="faq">
        <h3 className="faq-title">{t("faqTitulo")}</h3>
        <div className="faq-list">
          {cv.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary>
                <span>{f.q[lang]}</span>
                <span className="faq-plus" aria-hidden="true"><TbPlus /></span>
              </summary>
              <p>{f.a[lang]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
