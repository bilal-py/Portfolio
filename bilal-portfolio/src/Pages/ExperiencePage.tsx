import { Section } from "@/Components/Section";
import { experience } from "@/data/resume";

export default function ExperiencePage() {
  return (
    <Section id="experience" title="Experience">
      <ol>
        {experience.map((job) => (
          <li
            key={`${job.company}-${job.period}`}
            className="grid gap-x-10 gap-y-2 border-t py-8 md:grid-cols-[11rem_1fr]"
          >
            <p className="text-sm text-muted-foreground tabular-nums md:pt-1.5">{job.period}</p>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">{job.company}</h3>
              <p className="text-muted-foreground">
                {job.role}
                {job.location && `, ${job.location}`}
              </p>
              <ul className="mt-4 max-w-[68ch] list-disc space-y-2 pl-5 marker:text-muted-foreground">
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Stack:</span> {job.stack.join(", ")}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
