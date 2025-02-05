import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Intern - Frontend Developer',
    company: 'Apollo Hospital Hyderabad',
    period: '2023',
    description:
      'Designed and developed user interfaces using Figma and React to enhance AI tool utilization across departments. Built a system to collect user data, process it with AI, and generate dynamic reports.',
  },
  {
    title: 'Freelance - Full Stack + AI Developer',
    company: 'Hindustan Relocation Services',
    period: '2023',
    description:
      'Developed an end-to-end web application with multiple user interfaces for clients, vendors, and executives. Achieved 500+ lead-to-customer conversions in the first month by streamlining workflows.',
  },
  {
    title: 'Startup',
    company: 'Startup',
    period: '2023 - Present',
    description:
      'Built an eCommerce platform for premium sarees with product ordering, admin controls, and advanced search features. Integrated React, Node.js, and Firebase to ensure a seamless user experience.',
  },
];

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-5">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Work Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full" />
                <div className="bg-background/50 p-6 rounded-lg shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-text/80">
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {exp.company}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  <p className="text-text/80">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
