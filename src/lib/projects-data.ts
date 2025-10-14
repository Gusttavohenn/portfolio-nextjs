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
    slug: "API-carteira-digital-JAVA",
    title: "API Carteira Digital",
    shortDescription: "JAVA, SPRING BOOT",
    description: "uma API RESTful para um sistema de transações financeiras simplificado, desenvolvida com Java e Spring Boot. O projeto simula operações de uma carteira digital, permitindo cadastro de usuários, consulta de saldo e transferências entre contas, com validações robustas de segurança e regras de negócio. A jornada de desenvolvimento incluiu a resolução de desafios do mundo real, como o tratamento de exceções de comunicação com serviços externos (erros de certificado SSL e 404), garantindo que a API seja resiliente e pronta para produção.", // <-- TEXTO ADICIONADO
    tags: ["Java", "Spring Boot"],
    imageUrl: "/api-carteira-digital-java.png",
    problem: "Necessidade de uma API de carteira digital",
    //liveUrl: "#",
    codeUrl: "https://github.com/Gusttavohenn/api-carteira-digital-java",
  },
  // +projetos
];