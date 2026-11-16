"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  TbDots, TbClockHour4, TbDeviceGamepad2, TbVolume, TbVolumeOff, TbTerminal2, TbRobot,
} from "react-icons/tb";
import { setSound, soundOn } from "@/lib/sound";

/*
 * Cabeçalho: o ícone do Deploy (ele só aparece quando a pessoa clica) e um menu discreto
 * com os extras (resumo em 30s, jogo, som e terminal), para não disputar atenção com o conteúdo.
 */
export default function ExtrasMenu() {
  const t = useTranslations("Navbar");
  const c = useTranslations("Common");
  const tr = useTranslations("Resumo");
  const [open, setOpen] = useState(false);
  const [sound, setSoundState] = useState(false);
  const [deploy, setDeploy] = useState(false);
  const wrap = useRef<HTMLDivElement | null>(null);
  const btn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setSoundState(soundOn());
    const onSound = (e: Event) => setSoundState(Boolean((e as CustomEvent<boolean>).detail));
    const onDeploy = (e: Event) => setDeploy(Boolean((e as CustomEvent<boolean>).detail));
    window.addEventListener("sound-change", onSound);
    window.addEventListener("deploy-state", onDeploy);
    return () => {
      window.removeEventListener("sound-change", onSound);
      window.removeEventListener("deploy-state", onDeploy);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("pointerdown", onDown); window.removeEventListener("keydown", onKey); };
  }, [open]);

  const fire = (ev: string) => { setOpen(false); window.dispatchEvent(new Event(ev)); };
  const deployLabel = deploy ? t("deployEsconder") : t("deployChamar");

  return (
    <>
      <button
        className={`theme-toggle arcade-toggle deploy-toggle${deploy ? " on" : ""}`}
        onClick={() => window.dispatchEvent(new Event("toggle-deploy"))}
        aria-pressed={deploy}
        aria-label={deployLabel}
        title={deployLabel}
      >
        <TbRobot aria-hidden="true" />
      </button>
      <div className="extras" ref={wrap}>
        <button
          ref={btn}
          className="theme-toggle arcade-toggle"
          aria-expanded={open}
          aria-controls="extras-menu"
          aria-label={t("mais")}
          title={t("mais")}
          onClick={() => setOpen((v) => !v)}
        >
          <TbDots aria-hidden="true" />
        </button>
        {open && (
          <ul id="extras-menu" className="extras-menu">
            <li><button onClick={() => fire("open-summary")}><TbClockHour4 aria-hidden="true" /> {tr("botao")}</button></li>
            <li><button onClick={() => fire("open-arcade")}><TbDeviceGamepad2 aria-hidden="true" /> {c("jogarDeploy")}</button></li>
            <li>
              <button onClick={() => setSound(!sound)} aria-pressed={sound}>
                {sound ? <TbVolume aria-hidden="true" /> : <TbVolumeOff aria-hidden="true" />} {sound ? c("somDesligar") : c("somLigar")}
              </button>
            </li>
            <li><button onClick={() => fire("open-terminal")}><TbTerminal2 aria-hidden="true" /> {c("terminalAtalho")}</button></li>
          </ul>
        )}
      </div>
    </>
  );
}
