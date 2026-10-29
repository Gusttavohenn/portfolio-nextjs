import type { IconType } from "react-icons";
import {
  FaGithub, FaLinkedinIn, FaWhatsapp, FaWindows, FaReact, FaPython, FaPhp, FaNodeJs,
  FaLaravel, FaJs, FaJava, FaHtml5, FaGitAlt, FaDocker, FaCss3Alt,
  FaDatabase, FaCode, FaArrowUpRightFromSquare, FaSun, FaMoon, FaShieldHalved, FaRobot,
  FaLocationDot, FaGraduationCap, FaEnvelope, FaChevronDown, FaChevronUp, FaArrowRight,
  FaArrowLeft, FaUserSecret, FaServer, FaScrewdriverWrench, FaPlug, FaNetworkWired,
  FaLightbulb, FaLayerGroup, FaLanguage, FaHeadset, FaDisplay, FaChartLine, FaBullseye,
  FaArrowsRotate,
} from "react-icons/fa6";

/*
 * Ícones do Font Awesome embutidos no site (react-icons), no lugar do script do CDN.
 * Uso igual ao antigo: <FaIcon name="fa-solid fa-database" /> — classes extras são mantidas.
 */
const MAP: Record<string, IconType> = {
  "fa-github": FaGithub, "fa-linkedin-in": FaLinkedinIn, "fa-whatsapp": FaWhatsapp,
  "fa-windows": FaWindows, "fa-react": FaReact, "fa-python": FaPython, "fa-php": FaPhp,
  "fa-node-js": FaNodeJs, "fa-laravel": FaLaravel, "fa-js": FaJs, "fa-java": FaJava,
  "fa-html5": FaHtml5, "fa-git-alt": FaGitAlt, "fa-docker": FaDocker, "fa-css3-alt": FaCss3Alt,
  "fa-database": FaDatabase, "fa-code": FaCode, "fa-arrow-up-right-from-square": FaArrowUpRightFromSquare,
  "fa-sun": FaSun, "fa-moon": FaMoon, "fa-shield-halved": FaShieldHalved, "fa-robot": FaRobot,
  "fa-location-dot": FaLocationDot, "fa-graduation-cap": FaGraduationCap, "fa-envelope": FaEnvelope,
  "fa-chevron-down": FaChevronDown, "fa-chevron-up": FaChevronUp, "fa-arrow-right": FaArrowRight,
  "fa-arrow-left": FaArrowLeft, "fa-user-secret": FaUserSecret, "fa-server": FaServer,
  "fa-screwdriver-wrench": FaScrewdriverWrench, "fa-plug": FaPlug, "fa-network-wired": FaNetworkWired,
  "fa-lightbulb": FaLightbulb, "fa-layer-group": FaLayerGroup, "fa-language": FaLanguage,
  "fa-headset": FaHeadset, "fa-display": FaDisplay, "fa-chart-line": FaChartLine,
  "fa-bullseye": FaBullseye, "fa-arrows-rotate": FaArrowsRotate,
};

const PREFIXES = new Set(["fa", "fab", "fas", "far", "fa-solid", "fa-brands", "fa-regular"]);

export default function FaIcon({ name, style }: { name: string; style?: React.CSSProperties }) {
  const parts = name.split(/\s+/).filter(Boolean);
  const key = parts.find((p) => MAP[p]);
  const Icon = key ? MAP[key] : null;
  if (!Icon) return null;
  const extra = parts.filter((p) => p !== key && !PREFIXES.has(p)).join(" ");
  return <Icon className={`fa-icon${extra ? ` ${extra}` : ""}`} style={style} aria-hidden="true" focusable="false" />;
}
