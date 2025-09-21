import { Home} from 'lucide-react';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';
import { BorderBeam } from './ui/border-beam';
import { File, Folder, Tree } from './ui/file-tree'
import { EducationPage } from '../Pages/EducationPage';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

export function FileTreeDemo() {
  return (
    <aside
      className="fixed left-0 top-0 z-30 h-screen w-6 flex flex-col bg-white dark:bg-[#18181b] border-r border-[#22] dark:border-[#333]"
      style={{ minWidth: 220, maxWidth: 320 }}
    >
      <div className="flex items-center h-10 px-4 border-b border-[#22] dark:border-[#333] text-xs bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 dark:from-[#23272e] dark:via-[#23272e] dark:to-[#23272e] drop-shadow-lg animate-fade-in-up select-none">
        Career Tree
      </div>
      <AnimatedThemeToggler className="absolute top-2 right-2" />
      <div className="flex-1 overflow-y-auto">
        <Tree
          className="overflow-hidden bg-transparent p-2"
          initialSelectedId="7"
          initialExpandedItems={[
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
          ]}
          elements={ELEMENTS}
        >
          <Folder className='hover:bg-gray-100 dark:hover:bg-gray-800 transition' element="src" value="1">
            <Folder className='hover:bg-gray-100 dark:hover:bg-gray-800 transition' value="2" element="app">
              <File className='hover:bg-gray-100 dark:hover:bg-gray-800 transition' value="3"> Layout
                 <Router>
                  <Routes>
                      <Route
                          path="/EducationPage"
                          element={<EducationPage />}
                      />
                  </Routes>
                </Router>
              </File>
              <File className='hover:bg-gray-100 dark:hover:bg-gray-800 transition' value="4">
                <p>page.tsx</p>
              </File>
            </Folder>
            <Folder className='hover:bg-gray-100 dark:hover:bg-gray-800 transition' value="5" element="components">
              <Folder className='hover:bg-gray-100 dark:hover:bg-gray-800 transition' value="6" element="ui">
                <File className='hover:bg-gray-100 dark:hover:bg-gray-800 transition' value="7">
                  <p>button.tsx</p>
                </File>
              </Folder>
              <File className='hover:bg-gray-100 dark:hover:bg-gray-800 transition' value="8">
                <p>header.tsx</p>
              </File>
              <File className='hover:bg-gray-100 dark:hover:bg-gray-800 transition' value="9">
                <p>footer.tsx</p>
              </File>
            </Folder>
            <Folder className='hover:bg-gray-100 dark:hover:bg-gray-800 transition' value="10" element="pages">
              <File className='hover:bg-gray-100 dark:hover:bg-gray-800 transition' value="11">
                <p>Hobbies.ts</p>
              </File>
            </Folder>
          </Folder>
        </Tree>
      </div>
      <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-red-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        borderWidth={2}
        className="from-transparent via-blue-500 to-transparent"
      />
    </aside>
  );
}
const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          {
            id: "3",
            isSelectable: true,
            name: "layout.tsx",
          },
          {
            id: "4",
            isSelectable: true,
            name: "page.tsx",
          },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "6",
            isSelectable: true,
            name: "header.tsx",
          },
          {
            id: "7",
            isSelectable: true,
            name: "footer.tsx",
          },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          {
            id: "9",
            isSelectable: true,
            name: "utils.ts",
          },
        ],
      },
    ],
  },
];
