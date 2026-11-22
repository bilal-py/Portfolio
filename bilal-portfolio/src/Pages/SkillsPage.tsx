import { Section } from "@/Components/Section";
import { useResume, useUi } from "@/i18n/lang";

export default function SkillsPage() {
  const { skills } = useResume();
  const t = useUi();
  return (
    <Section id="skills" title={t.sections.skills} className="bg-card">
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
