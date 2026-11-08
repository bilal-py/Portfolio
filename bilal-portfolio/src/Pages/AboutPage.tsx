import { Section } from "@/Components/Section";
import { profile } from "@/data/resume";

export default function AboutPage() {
  return (
    <Section id="about" title="About" className="bg-card">
      <p className="max-w-[62ch] font-display text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
        {profile.summary}
      </p>
    </Section>
  );
}
