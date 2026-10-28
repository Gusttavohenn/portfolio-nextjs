import cvData from '../../content/cv.json';

/* Fonte única do currículo (content/cv.json), tipada para o site. */

export type Lang = 'pt' | 'en' | 'es';
export type Localized = Record<Lang, string>;
type MaybeLocalized = string | Localized;

export interface Experience {
  company: MaybeLocalized;
  role: Localized;
  start: string;          // "AAAA-MM" ou "AAAA"
  end: string | null;     // null = emprego atual
  summary: Localized;
  bullets: Record<Lang, string[]>;
}

export const cv = cvData as unknown as {
  name: string;
  shortName: string;
  email: string;
  phone: string;
  location: Localized;
  links: { portfolio: string; linkedin: string; github: string };
  title: Localized;
  summary: Localized;
  experience: Experience[];
  education: { course: Localized; school: string; start: string; end: string; status: Localized }[];
  skills: { group: Localized; items: MaybeLocalized[] }[];
  softSkills: Record<Lang, string[]>;
  languages: { name: Localized; level: Localized }[];
  certifications: { title: string; platform: string; hours?: string }[];
  highlights: { skills: MaybeLocalized[]; achievements: Record<Lang, string[]>; availability: Localized };
  services: { id: string; title: Localized; desc: Localized; tags: string[] }[];
};

export const toLang = (locale: string): Lang => (locale === 'en' || locale === 'es' ? locale : 'pt');

export const loc = (v: MaybeLocalized, lang: Lang): string => (typeof v === 'string' ? v : v[lang]);

const PRESENT: Localized = { pt: 'atual', en: 'present', es: 'actual' };

/** Período só com anos: "2021", "2022 – 2024", "2026 – atual". */
export function yearsPeriod(e: Pick<Experience, 'start' | 'end'>, lang: Lang): string {
  const a = e.start.slice(0, 4);
  if (e.end === null) return `${a} – ${PRESENT[lang]}`;
  const b = e.end.slice(0, 4);
  return a === b ? a : `${a} – ${b}`;
}

/** Experiências da mais antiga para a mais recente (ordem da linha do tempo). */
export const experienceChrono = (): Experience[] => [...cv.experience].reverse();

/** Anos de experiência em TI, contados a partir do primeiro emprego. */
export function yearsOfExperience(now = new Date()): number {
  const first = Math.min(...cv.experience.map((e) => Number(e.start.slice(0, 4))));
  return now.getFullYear() - first;
}
