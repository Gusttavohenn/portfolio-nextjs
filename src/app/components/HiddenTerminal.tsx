"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { socialLinks } from "@/lib/social-links";

/*
 * Terminal escondido: aperte "/" em qualquer lugar do site (ou clique em ">_" no rodapé).
 * Comandos: help, whoami, skills, experiencia, projetos, contato, whatsapp,
 * linkedin, github, cv, ls, date, echo, festa, sudo contratar, clear, exit.
 */

type Lang = "pt" | "en" | "es";
type Line = { kind: "in" | "out" | "err"; text: string };

const TEXT: Record<Lang, Record<string, string>> = {
  pt: {
    welcome: "Terminal do Gustavo v1.0 — digite 'help' pra ver os comandos.",
    help: [
      "Comandos disponíveis:",
      "  whoami        quem sou eu",
      "  skills        tecnologias que eu uso",
      "  experiencia   por onde passei",
      "  projetos      o que eu construí",
      "  contato       como falar comigo",
      "  whatsapp      abre a conversa no WhatsApp",
      "  linkedin      abre meu LinkedIn",
      "  github        abre meu GitHub",
      "  cv            baixa meu currículo",
      "  festa         🎉",
      "  clear         limpa a tela",
      "  exit          fecha o terminal",
      "  (tem mais um escondido... dica: recrutador gosta dele)",
    ].join("\n"),
    whoami: "Gustavo Oliveira — Dev Back-end · Automação & IA\nAnalista de Sistemas IV na Gox Internet · Itaúna/MG",
    skills: [
      "back-end   PHP · Laravel · C# · .NET · Python · Node.js · Java",
      "dados      MySQL · SQL Server · PostgreSQL · MariaDB · MongoDB",
      "devops     Docker · Linux · Azure · Git",
      "ia         assistentes no WhatsApp (OPA Suite) · Claude · OpenAI",
    ].join("\n"),
    experiencia: [
      "2026–hoje  Analista de Sistemas IV ........ Gox Internet",
      "2025–2026  Analista de Infra de TI V ...... Grupo Minas Port",
      "2024       Desenvolvedor .................. SGBras Telemetria",
      "2022–2024  Analista de Sistemas ERP ....... Mercantil Fonte Boa",
      "2021–2022  Helpdesk ....................... HTF Apps",
      "2021       Estágio em TI .................. Prefeitura de Itaúna",
    ].join("\n"),
    projetos: [
      "fang/      Scanner de segurança web (Python · Flask)",
      "nexo/      Plataforma financeira (Node.js · PostgreSQL)",
      "carteira/  API de carteira digital (Java · Spring Boot)",
      "→ role até a seção Projetos pra ver os detalhes",
    ].join("\n"),
    contato: `e-mail     ${socialLinks.email}\nwhatsapp   digite 'whatsapp'\nlinkedin   digite 'linkedin'\ngithub     digite 'github'`,
    ls: "sobre.txt  skills.json  experiencia.log  projetos/  contato.sh  cv.pdf",
    opening: "Abrindo",
    cv: "Baixando o currículo...",
    festa: "🎉 Modo festa ativado! Olha o mascote.",
    hire1: "[sudo] senha para recrutador: ********",
    hire2: "Permissão concedida ✅",
    hire3: "Abrindo o WhatsApp do Gustavo... bora conversar!",
    sudoNo: "Boa tentativa 😄 Aqui só 'sudo contratar' funciona.",
    rm: "Nem pensar. Esse site tem backup e um mascote de olho. 🤖",
    coffee: "☕ Servindo café... Bug resolvido 30% mais rápido.",
    notFound: "comando não encontrado: {cmd} — digite 'help'",
    hint: "dica: digite 'help'",
    title: "terminal — gustavo@portfolio",
    close: "Fechar terminal",
  },
  en: {
    welcome: "Gustavo's Terminal v1.0 — type 'help' to see the commands.",
    help: [
      "Available commands:",
      "  whoami        who I am",
      "  skills        tech I use",
      "  experience    where I've worked",
      "  projects      what I've built",
      "  contact       how to reach me",
      "  whatsapp      open a WhatsApp chat",
      "  linkedin      open my LinkedIn",
      "  github        open my GitHub",
      "  cv            download my résumé",
      "  party         🎉",
      "  clear         clear the screen",
      "  exit          close the terminal",
      "  (there's one more hidden... hint: recruiters like it)",
    ].join("\n"),
    whoami: "Gustavo Oliveira — Back-end Dev · Automation & AI\nSystems Analyst IV at Gox Internet · Itaúna/MG, Brazil",
    skills: [
      "back-end   PHP · Laravel · C# · .NET · Python · Node.js · Java",
      "data       MySQL · SQL Server · PostgreSQL · MariaDB · MongoDB",
      "devops     Docker · Linux · Azure · Git",
      "ai         WhatsApp assistants (OPA Suite) · Claude · OpenAI",
    ].join("\n"),
    experiencia: [
      "2026–now   Systems Analyst IV ............. Gox Internet",
      "2025–2026  IT Infrastructure Analyst V .... Grupo Minas Port",
      "2024       Developer ...................... SGBras Telemetry",
      "2022–2024  ERP Systems Analyst ............ Mercantil Fonte Boa",
      "2021–2022  Helpdesk ....................... HTF Apps",
      "2021       IT Intern ...................... Itaúna City Hall",
    ].join("\n"),
    projetos: [
      "fang/      Web security scanner (Python · Flask)",
      "nexo/      Finance platform (Node.js · PostgreSQL)",
      "wallet/    Digital wallet API (Java · Spring Boot)",
      "→ scroll to the Projects section for details",
    ].join("\n"),
    contato: `email      ${socialLinks.email}\nwhatsapp   type 'whatsapp'\nlinkedin   type 'linkedin'\ngithub     type 'github'`,
    ls: "about.txt  skills.json  experience.log  projects/  contact.sh  cv.pdf",
    opening: "Opening",
    cv: "Downloading the résumé...",
    festa: "🎉 Party mode on! Look at the mascot.",
    hire1: "[sudo] password for recruiter: ********",
    hire2: "Permission granted ✅",
    hire3: "Opening Gustavo's WhatsApp... let's talk!",
    sudoNo: "Nice try 😄 Only 'sudo hire' works here.",
    rm: "No way. This site has backups and a mascot watching. 🤖",
    coffee: "☕ Brewing coffee... bugs fixed 30% faster.",
    notFound: "command not found: {cmd} — type 'help'",
    hint: "hint: type 'help'",
    title: "terminal — gustavo@portfolio",
    close: "Close terminal",
  },
  es: {
    welcome: "Terminal de Gustavo v1.0 — escribe 'help' para ver los comandos.",
    help: [
      "Comandos disponibles:",
      "  whoami        quién soy",
      "  skills        tecnologías que uso",
      "  experiencia   dónde trabajé",
      "  proyectos     lo que construí",
      "  contacto      cómo hablar conmigo",
      "  whatsapp      abre el chat de WhatsApp",
      "  linkedin      abre mi LinkedIn",
      "  github        abre mi GitHub",
      "  cv            descarga mi currículum",
      "  fiesta        🎉",
      "  clear         limpia la pantalla",
      "  exit          cierra la terminal",
      "  (hay uno más escondido... pista: a los reclutadores les gusta)",
    ].join("\n"),
    whoami: "Gustavo Oliveira — Dev Back-end · Automatización & IA\nAnalista de Sistemas IV en Gox Internet · Itaúna/MG, Brasil",
    skills: [
      "back-end   PHP · Laravel · C# · .NET · Python · Node.js · Java",
      "datos      MySQL · SQL Server · PostgreSQL · MariaDB · MongoDB",
      "devops     Docker · Linux · Azure · Git",
      "ia         asistentes en WhatsApp (OPA Suite) · Claude · OpenAI",
    ].join("\n"),
    experiencia: [
      "2026–hoy   Analista de Sistemas IV ........ Gox Internet",
      "2025–2026  Analista de Infra de TI V ...... Grupo Minas Port",
      "2024       Desarrollador .................. SGBras Telemetría",
      "2022–2024  Analista de Sistemas ERP ....... Mercantil Fonte Boa",
      "2021–2022  Helpdesk ....................... HTF Apps",
      "2021       Pasantía en TI ................. Municipalidad de Itaúna",
    ].join("\n"),
    projetos: [
      "fang/      Escáner de seguridad web (Python · Flask)",
      "nexo/      Plataforma financiera (Node.js · PostgreSQL)",
      "billetera/ API de billetera digital (Java · Spring Boot)",
      "→ baja hasta la sección Proyectos para ver los detalles",
    ].join("\n"),
    contato: `correo     ${socialLinks.email}\nwhatsapp   escribe 'whatsapp'\nlinkedin   escribe 'linkedin'\ngithub     escribe 'github'`,
    ls: "sobre.txt  skills.json  experiencia.log  proyectos/  contacto.sh  cv.pdf",
    opening: "Abriendo",
    cv: "Descargando el currículum...",
    festa: "🎉 ¡Modo fiesta activado! Mira la mascota.",
    hire1: "[sudo] contraseña para reclutador: ********",
    hire2: "Permiso concedido ✅",
    hire3: "Abriendo el WhatsApp de Gustavo... ¡hablemos!",
    sudoNo: "Buen intento 😄 Aquí solo funciona 'sudo contratar'.",
    rm: "Ni lo pienses. Este sitio tiene backup y una mascota vigilando. 🤖",
    coffee: "☕ Preparando café... bugs resueltos 30% más rápido.",
    notFound: "comando no encontrado: {cmd} — escribe 'help'",
    hint: "pista: escribe 'help'",
    title: "terminal — gustavo@portfolio",
    close: "Cerrar terminal",
  },
};

export default function HiddenTerminal() {
  const locale = useLocale();
  const lang: Lang = locale === "en" || locale === "es" ? locale : "pt";
  const T = TEXT[lang];

  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const histPos = useRef(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  // "/" opens it (unless the user is typing somewhere); Esc closes it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-terminal", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-terminal", onOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      if (lines.length === 0) setLines([{ kind: "out", text: T.welcome }]);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const openUrl = (url: string, label: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    return `${T.opening} ${label}...`;
  };

  const run = (raw: string) => {
    const input = raw.trim();
    const out: Line[] = [{ kind: "in", text: input }];
    const push = (text: string, kind: Line["kind"] = "out") => out.push({ kind, text });
    const [cmdRaw, ...args] = input.split(/\s+/);
    const cmd = (cmdRaw || "").toLowerCase();
    const rest = args.join(" ").toLowerCase();

    if (!cmd) {
      setLines((l) => [...l, ...out]);
      return;
    }

    switch (cmd) {
      case "help": case "ajuda": case "ayuda": case "?":
        push(T.help); break;
      case "whoami": case "sobre": case "about":
        push(T.whoami); break;
      case "skills": case "stack":
        push(T.skills); break;
      case "experiencia": case "experience": case "xp": case "jornada":
        push(T.experiencia); break;
      case "projetos": case "projects": case "proyectos":
        push(T.projetos); break;
      case "contato": case "contact": case "contacto":
        push(T.contato); break;
      case "whatsapp": case "zap":
        push(openUrl(socialLinks.whatsapp, "WhatsApp")); break;
      case "linkedin":
        push(openUrl(socialLinks.linkedin, "LinkedIn")); break;
      case "github":
        push(openUrl(socialLinks.github, "GitHub")); break;
      case "cv": case "curriculo": case "resume": {
        const a = document.createElement("a");
        a.href = `/Gustavo_Oliveira_${lang.toUpperCase()}.pdf`;
        a.download = "";
        a.click();
        push(T.cv);
        break;
      }
      case "ls": case "dir":
        push(T.ls); break;
      case "cat":
        if (rest.startsWith("sobre") || rest.startsWith("about")) push(T.whoami);
        else if (rest.startsWith("skills")) push(T.skills);
        else if (rest.startsWith("experi")) push(T.experiencia);
        else if (rest.startsWith("contat") || rest.startsWith("contact")) push(T.contato);
        else push(T.hint, "err");
        break;
      case "date":
        push(new Date().toLocaleString(locale)); break;
      case "echo":
        push(args.join(" ")); break;
      case "festa": case "party": case "fiesta":
        window.dispatchEvent(new Event("mascot-party"));
        push(T.festa);
        break;
      case "coffee": case "cafe": case "café":
        push(T.coffee); break;
      case "sudo":
        if (["contratar", "hire", "contratar-gustavo"].includes(rest)) {
          push(T.hire1);
          push(T.hire2);
          push(T.hire3);
          setTimeout(() => window.open(socialLinks.whatsapp, "_blank", "noopener,noreferrer"), 900);
        } else if (rest.startsWith("rm")) {
          push(T.rm, "err");
        } else {
          push(T.sudoNo, "err");
        }
        break;
      case "rm":
        push(T.rm, "err"); break;
      case "clear": case "limpar": case "cls":
        setLines([]);
        return;
      case "exit": case "sair": case "salir": case "quit":
        setOpen(false);
        return;
      default:
        push(T.notFound.replace("{cmd}", cmdRaw), "err");
    }
    setLines((l) => [...l, ...out]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      if (value.trim()) setHistory((h) => [...h, value]);
      histPos.current = -1;
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      histPos.current = histPos.current < 0 ? history.length - 1 : Math.max(0, histPos.current - 1);
      setValue(history[histPos.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histPos.current < 0) return;
      histPos.current += 1;
      if (histPos.current >= history.length) { histPos.current = -1; setValue(""); }
      else setValue(history[histPos.current]);
    }
  };

  if (!open) return null;

  return (
    <div className="term-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="term-window" role="dialog" aria-modal="true" aria-label={T.title}>
        <div className="terminal-bar">
          <button className="terminal-dot term-close" onClick={() => setOpen(false)} aria-label={T.close}></button>
          <span className="terminal-dot" aria-hidden="true"></span>
          <span className="terminal-dot" aria-hidden="true"></span>
          <span className="terminal-title">{T.title}</span>
        </div>
        <div className="term-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
          {lines.map((l, i) => (
            <pre key={i} className={`term-line ${l.kind}`}>
              {l.kind === "in" ? <><span className="prompt-sign">$</span> {l.text}</> : l.text}
            </pre>
          ))}
          <div className="term-input-row">
            <span className="prompt-sign">$</span>
            <input
              ref={inputRef}
              className="term-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Comando"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
