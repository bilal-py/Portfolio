import { useState } from 'react'
import './App.css'
import { InteractiveGridPattern } from './Components/ui/interactive-grid-pattern';
import { FileTreeDemo } from './Components/FileTreeComponent';
import HomePage from './Pages/HomePage';
import { EducationPage } from './Pages/EducationPage';
import { ExperiencePage } from './Pages/ExperiencePage';
import SkillsPage from './Pages/SkillsPage';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FileTreeDemo />
      <HomePage />
      <EducationPage />
      <ExperiencePage />
      <SkillsPage />
    </>
  )
}

export default App
