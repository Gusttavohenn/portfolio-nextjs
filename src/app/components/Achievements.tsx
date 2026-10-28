"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { TbTrophy, TbLock, TbX } from "react-icons/tb";
import { ACHIEVEMENTS, unlocked, type AchievementId } from "@/lib/achievements";
import { play } from "@/lib/sound";

/*
 * Conquistas: aviso no canto ao desbloquear, contador no rodapé
 * (evento "open-achievements" abre o painel com a lista).
 */

type Toast = { id: AchievementId; count: number; total: number };

export default function Achievements() {
  const t = useTranslations("Conquistas");
  const [have, setHave] = useState<AchievementId[]>([]);
  const [toast, setToast] = useState<Toast | null>(null);
  const [open, setOpen] = useState(false);
  const queue = useRef<Toast[]>([]);
  const showing = useRef(false);

  useEffect(() => {
    setHave(unlocked());

    const next = () => {
      const item = queue.current.shift();
      if (!item) { showing.current = false; setToast(null); return; }
      showing.current = true;
      setToast(item);
      play("achievement");
      window.setTimeout(next, item.count === item.total ? 6000 : 3800);
    };

    const onUnlock = (e: Event) => {
      const d = (e as CustomEvent<Toast>).detail;
      setHave(unlocked());
      queue.current.push(d);
      if (d.count === d.total) window.setTimeout(() => window.dispatchEvent(new Event("mascot-party")), 400);
      if (!showing.current) next();
    };
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };

    window.addEventListener("achievement", onUnlock);
    window.addEventListener("open-achievements", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("achievement", onUnlock);
      window.removeEventListener("open-achievements", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      {toast && (
        <div className={`ach-toast ${toast.count === toast.total ? "all" : ""}`} role="status" aria-live="polite" key={toast.id}>
          <span className="ach-toast-icon" aria-hidden="true"><TbTrophy /></span>
          <span className="ach-toast-text">
            <span className="ach-toast-kicker">{t("desbloqueada")} · {toast.count}/{toast.total}</span>
            <strong>{t(`itens.${toast.id}.nome`)}</strong>
            <span>{toast.count === toast.total ? t("todos") : t(`itens.${toast.id}.desc`)}</span>
          </span>
        </div>
      )}

      {open && (
        <div className="ach-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="ach-panel" role="dialog" aria-modal="true" aria-label={t("titulo")}>
            <header className="ach-head">
              <div>
                <h2><TbTrophy aria-hidden="true" /> {t("titulo")}</h2>
                <p>{t("segredos", { n: have.length, total: ACHIEVEMENTS.length })}</p>
              </div>
              <button className="arcade-close" onClick={() => setOpen(false)} aria-label={t("fechar")}><TbX aria-hidden="true" /></button>
            </header>
            <div className="ach-progress" aria-hidden="true">
              <span style={{ width: `${(have.length / ACHIEVEMENTS.length) * 100}%` }}></span>
            </div>
            <ul className="ach-list">
              {ACHIEVEMENTS.map((id) => {
                const ok = have.includes(id);
                return (
                  <li key={id} className={ok ? "ok" : "locked"}>
                    <span className="ach-icon" aria-hidden="true">{ok ? <TbTrophy /> : <TbLock />}</span>
                    <span>
                      <strong>{ok ? t(`itens.${id}.nome`) : t("bloqueada")}</strong>
                      <span>{ok ? t(`itens.${id}.desc`) : `${t("dica")}: ${t(`itens.${id}.dica`)}`}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

/** Contador do rodapé: "3/11 segredos". */
export function AchievementsCounter() {
  const t = useTranslations("Conquistas");
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(unlocked().length);
    const on = () => setN(unlocked().length);
    window.addEventListener("achievement", on);
    return () => window.removeEventListener("achievement", on);
  }, []);
  return (
    <button className="footer-terminal-btn" onClick={() => window.dispatchEvent(new Event("open-achievements"))} title={t("titulo")}>
      <TbTrophy aria-hidden="true" /> {t("segredos", { n, total: ACHIEVEMENTS.length })}
    </button>
  );
}
