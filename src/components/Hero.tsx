import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown } from 'lucide-react';
// import gsap from 'gsap';

const Hero: React.FC = ({refs}) => {

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
      ref={refs.current.hero}
    >
      <div className="section-container text-center visible">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h2 className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-80">
            Hi , I am Jithin
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            I make Web{' '}
            <span id='diverForHero'></span>
            <TypeAnimation
              sequence={[
                'Applications',
                5000,
                'Designs',
                3000,
                'Experience',
                3000,
                'AI Integration',
                3000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-primary"
            />
          </h1>
          <p className=""></p>
          <br />

          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
            onClick={()=>refs.current.projects.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-text rounded-full font-medium hover:shadow-lg transition-shadow duration-300"
            >
              View Projects
            </motion.button>
            <motion.button
             onClick={()=>refs.current.contact.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-primary text-text rounded-full font-medium hover:bg-primary/10 transition-colors duration-300"
            >
              Contact me
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ArrowDown className="w-12 h-12 text-primary"  
        onClick={()=>refs.current.skills.scrollIntoView({ behavior: "smooth" })} 
        />
      </motion.div>
    </section>
  );
};

export default Hero;
