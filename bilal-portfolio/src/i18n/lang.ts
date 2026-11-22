import { createContext, useContext } from "react";

import { resumes, type Lang } from "@/data/resume";
import { ui } from "@/i18n/ui";

export type { Lang };
export const LANGS: Lang[] = ["en", "de"];
export const STORAGE_KEY = "lang";

/** Saved choice first, then the browser's language, then English. */
export function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "de") return saved;
  } catch {
    /* storage blocked: fall through to the browser language */
  }
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  return preferred.some((l) => l?.toLowerCase().startsWith("de")) ? "de" : "en";
}

export const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export const useLang = () => useContext(LangContext);
export const useResume = () => resumes[useLang().lang];
export const useUi = () => ui[useLang().lang];

/** Pick the copy for the current language from an { en, de } pair. */
export function useCopy<T>(copy: Record<Lang, T>): T {
  return copy[useLang().lang];
}
