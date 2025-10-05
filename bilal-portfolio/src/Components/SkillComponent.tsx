import { IconCloud } from "@/Components/ui/icon-cloud";

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
