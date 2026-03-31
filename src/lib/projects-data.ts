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
    slug: "plataforma-nexo",
    title: "Nexo - Plataforma Financeira",
    shortDescription: "NODE.JS, POSTGRESQL, API RESTful",
    description: "O NEXO é um dashboard financeiro pessoal que construí do zero, projetado para ajudar no controle de receitas e despesas de forma simples, visual e totalmente online.",
    tags: ["node.js", "html5", "mongodb", "express.js", "css3", "javascript", "postgresql"],
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
    solution: "Implementei a API com Spring Boot seguindo boas práticas REST, com validações de regras de negócio, tratamento de exceções (SSL, 404) e arquitetura em camadas (Controller, Service, Repository).",
    learnings: "Aprofundei conhecimentos em Java/Spring Boot, tratamento de exceções do mundo real, e a importância de testes e validações robustas para APIs financeiras.",
    codeUrl: "https://github.com/Gusttavohenn/api-carteira-digital-java",
  },
  // +projetos
];
