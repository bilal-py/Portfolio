import { useId, useMemo, useState } from "react";
import { ChevronRight, RotateCcw } from "lucide-react";

import { buttonVariants } from "@/Components/ui/button";
import type { Lang } from "@/data/resume";
import { useCopy, useLang } from "@/i18n/lang";
import { CATEGORIES, parseLine, type Category, type Entry } from "@/lib/spenceQuickAdd";
import { cn } from "@/lib/utils";

const SITE = "https://bilal-py.github.io/spence-ai/";
const REPO = "https://github.com/bilal-py/spence-ai";
const RELEASES = "https://github.com/bilal-py/spence-ai/releases/latest";

// Quick add understands English, like the app itself, so the examples stay English on the German page too.
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

const DAYS: Record<string, string> = {
  Sun: "Sonntag",
  Mon: "Montag",
  Tue: "Dienstag",
  Wed: "Mittwoch",
  Thu: "Donnerstag",
  Fri: "Freitag",
  Sat: "Samstag",
};
const MONTHS: Record<string, string> = {
  Jan: "Jan.",
  Feb: "Feb.",
  Mar: "März",
  Apr: "Apr.",
  May: "Mai",
  Jun: "Juni",
  Jul: "Juli",
  Aug: "Aug.",
  Sep: "Sept.",
  Oct: "Okt.",
  Nov: "Nov.",
  Dec: "Dez.",
};

const copy = {
  en: {
    eyebrow: "Personal project, open source",
    openSite: "Open the project page",
    viewSource: "View the source",
    tagline: "Know where the month went.",
    intro:
      "A local-first expense tracker. Drop in a bank statement or type a purchase the way you'd text it; an AI model sorts every transaction, you check it, and it saves to one SQLite file on your own machine. It runs fully offline with Ollama, or with your own Gemini or OpenAI key. Around that sit bills, budgets, savings pots, weekly quests, a shareable Monthly Wrapped and Sprig, a small dashboard pet that never nags.",
    source: {
      rule: "Matched a rule",
      learned: "Learned from you",
      ai: "Asks the AI",
      none: "No category needed",
    } as Record<Source, string>,
    categories: {} as Record<string, string>,
    type: { Income: "Income", Refund: "Refund", Transfer: "Transfer" } as Record<string, string>,
    bill: (repeat: string) => `${repeat} bill`,
    when: (when: string) => when,
    account: (account: string) => account,
    something: "Something",
    pickCategory: (merchant: string) => `Pick a category for ${merchant}. Spence will remember it.`,
    teach: "Teach it a category",
    inputLabel: "Type an expense the way you'd text it",
    inputHint:
      "Separate entries with commas. Plain rules parse each one; the AI is only asked about merchants they can't place.",
    examples: "Examples",
    emptyBefore: "Type something like ",
    emptyAfter: " to see it parsed.",
    forget: (n: number) => `Forget ${n === 1 ? "the rule" : `${n} rules`} it learned`,
    egress: "What leaves your computer",
    provider: "AI provider",
    requestBefore: "One request to ",
    requestAfter: ", carrying only:",
    nothing: "Nothing.",
    localAsked: (names: string[]) =>
      `The model runs on your machine, so ${names.join(" and ")} never ${names.length === 1 ? "goes" : "go"} further than localhost.`,
    localNone: "Every entry matched a rule, so no model is called at all.",
    remoteAsked: "Amounts, dates and accounts stay in the local SQLite file.",
    remoteNone: "Every entry matched a rule, so no request is made.",
    keys: "API keys are encrypted with .NET Data Protection and never leave the machine either.",
    decisionsTitle: "Where the model is kept honest",
    decisions: [
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
    ],
    layerDetails: [
      "React 19, TanStack Query",
      "Minimal APIs",
      "EF Core, SQLite, PdfPig, import worker",
      "Imports, quick add, bills, savings, ask",
      "Transactions, rules, pots",
    ],
    layersCaption:
      "Each layer depends only on the layers after it; the domain knows nothing about SQLite, HTTP or any AI provider. 79 xUnit tests cover imports, quick add, bills, savings and backups.",
    download: [
      "Download it for Windows, macOS or Linux from the ",
      "project page",
      ": unzip it, open Spence, and it starts in your browser. No installer, no account. On Windows it waits in the tray by the clock. GitHub Actions builds every ",
      "release",
      " from the open-source code.",
    ],
  },
  de: {
    eyebrow: "Privates Projekt, Open Source",
    openSite: "Projektseite öffnen",
    viewSource: "Quellcode ansehen",
    tagline: "Wissen, wo der Monat geblieben ist.",
    intro:
      "Ein Local-First-Ausgabentracker. Ziehen Sie einen Kontoauszug hinein oder tippen Sie einen Kauf so ein, wie Sie ihn per Nachricht schreiben würden: Ein KI-Modell ordnet jede Transaktion zu, Sie prüfen das Ergebnis, und alles wird in einer SQLite-Datei auf Ihrem eigenen Rechner gespeichert. Spence läuft komplett offline mit Ollama oder mit Ihrem eigenen Gemini- oder OpenAI-Schlüssel. Dazu kommen Rechnungen, Budgets, Spartöpfe, wöchentliche Quests, ein teilbares Monthly Wrapped und Sprig, ein kleines Dashboard-Haustier, das nie nörgelt.",
    source: {
      rule: "Per Regel erkannt",
      learned: "Von Ihnen gelernt",
      ai: "Fragt die KI",
      none: "Keine Kategorie nötig",
    } as Record<Source, string>,
    categories: {
      Dining: "Essen gehen",
      Transport: "Verkehr",
      Groceries: "Lebensmittel",
      Shopping: "Shopping",
      Subscriptions: "Abos",
      Bills: "Rechnungen",
      Health: "Gesundheit",
      Entertainment: "Unterhaltung",
      Income: "Einkommen",
    } as Record<string, string>,
    type: { Income: "Einnahme", Refund: "Erstattung", Transfer: "Umbuchung" } as Record<string, string>,
    bill: (repeat: string) =>
      ({ Monthly: "Monatliche Rechnung", Weekly: "Wöchentliche Rechnung", Yearly: "Jährliche Rechnung" })[repeat] ??
      repeat,
    when: (when: string) => {
      if (when === "Today") return "Heute";
      if (when === "Yesterday") return "Gestern";
      const day = when.match(/^(Last )?(\w{3})$/);
      if (day && DAYS[day[2]]) return day[1] ? `Letzten ${DAYS[day[2]]}` : DAYS[day[2]];
      const date = when.match(/^(\d{1,2}) (\w{3})$/);
      if (date && MONTHS[date[2]]) return `${date[1]}. ${MONTHS[date[2]]}`;
      return when;
    },
    account: (account: string) => ({ Cash: "Bar", Card: "Karte" })[account] ?? account,
    something: "Etwas",
    pickCategory: (merchant: string) => `Kategorie für ${merchant} wählen. Spence merkt sie sich.`,
    teach: "Kategorie beibringen",
    inputLabel: "Tippen Sie eine Ausgabe ein, wie Sie sie per Nachricht schreiben würden",
    inputHint:
      "Trennen Sie Einträge mit Kommas. Einfache Regeln zerlegen jeden Eintrag; die KI wird nur zu Händlern gefragt, die sie nicht zuordnen können. Wie die App selbst versteht die Schnelleingabe Englisch.",
    examples: "Beispiele",
    emptyBefore: "Tippen Sie etwas wie ",
    emptyAfter: " ein, um es zerlegt zu sehen.",
    forget: (n: number) => (n === 1 ? "Die gelernte Regel vergessen" : `Die ${n} gelernten Regeln vergessen`),
    egress: "Was Ihren Rechner verlässt",
    provider: "KI-Anbieter",
    requestBefore: "Eine Anfrage an ",
    requestAfter: ", die nur Folgendes enthält:",
    nothing: "Nichts.",
    localAsked: (names: string[]) =>
      `Das Modell läuft auf Ihrem Rechner, deshalb ${names.length === 1 ? "gelangt" : "gelangen"} ${names.join(" und ")} nie über localhost hinaus.`,
    localNone: "Jeder Eintrag passt zu einer Regel, also wird gar kein Modell aufgerufen.",
    remoteAsked: "Beträge, Datumsangaben und Konten bleiben in der lokalen SQLite-Datei.",
    remoteNone: "Jeder Eintrag passt zu einer Regel, also wird keine Anfrage gesendet.",
    keys: "API-Schlüssel werden mit .NET Data Protection verschlüsselt und verlassen den Rechner ebenfalls nie.",
    decisionsTitle: "Wie das Modell ehrlich bleibt",
    decisions: [
      {
        title: "Die Zahlen des Modells werden mit dem Auszug abgeglichen.",
        body: "Jeder extrahierte Betrag wird mit dem Text des Auszugs abgeglichen, den das Modell gelesen hat. Steht ein Betrag dort nicht, wird er markiert und abgewählt. So fallen zusammengeführte Zeilen und erfundene Buchungen auf, bevor sie im Haushaltsbuch landen.",
      },
      {
        title: "Das Datumsformat wird pro Auszug bestimmt, nicht pro Zeile.",
        body: "Ob der Tag oder der Monat zuerst steht, ergibt sich aus den gedruckten Datumsangaben: zuerst aus einem Wert über 12, dann aus der kürzesten Zeitspanne. Der eigenen Vermutung des Modells zu 03/04 wird nie vertraut.",
      },
      {
        title: "Korrekturen werden zu Regeln.",
        body: "Ändern Sie bei der Prüfung eine Kategorie, speichert Spence eine Händlerregel. Beim nächsten Mal gewinnt die längste passende Regel gegen das Modell, sodass derselbe Fehler nicht zweimal passiert.",
      },
      {
        title: "Die KI sieht so wenig wie möglich.",
        body: "Monatszusammenfassungen erhalten vorab berechnete Summen, nie einzelne Buchungen. Bei Fragen ruft das Modell rein lesende Abfrage-Tools auf, die auf 25 Zeilen begrenzt sind, und unter jeder Antwort steht, was es sich angesehen hat.",
      },
    ],
    layerDetails: [
      "React 19, TanStack Query",
      "Minimal APIs",
      "EF Core, SQLite, PdfPig, Import-Worker",
      "Importe, Schnelleingabe, Rechnungen, Sparen, Fragen",
      "Transaktionen, Regeln, Töpfe",
    ],
    layersCaption:
      "Jede Schicht hängt nur von den Schichten danach ab; die Domain weiß nichts von SQLite, HTTP oder einem KI-Anbieter. 79 xUnit-Tests decken Importe, Schnelleingabe, Rechnungen, Sparen und Backups ab.",
    download: [
      "Spence gibt es für Windows, macOS und Linux auf der ",
      "Projektseite",
      ": entpacken, Spence öffnen, und es startet im Browser. Kein Installer, kein Konto. Unter Windows wartet es im Infobereich neben der Uhr. GitHub Actions baut jedes ",
      "Release",
      " aus dem Open-Source-Code.",
    ],
  },
};

type Copy = (typeof copy)["en"];

// Layer names are the project's own assembly names, so they stay in English.
const layers = ["Web app", "WebApi", "Infrastructure", "Application", "Domain"];

/** Rupees in the page's number format: ₹80,000 in English, 80.000 ₹ in German. */
const formatINR = (n: number, lang: Lang) =>
  new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(n);

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

function CategoryLabel({ category, t }: { category: Category; t: Copy }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: category.color }} />
      {t.categories[category.name] ?? category.name}
    </span>
  );
}

function EntryRow({
  entry,
  source,
  category,
  onTeach,
  t,
}: {
  entry: Entry;
  source: Source;
  category: Category | null;
  onTeach: (name: string) => void;
  t: Copy;
}) {
  const { lang } = useLang();
  const meta = [
    entry.type !== "Expense" ? t.type[entry.type] : null,
    entry.repeat ? t.bill(entry.repeat) : t.when(entry.when),
    entry.account ? t.account(entry.account) : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <li className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-1 border-b py-3 last:border-b-0 sm:grid-cols-[6rem_1fr_auto] sm:items-center">
      <span className={cn("font-semibold tabular-nums", entry.amount == null && "text-muted-foreground")}>
        {entry.amount == null ? "₹?" : formatINR(entry.amount, lang)}
      </span>
      <span className="min-w-0">
        <span className="font-medium">{entry.merchant || t.something}</span>
        {meta && <span className="text-muted-foreground"> {meta}</span>}
      </span>
      <span className="col-start-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-base sm:col-start-3 sm:justify-end">
        {source === "ai" ? (
          <select
            className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            defaultValue=""
            aria-label={t.pickCategory(entry.merchant)}
            onChange={(e) => onTeach(e.target.value)}
          >
            <option value="" disabled>
              {t.teach}
            </option>
            {CATEGORIES.filter((c) => c.name !== "Income").map((c) => (
              <option key={c.name} value={c.name}>
                {t.categories[c.name] ?? c.name}
              </option>
            ))}
          </select>
        ) : (
          category && <CategoryLabel category={category} t={t} />
        )}
        <span
          className={cn(
            "text-sm",
            source === "learned" ? "font-medium text-spence" : "text-muted-foreground",
            source === "ai" && "text-foreground",
          )}
        >
          {t.source[source]}
        </span>
      </span>
    </li>
  );
}

function QuickAddDemo({ t }: { t: Copy }) {
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
          {t.inputLabel}
        </label>
        <p className="mt-1 text-base text-muted-foreground">{t.inputHint}</p>
        <input
          id={inputId}
          lang="en"
          value={text}
          maxLength={200}
          autoComplete="off"
          spellCheck={false}
          onChange={(e) => setText(e.target.value)}
          className="mt-4 h-12 w-full rounded-md border border-input bg-background px-4 text-base outline-none focus-visible:border-ring"
        />
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={t.examples}>
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              lang="en"
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
                t={t}
                onTeach={(name) => setLearned((l) => ({ ...l, [r.entry.key]: name }))}
              />
            ))}
          </ul>
        ) : (
          <p className="mt-5 border-t pt-4 text-base text-muted-foreground">
            {t.emptyBefore}
            <i lang="en">coffee 120 yesterday</i>
            {t.emptyAfter}
          </p>
        )}

        {learnedCount > 0 && (
          <button
            type="button"
            onClick={() => setLearned({})}
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            {t.forget(learnedCount)}
          </button>
        )}
      </div>

      <aside
        aria-labelledby={`${inputId}-egress`}
        className="flex flex-col border-t bg-[var(--spence-wash)] p-5 sm:p-6 lg:border-t-0 lg:border-l"
      >
        <h4 id={`${inputId}-egress`} className="font-semibold">
          {t.egress}
        </h4>
        <div className="mt-3 inline-flex self-start rounded-md border bg-background p-0.5" role="group" aria-label={t.provider}>
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
                {t.requestBefore}
                <span className="font-medium break-all">{provider.host}</span>
                {t.requestAfter}
              </p>
              <pre className="mt-2 overflow-x-auto rounded-md border bg-background px-3 py-2.5 font-mono text-sm leading-relaxed">
                {JSON.stringify({ merchants: sent }, null, 2)}
              </pre>
            </>
          ) : (
            <p className="font-display text-3xl font-semibold tracking-tight">{t.nothing}</p>
          )}
          <p className="mt-3 text-base text-muted-foreground">
            {provider.local
              ? asked.length
                ? t.localAsked(asked)
                : t.localNone
              : asked.length
                ? t.remoteAsked
                : t.remoteNone}
          </p>
        </div>

        <p className="mt-5 border-t pt-4 text-sm text-muted-foreground">{t.keys}</p>
      </aside>
    </div>
  );
}

export function SpenceShowcase({ stack }: { stack: string[] }) {
  const t = useCopy(copy);
  return (
    <article className="spence mt-6 rounded-lg border bg-card p-6 sm:p-10" aria-labelledby="spence-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <SpenceMark className="size-12 shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">{t.eyebrow}</p>
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
            {t.openSite}
          </a>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "text-base")}
          >
            {t.viewSource}
          </a>
        </div>
      </div>

      <p className="mt-6 max-w-[62ch] font-display text-2xl leading-snug font-medium tracking-tight sm:text-[1.75rem]">
        {t.tagline}
      </p>
      <p className="mt-4 max-w-[64ch] text-lg">{t.intro}</p>

      <QuickAddDemo t={t} />

      <h4 className="mt-12 text-xl font-semibold tracking-tight">{t.decisionsTitle}</h4>
      <dl className="mt-5 grid gap-x-10 gap-y-6 md:grid-cols-2">
        {t.decisions.map((d) => (
          <div key={d.title} className="max-w-[60ch]">
            <dt className="font-semibold">{d.title}</dt>
            <dd className="mt-1 text-base text-muted-foreground">{d.body}</dd>
          </div>
        ))}
      </dl>

      <figure className="mt-12 border-t pt-6">
        <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
          {layers.map((name, i) => (
            <li key={name} className="flex items-center gap-2 lg:flex-1 lg:items-stretch lg:gap-0">
              <div
                className={cn(
                  "flex-1 rounded-md border px-3 py-2.5",
                  name === "Domain" && "border-spence/50 bg-[var(--spence-wash)]",
                )}
              >
                <p className="text-base font-semibold" lang="en">
                  {name}
                </p>
                <p className="text-sm text-muted-foreground">{t.layerDetails[i]}</p>
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
        <figcaption className="mt-3 text-sm text-muted-foreground">{t.layersCaption}</figcaption>
      </figure>

      <div className="mt-10 border-t pt-6">
        <p className="max-w-[68ch] text-base">
          {t.download[0]}
          <a href={SITE} target="_blank" rel="noopener noreferrer" className="text-link">
            {t.download[1]}
          </a>
          {t.download[2]}
          <a href={RELEASES} target="_blank" rel="noopener noreferrer" className="text-link">
            {t.download[3]}
          </a>
          {t.download[4]}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">{stack.join(", ")}</p>
      </div>
    </article>
  );
}
