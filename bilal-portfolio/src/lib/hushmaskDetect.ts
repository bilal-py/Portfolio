// hushmask's pattern rules, ported from hushmask/site/detect.js (itself a port of the Python detectors),
// so the portfolio demo runs in the browser with no server. The real tool adds a local names model,
// HMAC tokens and a leak check before anything is sent.

export type Family = "person" | "contact" | "number" | "place" | "custom";
export type Found = { type: string; start: number; end: number; p: number; text: string; token: string };
export type Preset = "strict" | "finance";

const digits = (s: string) => s.replace(/\D/g, "");

function luhn(s: string) {
  const n = digits(s);
  if (n.length < 13 || n.length > 19) return false;
  let sum = 0;
  for (let i = 0; i < n.length; i++) {
    let d = +n[n.length - 1 - i];
    if (i % 2) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

function iban(s: string) {
  const c = s.replace(/[^0-9A-Za-z]/g, "").toUpperCase();
  if (c.length < 15 || c.length > 34) return false;
  let rem = 0;
  for (const ch of c.slice(4) + c.slice(0, 4)) for (const d of String(parseInt(ch, 36))) rem = (rem * 10 + +d) % 97;
  return rem === 1;
}

const VD = [[0,1,2,3,4,5,6,7,8,9],[1,2,3,4,0,6,7,8,9,5],[2,3,4,0,1,7,8,9,5,6],[3,4,0,1,2,8,9,5,6,7],[4,0,1,2,3,9,5,6,7,8],[5,9,8,7,6,0,4,3,2,1],[6,5,9,8,7,1,0,4,3,2],[7,6,5,9,8,2,1,0,4,3],[8,7,6,5,9,3,2,1,0,4],[9,8,7,6,5,4,3,2,1,0]];
const VP = [[0,1,2,3,4,5,6,7,8,9],[1,5,7,6,2,8,3,0,9,4],[5,8,0,3,7,9,6,1,4,2],[8,9,1,6,0,4,3,5,2,7],[9,4,5,3,1,2,6,8,7,0],[4,2,8,6,5,7,3,9,0,1],[2,7,9,3,8,0,6,4,1,5],[7,0,4,6,9,1,3,2,5,8]];

function aadhaar(s: string) {
  const n = digits(s);
  if (n.length !== 12 || "01".includes(n[0])) return false;
  let c = 0;
  [...n].reverse().forEach((d, i) => {
    c = VD[c][VP[i % 8][+d]];
  });
  return c === 0;
}

const count = (lo: number, hi: number) => (s: string) => {
  const n = digits(s).length;
  return n >= lo && n <= hi;
};
const notDate = (s: string) => !/(?<!\d)\d{1,4}[./-]\d{1,2}[./-]\d{1,4}(?!\d)/.test(s);
const ipv4 = (s: string) => s.split(".").every((p) => String(+p) === p && +p <= 255);

type Rule = { type: string; p: number; re: RegExp; ok?: (s: string) => boolean; group?: number };

const RULES: Rule[] = [
  { type: "EMAIL", p: 40, re: /(?<![\p{L}\p{N}_.+-])[\p{L}\p{N}_.%+-]+@[\p{L}\p{N}_-]+(?:\.[\p{L}\p{N}_-]+)*\.\p{L}{2,}(?![\p{L}\p{N}_-])/gu },
  { type: "UPI", p: 40, re: /(?<![\w.+-])[A-Za-z0-9._-]{2,}@[A-Za-z]{2,}(?![\w@-])(?!\.[A-Za-z0-9])/g },
  { type: "CARD", p: 50, re: /(?<!\d)(?:\d[ -]?){12,18}\d(?!\d)/g, ok: luhn },
  { type: "IBAN", p: 50, re: /\b[A-Z]{2}\d{2}(?: ?[A-Z0-9]{4}){2,7}(?: ?[A-Z0-9]{1,3})?\b/g, ok: iban },
  { type: "AADHAAR", p: 50, re: /(?<!\d)[2-9]\d{3}[ -]?\d{4}[ -]?\d{4}(?!\d)/g, ok: aadhaar },
  { type: "PAN", p: 40, re: /\b[A-Z]{3}[ABCFGHJLPT][A-Z]\d{4}[A-Z]\b/g },
  { type: "IFSC", p: 40, re: /\b[A-Z]{4}0[A-Z0-9]{6}\b/g },
  { type: "ACCOUNT", p: 60, re: /\b(?:a\/c|acct|account|kontonummer|konto-?nr\.?|konto)(?:\s*(?:no\.?|number|num|#))?\s*[:.#-]?\s*([X*\d][\dX* -]{4,22}\d)/dgi, group: 1 },
  { type: "IP", p: 40, re: /(?<![\d.])(?:\d{1,3}\.){3}\d{1,3}(?![\d.])/g, ok: ipv4 },
  { type: "PHONE", p: 30, re: /(?<![\w+])\+\d{1,3}(?:[ .-]?(?:\(\d{1,5}\)|\d{1,5})){2,5}(?!\d)/g, ok: count(8, 15) },
  { type: "PHONE", p: 30, re: /(?<![\d+])0?[6-9]\d{4}[ -]?\d{5}(?!\d)/g },
  { type: "PHONE", p: 30, re: /(?<![\d+])0\d{2,4}[ -]\d{3,4}[ -]?\d{3,4}(?!\d)/g, ok: count(10, 11) },
  { type: "PHONE", p: 30, re: /(?<![\w+.(])(?:\(\d{2,5}\)[ .-]?|0\d{1,4}[ .-]?)(?:\d{1,5}[ .-]?){1,4}\d{2,6}(?!\w)(?!\.\d)/g, ok: (s) => count(9, 14)(s) && notDate(s) },
];

// Street addresses (port of hushmask's addresses.py)
const AU = "A-ZÄÖÜÀ-ÖØ-Þ";
const WC = "\\p{L}\\p{N}_'’";
const AW = `[${AU}][${WC}.-]*`;
const AHOUSE = `\\d{1,4}\\s?[a-zA-Z]?(?:\\s?[-/]\\s?\\d{1,4}[a-zA-Z]?)?(?![.,]\\d)(?![\\p{L}\\p{N}_])`;
const ACITY = `[${AU}][${WC}-]+(?:[ -][${AU}][${WC}-]+){0,2}`;
const cases = (words: string[]) =>
  words
    .flatMap((w) => [w, w.toUpperCase(), w.toLowerCase(), w[0].toUpperCase() + w.slice(1).toLowerCase()])
    .map((w) => w.replace(".", "\\."))
    .join("|");
const A_DE = new RegExp(`(?<![\\p{L}\\p{N}_])(?<street>(?:${AW}\\s+){0,2}${AW})\\s+(?<house>${AHOUSE})(?<post>,?\\s+\\d{4,5}(?:\\s?[A-Z]{2})?\\s+${ACITY})?`, "dgu");
const A_EN = new RegExp(`(?<![\\p{L}\\p{N}_/.,])(?:(?:Unit|Apt|Suite|Flat)\\s*\\w+\\s*[,/]?\\s*)?\\d{1,6}[A-Za-z]?(?:/\\d{1,6})?\\s+(?:${AW}\\s+){1,4}?(?:${cases(["Street","St","Avenue","Ave","Road","Rd","Boulevard","Blvd","Lane","Ln","Drive","Court","Ct","Way","Place","Pl","Terrace","Tce","Crescent","Cres","Parade","Pde","Highway","Hwy","Close","Circuit","Square","Sq","Grove","Gardens","Mews","Row","Walk","Parkway"])})\\.?(?![\\p{L}\\p{N}_])(?:\\s+(?:N|S|E|W|NE|NW|SE|SW)\\b)?(?:,?\\s+(?:Apt|Suite|Unit|Ste|#)\\.?\\s*[\\w-]+)?(?:,\\s*(?:${AW}\\s?){1,3},?\\s+(?:(?:[A-Z]{2,3}\\s+)?\\d{4,6}(?:-\\d{4})?|[A-Z]{1,2}\\d[A-Z\\d]?\\s?\\d[A-Z]{2}))?`, "gu");
const A_FR = new RegExp(`(?<![\\p{L}\\p{N}_.,])\\d{1,4}(?:\\s?(?:bis|ter))?,?\\s+(?:${cases(["rue","avenue","boulevard","place","chemin","allée","impasse","quai","route","cours"])})\\s+(?:(?:de\\s+la|de\\s+l'|du|des|de|d')\\s*)?${AW}(?:\\s+${AW}){0,3}(?:,?\\s+\\d{5}\\s+${ACITY})?`, "gu");
const A_RO = new RegExp(`(?<![\\p{L}\\p{N}_])(?:Via|Viale|Piazza|Corso|Largo|Calle|Avenida|Plaza|Paseo|Carrer|Rua|Travessa)\\s+(?:(?:del|della|delle|dei|de|di|la|los|las|dos|das|do|da)\\s+)?${AW}(?:\\s+${AW}){0,3},?\\s+(?:n\\.?\\s?)?${AHOUSE}(?:,?\\s+\\d{5}\\s+${ACITY})?`, "gu");
const SAFE = ["straße","strasse","str.","allee","gasse","platz","damm","chaussee","gracht","straat","laan","plein","kade","steeg","promenade"];
const AMBIG = ["weg","ring","ufer","steig","pfad","dijk","markt","berg","hof"];
const STANDALONE = new Set(["straße","strasse","str.","allee","gasse","platz","weg","ring","markt","damm","ufer"]);
const ADJ = new Set(["alte","alter","altes","neue","neuer","neues","lange","langer","große","großer","kleine","kleiner","hohe","hoher","obere","untere","am","an","auf","im","in","zum","zur","der","den","dem"]);

function germanDrop(words: string[], hasPost: boolean): number | null {
  const last = words[words.length - 1].toLowerCase();
  if (STANDALONE.has(last)) {
    if (words.length === 1 && !hasPost) return null;
    let keep = 1;
    while (keep < words.length && ADJ.has(words[words.length - keep - 1].toLowerCase())) keep++;
    if (keep === 1 && words.length > 1) keep = 2;
    return words.length - keep;
  }
  if (SAFE.some((s) => last.endsWith(s)) || (hasPost && AMBIG.some((s) => last.endsWith(s)))) return words.length - 1;
  return null;
}

type Span = { type: string; start: number; end: number; p: number };

function addresses(text: string): Span[] {
  const out: Span[] = [];
  for (const m of text.matchAll(A_DE)) {
    const groups = m.groups!;
    const [sStart] = m.indices!.groups!.street!;
    const words = [...groups.street.matchAll(/\S+/g)];
    const drop = germanDrop(
      words.map((w) => w[0]),
      !!groups.post,
    );
    if (drop === null) continue;
    out.push({ type: "ADDRESS", start: sStart + words[drop].index!, end: m.index! + m[0].length, p: 40 });
  }
  for (const re of [A_EN, A_FR, A_RO])
    for (const m of text.matchAll(re)) out.push({ type: "ADDRESS", start: m.index!, end: m.index! + m[0].length, p: 40 });
  return out;
}

const KEPT: Record<Preset, Set<string>> = { strict: new Set(), finance: new Set(["IFSC", "IP", "LOCATION"]) };

const FAMILY: Record<string, Family> = {
  PERSON: "person",
  ADDRESS: "place",
  LOCATION: "place",
  EMAIL: "contact",
  PHONE: "contact",
  UPI: "contact",
  IP: "contact",
  CARD: "number",
  IBAN: "number",
  ACCOUNT: "number",
  AADHAAR: "number",
  PAN: "number",
  IFSC: "number",
};

export const familyOf = (type: string): Family => FAMILY[type] ?? "custom";
export const swatch = (type: string) => `var(--hl-${familyOf(type)})`;

/** Same value, same token: an FNV-1a hash of the normalised value, like hushmask's demo. */
export function tokenFor(type: string, value: string, salt = "portfolio") {
  const norm =
    type === "PHONE"
      ? digits(value).slice(-10)
      : ["CARD", "IBAN", "ACCOUNT", "AADHAAR"].includes(type)
        ? value.replace(/[^0-9A-Za-z]/g, "").toUpperCase()
        : value.trim().replace(/\s+/g, " ").toLowerCase();
  let h = 0x811c9dc5;
  for (const ch of `${salt}:${type}:${norm}`) {
    h ^= ch.codePointAt(0)!;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `${type}_${h.toString(16).padStart(8, "0").slice(0, 6)}`;
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");

export function detect(text: string, preset: Preset, known: string[]): Found[] {
  const found: Span[] = [];
  const words = new Set<string>();
  for (const k of known) {
    words.add(k);
    for (const part of k.split(/\s+/)) if (part.length >= 3) words.add(part);
  }
  if (words.size) {
    const alternatives = [...words].sort((a, b) => b.length - a.length).map(escapeRe).join("|");
    const re = new RegExp(`(?<![\\p{L}\\p{N}_])(?:${alternatives})(?![\\p{L}\\p{N}_])`, "giu");
    for (const m of text.matchAll(re)) found.push({ type: "PERSON", start: m.index!, end: m.index! + m[0].length, p: 100 });
  }
  found.push(...addresses(text));
  for (const r of RULES) {
    if (KEPT[preset].has(r.type)) continue;
    for (const m of text.matchAll(r.re)) {
      const value = r.group ? m[r.group] : m[0];
      if (!value || (r.ok && !r.ok(value))) continue;
      const [start, end] = r.group ? m.indices![r.group]! : [m.index!, m.index! + m[0].length];
      found.push({ type: r.type, start, end, p: r.p });
    }
  }
  found.sort((a, b) => b.end - b.start - (a.end - a.start) || b.p - a.p || a.start - b.start);
  const chosen: Span[] = [];
  for (const f of found) if (!chosen.some((c) => f.start < c.end && c.start < f.end)) chosen.push(f);
  return chosen
    .sort((a, b) => a.start - b.start)
    .map((f) => {
      const value = text.slice(f.start, f.end);
      return { ...f, text: value, token: tokenFor(f.type, value) };
    });
}
