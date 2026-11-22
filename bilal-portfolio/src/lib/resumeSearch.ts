import { resumes, type Lang, type Resume } from "@/data/resume";

// A small BM25-style search over the resume, one index per language. Runs entirely in the browser.

type Doc = { source: string; answer: string; keywords: string };

type LangRules = {
  stopwords: Set<string>;
  synonyms: Record<string, string[]>;
  stem: (word: string) => string;
  docs: (r: Resume) => Doc[];
};

const words = (s: string) => new Set(s.split(/\s+/).filter(Boolean));

const en: LangRules = {
  stopwords: words(
    "a an the and or of to in on at for with by from is are was were be been am do does did you your yours he his she her they them it its i me my we our what which who whom how when where why can could would should will tell about any some have has had this that these those there here as into than then so if not no yes please much many more most work done know use used using ever experience",
  ),
  synonyms: {
    ai: ["genai", "llm", "claude", "generative", "agent"],
    genai: ["ai", "llm", "generative"],
    llm: ["ai", "genai", "claude"],
    ml: ["machine", "learning"],
    dotnet: ["net", "c#", "csharp"],
    csharp: ["c#", "net"],
    frontend: ["angular", "react", "ui"],
    backend: ["net", "sql", "api"],
    database: ["sql", "postgresql", "server"],
    db: ["sql", "postgresql"],
    cloud: ["aws", "bedrock"],
    test: ["testing", "qa", "xunit"],
    job: ["role", "work", "experience"],
    company: ["experience", "work"],
    current: ["present", "thoughtworks"],
    now: ["present", "thoughtworks"],
    germany: ["relocation", "relocate", "open", "roles"],
    relocate: ["germany", "relocation"],
    visa: ["germany", "relocation"],
    hire: ["contact", "email", "available"],
    available: ["open", "roles", "availability"],
    reach: ["contact", "email"],
    degree: ["education", "b.tech", "university"],
    college: ["education", "institute"],
    university: ["education", "institute"],
    cert: ["certification", "certified"],
    certificate: ["certification", "certified"],
    leetcode: ["problem", "solving", "contest"],
    dsa: ["algorithms", "problem", "leetcode"],
    privacy: ["presidio", "pii", "redact", "hushmask", "mask"],
    pii: ["presidio", "privacy", "hushmask"],
    mask: ["hushmask", "privacy", "pii"],
    masking: ["hushmask", "privacy", "pii"],
    proxy: ["hushmask", "openai"],
    python: ["hushmask", "presidio", "fastapi"],
    pypi: ["hushmask", "python"],
    gdpr: ["hushmask", "privacy"],
    cost: ["optimisation", "cheaper", "lower"],
    years: ["experience"],
    expense: ["spence", "finance", "tracker"],
    money: ["spence", "expense", "finance"],
    finance: ["spence", "expense"],
    personal: ["spence", "project"],
    side: ["spence", "personal", "project"],
    ollama: ["spence", "local"],
    download: ["spence", "windows", "release"],
    desktop: ["spence", "windows", "tray"],
    budget: ["spence", "expense"],
    local: ["spence", "ollama", "sqlite"],
  },
  stem: (w) => w.replace(/(ing|ed|es|s)$/, "") || w,
  docs: ({ profile, experience, projects, skills, certifications, achievements, education }) => [
    {
      source: "About",
      answer: profile.summary,
      keywords: "summary about yourself who background overview introduce profile",
    },
    {
      source: "Availability",
      answer: `I'm based in ${profile.location}. ${profile.availability}. For details like notice period or relocation, send me a message through the contact form.`,
      keywords: "available availability open roles germany relocation relocate location based where live notice visa move",
    },
    {
      source: "Contact",
      answer: `You can email me at ${profile.email} or use the contact form on this page. My CV is available to download at the top of the page.`,
      keywords: "contact email reach hire message talk cv resume download phone call",
    },
    {
      source: "Experience",
      answer: `I have 4+ years of professional experience: ${experience
        .filter((j) => !j.internship)
        .map((j) => `${j.role} at ${j.company} (${j.period})`)
        .join(", ")}.`,
      keywords: "years long career total history companies worked",
    },
    ...experience.map((job) => ({
      source: `Experience: ${job.company}`,
      answer: `${job.role} at ${job.company}, ${job.period}. ${job.highlights.join(" ")} Stack: ${job.stack.join(", ")}.`,
      keywords: `${job.company} ${job.role} ${job.location ?? ""} ${job.current ? "current present now" : ""}`,
    })),
    ...projects.map((p) => ({
      source: `Project: ${p.title}`,
      answer: `${p.title} (${p.context}). ${p.problem} ${p.approach} ${p.impact}`,
      keywords: `project built ${
        p.showcase === "spence"
          ? "spence spence personal side open source expense tracker finance budget local-first"
          : p.showcase === "hushmask"
            ? "hushmask hushmask personal side open source privacy pii mask masking proxy gdpr"
            : ""
      } ${p.stack.join(" ")}`,
    })),
    ...skills.map((group) => ({
      source: `Skills: ${group.category}`,
      answer: `${group.category}: ${group.items.join(", ")}.`,
      keywords: `skills technologies tech stack tools ${group.category} ${group.items.join(" ")}`,
    })),
    {
      source: "Certifications",
      answer: `Certifications: ${certifications.map((c) => `${c.title} (${c.issuer})`).join(", ")}.`,
      keywords: "certification certified certificate aws hackerrank credential",
    },
    {
      source: "Achievements",
      answer: achievements.join(" "),
      keywords: "achievement award ranking leetcode hackerrank contest problem solving hackathon",
    },
    {
      source: "Education",
      answer: education.map((e) => `${e.degree}, ${e.institution} (${e.period}${e.detail ? `, ${e.detail}` : ""}).`).join(" "),
      keywords: "education degree study studied university college school graduate cgpa grade",
    },
  ],
};

const de: LangRules = {
  stopwords: words(
    "der die das den dem des und oder ein eine einer eines einem einen zu im in am an auf aus für mit von vom zum zur bei ist sind war waren sein bin bist hast haben hat hatte habe sie ihr ihre ihren ihrem ihnen ihres du dein deine dir dich ich mich mir mein meine meinen wir uns unser was welche welcher welches welchen wer wen wem wie wann wo woran warum kann können könnten würde würden sollte bitte über als so wenn nicht kein keine ja nein auch noch schon sehr viel viele mehr meisten machen macht gemacht arbeit arbeiten gearbeitet erfahrung erzählen sagen gibt es etwas man mal denn dass",
  ),
  synonyms: {
    ki: ["genai", "llm", "claude", "generativ", "agent"],
    genai: ["ki", "llm", "generativ"],
    llm: ["ki", "genai", "claude"],
    ml: ["machine", "learning"],
    dotnet: ["net", "c#", "csharp"],
    csharp: ["c#", "net"],
    frontend: ["angular", "react", "ui"],
    backend: ["net", "sql", "api"],
    datenbank: ["sql", "postgresql", "server"],
    cloud: ["aws", "bedrock"],
    test: ["testing", "qa", "xunit"],
    sprache: ["programmiersprachen"],
    programmiersprache: ["programmiersprachen"],
    framework: ["frameworks", "bibliotheken"],
    bibliothek: ["bibliotheken", "frameworks"],
    stelle: ["deutschland", "offen", "verfügbarkeit"],
    job: ["stelle", "berufserfahrung"],
    firma: ["berufserfahrung", "unternehmen"],
    unternehmen: ["berufserfahrung"],
    aktuell: ["heute", "thoughtworks"],
    jetzt: ["heute", "thoughtworks"],
    deutschland: ["umzug", "offen", "stellen"],
    umzug: ["deutschland", "verfügbarkeit"],
    umziehen: ["deutschland", "umzug"],
    visum: ["deutschland", "umzug"],
    einstellen: ["kontakt", "e-mail", "verfügbar"],
    verfügbar: ["offen", "stellen", "verfügbarkeit"],
    erreichen: ["kontakt", "e-mail"],
    abschluss: ["ausbildung", "b.tech", "informatik"],
    studium: ["ausbildung", "b.tech", "informatik"],
    hochschule: ["ausbildung", "institute"],
    universität: ["ausbildung", "institute"],
    zertifikat: ["zertifikate", "certified"],
    zertifizierung: ["zertifikate", "certified"],
    leetcode: ["problem", "solving", "contest"],
    algorithmen: ["datenstrukturen", "problem", "leetcode"],
    datenschutz: ["presidio", "hushmask", "maskierung", "personenbezogen"],
    dsgvo: ["hushmask", "datenschutz"],
    pii: ["presidio", "datenschutz", "hushmask"],
    maskierung: ["hushmask", "datenschutz", "pii"],
    proxy: ["hushmask", "openai"],
    python: ["hushmask", "presidio", "fastapi"],
    pypi: ["hushmask", "python"],
    kosten: ["senkung", "aufwand", "günstig"],
    jahre: ["berufserfahrung"],
    ausgaben: ["spence", "finanzen", "ausgabentracker"],
    geld: ["spence", "ausgaben", "finanzen"],
    finanzen: ["spence", "ausgaben"],
    privat: ["spence", "hushmask", "projekt"],
    ollama: ["spence", "lokal"],
    download: ["spence", "windows", "herunterladen"],
    budget: ["spence", "ausgaben"],
    lokal: ["spence", "ollama", "sqlite"],
  },
  // Light German stemming: enough to match "Zertifikate" with "Zertifikat" or "Projekten" with "Projekt".
  stem: (w) => (w.length > 4 ? w.replace(/(ungen|en|er|es|em|e|n|s)$/, "") : w),
  docs: ({ profile, experience, projects, skills, certifications, achievements, education }) => [
    {
      source: "Über mich",
      answer: profile.summary,
      keywords: "zusammenfassung über mich wer hintergrund überblick vorstellen profil person",
    },
    {
      source: "Verfügbarkeit",
      answer: `Ich wohne in ${profile.location}. ${profile.availability}. Für Details wie Kündigungsfrist oder Umzug schreiben Sie mir gern über das Kontaktformular.`,
      keywords: "verfügbar verfügbarkeit offen stellen stelle deutschland umzug umziehen wohnort wohnen wo leben kündigungsfrist visum standort",
    },
    {
      source: "Kontakt",
      answer: `Sie erreichen mich per E-Mail unter ${profile.email} oder über das Kontaktformular auf dieser Seite. Meinen Lebenslauf können Sie oben auf der Seite herunterladen.`,
      keywords: "kontakt e-mail email erreichen einstellen nachricht sprechen lebenslauf cv herunterladen telefon anrufen",
    },
    {
      source: "Berufserfahrung",
      answer: `Ich habe über 4 Jahre Berufserfahrung: ${experience
        .filter((j) => !j.internship)
        .map((j) => `${j.role} bei ${j.company} (${j.period})`)
        .join(", ")}.`,
      keywords: "jahre lange karriere insgesamt werdegang unternehmen firmen berufserfahrung",
    },
    ...experience.map((job) => ({
      source: `Berufserfahrung: ${job.company}`,
      answer: `${job.role} bei ${job.company}, ${job.period}. ${job.highlights.join(" ")} Technologien: ${job.stack.join(", ")}.`,
      keywords: `${job.company} ${job.role} ${job.location ?? ""} ${job.current ? "aktuell heute jetzt derzeit" : ""}`,
    })),
    ...projects.map((p) => ({
      source: `Projekt: ${p.title}`,
      answer: `${p.title} (${p.context}). ${p.problem} ${p.approach} ${p.impact}`,
      keywords: `projekt gebaut entwickelt ${
        p.showcase === "spence"
          ? "spence spence privat open source ausgaben tracker finanzen budget lokal"
          : p.showcase === "hushmask"
            ? "hushmask hushmask privat open source datenschutz pii maskierung proxy dsgvo"
            : ""
      } ${p.stack.join(" ")}`,
    })),
    ...skills.map((group) => ({
      source: `Kenntnisse: ${group.category}`,
      answer: `${group.category}: ${group.items.join(", ")}.`,
      keywords: `kenntnisse fähigkeiten skills technologien tech stack tools ${group.category} ${
        // German compounds: "Programmiersprachen" should also match a plain "Sprachen".
        /sprachen/i.test(group.category) ? "sprachen sprache" : ""
      } ${group.items.join(" ")}`,
    })),
    {
      source: "Zertifikate",
      answer: `Zertifikate: ${certifications.map((c) => `${c.title} (${c.issuer})`).join(", ")}.`,
      keywords: "zertifikat zertifikate zertifiziert zertifizierung aws hackerrank nachweis",
    },
    {
      source: "Erfolge",
      answer: achievements.join(" "),
      keywords: "erfolg erfolge auszeichnung auszeichnungen ranking leetcode hackerrank contest problem solving hackathon",
    },
    {
      source: "Ausbildung",
      answer: education.map((e) => `${e.degree}, ${e.institution} (${e.period}${e.detail ? `, ${e.detail}` : ""}).`).join(" "),
      keywords: "ausbildung abschluss studium studiert universität hochschule schule note cgpa",
    },
  ],
};

const rules: Record<Lang, LangRules> = { en, de };

function tokenize(text: string, r: LangRules) {
  return text
    .toLowerCase()
    .replace(/\.net/g, " dotnet net ")
    .replace(/c#/g, " csharp c# ")
    .split(/[^\p{L}\p{N}#+.]+/u)
    .map((t) => t.replace(/^\.+|\.+$/g, ""))
    .filter((t) => t && !r.stopwords.has(t))
    .map(r.stem);
}

type Index = { docs: Doc[]; tokens: string[][]; df: Map<string, number>; synonyms: Map<string, string[]> };
const indexes = new Map<Lang, Index>();

function indexFor(lang: Lang): Index {
  let index = indexes.get(lang);
  if (!index) {
    const r = rules[lang];
    const docs = r.docs(resumes[lang]);
    const tokens = docs.map((d) => tokenize(`${d.source} ${d.answer} ${d.keywords}`, r));
    const df = new Map<string, number>();
    for (const t of tokens) for (const term of new Set(t)) df.set(term, (df.get(term) ?? 0) + 1);
    // Questions are stemmed before lookup, so key the synonyms by stem as well.
    const synonyms = new Map<string, string[]>();
    for (const [word, list] of Object.entries(r.synonyms)) {
      const key = r.stem(word);
      synonyms.set(key, [...(synonyms.get(key) ?? []), ...list]);
    }
    index = { docs, tokens, df, synonyms };
    indexes.set(lang, index);
  }
  return index;
}

export type SearchResult = { answer: string; source: string }[];

export function searchResume(question: string, lang: Lang = "en"): SearchResult {
  const r = rules[lang];
  const { docs, tokens: docTokens, df, synonyms } = indexFor(lang);
  const idf = (term: string) => {
    const n = df.get(term) ?? 0;
    return Math.log(1 + (docs.length - n + 0.5) / (n + 0.5));
  };

  const expanded = new Map<string, number>();
  for (const word of tokenize(question, r)) {
    expanded.set(word, Math.max(expanded.get(word) ?? 0, 1));
    for (const syn of synonyms.get(word) ?? []) {
      const s = r.stem(syn);
      expanded.set(s, Math.max(expanded.get(s) ?? 0, 0.5));
    }
  }
  if (expanded.size === 0) return [];

  const scored = docs.map((doc, i) => {
    const tokens = docTokens[i];
    const counts = new Map<string, number>();
    for (const t of tokens) counts.set(t, (counts.get(t) ?? 0) + 1);
    let score = 0;
    for (const [term, weight] of expanded) {
      const tf = counts.get(term) ?? 0;
      if (tf) score += weight * idf(term) * ((tf * 2.2) / (tf + 1.2 * (0.25 + 0.75 * (tokens.length / 60))));
    }
    return { doc, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  if (!best || best.score < 1.2) return [];
  return scored
    .filter((s, i) => i === 0 || s.score >= best.score * 0.75)
    .slice(0, 2)
    .map((s) => ({ answer: s.doc.answer, source: s.doc.source }));
}
