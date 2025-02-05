import { useEffect, useState } from 'react';
import Particles from '@tsparticles/react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle scroll events
    const handleScroll = () => {
      // Handle section visibility
      const sections = document.querySelectorAll('.section-container');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        if (isVisible) {
          section.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Initial load handling
    const timer = setTimeout(() => {
      setIsLoading(false);
      handleScroll(); // Check initial section visibility
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Prevent content flash
  useEffect(() => {
    document.body.style.visibility = isLoading ? 'hidden' : 'visible';
  }, [isLoading]);

  return (
    <div className="min-h-screen">
      <CustomCursor />
      {!isLoading && (
        <>
          <Particles
            id="tsparticles"
            options={{
              background: {
                color: {
                  value: 'transparent',
                },
              },
              particles: {
                color: {
                  value: '#FFD700',
                },
                links: {
                  color: '#FFD700',
                  distance: 150,
                  enable: true,
                  opacity: 0.2,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 1,
                },
                size: {
                  value: { min: 1, max: 3 },
                },
                opacity: {
                  value: 0.3,
                },
              },
            }}
          />

          <main className="relative">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Contact />
          </main>
          <br />
          <br />
          <br />
        </>
      )}
    </div>
  );
}

export default App;
