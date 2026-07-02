import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

export type ConversationTurn = {
  role: "user" | "assistant";
  content: string;
};

type KnowledgePage = {
  id: string;
  title: string;
  tags: string[];
  aliases: string[];
  related: string[];
  content: string;
  searchable: string;
};

export type DiaryContext = {
  pages: KnowledgePage[];
  depth: "concisa" | "narrativa" | "profunda" | "rara";
  audience: "recrutador" | "desenvolvedor" | "visitante";
  suggestions: string[];
};

const STOP_WORDS = new Set([
  "a", "ao", "aos", "as", "com", "como", "da", "das", "de", "do", "dos",
  "e", "ela", "ele", "em", "entre", "essa", "esse", "esta", "este", "eu",
  "foi", "na", "nas", "no", "nos", "o", "os", "para", "por", "que", "qual",
  "quais", "quem", "onde", "quando", "porque", "como", "quanto", "quantos",
  "se", "seu", "sua", "um", "uma", "victor", "brutti",
]);

const CONCEPTS: Record<string, string[]> = {
  trabalha: ["carreira", "empresa", "widitec", "trabalho"],
  trabalho: ["carreira", "empresa", "widitec"],
  empresa: ["carreira", "widitec", "aegea", "corsan"],
  antes: ["anterior", "aegea", "corsan", "carreira"],
  linguagem: ["tecnologias", "stack", "php", "go", "javascript", "typescript"],
  tecnologia: ["tecnologias", "stack", "ferramentas"],
  tecnologias: ["stack", "ferramentas", "linguagens"],
  backend: ["php", "go", "api", "arquitetura"],
  frontend: ["react", "nextjs", "javascript", "typescript"],
  banco: ["postgresql", "mysql", "oracle", "sql", "dados"],
  api: ["backend", "rest", "swagger", "go", "php"],
  projeto: ["projetos", "invitely", "portfolio"],
  projetos: ["invitely", "api", "portfolio"],
  aprender: ["aprendizado", "estudos", "autodidata"],
  aprende: ["aprendizado", "estudos", "autodidata"],
  objetivo: ["objetivos", "futuro", "carreira"],
  sonho: ["objetivos", "futuro", "startup"],
  contato: ["email", "github", "linkedin", "contratar"],
  contratar: ["contato", "email", "linkedin"],
  namorada: ["maria", "eduarda", "relacionamento"],
  faculdade: ["formacao", "educacao", "unopar"],
  curso: ["formacao", "educacao", "senai"],
};

const TECHNICAL = new Set([
  "api", "arquitetura", "backend", "banco", "docker", "gin", "go", "laravel",
  "microsservicos", "mysql", "nextjs", "php", "postgresql", "react", "redis",
  "rest", "swagger", "typescript",
]);

const RECRUITER = new Set([
  "carreira", "contratar", "empresa", "experiencia", "formacao", "objetivo",
  "perfil", "profissional", "recrutador", "trabalha",
]);

let pageCache: KnowledgePage[] | undefined;

export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9+#./\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseList(value = "") {
  return value.split(",").map((item) => normalizeText(item)).filter(Boolean);
}

function parsePage(path: string, root: string): KnowledgePage {
  const raw = readFileSync(path, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Página sem frontmatter válido: ${path}`);

  const metadata = Object.fromEntries(
    match[1].split(/\r?\n/).map((line) => {
      const separator = line.indexOf(":");
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    }),
  );
  const content = match[2].trim();
  const page = {
    id: relative(root, path).replaceAll("\\", "/").replace(/\.md$/, ""),
    title: metadata.title,
    tags: parseList(metadata.tags),
    aliases: parseList(metadata.aliases),
    related: parseList(metadata.related),
    content,
    searchable: "",
  };
  page.searchable = normalizeText(
    [page.title, page.tags.join(" "), page.aliases.join(" "), content].join(" "),
  );
  return page;
}

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : path.endsWith(".md") ? [path] : [];
  });
}

function loadPages() {
  if (pageCache) return pageCache;
  const root = join(process.cwd(), "knowledge");
  pageCache = walk(root).map((path) => parsePage(path, root));
  return pageCache;
}

function queryTerms(question: string, history: ConversationTurn[]) {
  const current = normalizeText(question).split(" ").filter(Boolean);
  const recentUsers = history
    .filter((turn) => turn.role === "user")
    .slice(-2)
    .flatMap((turn) => normalizeText(turn.content).split(" "));
  const base = current.filter((term) => !STOP_WORDS.has(term));
  const expanded = base.flatMap((term) => [term, ...(CONCEPTS[term] ?? [])]);
  const contextual = recentUsers
    .filter((term) => !STOP_WORDS.has(term))
    .flatMap((term) => [term, ...(CONCEPTS[term] ?? [])]);
  return {
    current,
    terms: Array.from(new Set(expanded)),
    contextual: Array.from(new Set(contextual)),
  };
}

function scorePage(
  page: KnowledgePage,
  normalizedQuestion: string,
  terms: string[],
  contextual: string[],
) {
  let score = 0;
  const searchableTerms = new Set(page.searchable.split(" "));
  const titleTerms = new Set(normalizeText(page.title).split(" "));
  const aliasTerms = new Set(page.aliases.flatMap((alias) => alias.split(" ")));
  if (page.aliases.some((alias) => normalizedQuestion.includes(alias))) score += 18;
  for (const term of terms) {
    if (page.tags.includes(term)) score += 6;
    if (titleTerms.has(term)) score += 5;
    if (aliasTerms.has(term)) score += 4;
    if (searchableTerms.has(term)) score += 1;
  }
  for (const term of contextual) {
    if (page.tags.includes(term) || titleTerms.has(term)) score += 0.8;
  }
  return score;
}

function inferAudience(terms: string[]): DiaryContext["audience"] {
  if (terms.some((term) => RECRUITER.has(term))) return "recrutador";
  if (terms.some((term) => TECHNICAL.has(term))) return "desenvolvedor";
  return "visitante";
}

function inferDepth(
  question: string,
  history: ConversationTurn[],
  audience: DiaryContext["audience"],
): DiaryContext["depth"] {
  const normalized = normalizeText(question);
  if (
    normalized.includes("segredo") ||
    normalized.includes("pagina escondida") ||
    normalized.includes("detalhe raro")
  ) return "rara";
  if (audience === "recrutador") return "concisa";
  if (
    normalized.includes("trajetoria") ||
    normalized.includes("explique") ||
    normalized.includes("detalhe") ||
    normalized.includes("arquitetura") ||
    history.length >= 6
  ) return "profunda";
  if (history.length >= 3) return "narrativa";
  return "narrativa";
}

function buildSuggestions(pages: KnowledgePage[]) {
  const tags = new Set(pages.flatMap((page) => page.tags));
  if (tags.has("invitely")) return ["Como o Invitely foi construído?", "Victor usa Go nesse projeto?"];
  if (tags.has("carreira")) return ["E onde ele trabalhou antes?", "Quais tecnologias usa no trabalho?"];
  if (tags.has("go") || tags.has("php")) return ["Em quais projetos ele usa Go?", "Como Victor aprende tecnologias?"];
  if (tags.has("formação")) return ["Como Victor prefere aprender?", "Quais são seus objetivos?"];
  return ["Quais são os principais projetos?", "Onde Victor trabalha atualmente?"];
}

export function retrieveDiaryContext(
  question: string,
  history: ConversationTurn[],
): DiaryContext {
  const normalizedQuestion = normalizeText(question);
  const { terms, contextual } = queryTerms(question, history);
  const ranked = loadPages()
    .map((page) => ({
      page,
      score: scorePage(page, normalizedQuestion, terms, contextual),
    }))
    .filter(({ score }) => score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, history.length >= 4 ? 5 : 4)
    .map(({ page }) => page);
  const audience = inferAudience(terms);

  return {
    pages: ranked,
    audience,
    depth: inferDepth(question, history, audience),
    suggestions: buildSuggestions(ranked),
  };
}

export function serializeKnowledge(pages: KnowledgePage[]) {
  return pages
    .map((page, index) => `CAPÍTULO ${index + 1}: ${page.title}\n${page.content}`)
    .join("\n\n---\n\n");
}

export function composeLocalNarration(
  context: DiaryContext,
  question: string,
) {
  const openings = [
    "As páginas preservam um registro claro sobre isso.",
    "Entre os capítulos relacionados, a tinta revela o seguinte.",
    "O tempo guardou esta passagem com bastante nitidez.",
    "Há um capítulo especialmente útil para essa pergunta.",
  ];
  const seed = Array.from(question).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  const opening = openings[seed % openings.length];
  const pageLimit =
    context.depth === "profunda" ? 3 : context.depth === "concisa" ? 1 : 2;
  const facts = context.pages
    .slice(0, pageLimit)
    .map((page) => page.content)
    .join("\n\n");
  return `${opening}\n\n${facts}`;
}
