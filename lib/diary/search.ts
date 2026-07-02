import { knowledge } from "./knowledge";
import type { DiaryFocus, KnowledgeCategory, KnowledgeRecord } from "./types";

const cache = new Map<string, KnowledgeRecord[]>();

const aliases: Record<string, string[]> = {
  empresa: ["trabalho", "carreira", "widitec"],
  emprego: ["trabalho", "carreira", "widitec"],
  tecnologia: ["php", "go", "react", "docker", "api"],
  projeto: ["invitely", "portfolio", "api"],
  backend: ["php", "go", "api", "banco"],
  frontend: ["react", "next", "typescript", "javascript"],
  aprender: ["estudar", "aprendizado", "projeto"],
  sonho: ["objetivo", "futuro", "startup"],
  antes: ["anterior", "aegea", "corsan"],
};

export function normalizeQuery(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function queryTerms(query: string) {
  const base = normalizeQuery(query).split(" ").filter((term) => term.length >= 2);
  return Array.from(
    new Set([...base, ...base.flatMap((term) => aliases[term] ?? [])]),
  );
}

export function searchKnowledge(
  query: string,
  focus: DiaryFocus = {},
  limit = 5,
) {
  const normalized = normalizeQuery(query);
  const cacheKey = `${normalized}:${focus.category ?? ""}:${focus.recordId ?? ""}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const terms = queryTerms(normalized);
  const directMatches = knowledge
    .map((record) => {
      const searchable = normalizeQuery(
        `${record.title} ${record.keywords.join(" ")} ${record.content}`,
      );
      let score = record.weight * 0.35;

      for (const term of terms) {
        if (record.keywords.some((keyword) => normalizeQuery(keyword) === term)) score += 5;
        else if (normalizeQuery(record.title).includes(term)) score += 3;
        else if (searchable.includes(term)) score += 1;
      }

      if (focus.recordId === record.id) score += 2.5;
      if (focus.category === record.category) score += 1.5;
      return { record, score };
    })
    .filter(({ score }) => score > 1.1)
    .sort((a, b) => b.score - a.score);

  const selected = directMatches.slice(0, limit);
  const selectedIds = new Set(selected.map(({ record }) => record.id));

  for (const { record } of directMatches.slice(0, 2)) {
    for (const connection of record.connections) {
      if (selected.length >= limit || selectedIds.has(connection)) continue;
      const related = knowledge.find((item) => item.id === connection);
      if (related) {
        selected.push({ record: related, score: 0.5 });
        selectedIds.add(connection);
      }
    }
  }

  const result = selected.map(({ record }) => record).slice(0, limit);
  cache.set(cacheKey, result);
  if (cache.size > 100) cache.delete(cache.keys().next().value ?? "");
  return result;
}

export function inferFocus(
  records: KnowledgeRecord[],
  previous: DiaryFocus = {},
): DiaryFocus {
  const first = records[0];
  return first
    ? { category: first.category, recordId: first.id }
    : previous;
}

export function isKnowledgeCategory(value: unknown): value is KnowledgeCategory {
  return knowledge.some((record) => record.category === value);
}
