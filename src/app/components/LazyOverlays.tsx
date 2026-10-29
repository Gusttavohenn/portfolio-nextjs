"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

/*
 * Jogos, chat do Deploy, resumo em 30s e terminal secreto só são baixados quando
 * o visitante abre cada um. Assim a página inicial carrega bem menos JavaScript.
 * Quem abre continua sendo o mesmo evento de antes (ex.: "open-arcade").
 */
type Key = "arcade" | "chat" | "summary" | "terminal";

const LOADERS: Record<Key, () => Promise<{ default: ComponentType }>> = {
  arcade: () => import("./Arcade"),
  chat: () => import("./DeployChat"),
  summary: () => import("./QuickSummary"),
  terminal: () => import("./HiddenTerminal"),
};

const EVENTS: Record<string, Key> = {
  "open-arcade": "arcade",
  "open-chat": "chat",
  "open-summary": "summary",
  "open-terminal": "terminal",
};

export default function LazyOverlays() {
  const [comps, setComps] = useState<Partial<Record<Key, ComponentType>>>({});
  const loaded = useRef(new Set<Key>());
  const pending = useRef<string[]>([]);

  useEffect(() => {
    const load = (key: Key, replay: string) => {
      if (loaded.current.has(key)) return;
      loaded.current.add(key);
      pending.current.push(replay);
      LOADERS[key]()
        .then((m) => setComps((c) => ({ ...c, [key]: m.default })))
        .catch(() => loaded.current.delete(key));
    };

    const handlers = Object.entries(EVENTS).map(([ev, key]) => {
      const h = () => load(key, ev);
      window.addEventListener(ev, h);
      return [ev, h] as const;
    });

    // "/" abre o terminal secreto (fora de campos de texto)
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || loaded.current.has("terminal")) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      e.preventDefault();
      load("terminal", "open-terminal");
    };
    window.addEventListener("keydown", onKey);

    return () => {
      handlers.forEach(([ev, h]) => window.removeEventListener(ev, h));
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // o componente acabou de montar (e registrar seus ouvintes): repete o evento que pediu a abertura
  useEffect(() => {
    if (!pending.current.length) return;
    const evs = pending.current.splice(0);
    evs.forEach((ev) => window.dispatchEvent(new Event(ev)));
  }, [comps]);

  return (
    <>
      {Object.entries(comps).map(([k, C]) => (C ? <C key={k} /> : null))}
    </>
  );
}
