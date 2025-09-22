import { useState } from 'react'
import './App.css'
import { InteractiveGridPattern } from './Components/ui/interactive-grid-pattern';
import { FileTreeDemo } from './Components/FileTreeComponent';
import HomePage from './Pages/HomePage';
import { EducationPage } from './Pages/EducationPage';
import { ExperiencePage } from './Pages/ExperiencePage';
import SkillsPage from './Pages/SkillsPage';
import AcademicPage from './Pages/AcademicPage';
import { AnimatedThemeToggler } from './Components/ui/animated-theme-toggler';
import NavbarComponent from './Components/NavbarComponent';
import HobbiesPage from './Pages/Hobbies';
function App() {
  const [count, setCount] = useState(0)

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
