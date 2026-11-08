import { Section } from "@/Components/Section";
import { education } from "@/data/resume";

export default function EducationPage() {
  return (
    <Section id="education" title="Education" className="bg-card">
      <ol>
        {education.map((item) => (
          <li key={item.degree} className="grid gap-x-10 gap-y-1 border-t py-5 md:grid-cols-[11rem_1fr_auto]">
            <p className="text-sm text-muted-foreground tabular-nums md:pt-1">{item.period}</p>
            <div>
              <h3 className="text-lg font-semibold">{item.degree}</h3>
              <p className="text-muted-foreground">{item.institution}</p>
            </div>
            {item.detail && <p className="font-medium tabular-nums md:text-right">{item.detail}</p>}
          </li>
        ))}
      </ol>
    </Section>
  );
}
