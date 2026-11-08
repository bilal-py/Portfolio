import { Section } from "@/Components/Section";
import { achievements, certifications } from "@/data/resume";

export default function AchievementsPage() {
  return (
    <Section id="achievements" title="Certifications and awards">
      <div className="grid gap-12 md:grid-cols-2">
        <ul>
          {certifications.map((cert) => (
            <li key={cert.title} className="border-t py-4">
              {cert.url ? (
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-link font-medium">
                  {cert.title}
                </a>
              ) : (
                <span className="font-medium">{cert.title}</span>
              )}
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
            </li>
          ))}
        </ul>
        <ul>
          {achievements.map((item) => (
            <li key={item} className="border-t py-4">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
