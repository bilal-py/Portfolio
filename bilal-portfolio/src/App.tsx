import NavbarComponent from "./Components/NavbarComponent";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ExperiencePage from "./Pages/ExperiencePage";
import ProjectsPage from "./Pages/ProjectsPage";
import SkillsPage from "./Pages/SkillsPage";
import AchievementsPage from "./Pages/AchievementsPage";
import EducationPage from "./Pages/EducationPage";
import ContactPage from "./Pages/ContactPage";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>
      <NavbarComponent />
      <main id="main" className="pt-16">
        <HomePage />
        <AboutPage />
        <ExperiencePage />
        <ProjectsPage />
        <SkillsPage />
        <AchievementsPage />
        <EducationPage />
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
