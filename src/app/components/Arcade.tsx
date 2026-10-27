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

type Cell = "X" | "O" | null;
type Level = "facil" | "medio" | "dificil";
const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function winnerOf(b: Cell[]): "X" | "O" | "draw" | null {
  for (const [a, c, d] of LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  return b.every(Boolean) ? "draw" : null;
}

// Minimax com profundidade: prefere vencer rápido e perder o mais tarde possível.
function score(b: Cell[], turn: "O" | "X", depth: number): number {
  const w = winnerOf(b);
  if (w === "O") return 10 - depth;
  if (w === "X") return depth - 10;
  if (w === "draw") return 0;
  let best = turn === "O" ? -Infinity : Infinity;
  for (let i = 0; i < 9; i++) {
    if (b[i]) continue;
    b[i] = turn;
    const v = score(b, turn === "O" ? "X" : "O", depth + 1);
    b[i] = null;
    best = turn === "O" ? Math.max(best, v) : Math.min(best, v);
  }
  return best;
}

const free = (b: Cell[]) => b.map((c, i) => (c ? -1 : i)).filter((i) => i >= 0);
const pickRandom = (xs: number[]) => xs[Math.floor(Math.random() * xs.length)];

// a jogada que completa uma linha para "who" (para ganhar ou para bloquear)
function finishingMove(b: Cell[], who: "X" | "O"): number | null {
  for (const i of free(b)) {
    b[i] = who;
    const w = winnerOf(b) === who;
    b[i] = null;
    if (w) return i;
  }
  return null;
}

function bestMove(b: Cell[]): number {
  const moves = free(b);
  if (moves.length === 9) return pickRandom([0, 2, 4, 6, 8]); // abre num canto ou no centro
  let best = -Infinity;
  let options: number[] = [];
  for (const i of moves) {
    b[i] = "O";
    const v = score(b, "X", 1);
    b[i] = null;
    if (v > best) { best = v; options = [i]; }
    else if (v === best) options.push(i);
  }
  return pickRandom(options); // varia entre jogadas igualmente boas
}

function deployMove(b: Cell[], level: Level): number {
  const moves = free(b);
  if (level === "dificil") return bestMove([...b]);
  const win = finishingMove([...b], "O");
  if (win !== null) return win;                         // nunca perde a chance de ganhar
  if (level === "medio") {
    const block = finishingMove([...b], "X");
    if (block !== null) return block;                   // sempre bloqueia
    return Math.random() < 0.3 ? pickRandom(moves) : bestMove([...b]);
  }
  // fácil: bloqueia às vezes, joga meio solto
  const block = finishingMove([...b], "X");
  if (block !== null && Math.random() < 0.5) return block;
  return Math.random() < 0.6 ? pickRandom(moves) : bestMove([...b]);
}

function TicTacToe({ react }: { react: ReactFn }) {
  const t = useTranslations("Arcade");
  const [level, setLevel] = useState<Level>("dificil");
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [score, setScore] = useState({ x: 0, o: 0, d: 0 });
  const [deployStarts, setDeployStarts] = useState(false);
  const [winLine, setWinLine] = useState<number[] | null>(null);

  const finish = (b: Cell[], w: "X" | "O" | "draw") => {
    setDone(w);
    setWinLine(LINES.find(([a, c, d]) => b[a] && b[a] === b[c] && b[a] === b[d]) ?? null);
    if (w === "X") { setScore((s) => ({ ...s, x: s.x + 1 })); react(t("venceu"), "sad"); }
    else if (w === "O") { setScore((s) => ({ ...s, o: s.o + 1 })); react(t("perdeu"), "happy"); }
    else { setScore((s) => ({ ...s, d: s.d + 1 })); react(t("empate"), "idle"); }
  };

  const deployPlays = (b: Cell[]) => {
    setBusy(true);
    react(t("pensando"), "think");
    window.setTimeout(() => {
      const next = [...b];
      next[deployMove(next, level)] = "O";
      setBoard(next);
      setBusy(false);
      const w = winnerOf(next);
      if (w) finish(next, w);
      else react(t("suaVez"), "idle");
    }, 550);
  };

  const play = (i: number) => {
    if (busy || done || board[i]) return;
    const b = [...board];
    b[i] = "X";
    setBoard(b);
    const w = winnerOf(b);
    if (w) return finish(b, w);
    deployPlays(b);
  };

  const newRound = (starts: boolean, lvl: Level = level) => {
    const empty: Cell[] = Array(9).fill(null);
    setBoard(empty);
    setDone(null);
    setWinLine(null);
    setDeployStarts(starts);
    if (starts) {
      // o Deploy abre a rodada
      setBusy(true);
      react(t("deployComeca"), "think");
      window.setTimeout(() => {
        const next = [...empty];
        next[deployMove(next, lvl)] = "O";
        setBoard(next);
        setBusy(false);
        react(t("suaVez"), "idle");
      }, 650);
    } else {
      react(t("voceComeca"), "idle");
    }
  };

  const changeLevel = (lvl: Level) => {
    setLevel(lvl);
    setScore({ x: 0, o: 0, d: 0 });
    newRound(false, lvl);
  };

  const levels: Level[] = ["facil", "medio", "dificil"];

  return (
    <div className="game">
      <div className="ttt-levels" role="group" aria-label={t("nivel")}>
        {levels.map((l) => (
          <button key={l} className={`ttt-level ${level === l ? "active" : ""}`} aria-pressed={level === l} onClick={() => changeLevel(l)}>
            {t(l)}
          </button>
        ))}
      </div>
      <Scoreboard a={score.x} b={score.o} d={score.d} />
      <div className="ttt-grid">
        {board.map((c, i) => (
          <button
            key={i}
            className={`ttt-cell ${c ? `is-${c}` : ""} ${winLine?.includes(i) ? "win" : ""}`}
            onClick={() => play(i)}
            disabled={!!c || !!done || busy}
            aria-label={`${i + 1}${c ? `: ${c}` : ""}`}
          >
            {c}
          </button>
        ))}
      </div>
      {done && <button className="game-again" onClick={() => newRound(!deployStarts)}>{t("deNovo")}</button>}
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
