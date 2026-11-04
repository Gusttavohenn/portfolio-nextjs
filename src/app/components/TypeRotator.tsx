"use client";

import { useEffect, useState } from "react";

/*
 * Linha que se digita e troca de frase (Automação → Sistemas web → Apps → IA).
 * A primeira frase já vem completa no HTML; leitores de tela leem todas de uma vez.
 */
export default function TypeRotator({ phrases, className }: { phrases: string[]; className?: string }) {
  const [idx, setIdx] = useState(0);
  const [len, setLen] = useState(phrases[0]?.length ?? 0);
  const [phase, setPhase] = useState<"hold" | "erase" | "type">("hold");

  useEffect(() => {
    if (phrases.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const full = phrases[idx];
    let t: number;
    if (phase === "hold") {
      t = window.setTimeout(() => setPhase("erase"), idx === 0 && len === full.length ? 3200 : 2400);
    } else if (phase === "erase") {
      if (len > 0) t = window.setTimeout(() => setLen((l) => l - 1), 28);
      else t = window.setTimeout(() => { setIdx((i) => (i + 1) % phrases.length); setPhase("type"); }, 250);
    } else {
      if (len < full.length) t = window.setTimeout(() => setLen((l) => l + 1), 55 + Math.random() * 45);
      else t = window.setTimeout(() => setPhase("hold"), 0);
    }
    return () => window.clearTimeout(t);
  }, [idx, len, phase, phrases]);

  return (
    <p className={className}>
      <span className="sr-only">{phrases.join(" · ")}</span>
      <span aria-hidden="true">
        {phrases[idx].slice(0, len)}
        <span className={`type-caret${phase === "hold" ? " blink" : ""}`} />
      </span>
    </p>
  );
}
