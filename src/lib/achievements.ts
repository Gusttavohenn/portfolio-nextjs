/*
 * Conquistas: cada easter egg do site vira uma conquista.
 * Ficam salvas só no navegador de quem visita (localStorage).
 * unlock("konami") -> dispara o evento "achievement" -> o aviso aparece.
 */

export const ACHIEVEMENTS = [
  "konami",     // digitou o Konami Code
  "festa",      // 5 cliques rápidos no Deploy
  "terminal",   // abriu o terminal secreto
  "sudo",       // sudo contratar
  "velha",      // venceu o Deploy no jogo da velha
  "memoria",    // completou o jogo da memória
  "ppt",        // venceu no pedra, papel e tesoura
  "resumo",     // abriu o resumo em 30s
  "chat",       // conversou com o Deploy
  "perdido",    // encontrou a página 404
  "acordou",    // acordou o Deploy do cochilo
] as const;

export type AchievementId = typeof ACHIEVEMENTS[number];

const KEY = "deploy-achievements";

export function unlocked(): AchievementId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((id): id is AchievementId => (ACHIEVEMENTS as readonly string[]).includes(id)) : [];
  } catch {
    return [];
  }
}

/** Desbloqueia uma conquista (só avisa na primeira vez). */
export function unlock(id: AchievementId) {
  if (typeof window === "undefined") return;
  const have = unlocked();
  if (have.includes(id)) return;
  const next = [...have, id];
  try { window.localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* sem storage: avisa mesmo assim */ }
  window.dispatchEvent(new CustomEvent("achievement", { detail: { id, count: next.length, total: ACHIEVEMENTS.length } }));
}
