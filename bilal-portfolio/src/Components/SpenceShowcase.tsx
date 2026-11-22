import { useId, useMemo, useState } from "react";
import { ChevronRight, RotateCcw } from "lucide-react";

import { buttonVariants } from "@/Components/ui/button";
import { CATEGORIES, formatINR, parseLine, type Category, type Entry } from "@/lib/spenceQuickAdd";
import { cn } from "@/lib/utils";

const SITE = "https://bilal-py.github.io/spence-ai/";
const REPO = "https://github.com/bilal-py/spence-ai";
const RELEASES = "https://github.com/bilal-py/spence-ai/releases/latest";

const examples = [
  "pottery class 1.5k gpay",
  "netflix 649 monthly",
  "amazon refund 499 card",
  "pizza 1.2k last sat, metro 60",
];

const providers = [
  { id: "ollama", label: "Ollama", host: "localhost:11434", local: true },
  { id: "gemini", label: "Gemini", host: "generativelanguage.googleapis.com", local: false },
  { id: "openai", label: "OpenAI", host: "api.openai.com", local: false },
] as const;
type ProviderId = (typeof providers)[number]["id"];

type Source = "rule" | "learned" | "ai" | "none";

const sourceLabel: Record<Source, string> = {
  rule: "Matched a rule",
  learned: "Learned from you",
  ai: "Asks the AI",
  none: "No category needed",
};

const decisions = [
  {
    title: "The model's numbers are checked against the page.",
    body: "Every extracted amount is matched to the statement text the model read. One that isn't printed there is flagged and unticked, which catches merged lines and invented rows before they reach the ledger.",
  },
  {
    title: "Dates are settled per statement, not per row.",
    body: "Day-first or month-first is chosen from the printed dates: any part above 12, then the tightest date span. The model's own guess at 03/04 is never trusted.",
  },
  {
    title: "Corrections become rules.",
    body: "Change a category during review and Spence stores a merchant rule. Next time the longest matching rule wins over the model, so the same mistake doesn't happen twice.",
  },
  {
    title: "The AI sees as little as possible.",
    body: "Monthly summaries get pre-computed totals, never rows. Ask lets the model call read-only query tools capped at 25 rows, and shows what it looked at under each answer.",
  },
];

const layers = [
  { name: "Web app", detail: "React 19, TanStack Query" },
  { name: "WebApi", detail: "Minimal APIs" },
  { name: "Infrastructure", detail: "EF Core, SQLite, PdfPig, import worker" },
  { name: "Application", detail: "Imports, quick add, bills, savings, ask" },
  { name: "Domain", detail: "Transactions, rules, pots" },
];

function SpenceMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" fill="var(--spence)" />
      <rect x="6" y="19" width="7" height="6" rx="1.5" fill="#c99a2e" />
      <rect x="14" y="19" width="5" height="6" rx="1.5" fill="var(--spence-paper)" />
      <rect x="20" y="19" width="6" height="6" rx="1.5" fill="var(--spence-soft)" />
      <path d="M8 13.5c0-2.5 2.2-4 5-4h11" stroke="var(--spence-paper)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function CategoryLabel({ category }: { category: Category }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: category.color }} />
      {category.name}
    </span>
  );
}

function EntryRow({
  entry,
  source,
  category,
  onTeach,
}: {
  entry: Entry;
  source: Source;
  category: Category | null;
  onTeach: (name: string) => void;
}) {
  const meta = [entry.type !== "Expense" ? entry.type : null, entry.repeat ? `${entry.repeat} bill` : entry.when, entry.account]
    .filter(Boolean)
    .join(", ");

  return (
    <li className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-1 border-b py-3 last:border-b-0 sm:grid-cols-[6rem_1fr_auto] sm:items-center">
      <span className={cn("font-semibold tabular-nums", entry.amount == null && "text-muted-foreground")}>
        {entry.amount == null ? "₹?" : formatINR(entry.amount)}
      </span>
      <span className="min-w-0">
        <span className="font-medium">{entry.merchant || "Something"}</span>
        {meta && <span className="text-muted-foreground"> {meta}</span>}
      </span>
      <span className="col-start-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-base sm:col-start-3 sm:justify-end">
        {source === "ai" ? (
          <select
            className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            defaultValue=""
            aria-label={`Pick a category for ${entry.merchant}. Spence will remember it.`}
            onChange={(e) => onTeach(e.target.value)}
          >
            <option value="" disabled>
              Teach it a category
            </option>
            {CATEGORIES.filter((c) => c.name !== "Income").map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        ) : (
          category && <CategoryLabel category={category} />
        )}
        <span
          className={cn(
            "text-sm",
            source === "learned" ? "font-medium text-spence" : "text-muted-foreground",
            source === "ai" && "text-foreground",
          )}
        >
          {sourceLabel[source]}
        </span>
      </span>
    </li>
  );
}

function QuickAddDemo() {
  const inputId = useId();
  const [text, setText] = useState("chai 40 upi, haircut 300 cash, got 80k salary");
  const [learned, setLearned] = useState<Record<string, string>>({});
  const [providerId, setProviderId] = useState<ProviderId>("ollama");
  const provider = providers.find((p) => p.id === providerId)!;

  const rows = useMemo(
    () =>
      parseLine(text).map((entry) => {
        const taught = CATEGORIES.find((c) => c.name === learned[entry.key]);
        const source: Source = taught
          ? "learned"
          : entry.category
            ? "rule"
            : entry.merchant && entry.type !== "Transfer"
              ? "ai"
              : "none";
        return { entry, source, category: taught ?? entry.category };
      }),
    [text, learned],
  );

  const asked = [...new Set(rows.filter((r) => r.source === "ai").map((r) => r.entry.merchant))];
  const learnedCount = Object.keys(learned).length;
  const sent = provider.local ? [] : asked;

  return (
    <div className="mt-8 grid overflow-hidden rounded-md border lg:grid-cols-[minmax(0,1fr)_21rem]">
      <div className="p-5 sm:p-6">
        <label htmlFor={inputId} className="font-semibold">
          Type an expense the way you'd text it
        </label>
        <p className="mt-1 text-base text-muted-foreground">
          Separate entries with commas. Plain rules parse each one; the AI is only asked about merchants they can't place.
        </p>
        <input
          id={inputId}
          value={text}
          maxLength={200}
          autoComplete="off"
          spellCheck={false}
          onChange={(e) => setText(e.target.value)}
          className="mt-4 h-12 w-full rounded-md border border-input bg-background px-4 text-base outline-none focus-visible:border-ring"
        />
        <div className="mt-3 flex flex-wrap gap-2" aria-label="Examples">
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setText(ex)}
              className="rounded-full border px-3 py-1 text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            >
              {ex}
            </button>
          ))}
        </div>

        {rows.length ? (
          <ul className="mt-5 border-t">
            {rows.map((r, i) => (
              <EntryRow
                key={`${i}-${r.entry.raw}`}
                {...r}
                onTeach={(name) => setLearned((l) => ({ ...l, [r.entry.key]: name }))}
              />
            ))}
          </ul>
        ) : (
          <p className="mt-5 border-t pt-4 text-base text-muted-foreground">
            Type something like <i>coffee 120 yesterday</i> to see it parsed.
          </p>
        )}

        {learnedCount > 0 && (
          <button
            type="button"
            onClick={() => setLearned({})}
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Forget {learnedCount === 1 ? "the rule" : `${learnedCount} rules`} it learned
          </button>
        )}
      </div>

      <aside
        aria-labelledby={`${inputId}-egress`}
        className="flex flex-col border-t bg-[var(--spence-wash)] p-5 sm:p-6 lg:border-t-0 lg:border-l"
      >
        <h4 id={`${inputId}-egress`} className="font-semibold">
          What leaves your computer
        </h4>
        <div className="mt-3 inline-flex self-start rounded-md border bg-background p-0.5" role="group" aria-label="AI provider">
          {providers.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={p.id === providerId}
              onClick={() => setProviderId(p.id)}
              className={cn(
                "rounded-[5px] px-3 py-1 text-sm font-medium",
                p.id === providerId ? "bg-spence text-[var(--spence-paper)]" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-4 flex-1">
          {sent.length ? (
            <>
              <p className="text-base">
                One request to <span className="font-medium break-all">{provider.host}</span>, carrying only:
              </p>
              <pre className="mt-2 overflow-x-auto rounded-md border bg-background px-3 py-2.5 font-mono text-sm leading-relaxed">
                {JSON.stringify({ merchants: sent }, null, 2)}
              </pre>
            </>
          ) : (
            <p className="font-display text-3xl font-semibold tracking-tight">Nothing.</p>
          )}
          <p className="mt-3 text-base text-muted-foreground">
            {provider.local
              ? asked.length
                ? `The model runs on your machine, so ${asked.join(" and ")} never ${asked.length === 1 ? "goes" : "go"} further than localhost.`
                : "Every entry matched a rule, so no model is called at all."
              : asked.length
                ? "Amounts, dates and accounts stay in the local SQLite file."
                : "Every entry matched a rule, so no request is made."}
          </p>
        </div>

        <p className="mt-5 border-t pt-4 text-sm text-muted-foreground">
          API keys are encrypted with .NET Data Protection and never leave the machine either.
        </p>
      </aside>
    </div>
  );
}

export function SpenceShowcase({ stack }: { stack: string[] }) {
  return (
    <article className="spence mt-6 rounded-lg border bg-card p-6 sm:p-10" aria-labelledby="spence-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <SpenceMark className="size-12 shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">Personal project, open source</p>
            <h3 id="spence-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Spence
            </h3>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={SITE}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants(), "bg-spence text-base text-[var(--spence-paper)] hover:bg-spence/90")}
          >
            Open the project page
          </a>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "text-base")}
          >
            View the source
          </a>
        </div>
      </div>

      <p className="mt-6 max-w-[62ch] font-display text-2xl leading-snug font-medium tracking-tight sm:text-[1.75rem]">
        Know where the month went.
      </p>
      <p className="mt-4 max-w-[64ch] text-lg">
        A local-first expense tracker. Drop in a bank statement or type a purchase the way you'd text it; an AI model
        sorts every transaction, you check it, and it saves to one SQLite file on your own machine. It runs fully offline
        with Ollama, or with your own Gemini or OpenAI key. Around that sit bills, budgets, savings pots, weekly quests,
        a shareable Monthly Wrapped and Sprig, a small dashboard pet that never nags.
      </p>

      <QuickAddDemo />

      <h4 className="mt-12 text-xl font-semibold tracking-tight">Where the model is kept honest</h4>
      <dl className="mt-5 grid gap-x-10 gap-y-6 md:grid-cols-2">
        {decisions.map((d) => (
          <div key={d.title} className="max-w-[60ch]">
            <dt className="font-semibold">{d.title}</dt>
            <dd className="mt-1 text-base text-muted-foreground">{d.body}</dd>
          </div>
        ))}
      </dl>

      <figure className="mt-12 border-t pt-6">
        <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
          {layers.map((layer, i) => (
            <li key={layer.name} className="flex items-center gap-2 lg:flex-1 lg:items-stretch lg:gap-0">
              <div
                className={cn(
                  "flex-1 rounded-md border px-3 py-2.5",
                  layer.name === "Domain" && "border-spence/50 bg-[var(--spence-wash)]",
                )}
              >
                <p className="text-base font-semibold">{layer.name}</p>
                <p className="text-sm text-muted-foreground">{layer.detail}</p>
              </div>
              {i < layers.length - 1 && (
                <ChevronRight
                  aria-hidden="true"
                  className="hidden size-4 shrink-0 self-center text-muted-foreground lg:mx-1 lg:block"
                />
              )}
            </li>
          ))}
        </ol>
        <figcaption className="mt-3 text-sm text-muted-foreground">
          Each layer depends only on the layers after it; the domain knows nothing about SQLite, HTTP or any AI
          provider. 79 xUnit tests cover imports, quick add, bills, savings and backups.
        </figcaption>
      </figure>

      <div className="mt-10 border-t pt-6">
        <p className="max-w-[68ch] text-base">
          Download it for Windows, macOS or Linux from the{" "}
          <a href={SITE} target="_blank" rel="noopener noreferrer" className="text-link">
            project page
          </a>
          : unzip it, open Spence, and it starts in your browser. No installer, no account. On Windows it waits in the tray
          by the clock. GitHub Actions builds every{" "}
          <a href={RELEASES} target="_blank" rel="noopener noreferrer" className="text-link">
            release
          </a>{" "}
          from the open-source code.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">{stack.join(", ")}</p>
      </div>
    </article>
  );
}
