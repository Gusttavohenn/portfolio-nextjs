export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  tags: string[];
  imageUrl: string;
  problem: string;
  solution: string;
  learnings: string;
  liveUrl?: string;
  codeUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "fang-security",
    title: "Fang — Web Security Scanner",
    shortDescription: "PYTHON, FLASK, SEGURANÇA OFENSIVA",
    description: "Plataforma de segurança web com interface própria para pentest ético: faz reconhecimento, varredura de vulnerabilidades e gera relatórios com scoring CVSS.",
    tags: ["python", "flask", "security", "sqlite"],
    imageUrl: "/fang.png",
    problem: "Rodar um pentest completo normalmente exige juntar várias ferramentas separadas e montar o relatório na mão. Eu queria um único painel que fizesse o reconhecimento, a varredura e a documentação do começo ao fim.",
    solution: "Construí o Fang em Python com Flask: uma interface web com dashboard em tempo real (SSE), dezenas de módulos de verificação organizados em pipelines, geração automática de relatórios em HTML/PDF com scoring CVSS, CLI para automação e notificações via webhook. Feito para uso ético, apenas em sistemas próprios ou com autorização.",
    learnings: "Aprofundei muito em segurança web do lado defensivo e ofensivo, arquitetura de aplicação modular, streaming de eventos em tempo real e em escrever relatórios claros a partir de dados técnicos.",
    liveUrl: "https://fang.nyxu.com.br",
    codeUrl: "https://github.com/Gusttavohenn/fang-security",
  },
  {
    slug: "plataforma-nexo",
    title: "Nexo — Plataforma Financeira",
    shortDescription: "NODE.JS, POSTGRESQL, API RESTful",
    description: "O NEXO é um dashboard financeiro pessoal que construí do zero, projetado para ajudar no controle de receitas e despesas de forma simples, visual e totalmente online.",
    tags: ["node.js", "express.js", "postgresql", "javascript"],
    imageUrl: "/nexo.png",
    problem: "O desafio era criar uma plataforma na qual pudesse registrar toda minha receita para melhor controle financeiro.",
    solution: "Desenvolvi um dashboard full-stack com Node.js e PostgreSQL, implementando autenticação JWT, CRUD completo de transações e visualização com gráficos interativos para acompanhamento mensal.",
    learnings: "Aprendi a estruturar uma API RESTful do zero, lidar com autenticação/autorização, e a importância de separar responsabilidades entre frontend e backend.",
    liveUrl: "https://nexo-financeiro.vercel.app/login",
    codeUrl: "https://github.com/Gusttavohenn/finandash-fullstack",
  },
  {
    slug: "API-carteira-digital-JAVA",
    title: "API Carteira Digital",
    shortDescription: "JAVA, SPRING BOOT",
    description: "Uma API RESTful para um sistema de transações financeiras simplificado, desenvolvida com Java e Spring Boot.",
    tags: ["java", "spring boot"],
    imageUrl: "/api-carteira-digital-java.png",
    problem: "Necessidade de uma API robusta para simular operações de carteira digital com cadastro de usuários, consulta de saldo e transferências entre contas.",
    solution: "Implementei a API com Spring Boot seguindo boas práticas REST, com validações de regras de negócio, tratamento de exceções e arquitetura em camadas (Controller, Service, Repository).",
    learnings: "Aprofundei conhecimentos em Java/Spring Boot, tratamento de exceções do mundo real, e a importância de testes e validações robustas para APIs financeiras.",
    codeUrl: "https://github.com/Gusttavohenn/api-carteira-digital-java",
  },
];
