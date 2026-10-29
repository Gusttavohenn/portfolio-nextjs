import { cv, loc } from '@/lib/cv';
import { projects } from '@/lib/projects-data';
import { SITE_URL } from '@/lib/site-url';

/*
 * /llms.txt — resumo em Markdown do portfólio para agentes de IA (https://llmstxt.org).
 * Gerado de content/cv.json e dos projetos: atualizou o currículo, atualizou aqui.
 */

export const dynamic = 'force-static';

function build(): string {
  const exp = cv.experience
    .map((e) => `- **${e.role.pt}**, ${loc(e.company, 'pt')} (${e.start.slice(0, 7)} – ${e.end ? e.end.slice(0, 7) : 'atual'})`)
    .join('\n');
  const services = cv.services.map((s) => `- **${s.title.pt}**: ${s.desc.pt} (${s.tags.join(', ')})`).join('\n');
  const skills = cv.skills.map((g) => `- **${g.group.pt}**: ${g.items.map((i) => loc(i, 'pt')).join(', ')}`).join('\n');
  const projs = projects
    .map((p) => {
      const link = p.liveUrl ?? p.codeUrl;
      const name = link ? `[${p.title.pt}](${link})` : p.title.pt;
      return `- ${name}: ${p.description.pt} Tecnologias: ${p.tags.join(', ')}.`;
    })
    .join('\n');
  const edu = cv.education.map((e) => `- ${e.course.pt}, ${e.school} (${e.start}–${e.end})`).join('\n');
  const faq = cv.faq.map((f) => `- **${f.q.pt}** ${f.a.pt}`).join('\n');

  return `# ${cv.name}

> ${cv.title.pt}. ${cv.summary.pt}

Portfólio pessoal de Gustavo Oliveira ("Gu"), desenvolvedor de ${cv.location.pt}. Aberto a vagas (presencial, híbrido ou remoto) e a projetos freelance.

## Páginas

- [Portfólio em português](${SITE_URL}/pt): página principal
- [Portfolio in English](${SITE_URL}/en): English version
- [Portafolio en español](${SITE_URL}/es): versión en español
- [Currículo em PDF (PT)](${SITE_URL}/Gustavo_Oliveira_PT.pdf)
- [Resume PDF (EN)](${SITE_URL}/Gustavo_Oliveira_EN.pdf)
- [Currículum PDF (ES)](${SITE_URL}/Gustavo_Oliveira_ES.pdf)

## Serviços

${services}

## Experiência

${exp}

## Habilidades

${skills}

## Projetos

${projs}

## Formação

${edu}

## Perguntas frequentes

${faq}

## Contato

- E-mail: ${cv.email}
- LinkedIn: ${cv.links.linkedin}
- GitHub: ${cv.links.github}
- WhatsApp: pelo botão verde no site
`;
}

export function GET() {
  return new Response(build(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
