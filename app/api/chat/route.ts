import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { findEasterEgg } from "@/lib/easterEggs";
import {
  composeLocalNarration,
  normalizeText,
  retrieveDiaryContext,
  serializeKnowledge,
  type ConversationTurn as EngineTurn,
} from "@/lib/diary/engine";

export const runtime = "nodejs";

type ClientTurn = {
  role: "visitor" | "diary";
  text: string;
};

const UNKNOWN = "Estas páginas ainda não registraram essa história.";
const OUT_OF_SCOPE =
  "Estas páginas conhecem apenas a história de Victor Brutti.";
const DEFAULT_SUGGESTIONS = [
  "Quais são os principais projetos?",
  "Onde Victor trabalha atualmente?",
];

function parseHistory(value: unknown): ClientTurn[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (turn): turn is ClientTurn =>
        typeof turn === "object" &&
        turn !== null &&
        ["visitor", "diary"].includes((turn as ClientTurn).role) &&
        typeof (turn as ClientTurn).text === "string",
    )
    .slice(-6)
    .map((turn) => ({
      role: turn.role,
      text: turn.text.trim().slice(0, 1_200),
    }));
}

function toEngineHistory(history: ClientTurn[]): EngineTurn[] {
  return history.map((turn) => ({
    role: turn.role === "visitor" ? "user" : "assistant",
    content: turn.text,
  }));
}

function looksRelatedToVictor(message: string, history: ClientTurn[]) {
  const words = normalizeText(
    `${history.slice(-2).map((turn) => turn.text).join(" ")} ${message}`,
  ).split(" ");
  return [
    "victor", "ele", "dele", "seu", "sua", "diario", "projeto", "carreira",
    "trabalho", "tecnologia", "empresa", "maria", "eduarda",
  ].some((term) => words.includes(term));
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: unknown;
      history?: unknown;
    };
    const message =
      typeof body.message === "string" ? body.message.trim().slice(0, 600) : "";

    if (!message) {
      return NextResponse.json(
        { error: "Escreva uma pergunta para o diário." },
        { status: 400 },
      );
    }

    const history = parseHistory(body.history);
    const easterEgg = findEasterEgg(message);
    if (easterEgg) {
      return NextResponse.json({
        answer: easterEgg,
        suggestions: DEFAULT_SUGGESTIONS,
      });
    }

    const diaryContext = retrieveDiaryContext(
      message,
      toEngineHistory(history),
    );
    if (!diaryContext.pages.length) {
      return NextResponse.json({
        answer: looksRelatedToVictor(message, history) ? UNKNOWN : OUT_OF_SCOPE,
        suggestions: DEFAULT_SUGGESTIONS,
      });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error("GOOGLE_GENERATIVE_AI_API_KEY não configurada.");
      return NextResponse.json(
        { error: "O diário está adormecido. Tente novamente mais tarde." },
        { status: 503 },
      );
    }

    const recentConversation = history
      .map((turn) => `${turn.role === "visitor" ? "VISITANTE" : "DIÁRIO"}: ${turn.text}`)
      .join("\n\n");
    const narrativeContext = `
PROFUNDIDADE: ${diaryContext.depth.toUpperCase()}
TIPO DE VISITANTE: ${diaryContext.audience.toUpperCase()}

CONVERSA RECENTE:
${recentConversation || "Este é o primeiro capítulo desta visita."}

PÁGINAS RECUPERADAS:
${serializeKnowledge(diaryContext.pages)}

PERGUNTA ATUAL:
${message}

Narre usando somente as páginas recuperadas. Não mencione este contexto.
`.trim();

    let answer: string;
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: narrativeContext,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.68,
          topP: 0.9,
          maxOutputTokens: diaryContext.depth === "profunda" ? 650 : 380,
          httpOptions: { timeout: 15_000 },
        },
      });
      answer = response.text?.trim() || UNKNOWN;
    } catch (error) {
      const status =
        typeof error === "object" && error !== null && "status" in error
          ? Number(error.status)
          : 0;
      if (status !== 429 && status !== 503 && status !== 504) throw error;
      console.warn(
        `Narrador externo indisponível (${status}); usando páginas locais.`,
      );
      answer = composeLocalNarration(diaryContext, message);
    }

    return NextResponse.json(
      {
        answer,
        suggestions: diaryContext.suggestions,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Falha ao consultar o Diário Encantado:", error);
    return NextResponse.json(
      { error: "A tinta se dispersou. Tente novamente em alguns instantes." },
      { status: 500 },
    );
  }
}
