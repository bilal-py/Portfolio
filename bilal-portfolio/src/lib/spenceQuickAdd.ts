// A small port of Spence's one-line quick-add parser (rules only, no AI).
// The real one lives in SpenceAI.Application/QuickAdd.

export type Category = { name: string; color: string };

const RULES: [Category, RegExp][] = [
  [{ name: "Dining", color: "#d9663b" }, /chai|coffee|cafe|swiggy|zomato|lunch|dinner|breakfast|pizza|burger|biryani|tea|starbucks|restaurant|snack/],
  [{ name: "Transport", color: "#b5832a" }, /uber|ola|rapido|metro|bus|auto|cab|taxi|train|petrol|fuel|parking|toll/],
  [{ name: "Groceries", color: "#3f8f5f" }, /bigbasket|grocer|milk|zepto|blinkit|vegetable|fruit|dmart|bread|eggs/],
  [{ name: "Shopping", color: "#a3589e" }, /amazon|flipkart|myntra|shoes|shirt|clothes|ikea|nykaa/],
  [{ name: "Subscriptions", color: "#3b6fd9" }, /netflix|spotify|prime|hotstar|youtube|icloud|gym|cult/],
  [{ name: "Bills", color: "#5a6fd9" }, /rent|electricity|wifi|broadband|jio|airtel|water|gas|recharge/],
  [{ name: "Health", color: "#d94848" }, /doctor|dentist|pharmacy|medicine|chemist|hospital|clinic/],
  [{ name: "Entertainment", color: "#c0398b" }, /movie|cinema|pvr|concert|game|bookmyshow/],
  [{ name: "Income", color: "#2a9d6f" }, /salary|bonus|freelance|interest/],
];

export const CATEGORIES: Category[] = RULES.map(([c]) => c);

export type Entry = {
  raw: string;
  amount: number | null;
  merchant: string;
  key: string;
  type: "Expense" | "Income" | "Refund" | "Transfer";
  category: Category | null;
  when: string;
  account: string | null;
  repeat: string | null;
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function parseEntry(raw: string): Entry {
  let s = ` ${raw.toLowerCase().trim()} `;
  let amount: number | null = null;
  // Assigned inside the replace callbacks below, so widen it up front.
  let type = "Expense" as Entry["type"];
  let repeat: string | null = null;
  let when = "Today";
  let account: string | null = null;

  s = s.replace(/(?:₹|rs\.?\s*)?(\d+(?:,\d+)*(?:\.\d+)?)\s*(k|l|lakh)?(?=\s)/, (_, n: string, unit?: string) => {
    amount = parseFloat(n.replace(/,/g, "")) * (unit === "k" ? 1e3 : unit ? 1e5 : 1);
    return " ";
  });
  s = s.replace(/\b(got|received|salary)\b/, (m) => {
    type = "Income";
    return m === "salary" ? m : " ";
  });
  s = s.replace(/\brefund(ed)?\b/, () => {
    type = "Refund";
    return " ";
  });
  s = s.replace(/\bcard bill\b/, () => {
    type = "Transfer";
    return " card bill ";
  });
  s = s.replace(/\b(monthly|weekly|yearly)\b(\s+on\s+\d+(st|nd|rd|th)?)?/, (_, r: string) => {
    repeat = cap(r);
    return " ";
  });
  s = s.replace(/\b(today|yesterday)\b/, (m) => {
    when = cap(m);
    return " ";
  });
  s = s.replace(/\b(last\s+)?(sun|mon|tue|wed|thu|fri|sat)[a-z]*\b/, (_, l: string | undefined, d: string) => {
    when = (l ? "Last " : "") + cap(d);
    return " ";
  });
  s = s.replace(/\b(\d{1,2})\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/, (_, d: string, mo: string) => {
    when = `${d} ${cap(mo)}`;
    return " ";
  });
  s = s.replace(/\b(cash|card|upi|hdfc|amex|gpay|paytm)\b/, (m) => {
    account = m.length <= 4 && m !== "cash" && m !== "card" ? m.toUpperCase() : cap(m);
    return " ";
  });

  const words = s.replace(/\s+/g, " ").trim();
  const merchant = words ? words.split(" ").map(cap).join(" ") : "";
  let category: Category | null = null;
  if (type !== "Transfer") category = RULES.find(([, re]) => re.test(words))?.[0] ?? null;
  if (type === "Income" && !category) category = CATEGORIES[CATEGORIES.length - 1];

  return { raw, amount, merchant, key: words, type, category, when, account, repeat };
}

export function parseLine(line: string) {
  return line
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .map(parseEntry);
}

export const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
