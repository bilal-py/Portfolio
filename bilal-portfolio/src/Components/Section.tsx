import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, intro, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("px-5 py-20 sm:px-8 sm:py-24", className)}>
      <div className="mx-auto max-w-5xl">
        <h2 id={`${id}-title`} className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-[60ch] text-muted-foreground">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
