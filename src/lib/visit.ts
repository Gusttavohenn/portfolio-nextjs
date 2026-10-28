/*
 * Link personalizado por empresa: portfolio...vercel.app/?para=Qualis
 * O nome fica guardado na sessão, então continua valendo ao navegar pelo site.
 */

const KEY = "portfolio-para";

/** Nome da empresa do link (?para=), limpo e com no máximo 40 caracteres. */
export function getCompany(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("para");
    if (fromUrl !== null) {
      const clean = fromUrl
        .replace(/[^\p{L}\p{N} .&'-]/gu, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 40);
      if (clean) {
        window.sessionStorage.setItem(KEY, clean);
        return clean;
      }
    }
    return window.sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export type DayPart = "manha" | "tarde" | "noite" | "madrugada";

/** Parte do dia no horário de quem está visitando. */
export function dayPart(now = new Date()): DayPart {
  const h = now.getHours();
  if (h >= 5 && h < 12) return "manha";
  if (h >= 12 && h < 18) return "tarde";
  if (h >= 18) return "noite";
  return "madrugada";
}
