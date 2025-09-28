import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/Components/ui/scroll-based-velocity"

const slugs = [
  "typescript",
  "python",
  "postman",
  "leetcode",
  "javascript",
  "dotnet",
  "jquery",
  "bootstrap",
  "salesforce",
  "railway",
  "react",
  "html5",
  "tailwindcss",
  "postgresql",
  "firebase",
  "vercel",
  "testinglibrary",
  "docker",
  "git",
  "jira",
  "github",
];


const images = slugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
);

export function ScrollTechComponent() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
      <ScrollVelocityContainer className="w-full">
        <ScrollVelocityRow baseVelocity={4} direction={1} className="py-4">
          {images.map((src) => (
            <img
              src={`${src}`}
              alt="image tech"
              width={240}
              height={160}
              loading="lazy"
              decoding="async"
              className="mx-4 inline-block h-40 w-60 rounded-lg object-cover shadow-sm"
            />
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={4} direction={-1} className="py-4">
          {images.map((src) => (
            <img
              src={`${src}`}
              alt="image tech"
              width={240}
              height={160}
              loading="lazy"
              decoding="async"
              className="mx-4 inline-block h-40 w-60 rounded-lg object-cover shadow-sm"
            />
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}
