"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import RobotSprite from "./RobotSprite";
import { socialLinks } from "@/lib/social-links";

/*
 * Chat com o Deploy (IA). Abre pelo evento global "open-chat":
 * botão no hero, duplo clique no Deploy ou comando "perguntar" no terminal.
 */

type Msg = { role: "user" | "assistant"; content: string; kind?: "error" | "offline" };

export default function DeployChat() {
  const t = useTranslations("Chat");
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("open-chat", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-chat", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, loading]);

  const send = async (text: string) => {
    const q = text.trim().slice(0, 500);
    if (!q || loading) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setValue("");
    setLoading(true);
    try {
      // só manda a conversa "real" (sem mensagens de erro) e no máximo as 12 últimas
      const history = next.filter((m) => !m.kind).slice(-12).map(({ role, content }) => ({ role, content }));
      const res = await fetch("/api/deploy-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.reply) {
        setMsgs((m) => [...m, { role: "assistant", content: data.reply }]);
      } else if (res.status === 503 && data.error === "offline") {
        setMsgs((m) => [...m, { role: "assistant", content: t("offline"), kind: "offline" }]);
      } else if (res.status === 429 || data.error === "busy") {
        setMsgs((m) => [...m, { role: "assistant", content: t("limite"), kind: "error" }]);
      } else {
        setMsgs((m) => [...m, { role: "assistant", content: t("erro"), kind: "error" }]);
      }
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: t("erro"), kind: "error" }]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const suggestions = t.raw("sugestoes") as string[];

  return (
    <div className="chat-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="chat" role="dialog" aria-modal="true" aria-label={t("titulo")}>
        <header className="chat-head">
          <div className="chat-avatar"><RobotSprite /></div>
          <div className="chat-head-text">
            <strong>{t("titulo")}</strong>
            <span>{t("sub")}</span>
          </div>
          <button className="arcade-close" onClick={() => setOpen(false)} aria-label={t("fechar")}>✕</button>
        </header>

        <div className="chat-list" ref={listRef} aria-live="polite">
          <div className="chat-msg bot">{t("oi")}</div>
          {msgs.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role === "user" ? "me" : "bot"} ${m.kind ?? ""}`}>
              {m.content}
              {m.kind === "offline" && (
                <a className="chat-whats" href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                  {t("whats")}
                </a>
              )}
            </div>
          ))}
          {loading && (
            <div className="chat-msg bot typing" aria-label={t("pensando")}>
              <span></span><span></span><span></span>
            </div>
          )}
          {msgs.length === 0 && (
            <div className="chat-suggestions">
              {suggestions.map((s) => (
                <button key={s} className="chat-chip" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          )}
        </div>

        <form className="chat-form" onSubmit={(e) => { e.preventDefault(); send(value); }}>
          <label className="sr-only" htmlFor="chat-input">{t("placeholder")}</label>
          <input
            id="chat-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t("placeholder")}
            maxLength={500}
            autoComplete="off"
          />
          <button type="submit" disabled={!value.trim() || loading}>{t("enviar")}</button>
        </form>
        <p className="chat-note">{t("aviso")}</p>
      </div>
    </div>
  );
}
