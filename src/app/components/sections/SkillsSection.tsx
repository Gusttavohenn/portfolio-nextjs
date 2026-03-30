import { useTranslations } from 'next-intl';

// Importe todos os ícones necessários dos pacotes corretos
import {
  SiNextdotjs, SiTypescript, SiMongodb, SiGrafana, SiCisco,
  SiMikrotik, SiPfsense, SiFortinet, SiGnubash, SiMysql, SiVeeam,
} from "react-icons/si";
import { VscTerminalPowershell } from "react-icons/vsc"; // Ícone corrigido para PowerShell

export default function SkillsSection() {
  const t = useTranslations('SkillsSection');

  return (
    <section id="skills" className="section">
      <h2 className="section-title">{t('titulo')}</h2>
      <div className="skills-container">

        {/* --- Categoria Frontend --- */}
        <div className="skill-category">
          <h3><i className="fa-solid fa-code" aria-hidden="true"></i> {t('catFrontend')}</h3>
          <div className="skills-list">
            <span className="skill-item"><i className="fab fa-html5" aria-hidden="true"></i> HTML5</span>
            <span className="skill-item"><i className="fab fa-css3-alt" aria-hidden="true"></i> CSS3</span>
            <span className="skill-item"><i className="fab fa-js" aria-hidden="true"></i> JavaScript</span>
            <span className="skill-item"><i className="fab fa-react" aria-hidden="true"></i> React</span>
            <span className="skill-item"><SiNextdotjs aria-hidden="true" /> Next.js</span>
            <span className="skill-item"><SiTypescript aria-hidden="true" /> TypeScript</span>
          </div>
        </div>

        {/* --- Categoria Backend --- */}
        <div className="skill-category">
          <h3><i className="fa-solid fa-server" aria-hidden="true"></i> {t('catBackend')}</h3>
          <div className="skills-list">
            <span className="skill-item"><i className="fab fa-node-js" aria-hidden="true"></i> Node.js</span>
            <span className="skill-item"><i className="fab fa-php" aria-hidden="true"></i> PHP</span>
            <span className="skill-item"><i className="fab fa-laravel" aria-hidden="true"></i> Laravel</span>
            <span className="skill-item"><i className="fab fa-python" aria-hidden="true"></i> Python</span>
            <span className="skill-item"><i className="fab fa-java" aria-hidden="true"></i> Java</span>
            <span className="skill-item"><i className="fab fa-csharp" aria-hidden="true"></i> C#</span>

          </div>
        </div>

        {/* --- Categoria Ferramentas & DB --- */}
        <div className="skill-category">
          <h3><i className="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i> {t('catTools')}</h3>
          <div className="skills-list">
            <span className="skill-item"><i className="fab fa-git-alt" aria-hidden="true"></i> Git</span>
            <span className="skill-item"><i className="fab fa-github" aria-hidden="true"></i> GitHub</span>
            <span className="skill-item"><i className="fab fa-docker" aria-hidden="true"></i> Docker</span>
            <span className="skill-item"><SiMongodb aria-hidden="true" /> MongoDB</span>
            <span className="skill-item"><SiMysql aria-hidden="true" /> MySQL</span>
            <span className="skill-item"><i className="fa-solid fa-file-waveform" aria-hidden="true"></i> Análise de Logs</span>
          </div>
        </div>

        {/* --- Categoria TI & Infraestrutura --- */}
        <div className="skill-category">
            <h3><i className="fa-solid fa-network-wired" aria-hidden="true"></i> {t('catInfra')}</h3>
            <div className="skills-list">
                <span className="skill-item"><i className="fa-solid fa-chart-line" aria-hidden="true"></i> Zabbix</span>
                <span className="skill-item"><SiGrafana aria-hidden="true" /> Grafana</span>
                <span className="skill-item"><SiCisco aria-hidden="true" /> Cisco</span>
                <span className="skill-item"><SiMikrotik aria-hidden="true" /> MikroTik</span>
                <span className="skill-item"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i> Sophos</span>
                <span className="skill-item"><SiPfsense aria-hidden="true" /> pfSense</span>
                <span className="skill-item"><SiFortinet aria-hidden="true" /> Fortinet</span>
                <span className="skill-item"><i className="fa-solid fa-user-secret" aria-hidden="true"></i> VPNs</span>
                <span className="skill-item"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i> Hardening</span>
                <span className="skill-item"><i className="fab fa-windows" aria-hidden="true"></i> Windows Server</span>
                <span className="skill-item"><SiGnubash aria-hidden="true" /> Bash</span>
                <span className="skill-item"><VscTerminalPowershell aria-hidden="true" /> PowerShell</span>
                <span className="skill-item"><SiVeeam aria-hidden="true" /> Veeam Backup</span>
                <span className="skill-item"><i className="fa-solid fa-arrows-rotate" aria-hidden="true"></i> rsync</span>
                <span className="skill-item"><i className="fa-solid fa-headset" aria-hidden="true"></i> Suporte Nível 2</span>
            </div>
        </div>

      </div>
    </section>
  );
}
