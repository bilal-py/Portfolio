# Bilal Imran — Portfolio

Personal portfolio of **Bilal Imran**, Full-Stack Software Engineer (.NET · Angular · React · Generative AI) and Consultant Developer at Thoughtworks.

**Live:** https://bilal-py.github.io/Portfolio/

## Tech stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS v4 and shadcn/ui primitives
- Bricolage Grotesque and IBM Plex Sans (Google Fonts)
- Formspree for the contact form (no backend required)
- Deployed to GitHub Pages via `gh-pages`

## Project structure

```
src/
  data/resume.ts      # all site content (experience, projects, skills…), the one file to edit
  Pages/              # one component per section (Home, About, Experience, Projects, …)
  Components/         # shared pieces: Navbar, Footer, Section
  Components/ui/      # shadcn primitives
```

## Updating content

Edit `src/data/resume.ts`. Optional settings in `profile`:

| Field | Purpose |
|---|---|
| `resumeFile` | PDF placed in `public/` to enable the **Download CV** button |
| `photoFile` | Image placed in `public/` to show a portrait in the hero |
| `formspreeEndpoint` | Formspree form URL; when empty, the form falls back to opening an email |

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
npm run deploy   # build and publish to GitHub Pages
```
