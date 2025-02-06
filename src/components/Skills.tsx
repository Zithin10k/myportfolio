import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  { name: 'Full Stack Development', level: 101 },
  { name: 'UI & UX', level: 101 },
  { name: 'AI Integration', level: 98 },
  { name: 'Cooking', level: 10 },
];

const Skills: React.FC = ({refs}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="py-5" ref={el => refs.current.skills = el}>
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div>
                <p className="text-lg mb-6">
                  I build complete web applications from start to finish. From
                  frontend interfaces to backend logic, I handle it all with
                  precision and efficiency.Every project I take on isn’t just functional—it
                  delivers real impact.
                </p>
                <p className="text-lg mb-6">
                I build with <b>HTML, CSS, JavaScript, React, Redux, Next.js, Tailwind CSS</b> for the frontend  <b>Node.js, Express, SQL, Firebase, Supabase</b> for the backend, including RESTful APIs. I also work with <b>Three.js, React Three Fiber, Squarespace, WordPress</b>, and AI tools like <b>Amazon Rekognition API</b>.
                </p>
              </div>
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

export default Skills;
