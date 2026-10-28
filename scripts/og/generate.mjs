// Gera as imagens de prévia do link (Open Graph) 1200x630 em PT/EN/ES.
// Uso: node scripts/og/generate.mjs  ->  public/og-pt.png, og-en.png, og-es.png
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const TEXT = {
  pt: { role: "Dev Back-end · Automação & IA", tag: "Transformo processo manual em sistema que roda sozinho.", hi: "Oi! Eu sou o Deploy." },
  en: { role: "Back-end Dev · Automation & AI", tag: "I turn manual processes into systems that run on their own.", hi: "Hi! I'm Deploy." },
  es: { role: "Dev Back-end · Automatización & IA", tag: "Convierto procesos manuales en sistemas que funcionan solos.", hi: "¡Hola! Soy Deploy." },
};

// o mesmo robô do site, em pixels (grade 16x20)
const robot = `
<svg viewBox="0 0 16 20" width="240" height="300" shape-rendering="crispEdges">
  <rect x="7" y="0" width="2" height="2" fill="#6d28d9"/><rect x="7" y="1" width="2" height="1" fill="#e0e0ff"/>
  <rect x="3" y="2" width="10" height="7" fill="#8b5cf6"/><rect x="3" y="8" width="10" height="1" fill="#6d28d9"/>
  <rect x="6" y="4" width="2" height="2" fill="#0d0d0f"/><rect x="10" y="4" width="2" height="2" fill="#0d0d0f"/>
  <rect x="6" y="4" width="1" height="1" fill="#e0e0ff"/><rect x="10" y="4" width="1" height="1" fill="#e0e0ff"/>
  <rect x="7" y="7" width="4" height="1" fill="#6d28d9"/>
  <rect x="4" y="9" width="8" height="6" fill="#8b5cf6"/><rect x="4" y="14" width="8" height="1" fill="#6d28d9"/>
  <rect x="7" y="11" width="2" height="2" fill="#e0e0ff"/>
  <rect x="2" y="9" width="2" height="5" fill="#6d28d9"/><rect x="12" y="6" width="2" height="5" fill="#6d28d9"/>
  <rect x="5" y="15" width="2" height="4" fill="#6d28d9"/><rect x="9" y="15" width="2" height="4" fill="#6d28d9"/>
</svg>`;

// pontinhos decorativos fixos (sem gradiente), como as partículas do site
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const dots = Array.from({ length: 70 }, () => {
  const x = Math.round(rnd() * 1200), y = Math.round(rnd() * 630), r = (rnd() * 2 + 1).toFixed(1), o = (rnd() * 0.5 + 0.15).toFixed(2);
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#8b5cf6" opacity="${o}"/>`;
}).join("");

const html = (t) => `<!doctype html><html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: #0d0d0f; font-family: "DejaVu Sans", "Liberation Sans", Arial, sans-serif; color: #f4f4f6; position: relative; overflow: hidden; }
  .dots { position: absolute; inset: 0; }
  .bar { position: absolute; left: 0; top: 0; width: 100%; height: 10px; background: #8b5cf6; }
  .content { position: absolute; left: 80px; top: 0; bottom: 0; width: 720px; display: flex; flex-direction: column; justify-content: center; gap: 22px; }
  .kicker { font-family: "DejaVu Sans Mono", monospace; font-size: 22px; letter-spacing: 3px; color: #8b5cf6; font-weight: 700; }
  h1 { font-size: 78px; line-height: 1; letter-spacing: -2px; font-weight: 800; }
  .role { font-size: 34px; font-weight: 700; color: #a78bfa; }
  .tag { font-size: 25px; color: #b4b4c0; line-height: 1.35; max-width: 640px; }
  .chips { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
  .chips span { font-family: "DejaVu Sans Mono", monospace; font-size: 19px; color: #d4d4dc; border: 2px solid #34343f; border-radius: 8px; padding: 6px 14px; background: #141418; }
  .url { position: absolute; left: 80px; bottom: 44px; font-family: "DejaVu Sans Mono", monospace; font-size: 21px; color: #7a7a88; }
  .deploy { position: absolute; right: 90px; bottom: 70px; display: flex; flex-direction: column; align-items: center; gap: 18px; }
  .bubble { background: #141418; border: 2px solid #8b5cf6; border-radius: 14px; padding: 12px 18px; font-family: "DejaVu Sans Mono", monospace; font-size: 20px; color: #f4f4f6; }
  .ground { width: 300px; height: 4px; background: #34343f; border-radius: 2px; margin-top: -18px; }
</style></head><body>
  <svg class="dots" width="1200" height="630">${dots}</svg>
  <div class="bar"></div>
  <div class="content">
    <div class="kicker">PORTFÓLIO</div>
    <h1>GUSTAVO<br>OLIVEIRA</h1>
    <div class="role">${t.role}</div>
    <div class="tag">${t.tag}</div>
    <div class="chips"><span>PHP · Laravel</span><span>C# · .NET</span><span>SQL</span><span>Azure · Docker</span></div>
  </div>
  <div class="url">portfolio-gusttavohenn.vercel.app</div>
  <div class="deploy"><div class="bubble">${t.hi}</div>${robot}<div class="ground"></div></div>
</body></html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  for (const [lang, t] of Object.entries(TEXT)) {
    await page.setContent(html(t), { waitUntil: "load" });
    const out = path.join(root, "public", `og-${lang}.png`);
    await writeFile(out, await page.screenshot({ type: "png" }));
    console.log("✓", path.relative(root, out));
  }
} finally {
  await browser.close();
}
