import { useEffect, useRef, useState } from 'react';
import Particles from '@tsparticles/react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const sections = useRef({
    hero:null,
    skills:null,
    experience:null,
    projects:null,
    contact:null,
  })
  const userHasScrolled = useRef({
    run:0,
    hasScrolled:false,
  })
  useEffect(() => {
    // Handle scroll events
    const handleScroll = () => {
      if (userHasScrolled.current.run === 0) {
        userHasScrolled.current.run = 1
      } else {
        userHasScrolled.current.hasScrolled= true
      }
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
    function slightScroll() {
      if (!(userHasScrolled.current.hasScrolled)) {
          window.scrollBy({ top: 400, behavior: "smooth" }); 
          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 500);
      }
  }

  setTimeout(slightScroll,7000)


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
            <Hero refs={sections} />
            <Skills refs={sections}/>
            <Experience refs={sections} />
            <Projects refs={sections} />
            <Contact refs={sections} />
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
