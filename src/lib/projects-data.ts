import type { Localized } from './cv';

export type Category = 'producao' | 'sistema' | 'site' | 'api';

export interface Project {
  slug: string;
  /** filtro: em produção, sistema, site ou API */
  category: Category;
  /** destaque grande no topo da seção */
  featured?: boolean;
  /** uma linha para o card da grade */
  summary: Localized;
  /** resultado real (só preencher com informação verdadeira) */
  result?: Localized;
  title: Localized;
  shortDescription: Localized;
  description: Localized;
  tags: string[];
  imageUrl: string;
  /** capa do card: /capas/<nome>-<idioma>.webp */
  cover: string;
  /** print real do sistema, mostrado na página do projeto */
  screenshot?: string;
  /** mockups de apresentação mostrados na página do projeto */
  gallery?: string[];
  problem: Localized;
  solution: Localized;
  learnings: Localized;
  /** sistema real em produção (sem link nem código) */
  production?: boolean;
  liveUrl?: string;
  codeUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "alerta-plantao",
    category: "producao",
    featured: true,
    summary: {
      pt: "Evento crítico no Zabbix vira ligação para a equipe até alguém reconhecer.",
      en: "Critical Zabbix events become calls to the team until someone acknowledges.",
      es: "Un evento crítico en Zabbix se vuelve llamada al equipo hasta que alguien lo reconoce.",
    },
    title: {
      pt: "Alerta de plantão — Zabbix + Asterisk",
      en: "On-call alert — Zabbix + Asterisk",
      es: "Alerta de guardia — Zabbix + Asterisk",
    },
    shortDescription: {
      pt: "ZABBIX, ASTERISK, PABX",
      en: "ZABBIX, ASTERISK, PBX",
      es: "ZABBIX, ASTERISK, PBX",
    },
    description: {
      pt: "Quando um evento crítico escolhido acontece no Zabbix, o PABX Asterisk liga para o telefone da equipe e uma voz diz qual é o problema. As ligações continuam até alguém reconhecer o alerta.",
      en: "When a selected critical event happens in Zabbix, the Asterisk PBX calls the team’s phones and a voice says what the problem is. Calls keep coming until someone acknowledges the alert.",
      es: "Cuando ocurre un evento crítico seleccionado en Zabbix, la central Asterisk llama al teléfono del equipo y una voz dice cuál es el problema. Las llamadas siguen hasta que alguien reconoce la alerta.",
    },
    tags: ["zabbix", "asterisk", "pabx"],
    imageUrl: "/capas/alerta-plantao-pt.webp",
    cover: "/capas/alerta-plantao",
    production: true,
    problem: {
      pt: "Num provedor de internet, um evento crítico de madrugada pode passar despercebido: notificação por mensagem ou e-mail nem sempre acorda quem está de plantão.",
      en: "At an internet provider, a critical event in the middle of the night can go unnoticed: a message or email doesn’t always wake whoever is on call.",
      es: "En un proveedor de internet, un evento crítico de madrugada puede pasar desapercibido: un mensaje o correo no siempre despierta a quien está de guardia.",
    },
    solution: {
      pt: "Integrei o Zabbix ao PABX Asterisk que a empresa já tinha. Eventos críticos escolhidos disparam ligações para a equipe; a ligação fala qual é o evento e se repete até alguém marcar o alerta como reconhecido.",
      en: "I integrated Zabbix with the company’s existing Asterisk PBX. Selected critical events trigger calls to the team; the call says what the event is and repeats until someone marks the alert as acknowledged.",
      es: "Integré Zabbix con la central Asterisk que la empresa ya tenía. Los eventos críticos seleccionados disparan llamadas al equipo; la llamada dice cuál es el evento y se repite hasta que alguien marca la alerta como reconocida.",
    },
    learnings: {
      pt: "Escolher bem quais eventos merecem uma ligação, para o alerta continuar sendo levado a sério, e aproveitar a infraestrutura que já existia em vez de contratar outro serviço.",
      en: "Choosing carefully which events deserve a call, so alerts keep being taken seriously, and reusing existing infrastructure instead of paying for another service.",
      es: "Elegir bien qué eventos merecen una llamada, para que la alerta se siga tomando en serio, y aprovechar la infraestructura existente en vez de contratar otro servicio.",
    },
  },
  {
    slug: "assina-contratos",
    category: "producao",
    featured: true,
    summary: {
      pt: "Contratos assinados pelo celular, com o status de cada um num painel.",
      en: "Contracts signed on the phone, with each one’s status on a dashboard.",
      es: "Contratos firmados desde el celular, con el estado de cada uno en un panel.",
    },
    title: {
      pt: "Assina — Assinatura Digital de Contratos",
      en: "Assina — Digital Contract Signing",
      es: "Assina — Firma Digital de Contratos",
    },
    shortDescription: {
      pt: "ASSINATURA DIGITAL, PAINEL WEB",
      en: "DIGITAL SIGNATURE, WEB DASHBOARD",
      es: "FIRMA DIGITAL, PANEL WEB",
    },
    description: {
      pt: "Painel de assinatura digital de contratos: o contrato é enviado ao cliente, que assina pelo celular, e a equipe acompanha no painel o que está pendente e o que já foi assinado.",
      en: "Digital contract signing dashboard: the contract is sent to the customer, who signs on their phone, and the team tracks what is pending and what is signed.",
      es: "Panel de firma digital de contratos: el contrato se envía al cliente, que firma desde el celular, y el equipo sigue en el panel lo pendiente y lo firmado.",
    },
    tags: ["assinatura digital", "painel web"],
    imageUrl: "/capas/assina-contratos-pt.webp",
    cover: "/capas/assina-contratos",
    production: true,
    problem: {
      pt: "Contrato em papel atrasa a ativação do cliente e é difícil saber quais ainda faltam assinar.",
      en: "Paper contracts delay customer activation, and it’s hard to know which ones are still unsigned.",
      es: "El contrato en papel retrasa la activación del cliente y es difícil saber cuáles faltan firmar.",
    },
    solution: {
      pt: "Um painel web em que a equipe envia o contrato, o cliente assina pelo celular e cada contrato aparece como pendente ou assinado.",
      en: "A web dashboard where the team sends the contract, the customer signs on their phone and each contract shows as pending or signed.",
      es: "Un panel web en el que el equipo envía el contrato, el cliente firma desde el celular y cada contrato aparece como pendiente o firmado.",
    },
    learnings: {
      pt: "Pensar no fluxo de quem assina pelo celular, sem instalar nada, e dar à equipe uma visão clara do status de cada contrato.",
      en: "Designing for people signing on their phone without installing anything, and giving the team a clear view of each contract’s status.",
      es: "Pensar en quien firma desde el celular sin instalar nada, y dar al equipo una visión clara del estado de cada contrato.",
    },
  },
  {
    slug: "painel-chamados",
    category: "producao",
    summary: {
      pt: "Fila de chamados do GLPI na TV, com aviso por voz a cada chamado novo.",
      en: "GLPI ticket queue on the TV, with a voice alert for every new ticket.",
      es: "Cola de tickets de GLPI en la TV, con aviso por voz en cada ticket nuevo.",
    },
    title: {
      pt: "Painel de chamados na TV, com aviso por voz",
      en: "Ticket board on TV, with voice alert",
      es: "Panel de tickets en TV, con aviso por voz",
    },
    shortDescription: {
      pt: "GLPI, API REST, PHP",
      en: "GLPI, REST API, PHP",
      es: "GLPI, API REST, PHP",
    },
    description: {
      pt: "Painel que mostra numa TV os chamados abertos no GLPI e anuncia por voz “Atenção! Novo chamado” quando entra um novo. A equipe vê a fila sem precisar abrir o sistema.",
      en: "A board that shows open GLPI tickets on a TV and announces “Attention! New ticket” by voice when a new one comes in. The team sees the queue without opening the system.",
      es: "Panel que muestra en una TV los tickets abiertos en GLPI y anuncia por voz “¡Atención! Nuevo ticket” cuando entra uno nuevo. El equipo ve la cola sin abrir el sistema.",
    },
    tags: ["glpi", "api rest", "php", "javascript"],
    imageUrl: "/capas/painel-chamados-pt.webp",
    cover: "/capas/painel-chamados",
    production: true,
    problem: {
      pt: "A tela do GLPI aberta na TV dependia de uma sessão logada, que expirava, e chamado novo podia ficar parado sem ninguém perceber.",
      en: "Showing the GLPI screen on the TV depended on a logged-in session that kept expiring, and new tickets could sit unnoticed.",
      es: "Mostrar la pantalla de GLPI en la TV dependía de una sesión iniciada que expiraba, y un ticket nuevo podía quedar sin que nadie lo notara.",
    },
    solution: {
      pt: "Troquei a sessão do navegador por um proxy em PHP que consulta a API REST do GLPI, e uma página própria para a TV que lista os chamados abertos e fala em voz alta quando chega um novo.",
      en: "I replaced the browser session with a PHP proxy that queries the GLPI REST API, plus a dedicated TV page that lists open tickets and speaks out loud when a new one arrives.",
      es: "Reemplacé la sesión del navegador por un proxy en PHP que consulta la API REST de GLPI, y una página propia para la TV que lista los tickets abiertos y habla en voz alta cuando llega uno nuevo.",
    },
    learnings: {
      pt: "Para tela que fica ligada o dia inteiro, buscar os dados pela API é bem mais estável do que depender de uma sessão de usuário.",
      en: "For a screen that stays on all day, fetching data through the API is far more reliable than depending on a user session.",
      es: "Para una pantalla que está encendida todo el día, consultar los datos por la API es mucho más estable que depender de una sesión de usuario.",
    },
  },
  {
    slug: "plugins-glpi",
    category: "producao",
    summary: {
      pt: "Portal simples para abrir chamado e fluxo de férias com revogação de acessos.",
      en: "A simple portal to open tickets and a vacation flow that revokes access.",
      es: "Portal simple para abrir tickets y flujo de vacaciones con revocación de accesos.",
    },
    title: {
      pt: "Plugins do GLPI — Meu Painel e Férias",
      en: "GLPI plugins — My Panel and Vacation",
      es: "Plugins de GLPI — Mi Panel y Vacaciones",
    },
    shortDescription: {
      pt: "GLPI, PHP",
      en: "GLPI, PHP",
      es: "GLPI, PHP",
    },
    description: {
      pt: "Dois plugins para o GLPI: um portal mais simples para abrir e acompanhar chamados, e um fluxo de férias em que o RH abre o chamado e a TI suspende e depois reativa os acessos de cada pessoa.",
      en: "Two GLPI plugins: a simpler portal to open and follow tickets, and a vacation flow where HR opens a ticket and IT suspends and later restores each person’s access.",
      es: "Dos plugins para GLPI: un portal más simple para abrir y seguir tickets, y un flujo de vacaciones en el que RR. HH. abre el ticket y TI suspende y luego reactiva los accesos de cada persona.",
    },
    tags: ["glpi", "php"],
    imageUrl: "/capas/plugins-glpi-pt.webp",
    cover: "/capas/plugins-glpi",
    production: true,
    problem: {
      pt: "Abrir chamado na tela padrão do GLPI não era simples para quem não é da TI. E nas férias de um funcionário, os acessos a salas e sistemas precisavam ser suspensos e reativados no retorno, cada pessoa com acessos diferentes.",
      en: "Opening a ticket on the standard GLPI screen wasn’t easy for non-IT staff. And when an employee went on vacation, their access to rooms and systems had to be suspended and restored on return, with different access for each person.",
      es: "Abrir un ticket en la pantalla estándar de GLPI no era sencillo para quien no es de TI. Y en las vacaciones de un empleado, los accesos a salas y sistemas tenían que suspenderse y reactivarse al regreso, con accesos distintos para cada persona.",
    },
    solution: {
      pt: "Meu Painel: um portal dentro do GLPI com dois caminhos claros, “Meu Painel” e “Abrir Chamado”. Férias: o RH abre o chamado de suspensão e a TI segue um checklist com os acessos daquela pessoa, revogando na saída e reativando no retorno.",
      en: "My Panel: a portal inside GLPI with two clear paths, “My Panel” and “Open a Ticket”. Vacation: HR opens the suspension ticket and IT follows a checklist of that person’s access, revoking it on departure and restoring it on return.",
      es: "Mi Panel: un portal dentro de GLPI con dos caminos claros, “Mi Panel” y “Abrir Ticket”. Vacaciones: RR. HH. abre el ticket de suspensión y TI sigue un checklist con los accesos de esa persona, revocándolos a la salida y reactivándolos al regreso.",
    },
    learnings: {
      pt: "Estender a ferramenta que a empresa já usa, como plugin, em vez de criar um sistema separado, e começar com checklist antes de automatizar.",
      en: "Extending the tool the company already uses, as a plugin, instead of building a separate system, and starting with a checklist before automating.",
      es: "Extender la herramienta que la empresa ya usa, como plugin, en vez de crear un sistema aparte, y empezar con un checklist antes de automatizar.",
    },
  },
  {
    slug: "clinica-ipe",
    category: "site",
    summary: {
      pt: "Agendamento de consulta em 3 passos, pensado para o celular.",
      en: "3-step appointment booking, designed for phones.",
      es: "Agenda de citas en 3 pasos, pensada para el celular.",
    },
    title: {
      pt: "Clínica Ipê — Agendamento Online",
      en: "Clínica Ipê — Online Booking",
      es: "Clínica Ipê — Agenda en Línea",
    },
    shortDescription: {
      pt: "NEXT.JS, REACT, TYPESCRIPT",
      en: "NEXT.JS, REACT, TYPESCRIPT",
      es: "NEXT.JS, REACT, TYPESCRIPT",
    },
    description: {
      pt: "Site de clínica com agendamento em 3 passos, busca por sintoma, verificador de convênio e equipe filtrável. Pensado para o paciente marcar a consulta em menos de um minuto, principalmente pelo celular.",
      en: "Clinic website with 3-step booking, symptom search, insurance checker and a filterable team. Built so patients can book in under a minute, especially on their phone.",
      es: "Sitio de clínica con agenda en 3 pasos, búsqueda por síntoma, verificador de seguro médico y equipo filtrable. Pensado para que el paciente reserve en menos de un minuto, sobre todo desde el celular.",
    },
    tags: ["next.js", "react", "typescript", "css"],
    imageUrl: "/capas/clinica-ipe-pt.webp",
    cover: "/capas/clinica-ipe",
    gallery: [
      "/projetos/clinica-ipe/desk.webp",
      "/projetos/clinica-ipe/phones.webp",
      "/projetos/clinica-ipe/esp.webp",
      "/projetos/clinica-ipe/dark.webp",
    ],
    problem: {
      pt: "Site de clínica costuma ser só um cartão de visita: o paciente não sabe se o plano é aceito, quanto custa nem se tem horário, e acaba ligando ou desistindo.",
      en: "Clinic websites are usually just a business card: patients can't tell if their insurance is accepted, how much it costs or whether there are open slots, so they call or give up.",
      es: "El sitio de una clínica suele ser solo una tarjeta de presentación: el paciente no sabe si aceptan su seguro, cuánto cuesta ni si hay horarios, y termina llamando o desistiendo.",
    },
    solution: {
      pt: "Agendamento em 3 passos (especialidade, dia e horário, dados) com vagas por dia, celular validado e protocolo no final; busca por sintoma que leva à especialidade certa; verificador de convênio; equipe filtrável por dia; status \"aberto agora\" no fuso de Brasília; tema claro e escuro; página própria para cada profissional; botão de adicionar ao Google Agenda e mapa do quarteirão em SVG.",
      en: "3-step booking (specialty, day and time, details) with slots per day, phone validation and a confirmation code; symptom search that points to the right specialty; insurance checker; team filter by weekday; \"open now\" status in Brasília time; light and dark themes; a page for each professional; add-to-Google-Calendar button and an SVG block map.",
      es: "Agenda en 3 pasos (especialidad, día y horario, datos) con cupos por día, celular validado y protocolo al final; búsqueda por síntoma que lleva a la especialidad correcta; verificador de seguro; equipo filtrable por día; estado \"abierto ahora\" en horario de Brasilia; tema claro y oscuro; página para cada profesional; botón para agregar a Google Calendar y mapa de la manzana en SVG.",
    },
    learnings: {
      pt: "Pensar primeiro no celular e no que o paciente precisa decidir, e simular uma agenda realista sem backend, de forma determinística, para o site parecer vivo.",
      en: "Designing mobile-first around the decisions patients need to make, and simulating a realistic schedule deterministically with no backend so the site feels alive.",
      es: "Diseñar primero para el celular según lo que el paciente necesita decidir, y simular una agenda realista sin backend, de forma determinística, para que el sitio parezca vivo.",
    },
    liveUrl: "https://clinica-ipe-plum.vercel.app/",
  },
  {
    slug: "esmalte-odontologia",
    category: "site",
    summary: {
      pt: "Odontograma interativo e simulador de clareamento para pacientes.",
      en: "Interactive tooth chart and whitening simulator for patients.",
      es: "Odontograma interactivo y simulador de blanqueamiento para pacientes.",
    },
    title: {
      pt: "Esmalte — Clínica Odontológica",
      en: "Esmalte — Dental Clinic",
      es: "Esmalte — Clínica Odontológica",
    },
    shortDescription: {
      pt: "NEXT.JS, REACT, TYPESCRIPT",
      en: "NEXT.JS, REACT, TYPESCRIPT",
      es: "NEXT.JS, REACT, TYPESCRIPT",
    },
    description: {
      pt: "Site de clínica odontológica com odontograma interativo (\"onde dói?\"), simulador de clareamento pela escala Vita, tratamentos com valor e duração e pedido de avaliação.",
      en: "Dental clinic website with an interactive tooth chart (\"where does it hurt?\"), a whitening simulator based on the Vita shade guide, treatments with price and duration, and an appointment request form.",
      es: "Sitio de clínica odontológica con odontograma interactivo (\"¿dónde duele?\"), simulador de blanqueamiento con la escala Vita, tratamientos con precio y duración y solicitud de evaluación.",
    },
    tags: ["next.js", "react", "typescript", "css"],
    imageUrl: "/capas/esmalte-odontologia-pt.webp",
    cover: "/capas/esmalte-odontologia",
    gallery: [
      "/projetos/esmalte/desk.webp",
      "/projetos/esmalte/phones.webp",
      "/projetos/esmalte/clar.webp",
      "/projetos/esmalte/dark.webp",
    ],
    problem: {
      pt: "Quem procura dentista geralmente sente algo e não sabe o que é, quanto vai custar nem quanto tempo leva. Site de clínica raramente ajuda nisso antes da primeira consulta.",
      en: "People looking for a dentist usually feel something without knowing what it is, how much it will cost or how long it takes. Clinic websites rarely help with that before the first visit.",
      es: "Quien busca un dentista suele sentir algo sin saber qué es, cuánto costará ni cuánto tarda. El sitio de una clínica casi nunca ayuda con eso antes de la primera consulta.",
    },
    solution: {
      pt: "Odontograma com a numeração FDI (11 a 48): o paciente toca no dente, escolhe o que sente e vê o problema provável, o tratamento, a especialidade e a urgência — no celular vira uma ficha por arcada. Simulador de clareamento com a escala Vita (B1 a C4), três métodos e comparador antes e depois. Tratamentos em abas com duração, sessões e valor; equipe com selo \"atende hoje\"; pedido de avaliação com validação e máscara de celular; tema claro e escuro.",
      en: "Tooth chart with FDI numbering (11 to 48): patients tap a tooth, pick what they feel and see the likely problem, treatment, specialty and urgency — on mobile it becomes a per-arch list. Whitening simulator with the Vita shade guide (B1 to C4), three methods and a before/after slider. Tabbed treatments with duration, sessions and price; team with an \"available today\" badge; appointment request with validation and phone mask; light and dark themes.",
      es: "Odontograma con numeración FDI (11 a 48): el paciente toca el diente, elige lo que siente y ve el problema probable, el tratamiento, la especialidad y la urgencia; en el celular se vuelve una ficha por arcada. Simulador de blanqueamiento con la escala Vita (B1 a C4), tres métodos y comparador antes y después. Tratamientos en pestañas con duración, sesiones y precio; equipo con sello \"atiende hoy\"; solicitud de evaluación con validación y máscara de celular; tema claro y oscuro.",
    },
    learnings: {
      pt: "Transformar conhecimento técnico (numeração dos dentes, escala de cor) em algo que o paciente entende sozinho, e adaptar uma interface complexa como o odontograma para a tela do celular.",
      en: "Turning technical knowledge (tooth numbering, shade guides) into something patients understand on their own, and adapting a complex interface like the tooth chart to a phone screen.",
      es: "Convertir conocimiento técnico (numeración de dientes, escala de color) en algo que el paciente entiende solo, y adaptar una interfaz compleja como el odontograma a la pantalla del celular.",
    },
    liveUrl: "https://esmalte-odontologia.vercel.app/",
  },
  {
    slug: "fang-security",
    category: "sistema",
    summary: {
      pt: "Scanner de segurança web com reconhecimento, varredura e relatório CVSS.",
      en: "Web security scanner with recon, scanning and CVSS reports.",
      es: "Escáner de seguridad web con reconocimiento, escaneo e informe CVSS.",
    },
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
    cover: "/capas/fang-security",
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
    category: "sistema",
    summary: {
      pt: "Receitas, despesas e metas num dashboard visual.",
      en: "Income, expenses and goals on a visual dashboard.",
      es: "Ingresos, gastos y metas en un dashboard visual.",
    },
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
    cover: "/capas/plataforma-nexo",
    screenshot: "/nexo.png",
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
    category: "api",
    summary: {
      pt: "API REST em Java para usuários, saldo e transferências.",
      en: "Java REST API for users, balances and transfers.",
      es: "API REST en Java para usuarios, saldo y transferencias.",
    },
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
    cover: "/capas/api-carteira-digital",
    screenshot: "/api-carteira-digital-java.png",
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
