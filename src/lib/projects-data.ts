// Definimos a estrutura de um objeto de projeto com TypeScript
export interface Project {
  slug: string; // ID único para a URL, ex: "plataforma-ecommerce"
  title: string;
  shortDescription: string;
  tags: string[];
  imageUrl: string;
  problem: string;
  challenges: string;
  liveUrl?: string; // O '?' torna o campo opcional
  codeUrl?: string;
}

// Criamos uma lista com todos os seus projetos
export const projects: Project[] = [
  {
    slug: "plataforma-ecommerce",
    title: "Plataforma E-commerce",
    shortDescription: "REACT, NODE.JS, MONGODB",
    tags: ["react", "nodejs", "mongodb"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    problem: "O desafio era criar uma plataforma de vendas online robusta, escalável e com uma experiência de usuário intuitiva, desde a vitrine de produtos até o checkout seguro.",
    challenges: "O maior desafio foi integrar o sistema de pagamentos de forma segura, garantindo a conformidade com as normas de segurança. Aprendi muito sobre arquitetura de microserviços, segurança de APIs e gerenciamento de estado complexo no frontend.",
    liveUrl: "#", // [SUA VEZ] Substitua pelo link real
    codeUrl: "#", // [SUA VEZ] Substitua pelo link real
  },
  {
    slug: "app-mobile-produtividade",
    title: "App Mobile de Produtividade",
    shortDescription: "REACT NATIVE, FIREBASE",
    tags: ["react", "firebase"],
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2070",
    problem: "A necessidade era desenvolver um aplicativo de produtividade multiplataforma com sincronização de tarefas em tempo real entre diferentes dispositivos logados na mesma conta.",
    challenges: "Otimizar o uso de dados em tempo real com Firebase Realtime Database foi o principal desafio técnico. Foi um grande aprendizado sobre bancos de dados NoSQL, listeners de eventos e gerenciamento de estado global em React Native para garantir uma UI consistente.",
    liveUrl: "#",
    codeUrl: "#",
  },
  // Adicione mais projetos aqui no futuro
];