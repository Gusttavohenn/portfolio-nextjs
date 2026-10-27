"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  TbX, TbDownload, TbBrandWhatsapp, TbMail, TbBrandLinkedin, TbMapPin,
  TbBriefcase, TbSchool, TbLanguage, TbStarFilled, TbClockHour4,
} from "react-icons/tb";
import { cv, loc, toLang, yearsOfExperience, yearsPeriod, type Lang } from "@/lib/cv";
import { socialLinks } from "@/lib/social-links";

/*
 * "Resumo em 30s": uma tela só para o recrutador com pressa.
 * Tudo vem de content/cv.json. Abre pelo evento global "open-summary"
 * (botão da navbar, botão do hero ou "resumo" no terminal).
 */

const MONTHS: Record<Lang, string[]> = {
  pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
};
const monthYear = (d: string, lang: Lang) =>
  d.length === 4 ? d : `${MONTHS[lang][Number(d.slice(5, 7)) - 1]} ${d.slice(0, 4)}`;

export default function QuickSummary() {
  const t = useTranslations("Resumo");
  const lang = toLang(useLocale());
  const [open, setOpen] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const onOpen = () => { setOpen(true); setTimeUp(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("open-summary", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-summary", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => setTimeUp(true), 30000);
    return () => window.clearTimeout(id);
  }, [open]);

  if (!open) return null;

  const current = cv.experience[0];
  const recent = cv.experience.slice(1, 4);

  return (
    <div className="qs-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="qs" role="dialog" aria-modal="true" aria-label={t("titulo")}>
        <div className="qs-timer" aria-hidden="true"><span></span></div>

        <header className="qs-head">
          <div>
            <p className="qs-kicker"><TbClockHour4 aria-hidden="true" /> {t("titulo")}</p>
            <h2 className="qs-name">{cv.name}</h2>
            <p className="qs-title">{cv.title[lang]}</p>
          </div>
          <button className="arcade-close" onClick={() => setOpen(false)} aria-label={t("fechar")}><TbX aria-hidden="true" /></button>
        </header>

        <div className="qs-badges">
          <span className="qs-badge ok"><span className="status-dot" aria-hidden="true"></span>{t("disponivel")} · {cv.highlights.availability[lang]}</span>
          <span className="qs-badge"><TbMapPin aria-hidden="true" /> {cv.location[lang]}</span>
          <span className="qs-badge"><TbBriefcase aria-hidden="true" /> {t("anos", { n: yearsOfExperience() })}</span>
        </div>

        <div className="qs-grid">
          <section className="qs-block qs-current">
            <h3>{t("cargoAtual")}</h3>
            <p className="qs-role">{current.role[lang]} <span>— {loc(current.company, lang)}</span></p>
            <p className="qs-muted">{t("desde")} {monthYear(current.start, lang)}</p>
          </section>

          <section className="qs-block">
            <h3>{t("skills")}</h3>
            <ul className="qs-chips">
              {cv.highlights.skills.map((s) => <li key={loc(s, "pt")}>{loc(s, lang)}</li>)}
            </ul>
          </section>

          <section className="qs-block">
            <h3>{t("destaques")}</h3>
            <ul className="qs-list">
              {cv.highlights.achievements[lang].map((a) => (
                <li key={a}><TbStarFilled aria-hidden="true" /> {a}</li>
              ))}
            </ul>
          </section>

          <section className="qs-block">
            <h3>{t("trajetoria")}</h3>
            <ul className="qs-lines">
              {recent.map((e) => (
                <li key={e.start}>
                  <span className="qs-when">{yearsPeriod(e, lang)}</span>
                  <span>{e.role[lang]} — {loc(e.company, lang)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="qs-block">
            <h3><TbSchool aria-hidden="true" /> {t("formacao")}</h3>
            <ul className="qs-lines">
              {cv.education.map((ed) => (
                <li key={ed.school}>
                  <span className="qs-when">{ed.start}–{ed.end}</span>
                  <span>{ed.course[lang]} — {ed.school}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="qs-block">
            <h3><TbLanguage aria-hidden="true" /> {t("idiomas")}</h3>
            <p>{cv.languages.map((l) => `${l.name[lang]} (${l.level[lang]})`).join(" · ")}</p>
          </section>
        </div>

        <footer className="qs-actions">
          <a className="qs-btn primary" href={`/Gustavo_Oliveira_${lang.toUpperCase()}.pdf`} download>
            <TbDownload aria-hidden="true" /> {t("cv")}
          </a>
          <a className="qs-btn whats" href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer">
            <TbBrandWhatsapp aria-hidden="true" /> {t("whats")}
          </a>
          <a className="qs-btn" href={`mailto:${cv.email}`}>
            <TbMail aria-hidden="true" /> {t("email")}
          </a>
          <a className="qs-btn" href={cv.links.linkedin} target="_blank" rel="noopener noreferrer">
            <TbBrandLinkedin aria-hidden="true" /> {t("linkedin")}
          </a>
          <button className="qs-link" onClick={() => setOpen(false)}>{timeUp ? t("tempo") : t("verTudo")}</button>
        </footer>
      </div>
    </div>
  );
}
