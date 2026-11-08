import { Section } from "@/Components/Section";
import { skills } from "@/data/resume";

export default function SkillsPage() {
  return (
    <Section id="skills" title="Skills" className="bg-card">
      <dl>
        {skills.map((group) => (
          <div key={group.category} className="grid gap-x-10 gap-y-1 border-t py-5 md:grid-cols-[17rem_1fr]">
            <dt className="font-semibold">{group.category}</dt>
            <dd className="text-muted-foreground">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
