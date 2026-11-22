import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { AnimatedThemeToggler } from "@/Components/ui/animated-theme-toggler";
import { contact as profile } from "@/data/resume";
import { LANGS, useLang, useUi } from "@/i18n/lang";
import { cn } from "@/lib/utils";

const ids = ["about", "experience", "projects", "skills", "achievements", "education", "ask", "contact"] as const;

function LanguageSwitch() {
  const { lang, setLang } = useLang();
  const t = useUi();
  return (
    <div role="group" aria-label={t.lang.label} className="mr-1 inline-flex rounded-md border p-0.5 text-sm font-semibold">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === lang}
          aria-label={t.lang[l]}
          title={t.lang[l]}
          onClick={() => setLang(l)}
          className={cn(
            "rounded-[4px] px-2 py-0.5 uppercase",
            l === lang ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ["home", ...ids].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function NavbarComponent() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const t = useUi();
  const navigation = ids.map((id) => ({ id, name: t.nav[id] }));

  const linkClass = (id: string) =>
    cn(
      "decoration-mark decoration-[3px] underline-offset-[6px] transition-colors",
      active === id ? "text-foreground underline" : "text-muted-foreground hover:text-foreground",
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/90 backdrop-blur">
      <nav aria-label={t.nav.label} className="mx-auto flex h-16 max-w-[calc(64rem+4rem)] items-center justify-between px-5 sm:px-8">
        <a href="#home" className="font-display text-lg font-bold tracking-tight" onClick={() => setOpen(false)}>
          {profile.name}
        </a>

        <ul className="hidden items-center gap-6 text-[0.9375rem] font-medium lg:flex">
          {navigation.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={linkClass(item.id)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="-mr-2 flex items-center gap-1">
          <LanguageSwitch />
          <AnimatedThemeToggler className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground [&_svg]:size-5" />
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="space-y-1 border-t bg-background px-5 py-4 font-medium lg:hidden">
          {navigation.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "location" : undefined}
                className={cn("block py-2", linkClass(item.id))}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
