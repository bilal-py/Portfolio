import { Moon, SunDim } from "lucide-react";
import { useState, useRef } from "react";
import { flushSync } from "react-dom";
import { useUi } from "@/i18n/lang";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    /* private mode: theme applies for this visit only */
  }
}

export const AnimatedThemeToggler = ({ className }: Props) => {
  const t = useUi();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    document.documentElement.classList.contains("dark"),
  );
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const changeTheme = async () => {
    const next = !isDarkMode;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!buttonRef.current || !document.startViewTransition || reduceMotion) {
      applyTheme(next);
      setIsDarkMode(next);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        applyTheme(next);
        setIsDarkMode(next);
      });
    }).ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRad}px at ${x}px ${y}px)`],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={changeTheme}
      aria-label={isDarkMode ? t.theme.toLight : t.theme.toDark}
      title={isDarkMode ? t.theme.light : t.theme.dark}
      className={cn(className)}
    >
      {isDarkMode ? <SunDim /> : <Moon />}
    </button>
  );
};
