import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { findEasterEgg } from "@/lib/easterEggs";

export const runtime = "nodejs";

const FALLBACK = "Estas páginas ainda não registraram essa informação.";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: unknown };
    const message =
      typeof body.message === "string" ? body.message.trim().slice(0, 600) : "";

    if (!message) {
      return NextResponse.json(
        { error: "Escreva uma pergunta para o diário." },
        { status: 400 },
      );
    }

    const easterEgg = findEasterEgg(message);
    if (easterEgg) {
      return NextResponse.json(
        { answer: easterEgg },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error("GOOGLE_GENERATIVE_AI_API_KEY não configurada.");
      return NextResponse.json(
        { error: "O diário está adormecido. Tente novamente mais tarde." },
        { status: 503 },
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.35,
        maxOutputTokens: 350,
        httpOptions: { timeout: 15_000 },
      },
    });

    return NextResponse.json(
      { answer: response.text?.trim() || FALLBACK },
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
