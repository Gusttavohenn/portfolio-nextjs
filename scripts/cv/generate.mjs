// Gera os currículos em PDF (PT, EN, ES) a partir de content/cv.json.
// Uso:  npm run cv      → escreve public/Gustavo_Oliveira_{PT,EN,ES}.pdf
// Roda sozinho no GitHub Action "Gerar currículos" quando cv.json muda.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const cv = JSON.parse(await readFile(path.join(root, "content/cv.json"), "utf8"));

const LANGS = ["pt", "en", "es"];
const MONTHS = {
  pt: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
};
const L = {
  pt: { summary: "Resumo", experience: "Experiência", education: "Formação", skills: "Habilidades", languages: "Idiomas", soft: "Competências comportamentais", certs: "Cursos e certificações", present: "atual", portfolio: "Projetos e portfólio" },
  en: { summary: "Summary", experience: "Experience", education: "Education", skills: "Skills", languages: "Languages", soft: "Soft skills", certs: "Courses & certifications", present: "present", portfolio: "Projects & portfolio" },
  es: { summary: "Resumen", experience: "Experiencia", education: "Formación", skills: "Habilidades", languages: "Idiomas", soft: "Habilidades blandas", certs: "Cursos y certificaciones", present: "actual", portfolio: "Proyectos y portafolio" },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const loc = (v, lang) => (typeof v === "string" ? v : v[lang]);
const fmtDate = (d, lang) => (d.length === 4 ? d : `${MONTHS[lang][Number(d.slice(5, 7)) - 1]} ${d.slice(0, 4)}`);
const period = (start, end, lang) => {
  if (end === null) return `${fmtDate(start, lang)} – ${L[lang].present}`;
  const a = fmtDate(start, lang), b = fmtDate(end, lang);
  return a === b ? a : `${a} – ${b}`;
};
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function html(lang) {
  const t = L[lang];
  const contact = [
    esc(cv.phone),
    `<a href="mailto:${esc(cv.email)}">${esc(cv.email)}</a>`,
    esc(cv.location[lang]),
    `<a href="${esc(cv.links.linkedin)}">LinkedIn</a>`,
    `<a href="${esc(cv.links.github)}">GitHub</a>`,
  ].join('<span class="sep">·</span>');

  const jobs = cv.experience.map((e) => `
    <article class="job">
      <div class="job-head">
        <h3>${esc(e.role[lang])} <span class="at">— ${esc(loc(e.company, lang))}</span></h3>
        <span class="when">${esc(period(e.start, e.end, lang))}</span>
      </div>
      <ul>${e.bullets[lang].map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
    </article>`).join("");

  const edu = cv.education.map((ed) => `
    <div class="edu">
      <div class="job-head">
        <h3>${esc(ed.course[lang])} <span class="at">— ${esc(ed.school)}</span></h3>
        <span class="when">${esc(ed.start)} – ${esc(ed.end)}</span>
      </div>
      <p class="muted">${esc(ed.status[lang])}</p>
    </div>`).join("");

  const skills = cv.skills.map((g) => `
    <p class="skill-row"><b>${esc(g.group[lang])}:</b> ${g.items.map((i) => esc(loc(i, lang))).join(", ")}</p>`).join("");

  const langs = cv.languages.map((l) => `${esc(l.name[lang])} (${esc(l.level[lang])})`).join(" · ");
  const certs = cv.certifications.map((c) => `<li>${esc(c.title)} <span class="muted">— ${esc(c.platform)}${c.hours ? `, ${esc(c.hours)}` : ""}</span></li>`).join("");

  return `<!doctype html>
<html lang="${lang === "pt" ? "pt-BR" : lang}">
<head>
<meta charset="utf-8">
<title>${esc(cv.name)} — ${esc(cv.title[lang])}</title>
<style>
  @page { size: A4; margin: 16mm 15mm 16mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: "Segoe UI", Arial, "Liberation Sans", "DejaVu Sans", sans-serif; color: #1f1f24; font-size: 10.2pt; line-height: 1.42; }
  a { color: #5b21b6; text-decoration: none; }
  header { border-bottom: 2.5px solid #6d28d9; padding-bottom: 9px; margin-bottom: 12px; }
  h1 { margin: 0; font-size: 22pt; letter-spacing: -0.3px; color: #111114; }
  .title { margin: 2px 0 6px; font-size: 11pt; font-weight: 600; color: #6d28d9; }
  .contact { font-size: 9.2pt; color: #3f3f46; }
  .sep { margin: 0 6px; color: #a1a1aa; }
  .portfolio { margin-top: 6px; font-size: 9.6pt; }
  .portfolio b { color: #111114; }
  h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: 1.2px; color: #6d28d9; margin: 14px 0 6px; padding-bottom: 3px; border-bottom: 1px solid #e4e4e7; }
  p { margin: 0 0 4px; }
  .job, .edu { margin-bottom: 9px; break-inside: avoid; }
  .job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  h3 { margin: 0; font-size: 10.6pt; color: #111114; }
  .at { font-weight: 500; color: #3f3f46; }
  .when { flex: none; font-size: 9.2pt; color: #52525b; font-weight: 600; }
  ul { margin: 3px 0 0; padding-left: 16px; }
  li { margin: 1px 0; }
  .muted { color: #71717a; }
  .skill-row { margin: 2px 0; }
  .certs { columns: 2; column-gap: 22px; }
  .certs li { break-inside: avoid; }
</style>
</head>
<body>
  <header>
    <h1>${esc(cv.name)}</h1>
    <div class="title">${esc(cv.title[lang])}</div>
    <div class="contact">${contact}</div>
    <div class="portfolio"><b>${t.portfolio}:</b> <a href="${esc(cv.links.portfolio)}">${esc(bare(cv.links.portfolio))}</a></div>
  </header>

  <h2>${t.summary}</h2>
  <p>${esc(cv.summary[lang])}</p>

  <h2>${t.experience}</h2>
  ${jobs}

  <h2>${t.skills}</h2>
  ${skills}

  <h2>${t.education}</h2>
  ${edu}

  <h2>${t.languages}</h2>
  <p>${langs}</p>

  <h2>${t.soft}</h2>
  <p>${cv.softSkills[lang].map(esc).join(" · ")}</p>

  <h2>${t.certs}</h2>
  <ul class="certs">${certs}</ul>
</body>
</html>`;
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const lang of LANGS) {
    await page.setContent(html(lang), { waitUntil: "load" });
    const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true });
    const out = path.join(root, "public", `Gustavo_Oliveira_${lang.toUpperCase()}.pdf`);
    await writeFile(out, pdf);
    console.log(`✓ ${path.relative(root, out)}`);
  }
} finally {
  await browser.close();
}
