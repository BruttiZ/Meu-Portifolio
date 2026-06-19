"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Coffee,
  Download,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Rocket,
  Sparkles,
  Sun,
  X,
  Zap,
} from "lucide-react";
import {
  SiBootstrap,
  SiDocker,
  SiGit,
  SiGo,
  SiJavascript,
  SiJquery,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiReact,
  SiCodeigniter,
  SiSwagger,
  SiTypescript,
} from "react-icons/si";

const githubUser = "BruttiZ";

const links = {
  github: "https://github.com/BruttiZ",
  linkedin: "https://www.linkedin.com/in/victor-brutti-1459a6254/",
  instagram: "https://www.instagram.com/_victor_brutti/",
  email: "mailto:vbrutti02@gmail.com",
};

const navItems = [
  ["Sobre", "#sobre"],
  ["Skills", "#skills"],
  ["Experiência", "#experiencia"],
  ["Formação", "#formacao"],
  ["Projetos", "#projetos"],
  ["Contato", "#contato"],
];

const skills = [
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "CodeIgniter", icon: SiCodeigniter, color: "#EF4223" },
  { name: "Go", icon: SiGo, color: "#00ADD8" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "jQuery / AJAX", icon: SiJquery, color: "#0769AD" },
  { name: "HTML / CSS", icon: Code2, color: "#22d3ee" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Oracle / SQL", icon: Code2, color: "#F80000" },
  { name: "Swagger / OpenAPI", icon: SiSwagger, color: "#85EA2D" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git / GitHub", icon: SiGit, color: "#F05032" },
  { name: "VSCode", icon: Code2, color: "#007ACC" },
];

const projects = [
  {
    name: "Invitely - Convite Eventos",
    stack:
      "Laravel 12, PHP 8.4, React 19, TypeScript, Tailwind, Framer Motion, PostgreSQL, Redis, Docker",
    summary:
      "Plataforma SaaS-ready para criação de eventos, convites digitais, RSVP público, check-in por QR Code, dashboard operacional e proxy controlado para uma API Go complementar.",
    metric: "Produto full stack",
    repo: "https://github.com/BruttiZ/ConviteEventos",
    demo: "#contato",
    visual: "Eventos, RSVP, QR Code, dashboard e convites digitais",
  },
  {
    name: "Invitely API",
    stack: "Go 1.22, Gin, PostgreSQL/pgx, Supabase Auth, Docker, Swagger",
    summary:
      "API modular para autenticação, eventos, convidados, RSVP, dashboard, analytics, orçamento, presentes e lembretes de e-mail, com rotas protegidas por Bearer token.",
    metric: "Backend Go",
    repo: "https://github.com/BruttiZ/invitely-api",
    demo: "#contato",
    visual: "REST API, auth, tenants, analytics e operação de eventos",
  },
];

const timeline = [
  {
    title: "Desenvolvedor Full Stack",
    company: "Qualyagro - Panambi/RS",
    period: "Junho/2025 - Atual",
    items: [
      "Desenvolvimento e manutenção de sistemas web corporativos com PHP, Laravel, CodeIgniter e JavaScript.",
      "Criação, consumo e documentação de APIs REST com Swagger/OpenAPI.",
      "Integrações entre sistemas internos e externos, interfaces responsivas com Bootstrap, AJAX e jQuery.",
      "Uso de Docker, Git, GitHub/Gitea, MySQL e Oracle em ambientes corporativos.",
    ],
  },
  {
    title: "Analista de Desenvolvimento",
    company: "Aegea Corsan - Passo-Fundo/RS",
    period: "Nível Analista | Contrato PJ",
    items: [
      "Análise e desenvolvimento de sistemas com levantamento de requisitos junto aos usuários.",
      "Proposição de soluções para melhoria de processos e entrega de valor ao negócio.",
      "Desenvolvimento, integração, manutenção e evolução de funcionalidades com PHP e bancos de dados.",
      "Implementação de dashboards e otimização de consultas com foco em desempenho e usabilidade.",
    ],
  },
];

const education = [
  {
    title: "Engenharia de Software",
    place: "UNOPAR",
    period: "2023 - Atual",
    status: "6º semestre",
  },
  {
    title: "Técnico em Mecatrônica",
    place: "SENAI",
    period: "2021 - 2023",
    status: "Concluído",
  },
];

const corporateProjects = [
  {
    title: "Sistema de Configuração SMTP Corporativo",
    stack: "PHP, JavaScript, AJAX, MySQL, Bootstrap, Sodium",
    description:
      "Módulo para configuração e gerenciamento de serviços de envio de e-mails, com armazenamento seguro de credenciais SMTP e testes automatizados de conexão e envio.",
  },
  {
    title: "APIs REST e Integrações Corporativas",
    stack: "PHP, Go, Swagger, REST API",
    description:
      "Criação e documentação de endpoints REST, integração entre sistemas corporativos, validação de requisições e padronização técnica com OpenAPI/Swagger.",
  },
  {
    title: "Ambientes Docker para Aplicações Web",
    stack: "Docker, Linux, PHP, MySQL",
    description:
      "Estruturação de containers para padronizar ambientes PHP e reduzir atrito em configuração local, desenvolvimento e deploy.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className="section-pad relative z-10 mx-auto max-w-7xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      variants={fadeUp}
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
          <Sparkles size={14} />
          {eyebrow}
        </p>
        <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const particles = Array.from({ length: 82 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.6,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(34, 211, 238, 0.75)";

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const distance = Math.hypot(
            particle.x - other.x,
            particle.y - other.y,
          );
          if (distance < 128) {
            ctx.strokeStyle = `rgba(167, 139, 250, ${0.18 - distance / 900})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-70"
      aria-hidden
    />
  );
}

function CursorGlow() {
  const [position, setPosition] = useState({ x: -120, y: -120 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden h-24 w-24 rounded-full bg-cyan-300/20 blur-2xl md:block"
      animate={{ x: position.x - 48, y: position.y - 48 }}
      transition={{ type: "spring", damping: 28, stiffness: 180, mass: 0.3 }}
    />
  );
}

function TypingText() {
  const phrases = useMemo(
    () => [
      "Transformando café em código...",
      "Criando APIs, dashboards e produtos reais...",
      "Sempre estudando algo novo...",
    ],
    [],
  );
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && text.length < current.length) {
          setText(current.slice(0, text.length + 1));
          return;
        }
        if (!isDeleting && text.length === current.length) {
          setIsDeleting(true);
          return;
        }
        if (isDeleting && text.length > 0) {
          setText(current.slice(0, text.length - 1));
          return;
        }
        setIsDeleting(false);
        setPhraseIndex((value) => (value + 1) % phrases.length);
      },
      isDeleting ? 38 : 78,
    );

    return () => window.clearTimeout(timeout);
  }, [isDeleting, phraseIndex, phrases, text]);

  return (
    <span className="font-semibold text-cyan-100">
      {text}
      <span className="ml-1 animate-pulse text-cyanGlow">|</span>
    </span>
  );
}

function Header({
  lightMode,
  setLightMode,
}: {
  lightMode: boolean;
  setLightMode: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(navItems[0][1]);

  useEffect(() => {
    const updateActiveSection = () => {
      let currentHref = navItems[0][1];

      for (const [, href] of navItems) {
        const section = document.querySelector(href);
        if (!section) continue;

        const { top } = section.getBoundingClientRect();
        if (top <= 140) {
          currentHref = href;
        }
      }

      setActiveHref(currentHref);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <a
          href="#home"
          className="group flex items-center gap-2 font-black tracking-tight"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-300 text-black shadow-neon transition group-hover:scale-105">
            VB
          </span>
          <span className="hidden text-sm uppercase tracking-[0.22em] text-slate-200 sm:inline">
            Victor Calegari Brutti
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setActiveHref(href)}
              aria-current={activeHref === href ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm transition ${
                activeHref === href
                  ? "bg-cyan-300/20 text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,0.22)]"
                  : "text-slate-300 hover:bg-cyan-300/10 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Alternar tema"
            onClick={() => setLightMode(!lightMode)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
          >
            {lightMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-200 md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          className="mx-4 mb-4 rounded-xl border border-white/10 bg-black/80 p-3 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => {
                setActiveHref(href);
                setOpen(false);
              }}
              aria-current={activeHref === href ? "page" : undefined}
              className={`block rounded-lg px-4 py-3 text-sm transition ${
                activeHref === href
                  ? "bg-cyan-300/20 text-cyan-50 shadow-[0_0_18px_rgba(34,211,238,0.18)]"
                  : "text-slate-200 hover:bg-cyan-300/10"
              }`}
            >
              {label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}

function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1200);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center bg-void"
      exit={{ opacity: 0 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center">
        <motion.div
          className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 shadow-neon"
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
        >
          <Code2 className="text-cyan-100" size={32} />
        </motion.div>
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-100">
          Inicializando portfolio
        </p>
      </div>
    </motion.div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 160]);

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen items-center overflow-hidden px-4 pt-24"
    >
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl md:h-[34rem] md:w-[34rem]"
      />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-100">
            <Zap size={14} />
            Movido a café e curiosidade
          </p>
          <h1 className="neon-text max-w-5xl text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Victor Brutti
          </h1>
          <h2 className="mt-5 text-xl font-semibold text-slate-200 md:text-3xl">
            Full Stack Developer{" "}
            <span className="text-cyanGlow">(PHP | Go | React)</span>
          </h2>
          <p className="mt-5 min-h-8 text-lg text-slate-300 md:text-2xl">
            <TypingText />
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            Backend forte, interfaces modernas e uma obsessão saudável por
            transformar ideias em sistemas reais. Stack principal: PHP/Laravel +
            Go + React + Docker, com vivência em APIs REST, MySQL, Oracle e
            sistemas corporativos.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:scale-105 hover:shadow-neon"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-bold text-cyan-50 transition hover:scale-105 hover:border-cyan-200 hover:shadow-neon"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a
              href={links.instagram}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-fuchsia-300/30 bg-fuchsia-300/10 px-5 py-3 text-sm font-bold text-fuchsia-50 transition hover:scale-105 hover:shadow-violet"
            >
              <Instagram size={18} />
              Instagram
            </a>
            <a
              href="#projetos"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:scale-105 hover:border-cyan-300/40"
            >
              Ver Projetos
              <ArrowDown size={18} />
            </a>
            <a
              href="/curriculo_victorbrutti.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-lime-300/30 bg-lime-300/10 px-5 py-3 text-sm font-bold text-lime-50 transition hover:scale-105 hover:shadow-[0_0_24px_rgba(163,230,53,0.22)]"
            >
              <Download size={18} />
              Baixar CV
            </a>
          </div>
        </motion.div>

        <motion.div
          className="glass relative mx-auto w-full max-w-lg rounded-2xl p-5"
          initial={{ opacity: 0, scale: 0.92, rotateX: 8 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-300" />
            <span className="h-3 w-3 rounded-full bg-lime-300" />
          </div>
          <div className="rounded-xl border border-cyan-300/20 bg-black/40 p-5 font-mono text-sm leading-7 text-slate-200">
            <p>
              <span className="text-cyanGlow">const</span> dev = &#123;
            </p>
            <p className="pl-4">
              name:{" "}
              <span className="text-lime-200">&quot;Victor Brutti&quot;</span>,
            </p>
            <p className="pl-4">
              focus:{" "}
              <span className="text-lime-200">&quot;real systems&quot;</span>,
            </p>
            <p className="pl-4">
              backend: [<span className="text-lime-200">&quot;PHP&quot;</span>,{" "}
              <span className="text-lime-200">&quot;Go&quot;</span>],
            </p>
            <p className="pl-4">
              frontend: [
              <span className="text-lime-200">&quot;React&quot;</span>,{" "}
              <span className="text-lime-200">&quot;TypeScript&quot;</span>],
            </p>
            <p className="pl-4">
              infra: <span className="text-lime-200">&quot;Docker&quot;</span>
            </p>
            <p>&#125;;</p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {["APIs", "SaaS", "Docker"].map((item) => (
              <motion.div
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm font-bold text-slate-100"
                whileHover={{ y: -5, scale: 1.04 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const [lightMode, setLightMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <main
      className={lightMode ? "bg-slate-950 text-white" : "bg-void text-white"}
    >
      <LoadingScreen />
      <Particles />
      <CursorGlow />
      <motion.div
        className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-cyanGlow via-violetGlow to-plasma"
        style={{ scaleX }}
      />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-30">
        <div className="absolute inset-0 animate-gridShift bg-[linear-gradient(rgba(34,211,238,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.10)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>
      <Header lightMode={lightMode} setLightMode={setLightMode} />
      <Hero />

      <Section
        id="sobre"
        eyebrow="Sobre mim"
        title="Criatividade com chão de fábrica técnico."
      >
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            className="glass rounded-2xl p-7"
            whileHover={{ scale: 1.02 }}
          >
            <Code2 className="mb-5 text-cyanGlow" size={40} />
            <p className="text-lg leading-8 text-slate-200">
              Desenvolvedor Full Stack apaixonado por criar soluções reais, com
              foco em backend robusto, sistemas escaláveis e interfaces que
              parecem produto pronto. Experiência prática com PHP, Laravel,
              CodeIgniter, APIs REST, Swagger/OpenAPI, Docker, MySQL e Oracle.
              Curioso, autodidata e sempre evoluindo, com uma queda particular
              por Go, PHP, React e Docker.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["Backend forte", "Produto real", "Evolução constante"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-slate-100"
                  >
                    <CheckCircle2 className="mb-2 text-limePulse" size={18} />
                    {item}
                  </div>
                ),
              )}
            </div>
          </motion.div>

          <div className="relative grid gap-4">
            {[
              [
                "01",
                "Base sólida",
                "PHP, banco de dados, integrações e sistemas internos.",
              ],
              [
                "02",
                "Produto full stack",
                "React, TypeScript, Laravel, autenticação e dashboards.",
              ],
              [
                "03",
                "Escala e arquitetura",
                "Go, APIs modulares, Docker, deploy e observabilidade.",
              ],
            ].map(([step, title, copy], index) => (
              <motion.div
                key={step}
                className="glass rounded-2xl p-5"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 font-black text-cyan-100">
                    {step}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {copy}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="skills"
        eyebrow="Tecnologias"
        title="Stack para construir, integrar e entregar."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                className="group glass relative rounded-2xl p-5 text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.035 }}
                whileHover={{ scale: 1.05, y: -6 }}
                title={skill.name}
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/5 transition group-hover:shadow-neon">
                  <Icon size={30} color={skill.color} />
                </div>
                <p className="mt-4 text-sm font-bold text-slate-100">
                  {skill.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section
        id="experiencia"
        eyebrow="Experiência"
        title="Vivência real em sistemas corporativos."
      >
        <div className="relative ml-3 border-l border-cyan-300/30 pl-8">
          <div className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-cyanGlow via-violetGlow to-transparent shadow-neon" />
          {timeline.map((item, index) => (
            <motion.article
              key={item.title}
              className="glass relative mb-6 rounded-2xl p-6"
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.015 }}
            >
              <span className="absolute -left-[2.85rem] top-7 h-5 w-5 rounded-full border-4 border-void bg-cyanGlow shadow-neon" />
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-100">
                    {item.company}
                  </p>
                </div>
                <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-bold text-violet-100">
                  {item.period}
                </span>
              </div>
              <ul className="space-y-3 text-sm leading-6 text-slate-300">
                {item.items.map((task) => (
                  <li key={task} className="flex gap-3">
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-limePulse"
                      size={17}
                    />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section
        id="formacao"
        eyebrow="Formação"
        title="Base acadêmica e técnica em evolução constante."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {education.map((item, index) => (
            <motion.article
              key={item.title}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.025 }}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10">
                  <BriefcaseBusiness className="text-cyanGlow" size={24} />
                </div>
                <span className="rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-xs font-bold text-lime-100">
                  {item.status}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold text-cyan-100">
                {item.place}
              </p>
              <p className="mt-3 text-sm text-slate-300">{item.period}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section
        id="projetos"
        eyebrow="Projetos relevantes"
        title="Projetos reais, com cara de produto."
      >
        <div className="mb-8 grid gap-4 lg:grid-cols-3">
          {corporateProjects.map((project, index) => (
            <motion.article
              key={project.title}
              className="glass rounded-2xl p-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl border border-violet-300/20 bg-violet-300/10">
                <Coffee className="text-violet-100" size={22} />
              </div>
              <h3 className="text-lg font-black text-white">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {project.description}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
                {project.stack}
              </p>
            </motion.article>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              className="group glass overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative min-h-64 overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.25),transparent_28%),radial-gradient(circle_at_82%_28%,rgba(244,114,182,0.18),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.92))] p-5">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
                <div className="relative flex h-full min-h-52 flex-col justify-between rounded-xl border border-cyan-300/20 bg-black/30 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
                      {project.metric}
                    </span>
                    <Rocket
                      className="text-violet-100 transition group-hover:rotate-12"
                      size={24}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                      Espaço para imagem
                    </p>
                    <h3 className="text-2xl font-black text-white">
                      {project.visual}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-white">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {project.summary}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
                  {project.stack}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-black transition hover:scale-105"
                  >
                    <Github size={17} />
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-50 transition hover:scale-105 hover:shadow-neon"
                  >
                    <ExternalLink size={17} />
                    Ver demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section
        id="github"
        eyebrow="GitHub"
        title="Código, consistência e evolução pública."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            `https://github-readme-stats.vercel.app/api?username=${githubUser}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=22D3EE&icon_color=A78BFA&text_color=CBD5E1`,
            `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUser}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=22D3EE&text_color=CBD5E1`,
            `https://streak-stats.demolab.com?user=${githubUser}&theme=tokyonight&hide_border=true&background=0D1117&ring=22D3EE&fire=A78BFA&currStreakLabel=22D3EE`,
          ].map((src, index) => (
            <motion.div
              key={src}
              className={
                index === 2
                  ? "glass rounded-2xl p-3 lg:col-span-2"
                  : "glass rounded-2xl p-3"
              }
              whileHover={{ scale: 1.015 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="GitHub stats"
                className="github-card object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section
        id="contato"
        eyebrow="Contato"
        title="Vamos transformar uma ideia em sistema real."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Email", href: links.email, icon: Mail },
            { label: "LinkedIn", href: links.linkedin, icon: Linkedin },
            { label: "GitHub", href: links.github, icon: Github },
            { label: "Instagram", href: links.instagram, icon: Instagram },
          ].map((contact) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={
                  contact.href.startsWith("mailto") ? undefined : "_blank"
                }
                rel="noreferrer"
                className="glass rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -6 }}
                whileTap={{ scale: 0.96 }}
              >
                <Icon className="mx-auto mb-4 text-cyanGlow" size={34} />
                <p className="font-black text-white">{contact.label}</p>
              </motion.a>
            );
          })}
        </div>
      </Section>

      <footer className="relative z-10 border-t border-white/10 px-4 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center text-sm text-slate-400 md:flex-row md:text-left">
          <p>Transformando café ☕ em código 💻 e ideias em sistemas reais.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="transition hover:text-cyan-100"
              >
                {label}
              </a>
            ))}
          </div>
          <p>© {new Date().getFullYear()} BruttiZ Dev.</p>
        </div>
      </footer>
    </main>
  );
}
