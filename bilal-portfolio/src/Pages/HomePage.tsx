
import { InteractiveGridPattern } from '@/Components/ui/interactive-grid-pattern';
import { DockDemo } from '@/Components/DockComponent';

function HomePage() {
  return (
    <div className="relative min-h-screen w-full" style={{ paddingLeft: 220 }}>
      {/* Interactive grid as background, always interactive */}
      <div className="absolute inset-0 -z-10 pointer-events-auto">
        <InteractiveGridPattern />
      </div>
      <main
        className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 pt-24 pb-12 z-10"
      >
        <section className="w-full max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg animate-fade-in-up">
            Bilal Imran
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-gray-700 dark:text-gray-300 animate-fade-in-up delay-200">
            Welcome! I'm Bilal, a passionate developer crafting beautiful and interactive web experiences.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <a href="#projects" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition">View Projects</a>
            <a href="#contact" className="px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold shadow-lg hover:bg-gray-800 transition">Contact Me</a>
          </div>
        </section>
        <div className="mt-12 flex justify-center">
          <DockDemo />
        </div>
      </main>
    </div>
  );
}

export default HomePage;