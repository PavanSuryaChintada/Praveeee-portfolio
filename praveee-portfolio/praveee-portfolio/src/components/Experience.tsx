import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    year: '2026',
    company: 'SentinelGate',
    role: 'Lead Automation Engineer',
    description: 'Architecting browser-based SQL injection prevention for AI interfaces and agentic workflows.'
  },
  {
    year: '2025',
    company: 'Mindsprint',
    role: 'Quantum Hackathon Finalist',
    description: 'Developed quantum-domain solutions during a 36-hour national sprint in Vijayawada.'
  },
  {
    year: '2024',
    company: 'CarbonMuseArt',
    role: 'Lead Creative Artist',
    description: 'Specializing in charcoal-based visual narratives and digital brand aesthetics.'
  },
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring for the central spine line
  const springLine = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Vertical line growth
  const scaleY = useTransform(springLine, [0, 0.2, 0.8, 1], [0, 0.1, 1, 1]);
  const opacityLine = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-40 overflow-hidden bg-[#050505] w-full selection:bg-lime-400 selection:text-black"
      id="experience"
    >
      <div className="container mx-auto px-6">
        {/* HEADER SECTION */}
        <div className="mb-40 flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
              Path <br /> <span className="text-lime-400">Legacy</span>
            </h2>
            <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.5em] mt-6">Professional Chronology // 03</p>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-right hidden md:block"
          >
            <span className="text-[10px] font-mono text-white/10 uppercase tracking-[0.4em] [writing-mode:vertical-rl]">Scroll to Explore</span>
          </motion.div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* THE KINETIC SPINE (Visual Spine) */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />
          <motion.div 
            style={{ scaleY, opacity: opacityLine, originY: 0 }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-lime-400 -translate-x-1/2 shadow-[0_0_20px_#bef264]"
          />

          <div className="space-y-60">
            {experiences.map((exp, i) => (
              <TimelineItem key={i} exp={exp} index={i} totalProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ exp, index, totalProgress }: { exp: ExperienceItem, index: number, totalProgress: any }) => {
  // Parallax for the year text (moves at a different speed)
  const yParallax = useTransform(totalProgress, [0, 1], [100, -100]);
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} w-full group`}
    >
      {/* KINETIC BACKGROUND YEAR */}
      <motion.span 
        style={{ y: yParallax }}
        className={`absolute top-[-80px] ${isEven ? 'md:left-[-150px]' : 'md:right-[-150px]'} text-[18vw] font-black text-white/[0.02] italic select-none pointer-events-none group-hover:text-lime-400/[0.04] transition-colors duration-1000 uppercase`}
      >
        {exp.year}
      </motion.span>

      <div className={`relative z-10 w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <span className="text-lime-400 font-mono text-[10px] uppercase tracking-[0.4em]">{exp.year}</span>
            <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500">
              {exp.company}
            </h3>
            <h4 className="text-lg md:text-xl text-white/50 font-medium italic mt-2">{exp.role}</h4>
          </div>

          <p className="text-white/30 text-sm md:text-base leading-relaxed font-light max-w-md">
            {exp.description}
          </p>

          <motion.div 
            whileHover={{ x: isEven ? 10 : -10 }}
            className={`flex items-center gap-4 text-lime-400 text-[10px] font-mono uppercase tracking-widest cursor-pointer ${!isEven && 'flex-row-reverse'}`}
          >
            <span className="w-10 h-[1px] bg-lime-400/30" />
            Case Study Incoming
          </motion.div>
        </div>
      </div>

      {/* THE SPINE NODE (The dot on the line) */}
      <div className="absolute left-0 md:left-1/2 top-4 w-4 h-4 -translate-x-1/2 z-30">
        <div className="absolute inset-0 bg-black rounded-full border border-white/20 scale-150" />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute inset-0 bg-lime-400 rounded-full shadow-[0_0_15px_#bef264]" 
        />
      </div>

      <style>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
          color: transparent;
        }
      `}</style>
    </motion.div>
  );
};

export default Experience;