import { Section } from "@/Components/Section";
import { projects, socials } from "@/data/resume";

const github = socials.find((s) => s.key === "github");
const [featured, ...rest] = projects;

const pipeline = [
  { title: "Document in", body: "A financial document arrives that would otherwise be keyed in by hand." },
  {
    title: "Presidio redacts",
    body: (
      <>
        Personal details are detected and swapped for entity tags like <span className="entity-tag">&lt;PERSON&gt;</span>.
      </>
    ),
  },
  { title: "Claude extracts", body: "Pydantic AI validates the model's output against typed schemas." },
  { title: "Form fills itself", body: "Sanitised values map straight onto the UI. No manual entry." },
];

function CaseStudyText({ problem, approach, impact }: { problem: string; approach: string; impact: string }) {
  return (
    <dl className="max-w-[68ch] space-y-3">
      {[
        ["Problem", problem],
        ["Approach", approach],
        ["Impact", impact],
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
  return (
    <Section
      id="projects"
      title="Selected projects"
      intro="Client work is described without confidential details."
    >
      <article className="rounded-lg border bg-card p-6 sm:p-10">
        <p className="text-sm text-muted-foreground">{featured.context}</p>
        <h3 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">{featured.title}</h3>

        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {pipeline.map((step, i) => (
            <li key={step.title} className="lg:border-l lg:px-5 lg:first:border-l-0 lg:first:pl-0">
              <span className="font-display text-sm font-semibold text-muted-foreground tabular-nums">{i + 1}</span>
              <p className="mt-1 font-semibold">{step.title}</p>
              <p className="mt-1 text-base text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 border-t pt-6">
          <CaseStudyText {...featured} />
          <p className="mt-5 text-sm text-muted-foreground">{featured.stack.join(", ")}</p>
        </div>
      </article>

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
          Personal projects live on{" "}
          <a href={github.url} target="_blank" rel="noopener noreferrer" className="text-link">
            GitHub
          </a>
          .
        </p>
      )}
    </Section>
  );
}
