import { SocialIcons } from "@/Components/SocialIcons";
import { profile, socials } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="border-t px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React and Tailwind CSS.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {socials.map((s) => {
            const Icon = SocialIcons[s.key];
            return (
              <li key={s.key}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:underline">
                  <Icon className="mr-1.5 inline-block size-[1em] align-[-0.125em]" />
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
