import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/Components/ui/scroll-based-velocity"

const TECH_LOGOS = {
  CSharp: "https://imgs.search.brave.com/_edMT3eOsV1SvRF7Dsm0c655sFZ8flQi6iq3JTzlKDk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/anNkZWxpdnIubmV0/L2doL2hvbWFyci1s/YWJzL2Rhc2hib2Fy/ZC1pY29ucy93ZWJw/L2NzaGFycC53ZWJw",
  Python: "https://imgs.search.brave.com/RmIelXBSnEqFHtTyiaPTXTDfcvlYnL7oeBFxK6bl_SA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LXB5dGhvbi1sb2dv/LWljb24tZG93bmxv/YWQtaW4tc3ZnLXBu/Zy1naWYtZmlsZS1m/b3JtYXRzLS10ZWNo/bm9sb2d5LXNvY2lh/bC1tZWRpYS12b2wt/NS1wYWNrLWxvZ29z/LWljb25zLTI5NDUw/OTkucG5nP2Y9d2Vi/cCZ3PTI1Ng",
  JavaScript: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  React: "https://imgs.search.brave.com/1EmMlPN2cdkyou2jy_-2w_ikLfnZKwE5vnywAymJOmM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/anNkZWxpdnIubmV0/L2doL2hvbWFyci1s/YWJzL2Rhc2hib2Fy/ZC1pY29ucy9wbmcv/cmVhY3Rqcy5wbmc",
  jQuery: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/frameworks/jquery.png",
  Bootstrap: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/frameworks/bootstrap.png",
  DotNet: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/frameworks/dotnet.png",
  EntityFramework: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/frameworks/entityframework.png",
  SQLServer: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/databases/sqlserver.png",
  PostgreSQL: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/databases/postgresql.png",
  Git: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/tools/git.png",
  Jira: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/tools/jira.png",
  xUnit: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/tools/xunit.png",
  Postman: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/tools/postman.png",
  OOP: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/concepts/oop.png",
  SOLID: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/concepts/solid.png",
  Algorithms: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/concepts/algorithms.png",
  Agile: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/concepts/agile.png"
};
const IMAGES_ROW_A = Object.values(TECH_LOGOS);

const TECH_LOGOS2 = {
  CSharp: "https://imgs.search.brave.com/_edMT3eOsV1SvRF7Dsm0c655sFZ8flQi6iq3JTzlKDk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/anNkZWxpdnIubmV0/L2doL2hvbWFyci1s/YWJzL2Rhc2hib2Fy/ZC1pY29ucy93ZWJw/L2NzaGFycC53ZWJw",
  Python: "https://www.pngwing.com/en/free-png-dqlwx",
  JavaScript: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  React: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/frameworks/react.png",
  jQuery: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/frameworks/jquery.png",
  Bootstrap: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/frameworks/bootstrap.png",
  DotNet: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/frameworks/dotnet.png",
  EntityFramework: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/frameworks/entityframework.png",
  SQLServer: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/databases/sqlserver.png",
  PostgreSQL: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/databases/postgresql.png",
  Git: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/tools/git.png",
  Jira: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/tools/jira.png",
  xUnit: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/tools/xunit.png",
  Postman: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/tools/postman.png",
  OOP: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/concepts/oop.png",
  SOLID: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/concepts/solid.png",
  Algorithms: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/concepts/algorithms.png",
  Agile: "https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/main/concepts/agile.png"
};

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
      </ScrollVelocityContainer>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}
