import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  { name: 'Full Stack Development', level: 101 },
  { name: 'UI & UX', level: 101 },
  { name: 'AI Integration', level: 98 },
  { name: 'Cooking', level: 10 },
];

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="py-5">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div>
                <p className="text-lg mb-6">
                  I build complete web applications from start to finish. From
                  frontend interfaces to backend logic, I handle it all with
                  precision and efficiency. My work isn’t just functional—it
                  delivers real impact.
                </p>
                <p className="text-lg mb-6">
                  I’ve developed AI-powered tools, streamlined business
                  operations, and built platforms that convert users into
                  customers. Every project I take on is designed for
                  performance, usability, and growth.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-primary text-text rounded-full font-medium hover:shadow-lg transition-shadow duration-300"
              >
                Download Resume
              </motion.button>
            </div>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
