"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  SiPhp, SiLaravel, SiPython, SiDocker, SiLinux, SiGit, SiReact, SiMysql,
} from "react-icons/si";
import { TbHash, TbCards, TbDeviceGamepad2, TbQuestionMark, TbX } from "react-icons/tb";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import RobotSprite from "./RobotSprite";

/*
 * Fliperama do Deploy: jogo da velha, memória e pedra-papel-tesoura.
 * Abre pelo botão de controle da navbar, pelo rodapé ou pelo comando "jogar" no terminal
 * (evento global "open-arcade").
 */

type Game = "menu" | "velha" | "memoria" | "ppt";
type Mood = "idle" | "happy" | "sad" | "think";

const store = {
  get(key: string): number | null {
    try {
      const v = window.localStorage.getItem(key);
      return v === null ? null : Number(v);
    } catch { return null; }
  },
  set(key: string, v: number) {
    try { window.localStorage.setItem(key, String(v)); } catch { /* ignore */ }
  },
};

export default function Arcade() {
  const t = useTranslations("Arcade");
  const [open, setOpen] = useState(false);
  const [game, setGame] = useState<Game>("menu");
  const [say, setSay] = useState<string>("");
  const [mood, setMood] = useState<Mood>("idle");

  useEffect(() => {
    const onOpen = () => { setOpen(true); setGame("menu"); setSay(t("escolha")); setMood("idle"); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("open-arcade", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-arcade", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, [t]);

  const react = (text: string, m: Mood) => { setSay(text); setMood(m); };

  if (!open) return null;

  const games: { id: Exclude<Game, "menu">; Icon: IconType }[] = [
    { id: "velha", Icon: TbHash },
    { id: "memoria", Icon: TbCards },
    { id: "ppt", Icon: FaHandRock },
  ];

  return (
    <div className="arcade-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="arcade" role="dialog" aria-modal="true" aria-label={t("titulo")}>
        <header className="arcade-head">
          {game !== "menu"
            ? <button className="arcade-back" onClick={() => { setGame("menu"); react(t("escolha"), "idle"); }}>{t("voltar")}</button>
            : <span className="arcade-title"><TbDeviceGamepad2 aria-hidden="true" /> {t("titulo")}</span>}
          <button className="arcade-close" onClick={() => setOpen(false)} aria-label={t("fechar")}><TbX aria-hidden="true" /></button>
        </header>

        <div className="arcade-deploy">
          <div className={`arcade-robot mood-${mood}`}><RobotSprite /></div>
          {say && <p className="arcade-say" role="status">{say}</p>}
        </div>

        <div className="arcade-stage">
          {game === "menu" && (
            <div className="arcade-menu">
              {games.map((g) => (
                <button key={g.id} className="arcade-card" onClick={() => { setGame(g.id); react(t(`${g.id}Desc`), "idle"); }}>
                  <span className="arcade-card-icon" aria-hidden="true"><g.Icon /></span>
                  <span className="arcade-card-name">{t(g.id)}</span>
                  <span className="arcade-card-desc">{t(`${g.id}Desc`)}</span>
                </button>
              ))}
            </div>
          )}
          {game === "velha" && <TicTacToe react={react} />}
          {game === "memoria" && <Memory react={react} />}
          {game === "ppt" && <RockPaperScissors react={react} />}
        </div>
      </div>
    </div>
  );
}

type ReactFn = (text: string, m: Mood) => void;

/* ---------------- Jogo da velha ---------------- */

const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function winnerOf(b: (string | null)[]): string | null {
  for (const [a, c, d] of LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  return b.every(Boolean) ? "draw" : null;
}
function minimax(b: (string | null)[], turn: "O" | "X"): { score: number; move: number } {
  const w = winnerOf(b);
  if (w === "O") return { score: 1, move: -1 };
  if (w === "X") return { score: -1, move: -1 };
  if (w === "draw") return { score: 0, move: -1 };
  let best = { score: turn === "O" ? -2 : 2, move: -1 };
  b.forEach((cell, i) => {
    if (cell) return;
    b[i] = turn;
    const r = minimax(b, turn === "O" ? "X" : "O");
    b[i] = null;
    if (turn === "O" ? r.score > best.score : r.score < best.score) best = { score: r.score, move: i };
  });
  return best;
}

function TicTacToe({ react }: { react: ReactFn }) {
  const t = useTranslations("Arcade");
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [score, setScore] = useState({ x: 0, o: 0, d: 0 });

  const finish = (w: string) => {
    setDone(w);
    if (w === "X") { setScore((s) => ({ ...s, x: s.x + 1 })); react(t("venceu"), "sad"); }
    else if (w === "O") { setScore((s) => ({ ...s, o: s.o + 1 })); react(t("perdeu"), "happy"); }
    else { setScore((s) => ({ ...s, d: s.d + 1 })); react(t("empate"), "idle"); }
  };

  const play = (i: number) => {
    if (busy || done || board[i]) return;
    const b = [...board];
    b[i] = "X";
    setBoard(b);
    const w = winnerOf(b);
    if (w) return finish(w);
    setBusy(true);
    react(t("pensando"), "think");
    window.setTimeout(() => {
      const free = b.map((c, k) => (c ? -1 : k)).filter((k) => k >= 0);
      // Deploy é bom, mas às vezes se distrai (25%) — dá pra ganhar dele
      const move = Math.random() < 0.25 ? free[Math.floor(Math.random() * free.length)] : minimax([...b], "O").move;
      b[move] = "O";
      setBoard([...b]);
      setBusy(false);
      const w2 = winnerOf(b);
      if (w2) finish(w2);
      else react(t("suaVez"), "idle");
    }, 550);
  };

  const reset = () => { setBoard(Array(9).fill(null)); setDone(null); react(t("suaVez"), "idle"); };

  return (
    <div className="game">
      <Scoreboard a={score.x} b={score.o} d={score.d} />
      <div className="ttt-grid">
        {board.map((c, i) => (
          <button key={i} className={`ttt-cell ${c ? `is-${c}` : ""}`} onClick={() => play(i)} disabled={!!c || !!done || busy} aria-label={`Casa ${i + 1}${c ? `: ${c}` : ""}`}>
            {c}
          </button>
        ))}
      </div>
      {done && <button className="game-again" onClick={reset}>{t("deNovo")}</button>}
    </div>
  );
}

/* ---------------- Jogo da memória ---------------- */

const TECHS: { name: string; Icon: IconType }[] = [
  { name: "PHP", Icon: SiPhp }, { name: "Laravel", Icon: SiLaravel }, { name: "Python", Icon: SiPython },
  { name: "Docker", Icon: SiDocker }, { name: "Linux", Icon: SiLinux }, { name: "Git", Icon: SiGit },
  { name: "React", Icon: SiReact }, { name: "MySQL", Icon: SiMysql },
];
function shuffledDeck() {
  const deck = [...TECHS, ...TECHS].map((tech, i) => ({ id: i, ...tech }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function Memory({ react }: { react: ReactFn }) {
  const t = useTranslations("Arcade");
  const [deck, setDeck] = useState(shuffledDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const lock = useRef(false);

  useEffect(() => { setBest(store.get("deploy-memory-best")); }, []);

  const flip = (idx: number) => {
    if (lock.current || flipped.includes(idx) || matched.has(deck[idx].name)) return;
    const next = [...flipped, idx];
    setFlipped(next);
    if (next.length < 2) return;

    const m = moves + 1;
    setMoves(m);
    const [a, b] = next;
    if (deck[a].name === deck[b].name) {
      const nm = new Set(matched).add(deck[a].name);
      setMatched(nm);
      setFlipped([]);
      if (nm.size === TECHS.length) {
        const record = best === null || m < best;
        if (record) { store.set("deploy-memory-best", m); setBest(m); }
        react(t("fimMemoria", { n: m }) + (record ? ` ${t("novoRecorde")}` : ""), "happy");
      } else {
        react(`${deck[a].name}!`, "happy");
      }
    } else {
      lock.current = true;
      window.setTimeout(() => { setFlipped([]); lock.current = false; }, 750);
    }
  };

  const reset = () => { setDeck(shuffledDeck()); setFlipped([]); setMatched(new Set()); setMoves(0); react(t("memoriaDesc"), "idle"); };
  const finished = matched.size === TECHS.length;

  return (
    <div className="game">
      <div className="game-stats">
        <span>{t("jogadas")}: <b>{moves}</b></span>
        <span>{t("recorde")}: <b>{best ?? "—"}</b></span>
      </div>
      <div className="mem-grid">
        {deck.map((card, i) => {
          const up = flipped.includes(i) || matched.has(card.name);
          return (
            <button
              key={card.id}
              className={`mem-card ${up ? "up" : ""} ${matched.has(card.name) ? "matched" : ""}`}
              onClick={() => flip(i)}
              aria-label={up ? card.name : "?"}
            >
              <span className="mem-face mem-back" aria-hidden="true">?</span>
              <span className="mem-face mem-front" aria-hidden="true"><card.Icon /></span>
            </button>
          );
        })}
      </div>
      {finished && <button className="game-again" onClick={reset}>{t("deNovo")}</button>}
    </div>
  );
}

/* ---------------- Pedra, papel e tesoura ---------------- */

const HANDS = ["pedra", "papel", "tesoura"] as const;
type Hand = typeof HANDS[number];
const HAND_ICON: Record<Hand, IconType> = { pedra: FaHandRock, papel: FaHandPaper, tesoura: FaHandScissors };
const BEATS: Record<Hand, Hand> = { pedra: "tesoura", papel: "pedra", tesoura: "papel" };

function RockPaperScissors({ react }: { react: ReactFn }) {
  const t = useTranslations("Arcade");
  const [score, setScore] = useState({ x: 0, o: 0, d: 0 });
  const [last, setLast] = useState<{ me: Hand; bot: Hand } | null>(null);

  const play = (me: Hand) => {
    const bot = HANDS[Math.floor(Math.random() * 3)];
    setLast({ me, bot });
    const picked = t("escolheu", { x: t(bot) });
    if (me === bot) { setScore((s) => ({ ...s, d: s.d + 1 })); react(`${picked} ${t("pptTie")}`, "idle"); }
    else if (BEATS[me] === bot) { setScore((s) => ({ ...s, x: s.x + 1 })); react(`${picked} ${t("pptWin")}`, "sad"); }
    else { setScore((s) => ({ ...s, o: s.o + 1 })); react(`${picked} ${t("pptLose")}`, "happy"); }
  };

  return (
    <div className="game">
      <Scoreboard a={score.x} b={score.o} d={score.d} />
      <div className="ppt-arena" aria-hidden="true">
        <span className="ppt-hand">{last ? <Hand h={last.me} /> : <TbQuestionMark />}</span>
        <span className="ppt-vs">VS</span>
        <span className="ppt-hand bot">{last ? <Hand h={last.bot} /> : <TbQuestionMark />}</span>
      </div>
      <div className="ppt-choices">
        {HANDS.map((h) => (
          <button key={h} className="ppt-btn" onClick={() => play(h)}>
            <Hand h={h} /> {t(h)}
          </button>
        ))}
      </div>
    </div>
  );
}

function Hand({ h }: { h: Hand }) {
  const Icon = HAND_ICON[h];
  return <Icon aria-hidden="true" />;
}

function Scoreboard({ a, b, d }: { a: number; b: number; d: number }) {
  const t = useTranslations("Arcade");
  return (
    <div className="game-stats">
      <span>{t("voce")}: <b>{a}</b></span>
      <span>{t("empates")}: <b>{d}</b></span>
      <span>{t("deploy")}: <b>{b}</b></span>
    </div>
  );
}
