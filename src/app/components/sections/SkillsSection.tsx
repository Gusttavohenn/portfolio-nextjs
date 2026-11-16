import type { IconType } from 'react-icons';
import { useTranslations } from 'next-intl';
import {
  SiPhp, SiLaravel, SiSharp, SiDotnet, SiNodedotjs, SiMysql, SiGit, SiLinux, SiDocker, SiAsterisk,
} from 'react-icons/si';
import { TbApi, TbDatabase, TbTicket, TbRouter, TbActivityHeartbeat } from 'react-icons/tb';
import SectionHead from '../SectionHead';

/*
 * Skills em dois blocos: o que uso todo dia (com ícone) e o que já usei em projetos (lista simples).
 * Cada tecnologia aparece uma vez só.
 */
const DAILY: [string, IconType][] = [
  ['PHP', SiPhp], ['Laravel', SiLaravel], ['C#', SiSharp], ['.NET', SiDotnet], ['Node.js', SiNodedotjs],
  ['MySQL', SiMysql], ['SQL Server', TbDatabase], ['APIs REST', TbApi],
  ['GLPI', TbTicket], ['IXC Provedor', TbRouter], ['Zabbix', TbActivityHeartbeat], ['Asterisk', SiAsterisk],
  ['Git', SiGit], ['Linux', SiLinux], ['Docker', SiDocker],
];

const USED: { key: string; items: string[] }[] = [
  { key: 'grpLinguagens', items: ['Python', 'Java', 'TypeScript', 'JavaScript'] },
  { key: 'grpFront', items: ['React', 'Next.js', 'Blazor', 'HTML', 'CSS'] },
  { key: 'grpDados', items: ['PostgreSQL', 'MariaDB', 'MongoDB', 'Oracle'] },
  { key: 'grpInfra', items: ['Windows Server', 'Microsoft Azure', 'Grafana'] },
  { key: 'grpIA', items: ['Claude', 'OpenAI', 'OPA Suite'] },
];

export default function SkillsSection() {
  const t = useTranslations('SkillsSection');

  return (
    <section id="skills" className="section">
      <SectionHead label={t('rotulo')} title={t('titulo')} />
      <div className="sk-wrap">
        <div className="sk-daily">
          <h3 className="sk-h">{t('todoDia')}</h3>
          <ul className="sk-chips">
            {DAILY.map(([name, Icon]) => (
              <li key={name} className="sk-chip"><Icon aria-hidden="true" /> {name}</li>
            ))}
          </ul>
        </div>
        <div className="sk-used">
          <h3 className="sk-h">{t('jaUsei')}</h3>
          <dl className="sk-groups">
            {USED.map((g) => (
              <div key={g.key} className="sk-group">
                <dt>{t(g.key)}</dt>
                <dd>{g.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
