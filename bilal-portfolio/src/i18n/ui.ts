// Interface text shared across the page. Resume content lives in src/data; the two case studies keep
// their own copy next to their markup. The German page addresses visitors formally ("Sie").

const en = {
  meta: {
    title: "Bilal Imran | Full-Stack Software Engineer (.NET, Angular, React, GenAI)",
    description:
      "Bilal Imran: Full-Stack Software Engineer and Consultant Developer at Thoughtworks with 4+ years building enterprise apps with C#/.NET, Angular and React, and production Generative AI features. Author of hushmask, an open-source privacy proxy for LLMs.",
  },
  skip: "Skip to content",
  lang: { label: "Language", en: "English", de: "Deutsch" },
  nav: {
    label: "Main",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    achievements: "Awards",
    education: "Education",
    ask: "Ask",
    contact: "Contact",
  },
  theme: {
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
    light: "Light theme",
    dark: "Dark theme",
  },
  hero: {
    roleAt: (role: string, company: string) => `${role} at ${company}.`,
    basedIn: "Based in",
    contact: "Contact me",
    download: "Download CV",
    portrait: (name: string) => `Portrait of ${name}`,
    showReal: "Show the real values",
    showAi: "Show what an AI receives",
    captionBefore: "Those tokens come from",
    captionAfter: ", my open-source proxy that hides personal data from an AI and puts it back in the answer.",
  },
  sections: {
    about: "About",
    experience: "Experience",
    projects: "Selected projects",
    projectsIntro: "Client work is described without confidential details.",
    skills: "Skills",
    achievements: "Certifications and awards",
    education: "Education",
    ask: "Ask about my work",
    askIntro:
      "Type a question and get an answer straight from my resume. It runs entirely in your browser, so nothing you type is sent anywhere.",
    contact: "Contact",
  },
  stack: "Stack:",
  caseStudy: { problem: "Problem", approach: "Approach", impact: "Impact" },
  personalProjects: { before: "Personal projects live on", after: "." },
  footer: { built: "Built with React and Tailwind CSS.", social: "Social profiles" },
  ask: {
    empty: "Try one of these, or ask your own question about my experience, projects, skills or availability.",
    source: "Source:",
    notFoundBefore:
      "I couldn't find that in my resume. Try asking about my experience, projects, skills or availability, or ",
    notFoundLink: "send me a message",
    notFoundAfter: ".",
    suggestionsLabel: "Suggested questions",
    suggestions: [
      "What GenAI work have you done?",
      "What do you do at Thoughtworks?",
      "Which languages and frameworks do you use?",
      "Are you open to roles in Germany?",
      "What certifications do you have?",
    ],
    inputLabel: "Your question",
    placeholder: "e.g. What have you built with Angular?",
    submit: "Ask",
  },
  contact: {
    lead: "Hiring for a full-stack or GenAI role? Tell me about it.",
    reasons: { job: "Job opportunity", freelance: "Freelance or project work", other: "Something else" },
    name: "Name",
    email: "Email",
    company: "Company (optional)",
    reason: "What's this about?",
    message: "Message",
    errors: {
      name: "Enter your name.",
      email: "Enter an email address like name@company.com.",
      message: "Write at least 10 characters so I know how to help.",
    },
    sentTitle: "Message sent",
    sentBody: "Thanks for reaching out. I'll reply to the email you gave.",
    sendAnother: "Send another message",
    failed: (email: string) =>
      `The message didn't send. Check your connection and try again, or email ${email} directly.`,
    sending: "Sending message",
    send: "Send message",
  },
};

export type Ui = typeof en;

const de: Ui = {
  meta: {
    title: "Bilal Imran | Full-Stack-Softwareentwickler (.NET, Angular, React, GenAI)",
    description:
      "Bilal Imran: Full-Stack-Softwareentwickler und Consultant Developer bei Thoughtworks mit über 4 Jahren Erfahrung mit Enterprise-Anwendungen in C#/.NET, Angular und React sowie generativer KI in Produktion. Entwickler von hushmask, einem Open-Source-Datenschutz-Proxy für LLMs.",
  },
  skip: "Zum Inhalt springen",
  lang: { label: "Sprache", en: "English", de: "Deutsch" },
  nav: {
    label: "Hauptnavigation",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    about: "Über mich",
    experience: "Erfahrung",
    projects: "Projekte",
    skills: "Kenntnisse",
    achievements: "Erfolge",
    education: "Ausbildung",
    ask: "Fragen",
    contact: "Kontakt",
  },
  theme: {
    toLight: "Zum hellen Design wechseln",
    toDark: "Zum dunklen Design wechseln",
    light: "Helles Design",
    dark: "Dunkles Design",
  },
  hero: {
    roleAt: (role, company) => `${role} bei ${company}.`,
    basedIn: "Wohnhaft in",
    contact: "Kontakt aufnehmen",
    download: "Lebenslauf herunterladen",
    portrait: (name) => `Porträt von ${name}`,
    showReal: "Echte Werte anzeigen",
    showAi: "Zeigen, was eine KI bekommt",
    captionBefore: "Diese Platzhalter stammen von",
    captionAfter:
      ", meinem Open-Source-Proxy, der personenbezogene Daten vor einer KI verbirgt und sie in der Antwort wieder einsetzt.",
  },
  sections: {
    about: "Über mich",
    experience: "Berufserfahrung",
    projects: "Ausgewählte Projekte",
    projectsIntro: "Kundenprojekte sind ohne vertrauliche Details beschrieben.",
    skills: "Kenntnisse",
    achievements: "Zertifikate und Auszeichnungen",
    education: "Ausbildung",
    ask: "Fragen zu meiner Arbeit",
    askIntro:
      "Stellen Sie eine Frage und erhalten Sie die Antwort direkt aus meinem Lebenslauf. Alles läuft in Ihrem Browser, nichts von Ihrer Eingabe wird irgendwohin gesendet.",
    contact: "Kontakt",
  },
  stack: "Technologien:",
  caseStudy: { problem: "Problem", approach: "Ansatz", impact: "Ergebnis" },
  personalProjects: { before: "Weitere private Projekte finden Sie auf", after: "." },
  footer: { built: "Gebaut mit React und Tailwind CSS.", social: "Profile in sozialen Netzwerken" },
  ask: {
    empty:
      "Probieren Sie eine dieser Fragen aus, oder stellen Sie eine eigene zu meiner Erfahrung, meinen Projekten, Kenntnissen oder meiner Verfügbarkeit.",
    source: "Quelle:",
    notFoundBefore:
      "Dazu habe ich in meinem Lebenslauf nichts gefunden. Fragen Sie nach meiner Erfahrung, meinen Projekten, Kenntnissen oder meiner Verfügbarkeit, oder ",
    notFoundLink: "schreiben Sie mir eine Nachricht",
    notFoundAfter: ".",
    suggestionsLabel: "Vorgeschlagene Fragen",
    suggestions: [
      "Welche Erfahrung haben Sie mit GenAI?",
      "Was machen Sie bei Thoughtworks?",
      "Welche Sprachen und Frameworks nutzen Sie?",
      "Sind Sie offen für Stellen in Deutschland?",
      "Welche Zertifikate haben Sie?",
    ],
    inputLabel: "Ihre Frage",
    placeholder: "z. B. Was haben Sie mit Angular gebaut?",
    submit: "Fragen",
  },
  contact: {
    lead: "Sie besetzen eine Full-Stack- oder GenAI-Stelle? Erzählen Sie mir davon.",
    reasons: { job: "Stellenangebot", freelance: "Freelance- oder Projektarbeit", other: "Etwas anderes" },
    name: "Name",
    email: "E-Mail",
    company: "Unternehmen (optional)",
    reason: "Worum geht es?",
    message: "Nachricht",
    errors: {
      name: "Bitte geben Sie Ihren Namen ein.",
      email: "Bitte geben Sie eine E-Mail-Adresse wie name@firma.de ein.",
      message: "Bitte schreiben Sie mindestens 10 Zeichen, damit ich weiß, worum es geht.",
    },
    sentTitle: "Nachricht gesendet",
    sentBody: "Danke für Ihre Nachricht. Ich antworte an die angegebene E-Mail-Adresse.",
    sendAnother: "Weitere Nachricht senden",
    failed: (email) =>
      `Die Nachricht wurde nicht gesendet. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut, oder schreiben Sie direkt an ${email}.`,
    sending: "Nachricht wird gesendet",
    send: "Nachricht senden",
  },
};

export const ui = { en, de };
