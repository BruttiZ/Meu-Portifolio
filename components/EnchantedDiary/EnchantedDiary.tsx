"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Feather, Send, Sparkles, Volume2, VolumeX } from "lucide-react";

type Phase =
  | "opening"
  | "ready"
  | "writing-question"
  | "fading-question"
  | "thinking"
  | "answering"
  | "resting"
  | "fading-answer";

type ConversationTurn = {
  role: "visitor" | "diary";
  text: string;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const welcomeMessages = [
  "Há muito tempo estas páginas aguardavam um novo visitante.",
  "As páginas despertam lentamente, como se reconhecessem sua presença.",
  "Nem toda história começa pela primeira página. Escolha um capítulo.",
];

const initialSuggestions = [
  "Quem é Victor Brutti?",
  "Quais são os principais projetos?",
  "Onde Victor trabalha atualmente?",
];

function useTypewriter() {
  const [text, setText] = useState("");
  const cancelled = useRef(false);

  const write = useCallback(async (value: string, speed = 34) => {
    cancelled.current = false;
    setText("");
    for (let index = 0; index < value.length; index += 1) {
      if (cancelled.current) return;
      setText(value.slice(0, index + 1));
      const pause = /[.,!?;:]/.test(value[index]) ? speed * 4 : speed;
      await sleep(pause + Math.random() * speed);
    }
  }, []);

  const clear = useCallback(() => setText(""), []);
  useEffect(
    () => () => {
      cancelled.current = true;
    },
    [],
  );
  return { text, write, clear };
}

function MagicParticles() {
  return (
    <div className="diary-particles" aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => (
        <motion.i
          key={index}
          style={{
            left: `${8 + ((index * 29) % 84)}%`,
            top: `${12 + ((index * 47) % 70)}%`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.12, 0.8, 0.12],
            scale: [0.7, 1.3, 0.7],
          }}
          transition={{
            duration: 3 + (index % 5),
            delay: index * 0.13,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

export function EnchantedDiary() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("opening");
  const [question, setQuestion] = useState("");
  const [muted, setMuted] = useState(true);
  const [history, setHistory] = useState<ConversationTurn[]>([]);
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [welcome, setWelcome] = useState(welcomeMessages[0]);
  const { text, write, clear } = useTypewriter();
  const audioContext = useRef<AudioContext | null>(null);
  const answerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const chime = useCallback(
    (frequency: number, duration = 0.08) => {
      if (muted || typeof window === "undefined") return;
      const context = audioContext.current ?? new AudioContext();
      audioContext.current = context;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.025, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + duration,
      );
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + duration);
    },
    [muted],
  );

  useEffect(() => {
    setWelcome(
      welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)],
    );
    const timer = setTimeout(
      () => setPhase("ready"),
      reducedMotion ? 200 : 2600,
    );
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(
    () => () => {
      if (answerTimer.current) clearTimeout(answerTimer.current);
      audioContext.current?.close();
    },
    [],
  );

  const reset = useCallback(() => {
    clear();
    setQuestion("");
    setPhase("ready");
  }, [clear]);

  async function ask(event: FormEvent) {
    event.preventDefault();
    const prompt = question.trim();
    if (!prompt || phase !== "ready") return;
    if (answerTimer.current) clearTimeout(answerTimer.current);

    const answerRequest = fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt, history }),
    });

    setPhase("writing-question");
    await write(prompt, reducedMotion ? 1 : 31);
    chime(520, 0.12);
    if (!reducedMotion) await sleep(550);
    setPhase("fading-question");
    if (!reducedMotion) await sleep(1500);
    setPhase("thinking");
    clear();

    try {
      const response = await answerRequest;
      const data = (await response.json()) as {
        answer?: string;
        error?: string;
        suggestions?: string[];
      };
      const answer =
        data.answer ??
        data.error ??
        "Estas páginas ainda não registraram essa informação.";
      setHistory((current) =>
        [
          ...current,
          { role: "visitor" as const, text: prompt },
          { role: "diary" as const, text: answer },
        ].slice(-4),
      );
      if (data.suggestions?.length) setSuggestions(data.suggestions.slice(0, 3));
      setPhase("answering");
      chime(660, 0.18);
      await write(answer, reducedMotion ? 1 : 25);
      setPhase("resting");
      answerTimer.current = setTimeout(async () => {
        setPhase("fading-answer");
        if (!reducedMotion) await sleep(1800);
        reset();
      }, reducedMotion ? 3500 : 8000);
    } catch {
      setPhase("answering");
      await write(
        "A tinta se dispersou. Tente novamente em alguns instantes.",
        reducedMotion ? 1 : 25,
      );
      setPhase("resting");
      answerTimer.current = setTimeout(reset, 8000);
    }
  }

  const busy = !["ready", "resting"].includes(phase);

  return (
    <section id="diario" className="diary-scene" aria-labelledby="diary-title">
      <div className="diary-vignette" />
      <MagicParticles />
      <motion.div
        className="diary-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span>
          <Sparkles size={13} /> Uma página fora do comum
        </span>
        <h2 id="diary-title">Diário Encantado</h2>
        <p>Pergunte às páginas sobre a jornada de Victor.</p>
      </motion.div>

      <button
        className="diary-mute"
        onClick={() => setMuted((value) => !value)}
        aria-label={
          muted ? "Ativar sons do diário" : "Silenciar sons do diário"
        }
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        <span>{muted ? "Som desligado" : "Som ligado"}</span>
      </button>

      <motion.div
        className="diary-book"
        initial={{ opacity: 0, scale: 0.78, rotateX: 18 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: reducedMotion ? 0.2 : 1.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div
          className={`diary-aura ${phase === "thinking" ? "is-thinking" : ""}`}
        />
        <div className="diary-page-content">
          <AnimatePresence mode="wait">
            {phase === "opening" ? (
              <motion.div
                key="opening"
                className="diary-opening"
                exit={{ opacity: 0 }}
              >
                <Feather />
                <p>{welcome}</p>
              </motion.div>
            ) : phase === "ready" ? (
              <motion.form
                key="form"
                className="diary-form"
                onSubmit={ask}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <label htmlFor="diary-question">
                  Faça uma pergunta ao diário...
                </label>
                <textarea
                  id="diary-question"
                  value={question}
                  onChange={(event) =>
                    setQuestion(event.target.value.slice(0, 600))
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey &&
                      !event.nativeEvent.isComposing
                    ) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  placeholder="Que tecnologias Victor domina?"
                  rows={7}
                  autoFocus
                />
                <div className="diary-suggestions" aria-label="Capítulos sugeridos">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setQuestion(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <div className="diary-form-footer">
                  <small>
                    Enter para perguntar · Shift + Enter para nova linha ·{" "}
                    {question.length}/600
                  </small>
                  <button disabled={!question.trim()} type="submit">
                    Consultar as páginas <Send size={15} />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="ink"
                className={`diary-ink ${
                  phase === "fading-question" || phase === "fading-answer"
                    ? "is-vanishing"
                    : ""
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(8px)", y: -8 }}
              >
                {phase === "thinking" ? (
                  <p className="diary-thinking">
                    As lembranças percorrem as páginas...
                  </p>
                ) : (
                  <p>
                    {text}
                    <motion.span
                      className="ink-caret"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity }}
                    />
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {busy && <div className="diary-smoke" aria-hidden="true" />}
      </motion.div>
      <p className="diary-note">
        O diário responde apenas sobre Victor Brutti. Sons são opcionais.
      </p>
    </section>
  );
}
