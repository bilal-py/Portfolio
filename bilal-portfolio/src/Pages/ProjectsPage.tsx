import { Section } from "@/Components/Section";
import { HushmaskShowcase } from "@/Components/HushmaskShowcase";
import { SpenceShowcase } from "@/Components/SpenceShowcase";
import { socials, type Lang } from "@/data/resume";
import { useCopy, useResume, useUi } from "@/i18n/lang";

const github = socials.find((s) => s.key === "github");

type Step = { title: string; body: string; tag?: string; after?: string };

const pipeline: Record<Lang, Step[]> = {
  en: [
    { title: "Document in", body: "A financial document arrives that would otherwise be keyed in by hand." },
    {
      title: "Presidio redacts",
      body: "Personal details are detected and swapped for entity tags like ",
      tag: "<PERSON>",
      after: ".",
    },
    { title: "Claude extracts", body: "Pydantic AI validates the model's output against typed schemas." },
    { title: "Form fills itself", body: "Sanitised values map straight onto the UI. No manual entry." },
  ],
  de: [
    { title: "Dokument kommt an", body: "Ein Finanzdokument kommt an, das sonst von Hand erfasst würde." },
    {
      title: "Presidio schwärzt",
      body: "Personenbezogene Daten werden erkannt und durch Entitäts-Tags wie ",
      tag: "<PERSON>",
      after: " ersetzt.",
    },
    { title: "Claude extrahiert", body: "Pydantic AI prüft die Ausgabe des Modells gegen typisierte Schemas." },
    { title: "Formular füllt sich selbst", body: "Bereinigte Werte landen direkt in der Oberfläche. Keine manuelle Eingabe." },
  ],
};

function CaseStudyText({ problem, approach, impact }: { problem: string; approach: string; impact: string }) {
  const t = useUi();
  return (
    <dl className="max-w-[68ch] space-y-3">
      {[
        [t.caseStudy.problem, problem],
        [t.caseStudy.approach, approach],
        [t.caseStudy.impact, impact],
      ].map(([term, text]) => (
        <div key={term}>
          <dt className="inline font-semibold">{term}. </dt>
          <dd className="inline text-muted-foreground">{text}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function ProjectsPage() {
  const { projects } = useResume();
  const t = useUi();
  const steps = useCopy(pipeline);
  const [featured, ...others] = projects;
  const spence = others.find((p) => p.showcase === "spence");
  const hushmask = others.find((p) => p.showcase === "hushmask");
  const rest = others.filter((p) => !p.showcase);

  return (
    <Section id="projects" title={t.sections.projects} intro={t.sections.projectsIntro}>
      <article className="rounded-lg border bg-card p-6 sm:p-10">
        <p className="text-sm text-muted-foreground">{featured.context}</p>
        <h3 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">{featured.title}</h3>

        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map((step, i) => (
            <li key={step.title} className="lg:border-l lg:px-5 lg:first:border-l-0 lg:first:pl-0">
              <span className="font-display text-sm font-semibold text-muted-foreground tabular-nums">{i + 1}</span>
              <p className="mt-1 font-semibold">{step.title}</p>
              <p className="mt-1 text-base text-muted-foreground">
                {step.body}
                {step.tag && <span className="hm-tape [--sw:var(--muted-foreground)]">{step.tag}</span>}
                {step.after}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 border-t pt-6">
          <CaseStudyText {...featured} />
          <p className="mt-5 text-sm text-muted-foreground">{featured.stack.join(", ")}</p>
        </div>
      </article>

      {hushmask && <HushmaskShowcase stack={hushmask.stack} />}

      {spence && <SpenceShowcase stack={spence.stack} />}

      <div className="mt-6">
        {rest.map((project) => (
          <article
            key={project.title}
            className="grid gap-x-10 gap-y-4 border-b py-8 last:border-b-0 md:grid-cols-[17rem_1fr]"
          >
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{project.context}</p>
              <p className="mt-3 text-sm text-muted-foreground">{project.stack.join(", ")}</p>
            </div>
            <CaseStudyText {...project} />
          </article>
        ))}
      </div>

      {github && (
        <p className="mt-6 text-base">
          {t.personalProjects.before}{" "}
          <a href={github.url} target="_blank" rel="noopener noreferrer" className="text-link">
            GitHub
          </a>
          {t.personalProjects.after}
        </p>
      )}
    </Section>
  );
}
