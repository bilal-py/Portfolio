import { useId, useMemo, useState, type CSSProperties, type FormEvent } from "react";
import { X } from "lucide-react";

import { buttonVariants } from "@/Components/ui/button";
import { detect, swatch, tokenFor, type Preset } from "@/lib/hushmaskDetect";
import { cn } from "@/lib/utils";

const LENA = tokenFor("PERSON", "Lena Hoffmann");

const SITE = "https://bilal-py.github.io/hushmask/";
const REPO = "https://github.com/bilal-py/hushmask";

const scenarios = [
  {
    id: "flat",
    label: "Flat contract",
    known: ["Lena Hoffmann"],
    text: "Hi, this is Lena Hoffmann. Please send the signed contract to lena.hoffmann@example.de or call me on +49 151 23456789. The deposit goes to DE89 3704 0044 0532 0130 00, and I move into Kastanienallee 12, 10435 Berlin on 1 March.",
  },
  {
    id: "ticket",
    label: "Support ticket",
    known: ["Arjun Mehta"],
    text: "Customer Arjun Mehta (arjun.mehta@example.in, 98765 43210) says his UPI payment to arjun@okaxis failed twice. PAN ABCPM1234K, account no. 50100234567890, IFSC HDFC0001234. Mr Mehta wants a refund today.",
  },
  {
    id: "invoice",
    label: "Invoice",
    known: ["Jonas Becker"],
    text: "Summarise this: Jonas Becker pays invoice 2026-117 with card 4111 1111 1111 1111. Ship the order to 221B Baker Street, London NW1 6XE and email the receipt to jonas@becker.co.uk.",
  },
];

const legend = [
  { family: "person", label: "People" },
  { family: "contact", label: "Email, phone, UPI" },
  { family: "number", label: "IBAN, card, ID numbers" },
  { family: "place", label: "Addresses" },
];

// docs/eval/RESULTS.md in the hushmask repo: share of personal values fully hidden.
const results = [
  { data: "ai4privacy, English", n: "500 everyday texts", patterns: 26.5, best: 87.0 },
  { data: "ai4privacy, German", n: "300 everyday texts", patterns: 25.6, best: 90.0 },
  { data: "Synthetic bank statements", n: "300, written by the project", patterns: 57.6, best: 99.5 },
];

const rules = [
  {
    title: "It fails closed.",
    body: "Masked text is scanned again before it leaves. If anything detectable survived, the request is refused instead of sent.",
  },
  {
    title: "Same value, same token.",
    body: `Lena is ${LENA} every time she appears, so the AI can still follow who did what. "Mr Becker" links back to "Jonas Becker".`,
  },
  {
    title: "Real values stay in memory.",
    body: "The mapping lives only for the request. Nothing is written to disk unless you ask the CLI for a vault file.",
  },
  {
    title: "Images and files are refused.",
    body: "They can't be masked, so the proxy blocks them unless you allow them for a specific app.",
  },
];

const pct = (n: number) => `${n.toFixed(1)}%`;

function HushmaskMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="7" fill="var(--secondary)" />
      <rect x="6" y="8" width="20" height="3" rx="1.5" fill="var(--muted-foreground)" />
      <rect x="6" y="14.5" width="20" height="4" rx="1" fill="var(--tape)" />
      <rect x="6" y="14.5" width="2.5" height="4" rx="1" fill="var(--hl-person)" />
      <rect x="6" y="22" width="13" height="3" rx="1.5" fill="var(--muted-foreground)" />
    </svg>
  );
}

function Tape({ type, children, className }: { type: string; children: string; className?: string }) {
  return (
    <span className={cn("hm-tape", className)} style={{ "--sw": swatch(type) } as CSSProperties}>
      {children}
    </span>
  );
}

function Playground() {
  const id = useId();
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const [text, setText] = useState(scenarios[0].text);
  const [known, setKnown] = useState<string[]>(scenarios[0].known);
  const [draft, setDraft] = useState("");
  const [preset, setPreset] = useState<Preset>("strict");

  const found = useMemo(() => detect(text, preset, known), [text, preset, known]);

  const vault = useMemo(() => {
    const seen = new Map<string, { type: string; text: string }>();
    for (const f of found) if (!seen.has(f.token)) seen.set(f.token, { type: f.type, text: f.text });
    return [...seen];
  }, [found]);

  const pick = (s: (typeof scenarios)[number]) => {
    setScenarioId(s.id);
    setText(s.text);
    setKnown(s.known);
  };

  const addKnown = (e: FormEvent) => {
    e.preventDefault();
    const name = draft.trim().replace(/\s+/g, " ");
    if (name && !known.some((k) => k.toLowerCase() === name.toLowerCase())) setKnown([...known, name]);
    setDraft("");
  };

  const pieces: (string | (typeof found)[number])[] = [];
  let pos = 0;
  for (const f of found) {
    pieces.push(text.slice(pos, f.start), f);
    pos = f.end;
  }
  pieces.push(text.slice(pos));

  return (
    <div className="mt-8 overflow-hidden rounded-md border">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Examples">
          {scenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === scenarioId}
              onClick={() => pick(s)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm",
                s.id === scenarioId
                  ? "border-foreground bg-foreground text-background"
                  : "text-muted-foreground hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 sm:ml-auto">
          <span id={`${id}-preset`} className="text-sm text-muted-foreground">
            Preset
          </span>
          <div className="inline-flex rounded-md border bg-background p-0.5" role="radiogroup" aria-labelledby={`${id}-preset`}>
            {(["strict", "finance"] as const).map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={p === preset}
                onClick={() => setPreset(p)}
                className={cn(
                  "rounded-[5px] px-3 py-1 text-sm font-medium capitalize",
                  p === preset ? "bg-tape text-tape-text" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="p-5 sm:p-6">
          <label htmlFor={`${id}-text`} className="font-semibold">
            Your text
          </label>
          <textarea
            id={`${id}-text`}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setScenarioId("");
            }}
            rows={7}
            spellCheck={false}
            className="mt-3 w-full resize-y rounded-md border border-input bg-background px-4 py-3 font-mono text-[0.9375rem] leading-relaxed outline-none focus-visible:border-ring"
          />

          <p id={`${id}-known`} className="mt-4 text-base font-semibold">
            Always hide
          </p>
          <p className="text-sm text-muted-foreground">
            Your own name and the people you write about. The real tool also runs a local names model, so it finds names
            nobody listed.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-labelledby={`${id}-known`}>
            {known.map((k) => (
              <li
                key={k}
                className="inline-flex items-center gap-2 rounded-md border bg-background py-0.5 pr-1 pl-2.5 text-sm"
              >
                <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-[var(--hl-person)]" />
                {k}
                <button
                  type="button"
                  onClick={() => setKnown(known.filter((x) => x !== k))}
                  aria-label={`Stop hiding ${k}`}
                  className="rounded p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={addKnown} className="mt-3 flex max-w-sm gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a name"
              aria-label="Name to always hide"
              autoComplete="off"
              className="h-9 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring"
            />
            <button type="submit" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9")}>
              Add
            </button>
          </form>
        </div>

        <div className="flex flex-col border-t bg-secondary/50 p-5 sm:p-6 lg:border-t-0 lg:border-l">
          <h4 id={`${id}-ai`} className="font-semibold">
            What the AI receives
          </h4>
          <p
            aria-labelledby={`${id}-ai`}
            aria-live="polite"
            className="mt-3 min-h-[11rem] rounded-md border bg-background px-4 py-3 font-mono text-[0.9375rem] leading-[1.9] break-words whitespace-pre-wrap"
          >
            {pieces.map((piece, i) =>
              typeof piece === "string" ? (
                piece
              ) : (
                <Tape key={i} type={piece.type} className="text-[0.85em]">
                  {piece.token}
                </Tape>
              ),
            )}
          </p>

          <h4 className="mt-6 font-semibold">Kept on your machine</h4>
          {vault.length ? (
            <>
              <p className="text-sm text-muted-foreground">
                The answer comes back with these tokens, and hushmask swaps each one for its real value.
              </p>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                {vault.map(([token, v]) => (
                  <div key={token} className="contents">
                    <dt>
                      <Tape type={v.type} className="text-[0.85em]">
                        {token}
                      </Tape>
                    </dt>
                    <dd className="min-w-0 self-center break-words">{v.text}</dd>
                  </div>
                ))}
              </dl>
            </>
          ) : (
            <p className="mt-1 text-base text-muted-foreground">
              Nothing to hide yet. Paste text with a name, email, phone number or IBAN.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t px-5 py-3 text-sm text-muted-foreground sm:px-6">
        {legend.map((l) => (
          <span key={l.family} className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="h-2.5 w-5 rounded-[3px]" style={{ background: `var(--hl-${l.family})` }} />
            {l.label}
          </span>
        ))}
        <span className="basis-full lg:ml-auto lg:basis-auto">Runs in your browser with hushmask's pattern rules.</span>
      </div>
    </div>
  );
}

function Results() {
  return (
    <figure className="mt-12">
      <h4 className="text-xl font-semibold tracking-tight">Measured on labelled data</h4>
      <p className="mt-1 max-w-[62ch] text-base text-muted-foreground">
        Share of personal values fully hidden. The synthetic statements were written by the project and flatter it;
        ai4privacy is the honest number.
      </p>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground" aria-hidden="true">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-5 rounded-[3px] bg-muted-foreground/35" />
          Patterns only
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-5 rounded-[3px] bg-foreground" />
          With the local names model
        </span>
      </div>
      <dl className="mt-5 space-y-5">
        {results.map((r) => (
          <div key={r.data} className="grid gap-x-6 gap-y-2 md:grid-cols-[15rem_1fr] md:items-center">
            <dt>
              <span className="font-semibold">{r.data}</span>
              <span className="block text-sm text-muted-foreground">{r.n}</span>
            </dt>
            <dd className="space-y-1.5">
              {[
                { label: "Patterns only", value: r.patterns, bar: "bg-muted-foreground/35", text: "text-muted-foreground" },
                { label: "With the names model", value: r.best, bar: "bg-foreground", text: "font-semibold" },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3" title={`${row.label}: ${pct(row.value)}`}>
                  <div className="h-3 flex-1">
                    <div className={cn("h-full rounded-r-[4px]", row.bar)} style={{ width: `${row.value}%` }} />
                  </div>
                  <span className={cn("w-14 text-right text-sm tabular-nums", row.text)}>
                    <span className="sr-only">{row.label}: </span>
                    {pct(row.value)}
                  </span>
                </div>
              ))}
            </dd>
          </div>
        ))}
      </dl>
      <figcaption className="mt-5 max-w-[68ch] text-sm text-muted-foreground">
        Does the AI still do the job? A local qwen2.5:7b sorted 52 transactions: 94.2% correct on real data, 92.3% on
        tokens only, and every name came back right.
      </figcaption>
    </figure>
  );
}

export function HushmaskShowcase({ stack }: { stack: string[] }) {
  return (
    <article id="hushmask" className="mt-6 scroll-mt-20 rounded-lg border bg-card p-6 sm:p-10" aria-labelledby="hushmask-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <HushmaskMark className="size-12 shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">Personal project, open source</p>
            <h3 id="hushmask-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              hushmask
            </h3>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={SITE} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants(), "text-base")}>
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
        Tell the AI everything except who you are.
      </p>
      <p className="mt-4 max-w-[64ch] text-lg">
        Hushmask makes it something anyone can put in front of
        any AI: a local proxy that hides names, emails, phone numbers, IBANs and addresses before text leaves your
        machine, then puts them back in the answer. Any app that talks to an OpenAI-style API uses it by changing one
        URL.
      </p>

      <div className="mt-6 grid max-w-[64ch] grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-2 text-base">
        <span className="text-muted-foreground">Presidio</span>
        <span>
          <span className="hm-tape" style={{ "--sw": "var(--muted-foreground)" } as CSSProperties}>
            &lt;PERSON&gt;
          </span>{" "}
          <span className="text-muted-foreground">for everyone, and the name is gone for good.</span>
        </span>
        <span className="text-muted-foreground">hushmask</span>
        <span>
          <Tape type="PERSON">{LENA}</Tape>{" "}
          <span className="text-muted-foreground">for Lena, every time, and Lena is back in the reply.</span>
        </span>
      </div>

      <Playground />

      <Results />

      <h4 className="mt-12 text-xl font-semibold tracking-tight">Rules it doesn't bend</h4>
      <dl className="mt-5 grid gap-x-10 gap-y-6 md:grid-cols-2">
        {rules.map((r) => (
          <div key={r.title} className="max-w-[60ch]">
            <dt className="font-semibold">{r.title}</dt>
            <dd className="mt-1 text-base text-muted-foreground">{r.body}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 border-t pt-6">
        <p className="text-base">
          Install it with <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.9em] whitespace-nowrap">uv tool install "hushmask[all]"</code>{" "}
          and open the dashboard with <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.9em] whitespace-nowrap">hushmask serve --open</code>.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">{stack.join(", ")}</p>
      </div>
    </article>
  );
}
