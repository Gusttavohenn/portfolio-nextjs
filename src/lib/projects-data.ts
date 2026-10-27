import type { Localized } from './cv';

export interface Project {
  slug: string;
  title: Localized;
  shortDescription: Localized;
  description: Localized;
  tags: string[];
  imageUrl: string;
  problem: Localized;
  solution: Localized;
  learnings: Localized;
  liveUrl?: string;
  codeUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "fang-security",
    title: {
      pt: "Fang — Web Security Scanner",
      en: "Fang — Web Security Scanner",
      es: "Fang — Web Security Scanner",
    },
    shortDescription: {
      pt: "PYTHON, FLASK, SEGURANÇA OFENSIVA",
      en: "PYTHON, FLASK, OFFENSIVE SECURITY",
      es: "PYTHON, FLASK, SEGURIDAD OFENSIVA",
    },
    description: {
      pt: "Plataforma de segurança web com interface própria para pentest ético: faz reconhecimento, varredura de vulnerabilidades e gera relatórios com scoring CVSS.",
      en: "Web security platform with its own interface for ethical pentesting: it runs reconnaissance, scans for vulnerabilities and generates reports with CVSS scoring.",
      es: "Plataforma de seguridad web con interfaz propia para pentest ético: hace reconocimiento, escaneo de vulnerabilidades y genera informes con puntuación CVSS.",
    },
    tags: ["python", "flask", "security", "sqlite"],
    imageUrl: "/fang.png",
    problem: {
      pt: "Rodar um pentest completo normalmente exige juntar várias ferramentas separadas e montar o relatório na mão. Eu queria um único painel que fizesse o reconhecimento, a varredura e a documentação do começo ao fim.",
      en: "Running a full pentest usually means stitching together several separate tools and writing the report by hand. I wanted a single dashboard that handled reconnaissance, scanning and documentation from start to finish.",
      es: "Hacer un pentest completo normalmente exige juntar varias herramientas separadas y armar el informe a mano. Quería un único panel que hiciera el reconocimiento, el escaneo y la documentación de principio a fin.",
    },
    solution: {
      pt: "Construí o Fang em Python com Flask: uma interface web com dashboard em tempo real (SSE), dezenas de módulos de verificação organizados em pipelines, geração automática de relatórios em HTML/PDF com scoring CVSS, CLI para automação e notificações via webhook. Feito para uso ético, apenas em sistemas próprios ou com autorização.",
      en: "I built Fang in Python with Flask: a web interface with a real-time dashboard (SSE), dozens of check modules organized into pipelines, automatic HTML/PDF reports with CVSS scoring, a CLI for automation and webhook notifications. Built for ethical use only, on your own systems or with authorization.",
      es: "Construí Fang en Python con Flask: una interfaz web con dashboard en tiempo real (SSE), decenas de módulos de verificación organizados en pipelines, generación automática de informes en HTML/PDF con puntuación CVSS, CLI para automatización y notificaciones vía webhook. Hecho para uso ético, solo en sistemas propios o con autorización.",
    },
    learnings: {
      pt: "Aprofundei muito em segurança web do lado defensivo e ofensivo, arquitetura de aplicação modular, streaming de eventos em tempo real e em escrever relatórios claros a partir de dados técnicos.",
      en: "I went deep into web security from both the defensive and offensive sides, modular application architecture, real-time event streaming, and writing clear reports from technical data.",
      es: "Profundicé mucho en seguridad web desde el lado defensivo y ofensivo, arquitectura de aplicaciones modular, streaming de eventos en tiempo real y en escribir informes claros a partir de datos técnicos.",
    },
    liveUrl: "https://fang.nyxu.com.br",
    codeUrl: "https://github.com/Gusttavohenn/fang-security",
  },
  {
    slug: "plataforma-nexo",
    title: {
      pt: "Nexo — Plataforma Financeira",
      en: "Nexo — Finance Platform",
      es: "Nexo — Plataforma Financiera",
    },
    shortDescription: {
      pt: "NODE.JS, POSTGRESQL, API RESTful",
      en: "NODE.JS, POSTGRESQL, RESTful API",
      es: "NODE.JS, POSTGRESQL, API RESTful",
    },
    description: {
      pt: "O NEXO é um dashboard financeiro pessoal que construí do zero, projetado para ajudar no controle de receitas e despesas de forma simples, visual e totalmente online.",
      en: "NEXO is a personal finance dashboard I built from scratch, designed to help track income and expenses in a simple, visual and fully online way.",
      es: "NEXO es un dashboard financiero personal que construí desde cero, diseñado para ayudar a controlar ingresos y gastos de forma simple, visual y totalmente online.",
    },
    tags: ["node.js", "express.js", "postgresql", "javascript"],
    imageUrl: "/nexo.png",
    problem: {
      pt: "O desafio era criar uma plataforma na qual pudesse registrar toda minha receita para melhor controle financeiro.",
      en: "The challenge was to create a platform where I could record all my income for better financial control.",
      es: "El desafío era crear una plataforma en la que pudiera registrar todos mis ingresos para un mejor control financiero.",
    },
    solution: {
      pt: "Desenvolvi um dashboard full-stack com Node.js e PostgreSQL, implementando autenticação JWT, CRUD completo de transações e visualização com gráficos interativos para acompanhamento mensal.",
      en: "I built a full-stack dashboard with Node.js and PostgreSQL, implementing JWT authentication, full transaction CRUD and interactive charts for monthly tracking.",
      es: "Desarrollé un dashboard full-stack con Node.js y PostgreSQL, implementando autenticación JWT, CRUD completo de transacciones y visualización con gráficos interactivos para el seguimiento mensual.",
    },
    learnings: {
      pt: "Aprendi a estruturar uma API RESTful do zero, lidar com autenticação/autorização, e a importância de separar responsabilidades entre frontend e backend.",
      en: "I learned how to structure a RESTful API from scratch, handle authentication/authorization, and the importance of separating responsibilities between frontend and backend.",
      es: "Aprendí a estructurar una API RESTful desde cero, manejar autenticación/autorización y la importancia de separar responsabilidades entre frontend y backend.",
    },
    liveUrl: "https://nexo-financeiro.vercel.app/login",
    codeUrl: "https://github.com/Gusttavohenn/finandash-fullstack",
  },
  {
    slug: "API-carteira-digital-JAVA",
    title: {
      pt: "API Carteira Digital",
      en: "Digital Wallet API",
      es: "API Billetera Digital",
    },
    shortDescription: {
      pt: "JAVA, SPRING BOOT",
      en: "JAVA, SPRING BOOT",
      es: "JAVA, SPRING BOOT",
    },
    description: {
      pt: "Uma API RESTful para um sistema de transações financeiras simplificado, desenvolvida com Java e Spring Boot.",
      en: "A RESTful API for a simplified financial transactions system, built with Java and Spring Boot.",
      es: "Una API RESTful para un sistema simplificado de transacciones financieras, desarrollada con Java y Spring Boot.",
    },
    tags: ["java", "spring boot"],
    imageUrl: "/api-carteira-digital-java.png",
    problem: {
      pt: "Necessidade de uma API robusta para simular operações de carteira digital com cadastro de usuários, consulta de saldo e transferências entre contas.",
      en: "The need for a robust API to simulate digital wallet operations with user registration, balance checks and transfers between accounts.",
      es: "La necesidad de una API robusta para simular operaciones de billetera digital con registro de usuarios, consulta de saldo y transferencias entre cuentas.",
    },
    solution: {
      pt: "Implementei a API com Spring Boot seguindo boas práticas REST, com validações de regras de negócio, tratamento de exceções e arquitetura em camadas (Controller, Service, Repository).",
      en: "I implemented the API with Spring Boot following REST best practices, with business rule validation, exception handling and a layered architecture (Controller, Service, Repository).",
      es: "Implementé la API con Spring Boot siguiendo buenas prácticas REST, con validaciones de reglas de negocio, manejo de excepciones y arquitectura en capas (Controller, Service, Repository).",
    },
    learnings: {
      pt: "Aprofundei conhecimentos em Java/Spring Boot, tratamento de exceções do mundo real, e a importância de testes e validações robustas para APIs financeiras.",
      en: "I deepened my knowledge of Java/Spring Boot, real-world exception handling, and the importance of thorough testing and validation for financial APIs.",
      es: "Profundicé conocimientos en Java/Spring Boot, manejo de excepciones del mundo real y la importancia de pruebas y validaciones robustas para APIs financieras.",
    },
    codeUrl: "https://github.com/Gusttavohenn/api-carteira-digital-java",
  },
];
