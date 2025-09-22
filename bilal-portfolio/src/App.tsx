// ...existing code...
import './App.css'
import HomePage from './Pages/HomePage';
import { EducationPage } from './Pages/EducationPage';
import { ExperiencePage } from './Pages/ExperiencePage';
import SkillsPage from './Pages/SkillsPage';
import AcademicPage from './Pages/AcademicPage';
import NavbarComponent from './Components/NavbarComponent';
import HobbiesPage from './Pages/Hobbies';
function App() {
  // ...existing code...

  return (
    <>
      <NavbarComponent />
      <HomePage />
      <EducationPage />
      <ExperiencePage />
      <SkillsPage />
      <AcademicPage />
      <HobbiesPage />
    </>
  )
}

export default App
