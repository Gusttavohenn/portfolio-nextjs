/*
 * Sons 8 bits gerados no navegador (Web Audio API), sem arquivos de áudio.
 * Desligados por padrão; o botão da navbar liga/desliga e lembra a escolha.
 */

export type Sfx =
  | "jump" | "click" | "move" | "win" | "lose" | "draw"
  | "flip" | "match" | "tick" | "reveal" | "achievement" | "party" | "wake";

const KEY = "deploy-sound";
let ctx: AudioContext | null = null;

export function soundOn(): boolean {
  if (typeof window === "undefined") return false;
  try { return window.localStorage.getItem(KEY) === "on"; } catch { return false; }
}

export function setSound(on: boolean) {
  try { window.localStorage.setItem(KEY, on ? "on" : "off"); } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent("sound-change", { detail: on }));
  if (on) play("click", true);
}

type Note = [freq: number, start: number, dur: number, type?: OscillatorType, slideTo?: number];

const SONGS: Record<Sfx, Note[]> = {
  jump:        [[330, 0, 0.12, "square", 660]],
  click:       [[660, 0, 0.05, "square"]],
  move:        [[520, 0, 0.06, "square"]],
  tick:        [[440, 0, 0.05, "square"]],
  flip:        [[300, 0, 0.06, "triangle", 420]],
  match:       [[660, 0, 0.07, "square"], [880, 0.07, 0.1, "square"]],
  reveal:      [[220, 0, 0.08, "square", 520]],
  win:         [[523, 0, 0.09, "square"], [659, 0.09, 0.09, "square"], [784, 0.18, 0.09, "square"], [1047, 0.27, 0.2, "square"]],
  lose:        [[392, 0, 0.12, "square"], [330, 0.12, 0.12, "square"], [262, 0.24, 0.25, "square"]],
  draw:        [[440, 0, 0.1, "triangle"], [440, 0.14, 0.1, "triangle"]],
  achievement: [[784, 0, 0.08, "square"], [988, 0.08, 0.08, "square"], [1319, 0.16, 0.22, "square"]],
  party:       [[523, 0, 0.07, "square"], [659, 0.07, 0.07, "square"], [784, 0.14, 0.07, "square"], [1047, 0.21, 0.07, "square"], [784, 0.28, 0.07, "square"], [1047, 0.35, 0.18, "square"]],
  wake:        [[200, 0, 0.15, "triangle", 500]],
};

/** Toca um efeito (se o som estiver ligado). */
export function play(name: Sfx, force = false) {
  if (typeof window === "undefined" || (!force && !soundOn())) return;
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (ctx.state === "suspended") void ctx.resume();
    const t0 = ctx.currentTime;
    for (const [freq, start, dur, type = "square", slideTo] of SONGS[name]) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0 + start);
      if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + start + dur);
      // volume baixo e com fade, pra não assustar ninguém
      gain.gain.setValueAtTime(0.0001, t0 + start);
      gain.gain.exponentialRampToValueAtTime(0.06, t0 + start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + start + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0 + start);
      osc.stop(t0 + start + dur + 0.02);
    }
  } catch {
    /* navegador sem Web Audio: segue sem som */
  }
}
