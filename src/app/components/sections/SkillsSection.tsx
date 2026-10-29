import { useTranslations } from 'next-intl';

// Importe todos os ícones necessários dos pacotes corretos
import {
  SiNextdotjs, SiTypescript, SiMongodb, SiGrafana, SiCisco,
  SiMikrotik, SiPfsense, SiFortinet, SiGnubash, SiMysql, SiVeeam, SiBlazor,
  SiDotnet, SiSharp,
} from "react-icons/si";
import { VscTerminalPowershell } from "react-icons/vsc"; // Ícone corrigido para PowerShell
import FaIcon from '../FaIcon';

export default function SkillsSection() {
  const t = useTranslations('SkillsSection');
  const c = useTranslations('Common');

  return (
    <section id="skills" className="section">
      <h2 className="section-title">{t('titulo')}</h2>
      <div className="skills-container">

        {/* --- Categoria Backend --- */}
        <div className="skill-category">
          <h3><FaIcon name="fa-solid fa-server" /> {t('catBackend')}</h3>
          <div className="skills-list">
            <span className="skill-item"><FaIcon name="fab fa-php" /> PHP</span>
            <span className="skill-item"><FaIcon name="fab fa-laravel" /> Laravel</span>
            <span className="skill-item"><SiSharp aria-hidden="true" /> C#</span>
            <span className="skill-item"><SiDotnet aria-hidden="true" /> .NET</span>
            <span className="skill-item"><FaIcon name="fab fa-python" /> Python</span>
            <span className="skill-item"><FaIcon name="fab fa-node-js" /> Node.js</span>
            <span className="skill-item"><FaIcon name="fab fa-java" /> Java</span>
            <span className="skill-item"><FaIcon name="fa-solid fa-plug" /> {c('apis')}</span>
            <span className="skill-item"><FaIcon name="fa-solid fa-robot" /> {c('automacao')}</span>
          </div>
        </div>

        {/* --- Categoria Frontend --- */}
        <div className="skill-category">
          <h3><FaIcon name="fa-solid fa-code" /> {t('catFrontend')}</h3>
          <div className="skills-list">
            <span className="skill-item"><FaIcon name="fab fa-react" /> React</span>
            <span className="skill-item"><SiNextdotjs aria-hidden="true" /> Next.js</span>
            <span className="skill-item"><SiTypescript aria-hidden="true" /> TypeScript</span>
            <span className="skill-item"><FaIcon name="fab fa-js" /> JavaScript</span>
            <span className="skill-item"><FaIcon name="fab fa-html5" /> HTML5</span>
            <span className="skill-item"><FaIcon name="fab fa-css3-alt" /> CSS3</span>
            <span className="skill-item"><SiBlazor aria-hidden="true" /> Blazor</span>
          </div>
        </div>

        {/* --- Categoria Banco de Dados & DevOps --- */}
        <div className="skill-category">
          <h3><FaIcon name="fa-solid fa-database" /> {t('catTools')}</h3>
          <div className="skills-list">
            <span className="skill-item"><SiMysql aria-hidden="true" /> MySQL</span>
            <span className="skill-item"><FaIcon name="fa-solid fa-database" /> SQL Server</span>
            <span className="skill-item"><FaIcon name="fa-solid fa-database" /> PostgreSQL</span>
            <span className="skill-item"><FaIcon name="fa-solid fa-database" /> MariaDB</span>
            <span className="skill-item"><SiMongodb aria-hidden="true" /> MongoDB</span>
            <span className="skill-item"><FaIcon name="fab fa-docker" /> Docker</span>
            <span className="skill-item"><FaIcon name="fab fa-git-alt" /> Git</span>
            <span className="skill-item"><FaIcon name="fab fa-github" /> GitHub</span>
          </div>
        </div>

        {/* --- Categoria TI & Infraestrutura --- */}
        <div className="skill-category">
            <h3><FaIcon name="fa-solid fa-network-wired" /> {t('catInfra')}</h3>
            <div className="skills-list">
                <span className="skill-item"><FaIcon name="fa-solid fa-chart-line" /> Zabbix</span>
                <span className="skill-item"><SiGrafana aria-hidden="true" /> Grafana</span>
                <span className="skill-item"><SiCisco aria-hidden="true" /> Cisco</span>
                <span className="skill-item"><SiMikrotik aria-hidden="true" /> MikroTik</span>
                <span className="skill-item"><FaIcon name="fa-solid fa-shield-halved" /> Sophos</span>
                <span className="skill-item"><SiPfsense aria-hidden="true" /> pfSense</span>
                <span className="skill-item"><SiFortinet aria-hidden="true" /> Fortinet</span>
                <span className="skill-item"><FaIcon name="fa-solid fa-user-secret" /> VPNs</span>
                <span className="skill-item"><FaIcon name="fa-solid fa-shield-halved" /> Hardening</span>
                <span className="skill-item"><FaIcon name="fab fa-windows" /> Windows Server</span>
                <span className="skill-item"><SiGnubash aria-hidden="true" /> Bash</span>
                <span className="skill-item"><VscTerminalPowershell aria-hidden="true" /> PowerShell</span>
                <span className="skill-item"><SiVeeam aria-hidden="true" /> Veeam Backup</span>
                <span className="skill-item"><FaIcon name="fa-solid fa-arrows-rotate" /> rsync</span>
                <span className="skill-item"><FaIcon name="fa-solid fa-headset" /> {c('suporte')}</span>
            </div>
        </div>

      </div>
    </section>
  );
}
