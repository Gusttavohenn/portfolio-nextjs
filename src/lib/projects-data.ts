export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  tags: string[];
  imageUrl: string;
  problem: string;
  liveUrl?: string; 
  codeUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "plataforma-nexo",
    title: "Nexo - Plataforma Financeira",
    shortDescription: "NODE.JS, POSTGRESQL, API RESTful",
    description: "O NEXO é um dashboard financeiro pessoal que construí do zero, projetado para ajudar no controle de receitas e despesas de forma simples, visual e totalmente online", // <-- TEXTO ADICIONADO
    tags: ["node.js", "html5", "mongodb", "express.js", "css3", "javascript", "postgreSql"],
    imageUrl: "/nexo.png",
    problem: "O desafio era criar uma plataforma na qual pudesse registrar toda minha receita para melhor controle financeiro.",
    liveUrl: "https://nexo-financeiro.vercel.app/login", // link projeto
    codeUrl: "https://github.com/Gusttavohenn/finandash-fullstack", //link github
  },
  {
    slug: "robo-de-precos ",
    title: "Bot de alerta - EM PROGRESSO",
    shortDescription: "Python, Seleium, Flask",
    description: "Este robô monitora o preço de um produto específico em um site (como Amazon ou Mercado Livre) e envia uma notificação (por e-mail ou Telegram) quando o preço cai abaixo de um valor que você definiu.", // <-- TEXTO ADICIONADO
    tags: ["Python", "Flask"],
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2070",
    problem: "Acompanhar em tempo real os preços dos produtos",
    liveUrl: "#",
    codeUrl: "#",
  },
  // +projetos
];