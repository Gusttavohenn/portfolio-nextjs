"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import RobotSprite from "./RobotSprite";
import { unlock } from "@/lib/achievements";
import { play } from "@/lib/sound";
import { dayPart, getCompany } from "@/lib/visit";

/*
 * Deploy — o mascote de plataforma: anda em cima dos títulos, cards e botões da página.
 * Quando a plataforma em que ele está sai da tela (porque você rolou),
 * ele pula para o próximo texto visível, como num jogo 2D.
 * Clique nele: ele pula e fala. 5 cliques rápidos ou o Konami Code: festa.
 * Ao pousar numa seção nova ele comenta sobre ela (uma vez por seção).
 * Visitante que volta (mesmo navegador) recebe outro cumprimento — guardado
 * só no navegador da pessoa (localStorage), sem IP nem dado pessoal.
 */

const VISITED_KEY = "deploy-visited";

const W = 40;            // largura do sprite (px)
const H = 50;            // altura do sprite (px)
const G = 0.55;          // gravidade (px / frame²)
const WALK = 1.1;        // velocidade andando (px / frame)
const SLEEP_AFTER_MS = 25000; // cochila depois de 25s sem nenhuma interação
const NAV_FALLBACK = 84;  // altura padrão da navbar fixa (medida de verdade em runtime)
const SELECTOR = [
  "h1", "h2", "h3",
  ".about-card", ".skill-category", ".project-card",
  ".cert-group-header", ".service-card", ".process-step", ".faq-item", ".contact-card", ".contact-terminal", ".cta-button",
  ".contact-form input", ".contact-form textarea",
].join(", ");

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

type Plat = { el: Element; top: number; left: number; right: number };

// Rect of what you actually see: for headings, the text itself (not the full-width block)
function visibleRect(el: Element): DOMRect {
  if (/^H[1-3]$/.test(el.tagName)) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const r = range.getBoundingClientRect();
    if (r.width > 0) return r;
  }
  return el.getBoundingClientRect();
}

export default function MascotPixel() {
  const t = useTranslations("Mascot");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [bubble, setBubble] = useState<string | null>(null);
  const [hue, setHue] = useState(258);
  const bubbleTimer = useRef<number | undefined>(undefined);
  const bubbleActive = useRef(false);
  const commented = useRef<Set<string>>(new Set());
  const greetDone = useRef(false);

  // physics state lives in a ref so the loop never re-renders React
  const s = useRef({
    x: 0, y: 0, vx: 0, vy: 0,
    mode: "air" as "air" | "ground",
    plat: null as Element | null,
    onFloor: false,
    targetX: 0,
    idleUntil: 0,
    facing: 1,
    nextHopAt: 0,
    squashUntil: 0,
    party: false,
    sleeping: false,
    lastActive: 0,
  });
  const clicks = useRef<number[]>([]);
  const hintIndex = useRef(0);
  const konamiPos = useRef(0);

  const showBubble = (text: string, ms = 3400) => {
    setBubble(text);
    bubbleActive.current = true;
    window.clearTimeout(bubbleTimer.current);
    bubbleTimer.current = window.setTimeout(() => {
      setBubble(null);
      bubbleActive.current = false;
    }, ms);
  };

  const party = () => {
    const st = s.current;
    if (st.party) return;
    st.party = true;
    play("party");
    showBubble(t("party"), 4000);
    let h = 0;
    const spin = window.setInterval(() => {
      h = (h + 40) % 360;
      setHue(h);
    }, 120);
    window.setTimeout(() => {
      window.clearInterval(spin);
      setHue(258);
      st.party = false;
    }, 4000);
  };

  useEffect(() => {
    const root = rootRef.current;
    const body = bodyRef.current;
    if (!root || !body) return;

    const st = s.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // entrance: drop from the top on the right side
    st.x = window.innerWidth * 0.78;
    st.y = NAV_FALLBACK + 10;
    st.mode = "air";
    st.nextHopAt = performance.now() + 9000;

    let els: Element[] = [];
    let frame = 0;
    let raf = 0;

    let NAV_H = NAV_FALLBACK;
    const refresh = () => {
      const nav = document.querySelector(".navbar");
      NAV_H = nav && getComputedStyle(nav).position === "fixed" ? nav.getBoundingClientRect().bottom : 0;
      els = Array.from(document.querySelectorAll(SELECTOR)).filter(
        (el) => !el.closest(".navbar, footer, .mascot")
      );
    };
    refresh();

    const visiblePlats = (vw: number, vh: number): Plat[] => {
      const out: Plat[] = [];
      for (const el of els) {
        const r = visibleRect(el);
        if (r.width < 50 || r.height < 4) continue;
        if (r.top < NAV_H + 30 || r.top > vh - 40) continue;
        if (r.right < 30 || r.left > vw - 30) continue;
        out.push({ el, top: r.top, left: Math.max(r.left, 10), right: Math.min(r.right, vw - 10) });
      }
      return out;
    };

    const jumpTo = (tx: number, ty: number) => {
      const dy = ty - st.y;
      const peak = Math.max(28, -dy + 45);              // how high above the start it rises
      const vy0 = -Math.sqrt(2 * G * peak);
      const disc = vy0 * vy0 + 2 * G * dy;
      const time = (-vy0 + Math.sqrt(Math.max(0, disc))) / G;
      st.vy = vy0;
      st.vx = (tx - st.x) / Math.max(time, 1);
      st.mode = "air";
      st.plat = null;
      st.onFloor = false;
      st.facing = tx >= st.x ? 1 : -1;
    };

    const pickTarget = (plats: Plat[], exclude: Element | null) => {
      let best: Plat | null = null;
      let bestScore = Infinity;
      for (const p of plats) {
        if (p.el === exclude) continue;
        const cx = (p.left + p.right) / 2;
        const score = Math.abs(p.top - st.y) + Math.abs(cx - st.x) * 0.35;
        if (score < bestScore) { bestScore = score; best = p; }
      }
      return best;
    };

    const landX = (p: Plat) => {
      const lo = p.left + W / 2;
      const hi = p.right - W / 2;
      if (hi <= lo) return (p.left + p.right) / 2;
      return Math.min(hi, Math.max(lo, st.x + (Math.random() - 0.5) * 160));
    };

    const loop = (now: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const floorY = vh - 14;
      if (frame++ % 90 === 0) refresh();
      const plats = visiblePlats(vw, vh);

      if (st.mode === "ground") {
        let lo = W / 2 + 6;
        let hi = vw - W / 2 - 6;
        let leave = false;

        if (st.onFloor) {
          st.y = floorY;
          if (plats.length) leave = true;            // something to climb onto
        } else if (st.plat) {
          const r = visibleRect(st.plat);
          st.y = r.top;                               // ride the platform as the page scrolls
          lo = r.left + W / 2 - 4;
          hi = r.right - W / 2 + 4;
          if (r.top < NAV_H + 14 || r.top > vh - 24 || r.width === 0) leave = true;
        }

        if (!st.sleeping && st.mode === "ground" && now - st.lastActive > SLEEP_AFTER_MS && !bubbleActive.current) {
          st.sleeping = true;                         // ninguém mexe há um tempo: cochilo
          root.classList.add("sleeping");
        }

        if (st.sleeping) {
          // dormindo: só acompanha a plataforma
        } else if (leave) {
          const target = pickTarget(plats, st.plat);
          if (target) jumpTo(landX(target), target.top);
          else if (!st.onFloor) jumpTo(Math.min(vw - 60, Math.max(60, st.x)), floorY);
        } else if (now > st.nextHopAt && plats.length > 1) {
          // spontaneous hop to a nearby text, just for fun
          const near = plats.filter((p) => p.el !== st.plat && Math.abs(p.top - st.y) < 260);
          const p = near[Math.floor(Math.random() * near.length)];
          if (p) jumpTo(landX(p), p.top);
          st.nextHopAt = now + 7000 + Math.random() * 7000;
        } else if (now > st.idleUntil) {
          // walk along the platform
          if (hi <= lo) st.targetX = (lo + hi) / 2;
          const dx = st.targetX - st.x;
          if (Math.abs(dx) < 2) {
            st.idleUntil = now + 700 + Math.random() * 2200;
            st.targetX = lo + Math.random() * Math.max(0, hi - lo);
          } else {
            st.facing = dx > 0 ? 1 : -1;
            st.x += Math.sign(dx) * Math.min(WALK * (st.party ? 3 : 1), Math.abs(dx));
          }
        }
        st.x = Math.min(Math.max(st.x, lo), Math.max(lo, hi));
      } else {
        // airborne
        const prevY = st.y;
        st.vy = Math.min(st.vy + G, 22);
        st.x += st.vx;
        st.y += st.vy;
        if (st.x < W / 2) { st.x = W / 2; st.vx = Math.abs(st.vx) * 0.3; }
        if (st.x > vw - W / 2) { st.x = vw - W / 2; st.vx = -Math.abs(st.vx) * 0.3; }

        if (st.vy > 0) {
          for (const p of plats) {
            if (prevY <= p.top + 3 && st.y >= p.top && st.x >= p.left + 6 && st.x <= p.right - 6) {
              st.mode = "ground";
              st.plat = p.el;
              st.y = p.top;
              break;
            }
          }
          if (st.mode === "air" && st.y >= floorY) {
            st.mode = "ground";
            st.onFloor = true;
            st.y = floorY;
          }
          if (st.mode === "ground") {
            // perguntas frequentes têm fala própria, separada da seção "Como eu trabalho"
            const section = st.plat?.closest(".faq") ? "faq" : st.plat?.closest("section[id]")?.id;
            if (section && greetDone.current && !bubbleActive.current && !commented.current.has(section) && t.has(`secao.${section}`)) {
              commented.current.add(section);
              showBubble(t(`secao.${section}`), 3600);
            }
            st.vx = 0;
            st.vy = 0;
            st.squashUntil = now + 140;
            st.idleUntil = now + 350;
            st.targetX = st.x;
          }
        }
        // fell way off (e.g. resized): reset to the floor
        if (st.y > vh + 200) { st.y = floorY; st.mode = "ground"; st.onFloor = true; }
      }

      // render
      const walking = st.mode === "ground" && now > st.idleUntil && Math.abs(st.targetX - st.x) >= 2;
      root.style.transform = `translate3d(${st.x - W / 2}px, ${st.y - H}px, 0)`;
      root.classList.toggle("walking", walking);
      root.classList.toggle("jumping", st.mode === "air");
      root.classList.toggle("bubble-left", st.x > vw - 170);
      root.classList.toggle("bubble-right", st.x < 170);
      const squash = now < st.squashUntil ? 0.82 : 1;
      body.style.transform = `scaleX(${st.facing}) scaleY(${squash})`;

      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      st.x = window.innerWidth - 50;
      st.y = window.innerHeight - 14;
      root.style.transform = `translate3d(${st.x - W / 2}px, ${st.y - H}px, 0)`;
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[konamiPos.current]) {
        konamiPos.current += 1;
        if (konamiPos.current === KONAMI.length) { konamiPos.current = 0; party(); unlock("konami"); }
      } else {
        konamiPos.current = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    // falas disparadas por outras partes do site: hover nos serviços, abrir uma pergunta...
    let lastSay = 0;
    const said = new Set<string>();
    const onSay = (e: Event) => {
      const { key, pick, force } = (e as CustomEvent<{ key: string; pick?: boolean; force?: boolean }>).detail ?? {};
      if (!key || !greetDone.current || st.sleeping) return;
      const now = performance.now();
      if (!force && (bubbleActive.current || said.has(key) || now - lastSay < 4000)) return;
      let text: string | undefined;
      if (pick) {
        const list = t.raw(`falas.${key}`) as string[] | undefined;
        if (Array.isArray(list) && list.length) text = list[Math.floor(Math.random() * list.length)];
      } else if (t.has(`falas.${key}`)) {
        text = t(`falas.${key}`);
      }
      if (!text) return;
      said.add(key);
      lastSay = now;
      showBubble(text, 3200);
    };
    window.addEventListener("deploy-say", onSay);
    const onParty = () => party();
    window.addEventListener("mascot-party", onParty);

    // qualquer interação conta como atividade; se ele estiver dormindo, acorda
    st.lastActive = performance.now();
    const onActivity = () => {
      st.lastActive = performance.now();
      if (!st.sleeping) return;
      st.sleeping = false;
      root.classList.remove("sleeping");
      if (st.mode === "ground") { st.vy = -7; st.vx = 0; st.mode = "air"; st.plat = null; st.onFloor = false; }
      play("wake");
      showBubble(t("acordei"), 3000);
      unlock("acordou");
    };
    const activityEvents = ["pointermove", "pointerdown", "keydown", "scroll", "touchstart", "wheel"] as const;
    activityEvents.forEach((ev) => window.addEventListener(ev, onActivity, { passive: true }));

    // first visit vs. returning visitor (remembered only in this browser)
    let returning = false;
    try {
      returning = window.localStorage.getItem(VISITED_KEY) === "1";
      window.localStorage.setItem(VISITED_KEY, "1");
    } catch {
      /* storage blocked: treat as first visit */
    }
    const company = getCompany();
    const part = dayPart();
    const saudacao = t(part === "madrugada" ? "noite" : part);
    const late = part === "madrugada";
    const hello = company
      ? t("greetCompany", { saudacao, empresa: company })
      : returning
        ? (late ? t("greetBackLate") : t("greetBack", { saudacao }))
        : (late ? t("greetLate") : t("greetFirst", { saudacao }));
    const greetMs = returning && !company ? 3800 : 6000;
    const greet = window.setTimeout(() => {
      showBubble(hello, greetMs);
      window.setTimeout(() => { greetDone.current = true; }, greetMs + 100);
    }, 1800);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mascot-party", onParty);
      window.removeEventListener("deploy-say", onSay);
      activityEvents.forEach((ev) => window.removeEventListener(ev, onActivity));
      window.clearTimeout(greet);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => {
    const st = s.current;
    // jump in place
    if (st.mode === "ground") {
      play("jump");
      st.vy = -10;
      st.vx = 0;
      st.mode = "air";
      st.plat = null;
      st.onFloor = false;
    }
    // 5 quick clicks → party
    const now = performance.now();
    clicks.current = [...clicks.current.filter((c) => now - c < 2000), now];
    if (clicks.current.length >= 5) {
      clicks.current = [];
      party();
      unlock("festa");
      return;
    }
    const hints = t.raw("frases") as string[];
    showBubble(hints[hintIndex.current % hints.length]);
    hintIndex.current += 1;
  };

  return (
    <div ref={rootRef} className="mascot">
      {bubble && <div className="mascot-bubble" role="status">{bubble}</div>}
      <span className="mascot-zzz" aria-hidden="true"><i>z</i><i>z</i><i>Z</i></span>
      <button
        className="mascot-btn"
        onClick={onClick}
        onDoubleClick={() => window.dispatchEvent(new Event("open-chat"))}
        aria-label={t("aria")}
        title={t("title")}
      >
        <div ref={bodyRef} className="mascot-body">
          <RobotSprite hue={hue} />
        </div>
      </button>
    </div>
  );
}
