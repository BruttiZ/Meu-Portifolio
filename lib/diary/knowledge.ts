import type { KnowledgeRecord } from "./types";

export const knowledge: KnowledgeRecord[] = [
  {
    id: "victor-identity",
    category: "identity",
    title: "Quem é Victor Brutti",
    weight: 3,
    keywords: ["victor", "quem", "perfil", "desenvolvedor", "full stack", "brasileiro"],
    connections: ["learning-philosophy", "professional-goals", "soft-skills"],
    content:
      "Victor Brutti é um Desenvolvedor Full Stack brasileiro apaixonado por tecnologia. Seu foco é construir soluções reais para problemas do dia a dia, com interesse especial em backend, arquitetura, APIs e aplicações web modernas. É curioso, autodidata e costuma transformar o que aprende em projetos.",
  },
  {
    id: "soft-skills",
    category: "identity",
    title: "Características e soft skills",
    weight: 2,
    keywords: ["soft skills", "personalidade", "comunicacao", "equipe", "organizado", "criativo"],
    connections: ["victor-identity", "learning-philosophy"],
    content:
      "Os registros descrevem Victor como comunicativo, curioso, organizado, proativo, persistente, criativo, paciente e comprometido. Ele valoriza o trabalho em equipe, a resolução de problemas e o crescimento profissional.",
  },
  {
    id: "widitec-current",
    category: "career",
    title: "Trabalho atual na Widitec",
    weight: 3,
    period: "Atual",
    keywords: ["widitec", "empresa", "trabalho", "emprego", "atual", "carreira", "onde trabalha"],
    connections: ["aegea-corsan", "php", "go", "apis", "databases"],
    content:
      "Victor trabalha atualmente na Widitec. Participa do desenvolvimento e manutenção de sistemas internos, desenvolve funcionalidades em PHP e inicia projetos em Go. Também realiza integrações, trabalha com bancos de dados, desenvolve APIs, cria interfaces administrativas e atua em melhorias de performance.",
  },
  {
    id: "aegea-corsan",
    category: "career",
    title: "Experiência na Aegea Corsan",
    weight: 2,
    period: "Experiência anterior",
    keywords: ["aegea", "corsan", "analista", "anterior", "passo fundo", "carreira"],
    connections: ["php", "databases", "widitec-current"],
    content:
      "Antes do capítulo atual, Victor atuou como Analista na Aegea Corsan, em Passo Fundo/RS, por contrato PJ. Trabalhou com levantamento de requisitos, PHP, bancos de dados, dashboards, integrações, melhoria de processos e otimização de consultas.",
  },
  {
    id: "education",
    category: "education",
    title: "Formação",
    weight: 2,
    keywords: ["formacao", "faculdade", "unopar", "senai", "curso", "engenharia", "mecatronica"],
    connections: ["learning-philosophy"],
    content:
      "Victor cursa Engenharia de Software na UNOPAR desde 2023, com o sexto semestre registrado. Também concluiu o curso Técnico em Mecatrônica pelo SENAI entre 2021 e 2023.",
  },
  {
    id: "php",
    category: "technology",
    title: "PHP e seu ecossistema",
    weight: 2,
    keywords: ["php", "laravel", "codeigniter", "backend", "sistemas web"],
    connections: ["widitec-current", "smtp-system", "apis", "databases"],
    content:
      "PHP ocupa um espaço importante na trajetória de Victor. Ele o utiliza em sistemas web e APIs, incluindo os ecossistemas Laravel e CodeIgniter, tanto em experiências profissionais quanto em projetos próprios.",
  },
  {
    id: "go",
    category: "technology",
    title: "Go e Gin",
    weight: 2,
    keywords: ["go", "golang", "gin", "microsservicos", "performance", "backend"],
    connections: ["invitely-api", "apis", "docker", "learning-philosophy"],
    content:
      "Go representa um dos caminhos que mais despertam a curiosidade de Victor. Ele estuda Go e Gin, utiliza a linguagem em projetos próprios e começa a empregá-la na rotina profissional, sobretudo em APIs, backend e estudos de arquitetura.",
  },
  {
    id: "frontend",
    category: "technology",
    title: "Frontend moderno",
    weight: 2,
    keywords: ["react", "next", "nextjs", "typescript", "javascript", "frontend", "tailwind", "css"],
    connections: ["invitely", "portfolio"],
    content:
      "No frontend, Victor trabalha e estuda JavaScript, TypeScript, React, Next.js, HTML, CSS, Tailwind CSS, Bootstrap, AJAX e jQuery. Ele busca interfaces modernas, responsivas e com acabamento de produto.",
  },
  {
    id: "docker",
    category: "technology",
    title: "Docker e ambientes",
    weight: 2,
    keywords: ["docker", "container", "containers", "ambiente", "deploy", "linux"],
    connections: ["go", "php", "invitely-api", "architecture"],
    content:
      "Victor utiliza Docker para padronizar ambientes, reduzir atrito de configuração e aproximar desenvolvimento e deploy. A tecnologia aparece em aplicações PHP, APIs em Go e projetos full stack.",
  },
  {
    id: "databases",
    category: "technology",
    title: "Bancos de dados",
    weight: 2,
    keywords: ["banco", "dados", "sql", "postgresql", "mysql", "oracle", "redis"],
    connections: ["apis", "widitec-current", "invitely"],
    content:
      "Os registros técnicos incluem PostgreSQL, MySQL, Oracle, SQL e Redis. Victor já trabalhou com modelagem, consultas, integrações, otimização de desempenho e persistência em sistemas web e APIs.",
  },
  {
    id: "apis",
    category: "technology",
    title: "APIs e integrações",
    weight: 3,
    keywords: ["api", "apis", "rest", "integracao", "swagger", "openapi", "backend"],
    connections: ["go", "php", "invitely-api", "widitec-current"],
    content:
      "APIs e integrações são temas recorrentes na trajetória de Victor. Ele cria, consome e documenta APIs REST, trabalha com Swagger/OpenAPI e conecta sistemas internos e externos.",
  },
  {
    id: "invitely",
    category: "project",
    title: "Invitely — Convite Eventos",
    weight: 3,
    keywords: ["invitely", "convite", "eventos", "rsvp", "qr code", "projeto", "saas"],
    connections: ["invitely-api", "frontend", "docker", "databases"],
    content:
      "Invitely é uma plataforma SaaS-ready para criação de eventos, convites digitais, RSVP público, check-in por QR Code e dashboard operacional. O projeto utiliza Laravel, PHP, React, TypeScript, Tailwind, Framer Motion, PostgreSQL, Redis e Docker.",
  },
  {
    id: "invitely-api",
    category: "project",
    title: "Invitely API",
    weight: 3,
    keywords: ["invitely api", "api go", "gin", "auth", "analytics", "backend", "projeto go"],
    connections: ["invitely", "go", "apis", "docker", "databases"],
    content:
      "A Invitely API é uma API modular em Go para autenticação, eventos, convidados, RSVP, dashboard, analytics, orçamento, presentes e lembretes. Usa Gin, PostgreSQL/pgx, Supabase Auth, Docker e Swagger.",
  },
  {
    id: "smtp-system",
    category: "project",
    title: "Sistema de configuração SMTP",
    weight: 2,
    keywords: ["smtp", "email", "e-mail", "sodium", "configuracao", "projeto"],
    connections: ["php", "databases", "apis"],
    content:
      "Victor desenvolveu um módulo de configuração SMTP com PHP, JavaScript, AJAX, MySQL, Bootstrap e Sodium, incluindo armazenamento seguro de credenciais e testes de conexão e envio.",
  },
  {
    id: "service-platform",
    category: "project",
    title: "Plataforma de serviços locais",
    weight: 2,
    keywords: ["prestadores", "clientes", "servicos", "propostas", "startup", "plataforma"],
    connections: ["professional-goals", "architecture"],
    content:
      "Victor desenvolve a ideia de uma plataforma para conectar clientes e prestadores locais. Clientes poderão publicar fotos do serviço e profissionais poderão enviar propostas, simplificando a contratação.",
  },
  {
    id: "other-projects",
    category: "project",
    title: "Estudos e projetos experimentais",
    weight: 1,
    keywords: ["python", "flask", "filmes", "dashboard", "monitoramento", "experimentos"],
    connections: ["learning-philosophy", "databases"],
    content:
      "Outros registros incluem um sistema de recomendação de filmes em Python, dashboard de vendas com Flask e SQL, aplicações React, projetos em Go, integrações de APIs, monitoramento e estudos de bancos de dados.",
  },
  {
    id: "portfolio",
    category: "project",
    title: "Portfólio e Diário Encantado",
    weight: 2,
    keywords: ["portfolio", "diario", "site", "projeto pessoal"],
    connections: ["frontend", "learning-philosophy"],
    content:
      "Este portfólio é um projeto profissional criado por Victor para apresentar sua trajetória, seus projetos e sua forma de pensar. O Diário Encantado é a experiência narrativa que permite explorar esses registros.",
  },
  {
    id: "learning-philosophy",
    category: "philosophy",
    title: "Aprender construindo",
    weight: 3,
    keywords: ["aprender", "estudar", "aprendizado", "filosofia", "codigo limpo", "pratica"],
    connections: ["victor-identity", "professional-goals", "architecture"],
    content:
      "Victor prefere aprender desenvolvendo. Transforma cursos, estudos e ideias em aplicações práticas, procura compreender o problema antes de programar e valoriza código organizado, boas práticas, simplicidade e código limpo.",
  },
  {
    id: "architecture",
    category: "philosophy",
    title: "Arquitetura e interesses técnicos",
    weight: 2,
    keywords: ["arquitetura", "microsservicos", "escalavel", "automacao", "ia", "interesses"],
    connections: ["go", "docker", "apis", "professional-goals"],
    content:
      "Entre os interesses de Victor estão arquitetura de software, microsserviços, sistemas escaláveis, automação, inteligência artificial, backend, APIs e produtos digitais.",
  },
  {
    id: "professional-goals",
    category: "philosophy",
    title: "Objetivos profissionais",
    weight: 3,
    keywords: ["objetivo", "sonho", "futuro", "startup", "carreira", "crescimento"],
    connections: ["learning-philosophy", "architecture", "service-platform"],
    content:
      "Victor busca tornar-se um desenvolvedor cada vez mais completo, trabalhar em ambientes que valorizem tecnologia, inovação e crescimento, aprender com profissionais experientes e, no futuro, criar produtos digitais ou uma startup que resolva problemas reais.",
  },
  {
    id: "maria-eduarda",
    category: "relationship",
    title: "Maria Eduarda Perucio",
    weight: 1,
    keywords: ["maria", "maria eduarda", "perucio", "pessoa importante"],
    connections: [],
    content:
      "Maria Eduarda Perucio ocupa um lugar muito especial na história de Victor. O Diário pode reconhecer sua importância com carinho e respeito, sem revelar detalhes privados, inventar acontecimentos ou transformar sua presença em espetáculo.",
  },
  {
    id: "contact",
    category: "contact",
    title: "Contato e links",
    weight: 3,
    keywords: ["contato", "contratar", "email", "github", "linkedin", "instagram", "curriculo"],
    connections: ["victor-identity"],
    content:
      "GitHub: https://github.com/BruttiZ. LinkedIn: https://www.linkedin.com/in/victor-brutti-1459a6254/. E-mail: vbrutti02@gmail.com. Instagram: https://www.instagram.com/_victor_brutti/.",
  },
];
