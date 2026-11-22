import { useEffect, useState, type ReactNode } from "react";

import { initialLang, LangContext, STORAGE_KEY, type Lang } from "@/i18n/lang";
import { ui } from "@/i18n/ui";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    document.title = ui[lang].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", ui[lang].meta.description);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* private mode: the choice applies for this visit only */
    }
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
