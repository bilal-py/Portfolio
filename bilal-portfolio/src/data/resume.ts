export const profile = {
  name: "Bilal Imran",
  firstName: "Bilal",
  lastName: "Imran",
  role: "Full-stack engineer",
  currentCompany: "Thoughtworks",
  tagline:
    "I build enterprise products with .NET, Angular and React, and make generative AI safe and cheap enough to run on real customer data.",
  summary:
    "Consultant Developer at Thoughtworks with 4+ years of experience shipping enterprise applications with C#/.NET, Angular, React and SQL across the automotive, insurance and energy domains. Lately I focus on bringing Generative AI into production responsibly: privacy-first document processing, AI QA agents and cutting LLM costs. I also champion Spec-Driven Development in my teams.",
  location: "Bangalore, India",
  availability: "Open to roles in Germany",
  email: "bilalrizvi2110@gmail.com",
  /** Path inside /public, e.g. "Bilal_Imran_Resume.pdf". Leave empty to hide the "Download CV" button. */
  resumeFile: "Bilal_Imran_Resume.pdf",
  /** Path inside /public, e.g. "profile.jpg". Leave empty to hide the photo. */
  photoFile: "",
  /** Formspree endpoint, e.g. "https://formspree.io/f/abcdwxyz". Leave empty to fall back to email. */
  formspreeEndpoint: "https://formspree.io/f/meaawwbo",
};

export type SocialKey = "github" | "linkedin" | "leetcode" | "hackerrank" | "medium" | "youtube";

export const socials: { key: SocialKey; label: string; url: string }[] = [
  { key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/bilal-imran-0015281bb/" },
  { key: "github", label: "GitHub", url: "https://github.com/bilal-py" },
  { key: "leetcode", label: "LeetCode", url: "https://leetcode.com/u/bilal_py/" },
  { key: "hackerrank", label: "HackerRank", url: "https://www.hackerrank.com/profile/CS1B_1816410099_" },
  { key: "medium", label: "Medium", url: "https://medium.com/@bilalcodes" },
  { key: "youtube", label: "YouTube", url: "https://www.youtube.com/@bilaalcodes" },
];

export type Experience = {
  company: string;
  role: string;
  location?: string;
  period: string;
  current?: boolean;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Thoughtworks",
    role: "Consultant Developer",
    location: "Bangalore, India",
    period: "Dec 2025 – Present",
    current: true,
    highlights: [
      "Engineered end-to-end full-stack features for an enterprise automobile marketplace: automated ingestion of high-volume third-party vehicle leads and built dynamic UI components that keep new inventory in sync for users.",
      "Cut Generative AI operating costs by designing an intelligent URL exclusion filter that prevents redundant LLM page scans, drastically lowering API overhead while maintaining data-capture accuracy.",
      "Architected a privacy-first AI document-processing POC during a hackathon and pitched it directly to the client's group CEO, using Microsoft Presidio, Pydantic AI and Claude to map sanitised financial data to UI schemas.",
      "Championed Spec-Driven Development and built Spec-Driven Testing with AI QA agents (multi-step orchestration, tool calling, context memory) to automate test-scenario generation for cross-functional teams.",
    ],
    stack: ["C#", ".NET", "Angular", "TypeScript", "PostgreSQL", "AWS", "GenAI"],
  },
  {
    company: "LTIMindtree",
    role: "Consultant",
    location: "Noida, India",
    period: "Jul 2024 – Nov 2025",
    highlights: [
      "Developed robust backend functionality for a large-scale insurance application.",
      "Contributed to the \"Track Rate\" feature, which tracks and calculates complex insurance formulas across all coverages.",
      "Optimised tracking-rate efficiency by dynamically setting coverage tracks based on the specified formulas.",
    ],
    stack: ["C#", ".NET", "SQL Server"],
  },
  {
    company: "GlobalLogic",
    role: "Software Engineer",
    location: "Noida, India",
    period: "Jun 2022 – Jul 2024",
    highlights: [
      "Contributed to a Natural Resources data & analytics product, streamlining the integration and benchmarking of emissions data.",
      "Developed and enhanced features for the Lens Carbon platform, focused on Carbon Capture, Utilisation and Storage (CCUS), improving data insights and workflows for carbon management.",
      "Built applicant-details features (including joint applicants) for a full-stack banking web application.",
    ],
    stack: ["C#", ".NET Core", "React", "JavaScript", "SQL Server", "xUnit"],
  },
  {
    company: "Hitachi Vantara",
    role: "Software Development Engineer Intern",
    period: "Feb 2022 – Jun 2022",
    highlights: ["Worked with the App Engineering team on requirements across multiple client projects."],
    stack: ["Salesforce", "Apex"],
  },
  {
    company: "Verzeo",
    role: "Machine Learning Intern",
    period: "Oct 2020 – Nov 2020",
    highlights: ["Trained ML models, performed data preprocessing and built a movie recommendation system."],
    stack: ["Python", "Machine Learning", "Flask", "Bootstrap"],
  },
];

export type Project = {
  title: string;
  context: string;
  problem: string;
  approach: string;
  impact: string;
  stack: string[];
  link?: { label: string; url: string };
};

export const projects: Project[] = [
  {
    title: "Privacy-First AI Document Processing",
    context: "Hackathon POC · Thoughtworks",
    problem:
      "Financial documents were keyed in by hand, and sensitive customer data could not be sent to an LLM as-is.",
    approach:
      "Microsoft Presidio detects and anonymises PII before any model call; Pydantic AI and Claude then extract the sanitised content into typed schemas that map straight onto the UI.",
    impact:
      "Removed manual data entry from the flow while keeping LLM costs low. Pitched directly to the client's group CEO.",
    stack: ["Python", "Pydantic AI", "Claude", "Microsoft Presidio"],
  },
  {
    title: "AI QA Agents for Spec-Driven Testing",
    context: "Thoughtworks",
    problem: "Writing QA scenarios by hand for every ticket slowed delivery across teams.",
    approach:
      "AI agents read the spec and generate test scenarios through multi-step orchestration with tool calling and context memory, as part of a Spec-Driven Development workflow.",
    impact: "Faster ticket execution and significantly less manual scenario writing for cross-functional teams.",
    stack: ["GenAI", "Tool Calling", "OpenSpec", "Spec-Driven Development"],
  },
  {
    title: "LLM Cost Optimisation",
    context: "Enterprise automobile marketplace · Thoughtworks",
    problem: "A GenAI pipeline was spending tokens scanning pages that added no new information.",
    approach: "Designed an intelligent URL exclusion filter that skips redundant pages before they ever reach the LLM.",
    impact: "Drastically lower API overhead with data-capture accuracy maintained.",
    stack: ["C#", ".NET", "AWS", "GenAI"],
  },
  {
    title: "Lens Carbon: CCUS Analytics",
    context: "GlobalLogic",
    problem: "Carbon-management teams needed emissions data integrated and benchmarked in one place.",
    approach:
      "Built features across the stack for Carbon Capture, Utilisation and Storage workflows in a Natural Resources analytics platform.",
    impact: "Better data insights and smoother workflows for carbon management.",
    stack: ["C#", ".NET Core", "React", "SQL Server"],
  },
];

export const skills: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["C#", "TypeScript", "JavaScript", "Python", "LINQ"] },
  { category: "Frameworks & Libraries", items: [".NET Core", "Entity Framework", "Angular", "React"] },
  { category: "Databases", items: ["SQL Server", "PostgreSQL"] },
  {
    category: "AI-Assisted Development",
    items: ["GitHub Copilot", "Claude Code", "AWS Bedrock", "Prompt Engineering", "Tool / Function Calling"],
  },
  {
    category: "Tools & Testing",
    items: ["AWS", "Docker", "CI/CD Pipelines", "xUnit", "OpenSpec", "Postman", "Jira", "Git"],
  },
  {
    category: "Core Concepts",
    items: ["OOP", "SOLID", "Data Structures & Algorithms", "Agile", "Spec-Driven Development", "GenAI Integration"],
  },
];

export type Certification = { title: string; issuer: string; url?: string };

export const certifications: Certification[] = [
  {
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    url: "https://www.credly.com/badges/cff5a686-ada5-4e12-813d-8cc8d663cdf8/",
  },
  {
    title: "REST API (Intermediate)",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/663753b00d16",
  },
  {
    title: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/9d29b5fdb6ad",
  },
  {
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/d4ca1b8ee31b",
  },
];

export const achievements: string[] = [
  "Ranked in the top 14.11% globally on LeetCode with 650+ problems solved and a peak contest rank of 1,400.",
  "6★ in Problem Solving and 5★ in Python on HackerRank.",
  "Pitched a GenAI document-processing POC directly to a client's group CEO at a Thoughtworks hackathon.",
];

export type Education = { institution: string; degree: string; period: string; detail?: string };

export const education: Education[] = [
  {
    institution: "Pranveer Singh Institute of Technology, Kanpur",
    degree: "B.Tech, Computer Science & Engineering",
    period: "2018 – 2022",
    detail: "CGPA 7.5",
  },
  {
    institution: "Wendy Academy High School",
    degree: "ISC (Class XII)",
    period: "2016 – 2017",
    detail: "79.8%",
  },
  {
    institution: "Wendy Academy High School",
    degree: "ICSE (Class X)",
    period: "2014 – 2015",
    detail: "79.1%",
  },
];
