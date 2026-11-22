import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Download, EyeOff, Eye, Mail } from "lucide-react";

import { SocialIcons } from "@/Components/SocialIcons";
import { buttonVariants } from "@/Components/ui/button";
import { socials } from "@/data/resume";
import { useResume, useUi } from "@/i18n/lang";
import { swatch, tokenFor } from "@/lib/hushmaskDetect";
import { cn } from "@/lib/utils";

const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;

const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** taped: the token an AI receives. marked: the real value, highlighted. plain: just the real value. */
type Phase = "taped" | "marked" | "plain";

function useMaskPhase() {
  const [phase, setPhase] = useState<Phase>(still ? "plain" : "taped");
  const timers = useRef<number[]>([]);

  const run = useCallback((steps: [Phase, number][]) => {
    timers.current.forEach(window.clearTimeout);
    timers.current = steps.map(([p, at]) => window.setTimeout(() => setPhase(p), still ? 0 : at));
  }, []);

  // One orchestrated moment on load: the AI's view, then the real values come back.
  useEffect(() => {
    if (!still) run([["marked", 800], ["plain", 1900]]);
    const pending = timers.current;
    return () => pending.forEach(window.clearTimeout);
  }, [run]);

  const masked = phase === "taped";
  const toggle = () => (masked ? run([["marked", 0], ["plain", 1000]]) : run([["marked", 0], ["taped", 600]]));
  return { phase, masked, toggle };
}

function Entity({
  type,
  value,
  phase,
  order,
  stack,
  className,
}: {
  type: string;
  value: string;
  phase: Phase;
  order: number;
  stack?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("hm-swap", stack && "hm-stack", className)} data-phase={phase} style={{ "--sw": swatch(type) } as CSSProperties}>
      <span aria-hidden="true" className="hm-hl" style={{ transitionDelay: phase === "marked" ? `${order * 120}ms` : "0ms" }} />
      <span className="hm-real">{value}</span>
      <span aria-hidden="true" className="hm-tok hm-tape">
        {tokenFor(type, value)}
      </span>
      {phase === "taped" &&<span className="sr-only">{value}</span>}
    </span>
  );
}

export default function HomePage() {
  const { phase, masked, toggle } = useMaskPhase();
  const { profile } = useResume();
  const t = useUi();

  const shownSocials = socials.filter((s) => ["linkedin", "github", "leetcode", "medium"].includes(s.key));

  return (
    <section id="home" className="px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-8">
          <h1 className="text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.95] font-bold tracking-[-0.04em]">
            <Entity type="PERSON" value={profile.name} phase={phase} order={0} stack className="[&_.hm-tok]:text-[0.55em] sm:[&_.hm-tok]:text-[0.4em]" />
          </h1>
          {profile.photoFile && (
            <img
              src={asset(profile.photoFile)}
              alt={t.hero.portrait(profile.name)}
              width={160}
              height={160}
              className="hidden size-32 shrink-0 rounded-md object-cover sm:block lg:size-40"
            />
          )}
        </div>

        <p className="mt-8 max-w-[34ch] font-display text-2xl leading-snug font-medium tracking-tight sm:text-[2rem]">
          {t.hero.roleAt(profile.role, profile.currentCompany)}
        </p>
        <p className="mt-4 max-w-[60ch] text-muted-foreground">{profile.tagline}</p>

        <p className="mt-6 text-base">
          {t.hero.basedIn}{" "}
          <Entity type="LOCATION" value={profile.location} phase={phase} order={1} className="font-medium" />.{" "}
          {profile.availability}.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#contact" className={cn(buttonVariants({ size: "lg" }), "text-base")}>
            {t.hero.contact}
          </a>
          {profile.resumeFile && (
            <a
              href={asset(profile.resumeFile)}
              download
              hrefLang={profile.resumeLanguage ? "en" : undefined}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-auto min-h-10 max-w-full flex-wrap gap-x-2 gap-y-0 py-2 text-base whitespace-normal",
              )}
            >
              <Download /> {t.hero.download}
              {profile.resumeLanguage && <span className="font-normal text-muted-foreground">(PDF, {profile.resumeLanguage})</span>}
            </a>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 text-base sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-6">
          <a href={`mailto:${profile.email}`} className="text-link">
            <Mail aria-hidden="true" className="mr-1.5 inline-block size-[1em] align-[-0.125em]" />
            <Entity type="EMAIL" value={profile.email} phase={phase} order={2} />
          </a>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {shownSocials.map((s) => {
              const Icon = SocialIcons[s.key];
              return (
                <li key={s.key}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-link">
                    <Icon className="mr-1.5 inline-block size-[1em] align-[-0.125em]" />
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-14 flex max-w-[64ch] flex-col items-start gap-3 border-t pt-6 sm:flex-row sm:items-center sm:gap-5">
          <button
            type="button"
            aria-pressed={masked}
            onClick={toggle}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}
          >
            {masked ? <Eye /> : <EyeOff />}
            {masked ? t.hero.showReal : t.hero.showAi}
          </button>
          <p className="text-sm text-muted-foreground">
            {t.hero.captionBefore}{" "}
            <a href="#hushmask" className="text-link">
              hushmask
            </a>
            {t.hero.captionAfter}
          </p>
        </div>
      </div>
    </section>
  );
}
