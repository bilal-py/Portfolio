import { achievements, certifications, education, experience, profile, projects, skills } from "@/data/resume";

type Doc = { source: string; answer: string; keywords: string };

const STOPWORDS = new Set(
  "a an the and or of to in on at for with by from is are was were be been am do does did you your yours he his she her they them it its i me my we our what which who whom how when where why can could would should will tell about any some have has had this that these those there here as into than then so if not no yes please much many more most work done know use used using ever experience".split(
    " ",
  ),
);

const SYNONYMS: Record<string, string[]> = {
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
  privacy: ["presidio", "pii", "redact"],
  pii: ["presidio", "privacy"],
  cost: ["optimisation", "cheaper", "lower"],
  years: ["experience"],
};

function stem(word: string) {
  return word.replace(/(ing|ed|es|s)$/, "") || word;
}

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/\.net/g, " dotnet net ")
    .replace(/c#/g, " csharp c# ")
    .split(/[^a-z0-9#+.]+/)
    .map((t) => t.replace(/^\.+|\.+$/g, ""))
    .filter((t) => t && !STOPWORDS.has(t))
    .map(stem);
}

function buildDocs(): Doc[] {
  const docs: Doc[] = [
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
        .filter((j) => !j.role.includes("Intern"))
        .map((j) => `${j.role} at ${j.company} (${j.period})`)
        .join(", ")}.`,
      keywords: "years long career total history companies worked",
    },
  ];

  for (const job of experience) {
    docs.push({
      source: `Experience: ${job.company}`,
      answer: `${job.role} at ${job.company}, ${job.period}. ${job.highlights.join(" ")} Stack: ${job.stack.join(", ")}.`,
      keywords: `${job.company} ${job.role} ${job.location ?? ""} ${job.current ? "current present now" : ""}`,
    });
  }

  for (const p of projects) {
    docs.push({
      source: `Project: ${p.title}`,
      answer: `${p.title} (${p.context}). ${p.problem} ${p.approach} ${p.impact}`,
      keywords: `project built ${p.stack.join(" ")}`,
    });
  }

  for (const group of skills) {
    docs.push({
      source: `Skills: ${group.category}`,
      answer: `${group.category}: ${group.items.join(", ")}.`,
      keywords: `skills technologies tech stack tools ${group.category} ${group.items.join(" ")}`,
    });
  }

  docs.push({
    source: "Certifications",
    answer: `Certifications: ${certifications.map((c) => `${c.title} (${c.issuer})`).join(", ")}.`,
    keywords: "certification certified certificate aws hackerrank credential",
  });

  docs.push({
    source: "Achievements",
    answer: achievements.join(" "),
    keywords: "achievement award ranking leetcode hackerrank contest problem solving hackathon",
  });

  docs.push({
    source: "Education",
    answer: education.map((e) => `${e.degree}, ${e.institution} (${e.period}${e.detail ? `, ${e.detail}` : ""}).`).join(" "),
    keywords: "education degree study studied university college school graduate cgpa grade",
  });

  return docs;
}

const docs = buildDocs();
const docTokens = docs.map((d) => tokenize(`${d.source} ${d.answer} ${d.keywords}`));
const docFreq = new Map<string, number>();
for (const tokens of docTokens) {
  for (const t of new Set(tokens)) docFreq.set(t, (docFreq.get(t) ?? 0) + 1);
}

function idf(term: string) {
  const df = docFreq.get(term) ?? 0;
  return Math.log(1 + (docs.length - df + 0.5) / (df + 0.5));
}

export type SearchResult = { answer: string; source: string }[];

export function searchResume(question: string): SearchResult {
  const base = tokenize(question);
  const expanded = new Map<string, number>();
  for (const t of base) {
    expanded.set(t, Math.max(expanded.get(t) ?? 0, 1));
    for (const syn of SYNONYMS[t] ?? []) {
      const s = stem(syn);
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
