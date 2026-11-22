import { Section } from "@/Components/Section";
import { useResume, useUi } from "@/i18n/lang";

export default function AboutPage() {
  const { profile } = useResume();
  const t = useUi();
  return (
    <Section id="about" title={t.sections.about} className="bg-card">
      <p className="max-w-[62ch] font-display text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
        {profile.summary}
      </p>
    </Section>
  );
}
