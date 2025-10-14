// Importe todos os ícones necessários dos pacotes corretos
import { 
  SiNextdotjs, SiTypescript, SiMongodb, SiGrafana, SiCisco, 
  SiMikrotik, SiPfsense, SiFortinet, SiGnubash, SiMysql, SiVeeam, 
} from "react-icons/si";
import { VscTerminalPowershell } from "react-icons/vsc"; // Ícone corrigido para PowerShell

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <h2 className="section-title">Minhas Skills</h2>
      <div className="skills-container">

        {/* --- Categoria Frontend --- */}
        <div className="skill-category">
          <h3><i className="fa-solid fa-code"></i> Frontend</h3>
          <div className="skills-list">
            <span className="skill-item"><i className="fab fa-html5"></i> HTML5</span>
            <span className="skill-item"><i className="fab fa-css3-alt"></i> CSS3</span>
            <span className="skill-item"><i className="fab fa-js"></i> JavaScript</span>
            <span className="skill-item"><i className="fab fa-react"></i> React</span>
            <span className="skill-item"><SiNextdotjs /> Next.js</span>
            <span className="skill-item"><SiTypescript /> TypeScript</span>
          </div>
        </div>

        {/* --- Categoria Backend --- */}
        <div className="skill-category">
          <h3><i className="fa-solid fa-server"></i> Backend</h3>
          <div className="skills-list">
            <span className="skill-item"><i className="fab fa-node-js"></i> Node.js</span>
            <span className="skill-item"><i className="fab fa-php"></i> PHP</span>
            <span className="skill-item"><i className="fab fa-laravel"></i> Laravel</span>
            <span className="skill-item"><i className="fab fa-python"></i> Python</span>
            <span className="skill-item"><i className="fab fa-java"></i> Java</span>
          </div>
        </div>
        
        {/* --- Categoria Ferramentas & DB --- */}
        <div className="skill-category">
          <h3><i className="fa-solid fa-screwdriver-wrench"></i> Ferramentas & DB</h3>
          <div className="skills-list">
            <span className="skill-item"><i className="fab fa-git-alt"></i> Git</span>
            <span className="skill-item"><i className="fab fa-github"></i> GitHub</span>
            <span className="skill-item"><i className="fab fa-docker"></i> Docker</span>
            <span className="skill-item"><SiMongodb /> MongoDB</span>
            <span className="skill-item"><SiMysql /> MySQL</span>
            <span className="skill-item"><i className="fa-solid fa-file-waveform"></i> Análise de Logs</span>
          </div>
        </div>

        {/* --- Categoria TI & Infraestrutura --- */}
        <div className="skill-category">
            <h3><i className="fa-solid fa-network-wired"></i> TI & Infraestrutura</h3>
            <div className="skills-list">
                <span className="skill-item"><i className="fa-solid fa-chart-line"></i> Zabbix</span>
                <span className="skill-item"><SiGrafana /> Grafana</span>
                <span className="skill-item"><SiCisco /> Cisco</span>
                <span className="skill-item"><SiMikrotik /> MikroTik</span>
                <span className="skill-item"><i className="fa-solid fa-shield-halved"></i> Sophos</span>
                <span className="skill-item"><SiPfsense /> pfSense</span>
                <span className="skill-item"><SiFortinet /> Fortinet</span>
                <span className="skill-item"><i className="fa-solid fa-user-secret"></i> VPNs</span>
                <span className="skill-item"><i className="fa-solid fa-shield-halved"></i> Hardening</span>
                <span className="skill-item"><i className="fab fa-windows"></i> Windows Server</span>
                <span className="skill-item"><SiGnubash /> Bash</span>
                <span className="skill-item"><VscTerminalPowershell /> PowerShell</span>
                <span className="skill-item"><SiVeeam /> Veeam Backup</span>
                <span className="skill-item"><i className="fa-solid fa-arrows-rotate"></i> rsync</span>
                <span className="skill-item"><i className="fa-solid fa-headset"></i> Suporte Nível 2</span>
            </div>
        </div>

      </div>
    </section>
  );
}