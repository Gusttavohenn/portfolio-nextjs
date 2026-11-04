"use client";

import { useEffect, useRef } from "react";

/*
 * Nome do topo com efeito "decodificando": ao abrir, cada letra embaralha caracteres de
 * código até virar a letra certa. Passando o mouse, a letra pula e dá uma piscada de código.
 * O texto real já vem no HTML (bom pro Google e pro LCP); o efeito só desenha por cima.
 */
const GLYPHS = "<>/{}[]#$%&*+=01?!";
const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

export default function ScrambleName({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = Array.from(root.querySelectorAll<HTMLSpanElement>(".ch"));
    const timers: number[] = [];
    let raf = 0;

    // embaralha um conjunto de letras até cada uma "travar" no seu tempo
    const scramble = (targets: HTMLSpanElement[], settleAt: (i: number) => number) => {
      const start = performance.now();
      const ends = targets.map((_, i) => start + settleAt(i));
      targets.forEach((el) => { el.classList.add("scr"); el.setAttribute("data-g", rand()); });
      let last = 0;
      const tick = (now: number) => {
        let pending = 0;
        targets.forEach((el, i) => {
          if (!el.classList.contains("scr")) return;
          if (now >= ends[i]) {
            el.classList.remove("scr");
            el.removeAttribute("data-g");
          } else {
            pending++;
            if (now - last > 55) el.setAttribute("data-g", rand());
          }
        });
        if (now - last > 55) last = now;
        if (pending) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // entrada: da esquerda pra direita
    scramble(chars, (i) => 250 + i * 60 + Math.random() * 120);

    // de tempos em tempos, 2 letras aleatórias dão uma "falha" rápida
    const glitch = () => {
      const pick = [...chars].sort(() => Math.random() - 0.5).slice(0, 2);
      scramble(pick, () => 220 + Math.random() * 180);
      timers.push(window.setTimeout(glitch, 5000 + Math.random() * 4000));
    };
    timers.push(window.setTimeout(glitch, 4000));

    // mouse em cima de uma letra: ela pisca em código
    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLSpanElement;
      if (!el.classList.contains("scr")) scramble([el], () => 260);
    };
    chars.forEach((el) => el.addEventListener("mouseenter", onEnter));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
      chars.forEach((el) => el.removeEventListener("mouseenter", onEnter));
    };
  }, []);

  const words = text.split(" ");
  return (
    <h1 ref={ref} className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="word" aria-hidden="true">
          {Array.from(w).map((c, ci) => (
            <span key={ci} className="ch">{c}</span>
          ))}
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  );
}
