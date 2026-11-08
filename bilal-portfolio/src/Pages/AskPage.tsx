import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";

import { Section } from "@/Components/Section";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { searchResume, type SearchResult } from "@/lib/resumeSearch";

type Turn = { question: string; results: SearchResult };

const SUGGESTIONS = [
  "What GenAI work have you done?",
  "What do you do at Thoughtworks?",
  "Which languages and frameworks do you use?",
  "Are you open to roles in Germany?",
  "What certifications do you have?",
];

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const logRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    logRef.current?.lastElementChild?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [turns]);

  function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    setTurns((prev) => [...prev, { question: q, results: searchResume(q) }]);
    setQuestion("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    ask(question);
  }

  return (
    <Section
      id="ask"
      title="Ask about my work"
      intro="Type a question and get an answer straight from my resume. It runs entirely in your browser, so nothing you type is sent anywhere."
    >
      <div className="max-w-3xl rounded-lg border bg-card">
        <ol
          ref={logRef}
          aria-live="polite"
          className="max-h-[28rem] space-y-6 overflow-y-auto p-5 sm:p-6"
        >
          {turns.length === 0 && (
            <li className="text-muted-foreground">
              Try one of these, or ask your own question about my experience, projects, skills or availability.
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
                    <p className="mt-2 text-sm text-muted-foreground">Source: {r.source}</p>
                  </div>
                ))
              ) : (
                <p className="max-w-[85%] rounded-lg bg-muted px-4 py-3 text-base">
                  I couldn't find that in my resume. Try asking about my experience, projects, skills or
                  availability, or{" "}
                  <a href="#contact" className="text-link">
                    send me a message
                  </a>
                  .
                </p>
              )}
            </li>
          ))}
        </ol>

        <div className="border-t p-5 sm:p-6">
          <ul className="mb-4 flex flex-wrap gap-2" aria-label="Suggested questions">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <Button type="button" variant="outline" size="sm" onClick={() => ask(s)}>
                  {s}
                </Button>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <label htmlFor="ask-input" className="sr-only">
              Your question
            </label>
            <Input
              id="ask-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What have you built with Angular?"
              maxLength={300}
              autoComplete="off"
              className="h-10"
            />
            <Button type="submit" size="lg" disabled={!question.trim()}>
              <Send /> Ask
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
}
