// German version of the resume. Job titles, certificate names and product names stay in their
// original (English) form, as is usual on German CVs in tech.
import { contact } from "./contact";
import type { Resume } from "./resume";

export const resumeDe: Resume = {
  profile: {
    ...contact,
    role: "Full-Stack-Entwickler",
    tagline:
      "Ich entwickle Enterprise-Produkte mit .NET, Angular und React und mache generative KI so sicher und günstig, dass sie mit echten Kundendaten laufen kann.",
    summary:
      "Consultant Developer bei Thoughtworks mit über 4 Jahren Erfahrung in der Entwicklung von Enterprise-Anwendungen mit C#/.NET, Angular, React und SQL in den Branchen Automobil, Versicherung und Energie. Mein aktueller Schwerpunkt ist der verantwortungsvolle Einsatz generativer KI in Produktion: datenschutzfreundliche Dokumentenverarbeitung, KI-Agenten für die Qualitätssicherung und niedrigere LLM-Kosten. In meinen Teams setze ich mich außerdem für Spec-Driven Development ein.",
    location: "Bangalore, Indien",
    availability: "Offen für Stellen in Deutschland",
    resumeFile: "Bilal_Imran_Resume.pdf",
    resumeLanguage: "Englisch",
  },

  experience: [
    {
      company: "Thoughtworks",
      role: "Consultant Developer",
      location: "Bangalore, Indien",
      period: "Dez. 2025 – heute",
      current: true,
      highlights: [
        "Entwicklung von End-to-End-Full-Stack-Features für einen Enterprise-Automobilmarktplatz: automatisierte Übernahme großer Mengen von Fahrzeug-Leads aus Drittquellen sowie dynamische UI-Komponenten, die neuen Fahrzeugbestand für Nutzer aktuell halten.",
        "Senkung der Betriebskosten für generative KI durch einen intelligenten URL-Ausschlussfilter, der redundante LLM-Seitenscans verhindert: deutlich geringerer API-Aufwand bei gleichbleibender Genauigkeit der Datenerfassung.",
        "Konzeption eines datenschutzorientierten KI-POC zur Dokumentenverarbeitung während eines Hackathons und Präsentation direkt vor dem Group CEO des Kunden. Microsoft Presidio, Pydantic AI und Claude bilden bereinigte Finanzdaten auf UI-Schemas ab.",
        "Einführung von Spec-Driven Development im Team und Aufbau von Spec-Driven Testing mit KI-QA-Agenten (mehrstufige Orchestrierung, Tool Calling, Kontextgedächtnis), die Testszenarien für funktionsübergreifende Teams automatisch erzeugen.",
      ],
      stack: ["C#", ".NET", "Angular", "TypeScript", "PostgreSQL", "AWS", "GenAI"],
    },
    {
      company: "LTIMindtree",
      role: "Consultant",
      location: "Noida, Indien",
      period: "Juli 2024 – Nov. 2025",
      highlights: [
        "Entwicklung robuster Backend-Funktionen für eine groß angelegte Versicherungsanwendung.",
        "Mitarbeit am Feature „Track Rate“, das komplexe Versicherungsformeln über alle Deckungen hinweg verfolgt und berechnet.",
        "Optimierung der Track-Rate-Berechnung durch dynamisches Setzen der Deckungs-Tracks anhand der hinterlegten Formeln.",
      ],
      stack: ["C#", ".NET", "SQL Server"],
    },
    {
      company: "GlobalLogic",
      role: "Software Engineer",
      location: "Noida, Indien",
      period: "Juni 2022 – Juli 2024",
      highlights: [
        "Mitarbeit an einem Daten- und Analyseprodukt für natürliche Ressourcen: vereinfachte Integration und Benchmarking von Emissionsdaten.",
        "Entwicklung und Erweiterung von Features für die Plattform Lens Carbon mit Fokus auf Carbon Capture, Utilisation and Storage (CCUS), für bessere Dateneinblicke und Workflows im CO₂-Management.",
        "Entwicklung von Funktionen für Antragstellerdaten (einschließlich gemeinsamer Antragsteller) in einer Full-Stack-Banking-Webanwendung.",
      ],
      stack: ["C#", ".NET Core", "React", "JavaScript", "SQL Server", "xUnit"],
    },
    {
      company: "Hitachi Vantara",
      role: "Software Development Engineer (Praktikum)",
      period: "Feb. 2022 – Juni 2022",
      internship: true,
      highlights: ["Mitarbeit im App-Engineering-Team an Anforderungen für mehrere Kundenprojekte."],
      stack: ["Salesforce", "Apex"],
    },
    {
      company: "Verzeo",
      role: "Machine Learning (Praktikum)",
      period: "Okt. 2020 – Nov. 2020",
      internship: true,
      highlights: ["Training von ML-Modellen, Datenvorverarbeitung und Entwicklung eines Filmempfehlungssystems."],
      stack: ["Python", "Machine Learning", "Flask", "Bootstrap"],
    },
  ],

  projects: [
    {
      // \u00AD = soft hyphen: the title only breaks at these points on narrow screens.
      title: "Datenschutz\u00ADorientierte KI-Dokumenten\u00ADverarbeitung",
      context: "Hackathon-POC · Thoughtworks",
      problem:
        "Finanzdokumente wurden von Hand erfasst, und sensible Kundendaten durften nicht ungefiltert an ein LLM gehen.",
      approach:
        "Microsoft Presidio erkennt und anonymisiert personenbezogene Daten vor jedem Modellaufruf. Pydantic AI und Claude extrahieren die bereinigten Inhalte anschließend in typisierte Schemas, die direkt auf die Oberfläche abgebildet werden.",
      impact:
        "Die manuelle Dateneingabe entfällt, bei niedrigen LLM-Kosten. Direkt vor dem Group CEO des Kunden präsentiert.",
      stack: ["Python", "Pydantic AI", "Claude", "Microsoft Presidio"],
    },
    {
      title: "hushmask: Datenschutz-Proxy für LLMs",
      context: "Privates Projekt, Open Source, auf PyPI",
      problem:
        "Nach dem Presidio-Hackathon zeigte sich immer wieder dieselbe Lücke: Menschen kopieren E-Mails, Verträge und Kontoauszüge in KI-Tools, und jeder Name, jede IBAN und jede Adresse darin landet auf fremden Servern.",
      approach:
        "Eine Python-Bibliothek, ein CLI und ein OpenAI-kompatibler Proxy (FastAPI), der personenbezogene Werte durch stabile Tokens wie PERSON_4aee58 ersetzt, bevor eine Anfrage den Rechner verlässt, und sie in der Antwort wiederherstellt, auch in JSON und Tool Calls. Muster mit Prüfsummen (Luhn, IBAN Mod 97, Aadhaar Verhoeff) erkennen Nummern, Adressmuster decken DE/NL/FR/IT/ES/US/UK/AU ab, und ein lokales GLiNER-Namensmodell auf ONNX findet Namen, die niemand hinterlegt hat. Es arbeitet nach dem Fail-Closed-Prinzip: Der maskierte Text wird erneut geprüft und abgewiesen, wenn noch etwas Erkennbares übrig ist. Ein React-Dashboard bietet einen Playground und eigene Schlüssel pro App für Ollama, OpenAI, Gemini, OpenRouter und Groq.",
      impact:
        "Verbirgt 87 % der personenbezogenen Werte in englischen ai4privacy-Texten vollständig und 90 % in deutschen, gegenüber etwa 26 % mit Mustern allein. Ein lokales Modell, das 52 Transaktionen kategorisierte, erreichte mit Tokens 92,3 % statt 94,2 % mit echten Daten, und jeder Name kam korrekt zurück. Jede App mit OpenAI-kompatibler API kann es nutzen, indem sie eine einzige URL ändert.",
      stack: ["Python", "FastAPI", "ONNX Runtime", "GLiNER", "React", "TypeScript", "Tailwind", "pytest", "GitHub Actions"],
      showcase: "hushmask",
      link: { label: "Projektseite", url: "https://bilal-py.github.io/hushmask/" },
    },
    {
      title: "Spence: Local-First-Ausgabentracker mit KI",
      context: "Privates Projekt, Open Source",
      problem:
        "Ausgaben-Apps verlangen einen Bank-Login oder ein Cloud-Konto, und LLMs lesen Kontoauszüge falsch: zusammengeführte Zeilen, erfundene Buchungen, 03/04 falsch herum gelesen.",
      approach:
        "Eine .NET-11-API mit Clean Architecture und eine React-19-App. Ein LLM (lokal mit Ollama oder Gemini/OpenAI mit eigenem Schlüssel) extrahiert Transaktionen per Structured Output aus PDF, CSV und Belegfotos. Jeder Betrag wird mit dem Text des Auszugs abgeglichen, die Datumsreihenfolge wird pro Auszug bestimmt, und Kategoriekorrekturen werden zu Händlerregeln. Die Schnelleingabe zerlegt Zeilen wie „chai 40 upi“ mit einfachen Regeln und fragt die KI nur bei unbekannten Händlern.",
      impact:
        "Als kostenloser Download für Windows, macOS und Linux verfügbar (ohne Installer, unter Windows als Tray-App), von GitHub Actions aus dem Quellcode gebaut. Alle Daten bleiben in einer SQLite-Datei auf dem eigenen Rechner, mit täglichen Backups. Dazu kommen Budgets, Rechnungen, Spartöpfe, wöchentliche Quests, ein Chat, der mit begrenzten, rein lesenden Abfrage-Tools antwortet, Monthly-Wrapped-Karten und 79 xUnit-Tests.",
      stack: [".NET 11", "EF Core", "SQLite", "Microsoft.Extensions.AI", "Ollama", "PdfPig", "React 19", "TypeScript", "Tailwind 4", "xUnit", "GitHub Actions"],
      showcase: "spence",
      link: { label: "Projektseite", url: "https://bilal-py.github.io/spence-ai/" },
    },
    {
      title: "KI-QA-Agenten für Spec-Driven Testing",
      context: "Thoughtworks",
      problem: "QA-Szenarien für jedes Ticket von Hand zu schreiben, bremste die Auslieferung in allen Teams.",
      approach:
        "KI-Agenten lesen die Spezifikation und erzeugen Testszenarien über mehrstufige Orchestrierung mit Tool Calling und Kontextgedächtnis, als Teil eines Spec-Driven-Development-Workflows.",
      impact: "Schnellere Ticketbearbeitung und deutlich weniger manuelles Schreiben von Szenarien für funktionsübergreifende Teams.",
      stack: ["GenAI", "Tool Calling", "OpenSpec", "Spec-Driven Development"],
    },
    {
      title: "Senkung der LLM-Kosten",
      context: "Enterprise-Automobilmarktplatz · Thoughtworks",
      problem: "Eine GenAI-Pipeline verbrauchte Tokens für das Scannen von Seiten, die keine neuen Informationen enthielten.",
      approach: "Konzeption eines intelligenten URL-Ausschlussfilters, der redundante Seiten überspringt, bevor sie das LLM erreichen.",
      impact: "Deutlich geringerer API-Aufwand bei gleichbleibender Genauigkeit der Datenerfassung.",
      stack: ["C#", ".NET", "AWS", "GenAI"],
    },
    {
      title: "Lens Carbon: CCUS-Analytics",
      context: "GlobalLogic",
      problem: "Teams im CO₂-Management brauchten Emissionsdaten integriert und vergleichbar an einem Ort.",
      approach:
        "Entwicklung von Features über den gesamten Stack für Workflows rund um Carbon Capture, Utilisation and Storage in einer Analyseplattform für natürliche Ressourcen.",
      impact: "Bessere Dateneinblicke und reibungslosere Workflows im CO₂-Management.",
      stack: ["C#", ".NET Core", "React", "SQL Server"],
    },
  ],

  skills: [
    { category: "Programmiersprachen", items: ["C#", "TypeScript", "JavaScript", "Python", "LINQ"] },
    { category: "Frameworks & Bibliotheken", items: [".NET Core", "Entity Framework", "Angular", "React"] },
    { category: "Datenbanken", items: ["SQL Server", "PostgreSQL"] },
    {
      category: "KI-gestützte Entwicklung",
      items: ["GitHub Copilot", "Claude Code", "AWS Bedrock", "Prompt Engineering", "Tool / Function Calling", "PII-Maskierung (Presidio, hushmask)"],
    },
    {
      category: "Tools & Testing",
      items: ["AWS", "Docker", "CI/CD-Pipelines", "xUnit", "OpenSpec", "Postman", "Jira", "Git"],
    },
    {
      category: "Konzepte & Methoden",
      items: ["OOP", "SOLID", "Datenstrukturen & Algorithmen", "Agile Methoden", "Spec-Driven Development", "GenAI-Integration"],
    },
  ],

  certifications: [
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
  ],

  achievements: [
    "Weltweit unter den besten 14,11 % auf LeetCode, mit über 650 gelösten Aufgaben und einem besten Contest-Rang von 1.400.",
    "6★ in Problem Solving und 5★ in Python auf HackerRank.",
    "Präsentation eines GenAI-POC zur Dokumentenverarbeitung direkt vor dem Group CEO eines Kunden bei einem Thoughtworks-Hackathon.",
    "Aus der Hackathon-Idee entstand hushmask, ein Open-Source-Datenschutz-Proxy für LLMs, veröffentlicht auf PyPI.",
  ],

  education: [
    {
      institution: "Pranveer Singh Institute of Technology, Kanpur",
      degree: "B.Tech. Informatik (Computer Science & Engineering)",
      period: "2018 – 2022",
      detail: "CGPA 7,5 / 10",
    },
    {
      institution: "Wendy Academy High School",
      degree: "ISC (12. Klasse)",
      period: "2016 – 2017",
      detail: "79,8 %",
    },
    {
      institution: "Wendy Academy High School",
      degree: "ICSE (10. Klasse)",
      period: "2014 – 2015",
      detail: "79,1 %",
    },
  ],
};
