import { useEffect, useState } from "react";
import { Download, EyeOff, Eye } from "lucide-react";

import { buttonVariants } from "@/Components/ui/button";
import { profile, socials } from "@/data/resume";
import { cn } from "@/lib/utils";

const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;

const startsRedacted = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Entity({
  type,
  value,
  redacted,
  order,
  className,
}: {
  type: string;
  value: string;
  redacted: boolean;
  order: number;
  className?: string;
}) {
  return (
    <span className={cn("relative", className)}>
      <span
        key={redacted ? "tag" : "value"}
        aria-hidden="true"
        className={cn("entity-swap", redacted && "entity-tag")}
        style={{ animationDelay: `${order * 140}ms` }}
      >
        {redacted ? `<${type}>` : value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

export default function HomePage() {
  const [redacted, setRedacted] = useState(startsRedacted);

  useEffect(() => {
    if (!startsRedacted) return;
    const timer = window.setTimeout(() => setRedacted(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const shownSocials = socials.filter((s) => ["linkedin", "github", "leetcode", "medium"].includes(s.key));

  return (
    <section id="home" className="px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-8">
          <h1 className="text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.95] font-bold tracking-[-0.04em]">
            <Entity type="PERSON" value={profile.name} redacted={redacted} order={0} />
          </h1>
          {profile.photoFile && (
            <img
              src={asset(profile.photoFile)}
              alt={`Portrait of ${profile.name}`}
              width={160}
              height={160}
              className="hidden size-32 shrink-0 rounded-md object-cover sm:block lg:size-40"
            />
          )}
        </div>

        <p className="mt-8 max-w-[34ch] font-display text-2xl leading-snug font-medium tracking-tight sm:text-[2rem]">
          {profile.role} at {profile.currentCompany}.
        </p>
        <p className="mt-4 max-w-[60ch] text-muted-foreground">{profile.tagline}</p>

        <p className="mt-6 text-base">
          Based in{" "}
          <Entity type="LOCATION" value={profile.location} redacted={redacted} order={1} className="font-medium" />.{" "}
          {profile.availability}.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#contact" className={cn(buttonVariants({ size: "lg" }), "text-base")}>
            Contact me
          </a>
          {profile.resumeFile && (
            <a
              href={asset(profile.resumeFile)}
              download
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "text-base")}
            >
              <Download /> Download CV
            </a>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 text-base sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-6">
          <a href={`mailto:${profile.email}`} className="text-link">
            <Entity type="EMAIL_ADDRESS" value={profile.email} redacted={redacted} order={2} />
          </a>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {shownSocials.map((s) => (
              <li key={s.key}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-link">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex max-w-[60ch] flex-col items-start gap-3 border-t pt-6 sm:flex-row sm:items-center sm:gap-5">
          <button
            type="button"
            aria-pressed={redacted}
            onClick={() => setRedacted((r) => !r)}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}
          >
            {redacted ? <Eye /> : <EyeOff />}
            {redacted ? "Restore personal data" : "Redact personal data"}
          </button>
          <p className="text-sm text-muted-foreground">
            This is what my Presidio pipeline does to a document before any LLM gets to read it.
          </p>
        </div>
      </div>
    </section>
  );
}
