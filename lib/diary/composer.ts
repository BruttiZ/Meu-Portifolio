import type { ConversationTurn, DiaryFocus } from "./types";
import { searchKnowledge } from "./search";

export function composeDiaryContext(
  question: string,
  history: ConversationTurn[],
  focus: DiaryFocus,
) {
  const contextualQuery = [
    ...history.slice(-2).map((turn) => turn.text),
    question,
  ].join(" ");
  const records = searchKnowledge(contextualQuery, focus, 6);

  const context = records
    .map(
      (record, index) =>
        `[CAPÍTULO ${index + 1} — ${record.title}]\n${record.content}`,
    )
    .join("\n\n");

  const recentHistory = history
    .slice(-4)
    .map((turn) => `${turn.role === "visitor" ? "Visitante" : "Diário"}: ${turn.text}`)
    .join("\n");

  return { records, context, recentHistory };
}
