import './App.css'
import HomePage from './Pages/HomePage';
import { EducationPage } from './Pages/EducationPage';
import { ExperiencePage } from './Pages/ExperiencePage';
import SkillsPage from './Pages/SkillsPage';
import AcademicPage from './Pages/AcademicPage';
import NavbarComponent from './Components/NavbarComponent';
import HobbiesPage from './Pages/Hobbies';

function App() {
  return (
    <>
      <NavbarComponent />
      <div id="home"><HomePage /></div>
      <div id="education"><EducationPage /></div>
      <div id="experience"><ExperiencePage /></div>
      <div id="skills"><SkillsPage /></div>
      <div id="academic"><AcademicPage /></div>
      <div id="hobbies"><HobbiesPage /></div>
    </>
  )
}

export default App
