import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";

import { Section } from "@/Components/Section";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import type { Lang } from "@/data/resume";
import { useLang, useUi } from "@/i18n/lang";
import { searchResume, type SearchResult } from "@/lib/resumeSearch";

type Turn = { question: string; results: SearchResult; lang: Lang };

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [allTurns, setTurns] = useState<Turn[]>([]);
  const logRef = useRef<HTMLOListElement>(null);
  const { lang } = useLang();
  const t = useUi();
  // Answers belong to the language they were asked in; switching language starts a fresh chat.
  const turns = allTurns.filter((turn) => turn.lang === lang);

  useEffect(() => {
    // Scroll only the chat log itself (never the page), and only once a question has been asked.
    const log = logRef.current;
    if (!log || turns.length === 0) return;
    log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [turns.length]);

  function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    setTurns((prev) => [...prev, { question: q, results: searchResume(q, lang), lang }]);
    setQuestion("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    ask(question);
  }

  return (
    <Section
      id="ask"
      title={t.sections.ask}
      intro={t.sections.askIntro}
    >
      <div className="max-w-3xl rounded-lg border bg-card">
        <ol
          ref={logRef}
          aria-live="polite"
          className="max-h-[28rem] space-y-6 overflow-y-auto p-5 sm:p-6"
        >
          {turns.length === 0 && (
            <li className="text-muted-foreground">
              {t.ask.empty}
            </li>
          )}
          {turns.map((turn, i) => (
            <li key={i} className="space-y-3">
              <p className="ml-auto w-fit max-w-[85%] rounded-lg bg-primary px-4 py-2 text-base text-primary-foreground">
                {turn.question}
              </p>
              {turn.results.length > 0 ? (
                turn.results.map((r) => (
                  <div key={r.source} className="max-w-[85%] rounded-lg bg-muted px-4 py-3 text-base">
                    <p>{r.answer}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t.ask.source} {r.source}
                    </p>
                  </div>
                ))
              ) : (
                <p className="max-w-[85%] rounded-lg bg-muted px-4 py-3 text-base">
                  {t.ask.notFoundBefore}
                  <a href="#contact" className="text-link">
                    {t.ask.notFoundLink}
                  </a>
                  {t.ask.notFoundAfter}
                </p>
              )}
            </li>
          ))}
        </ol>

        <div className="border-t p-5 sm:p-6">
          <ul className="mb-4 flex flex-wrap gap-2" aria-label={t.ask.suggestionsLabel}>
            {t.ask.suggestions.map((s) => (
              <li key={s}>
                <Button type="button" variant="outline" size="sm" onClick={() => ask(s)}>
                  {s}
                </Button>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <label htmlFor="ask-input" className="sr-only">
              {t.ask.inputLabel}
            </label>
            <Input
              id="ask-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t.ask.placeholder}
              maxLength={300}
              autoComplete="off"
              className="h-10"
            />
            <Button type="submit" size="lg" disabled={!question.trim()}>
              <Send /> {t.ask.submit}
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
}
