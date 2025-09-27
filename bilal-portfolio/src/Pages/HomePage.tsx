
// import { InteractiveGridPattern } from '@/Components/ui/interactive-grid-pattern';
import { DockDemo } from '@/Components/DockComponent';
import { AuroraText } from '@/Components/ui/aurora-text';

function HomePage() {
  return (
    <div className="relative min-h-screen w-full" >
      {/* Interactive grid as background, always interactive */}

      <main
        className="relative flex flex-col items-center justify-center min-h-screen w-full px-2 pt-20 pb-8 sm:px-4 sm:pt-24 sm:pb-12 z-10"
      >
        <section className="w-full max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
            Bilal <AuroraText>Imran</AuroraText>
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-2xl text-gray-700 dark:text-gray-300 animate-fade-in-up delay-200">
            Welcome! I'm Bilal, a passionate developer crafting beautiful and interactive web experiences.
          </p>
        </section>
        <div className="mt-8 sm:mt-12 flex justify-center w-full">
          <DockDemo />
        </div>
      </main>
    </div>
  );
}

export default HomePage;