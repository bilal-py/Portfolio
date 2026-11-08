import { profile, socials } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="border-t px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React and Tailwind CSS.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {socials.map((s) => (
            <li key={s.key}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
