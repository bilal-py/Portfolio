import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { AnimatedThemeToggler } from "@/Components/ui/animated-theme-toggler";
import { profile } from "@/data/resume";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Awards", id: "achievements" },
  { name: "Education", id: "education" },
  { name: "Contact", id: "contact" },
];

const ids = navigation.map((n) => n.id);

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

  const linkClass = (id: string) =>
    cn(
      "decoration-mark decoration-[3px] underline-offset-[6px] transition-colors",
      active === id ? "text-foreground underline" : "text-muted-foreground hover:text-foreground",
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[calc(64rem+4rem)] items-center justify-between px-5 sm:px-8">
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
          <AnimatedThemeToggler className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground [&_svg]:size-5" />
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
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
