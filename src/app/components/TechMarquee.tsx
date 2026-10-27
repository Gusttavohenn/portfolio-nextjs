import type { IconType } from "react-icons";
import {
  SiPhp, SiLaravel, SiDotnet, SiSharp, SiPython, SiNodedotjs, SiOpenjdk,
  SiMysql, SiPostgresql, SiMongodb, SiMariadb, SiDocker, SiLinux, SiGit,
  SiGithub, SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiClaude,
  SiOpenai, SiFlask, SiSpringboot, SiExpress, SiWhatsapp,
} from "react-icons/si";
import { TbBrandAzure } from "react-icons/tb";
import { DiMsqlServer } from "react-icons/di";

const techs: { name: string; Icon: IconType }[] = [
  { name: "PHP", Icon: SiPhp },
  { name: "Laravel", Icon: SiLaravel },
  { name: "C#", Icon: SiSharp },
  { name: ".NET", Icon: SiDotnet },
  { name: "Python", Icon: SiPython },
  { name: "Flask", Icon: SiFlask },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress },
  { name: "Java", Icon: SiOpenjdk },
  { name: "Spring Boot", Icon: SiSpringboot },
  { name: "MySQL", Icon: SiMysql },
  { name: "SQL Server", Icon: DiMsqlServer },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MariaDB", Icon: SiMariadb },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Docker", Icon: SiDocker },
  { name: "Linux", Icon: SiLinux },
  { name: "Azure", Icon: TbBrandAzure },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Claude", Icon: SiClaude },
  { name: "OpenAI", Icon: SiOpenai },
  { name: "WhatsApp API", Icon: SiWhatsapp },
];

export default function TechMarquee() {
  // the list is rendered twice so the loop is seamless
  const row = [...techs, ...techs];
  return (
    <div className="tech-marquee" aria-label="Tecnologias que eu uso">
      <ul className="tech-marquee-track">
        {row.map(({ name, Icon }, i) => (
          <li key={`${name}-${i}`} className="tech-marquee-item" aria-hidden={i >= techs.length}>
            <Icon aria-hidden="true" />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
