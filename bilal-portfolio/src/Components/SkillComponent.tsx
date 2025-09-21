import { IconCloud } from "@/Components/ui/icon-cloud";

const slugs = [
    "typescript",
    "python",
    "postman",
    "leetcode",
    "javascript",
    "dotnet",
    "csharp",
    "jquery",
    "bootstrap",
    "salesforce",
    "microsoftsqlserver",
    "railway",
    "react",
    "html5",
    "css3",
    "tailwindcss",
    "amazonaws",
    "postgresql",
    "firebase",
    "vercel",
    "testinglibrary",
    "docker",
    "git",
    "jira",
    "github",
    "visualstudiocode",
];

export function SkillComponent() {
    const images = slugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
    );

    return (
        <div className="relative flex size-full items-center justify-center overflow-hidden">
            <IconCloud images={images} />
        </div>
    );
}
