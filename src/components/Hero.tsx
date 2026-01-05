import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Dribbble } from 'lucide-react';
import { useState, useEffect, useRef, CSSProperties } from 'react';
import HeroLoader from './HeroLoader';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Dribbble, href: 'https://dribbble.com', label: 'Dribbble' },
];

const greetings = ['Hello', 'Bonjour', 'Ciao', 'Hola', 'Namaste'];

const Hero = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <HeroLoader onComplete={() => setIsLoading(false)} />;
  }

  const heroStyle: CSSProperties = {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    overflow: 'hidden',
    isolation: 'isolate',
    '--grid-size': '100px',
    '--grid-color': 'rgba(163, 230, 53, 0.03)',
  } as CSSProperties;

  return (
    <section ref={heroRef} id="hero" style={heroStyle}>
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: 'var(--grid-size) var(--grid-size)',
          maskImage: 'radial-gradient(circle at 50% 50%, white 0%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 50%, white 0%, transparent 70%)',
        }}
      />

      {/* BACKGROUND TYPOGRAPHY */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[-2%] text-[14vw] md:text-[12vw]
                     font-extrabold tracking-[0.14em]
                     text-white/10 uppercase z-[2]"
          animate={{ x: [0, 24, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          DESIGNER
        </motion.div>

        <motion.div
          className="absolute bottom-[6%] right-[-4%] text-[13vw] md:text-[11vw]
                     font-extrabold tracking-[0.16em]
                     text-white/15 uppercase z-[30]"
          animate={{ x: [0, -28, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          PORTFOLIO
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-20 items-center w-full max-w-7xl mx-auto">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* GREETING — micro fade + blur + baseline aligned */}
            <div className="h-12 flex items-end mb-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={greetingIndex}
                  initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="text-lg md:text-xl text-lime-400/90 tracking-wide"
                  style={{
                    fontFamily: '"Dancing Script", cursive',
                    textTransform: 'none',
                    letterSpacing: '0.02em',
                    fontWeight: 500,
                    lineHeight: '1.2',
                    display: 'inline-block',
                    transform: 'translateZ(0)' // Force GPU acceleration
                  }}
                >
                  {greetings[greetingIndex]}, I'm
                </motion.span>
              </AnimatePresence>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-white leading-none">
              PRAVEENA
            </h1>

            {/* DESIGNER ROLE */}
            <div className="relative inline-block mt-3 -translate-y-3">
              <span className="text-lg md:text-xl text-gray-300 font-light">
                UI/UX & Product Designer
              </span>
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-lime-400/30" />
            </div>

            <p className="mt-8 max-w-md text-gray-400 leading-relaxed">
              Crafting digital experiences with clean aesthetics and intuitive
              interactions.
            </p>

            {/* BUTTONS */}
            <motion.div className="flex gap-4 mt-12">
              <motion.button 
                className="px-8 py-3 font-medium text-black relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #a3e635, #84cc16)',
                  borderRadius: '16px 16px 16px 4px',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}
                whileHover={{
                  y: -2,
                  transition: { type: 'spring', stiffness: 400, damping: 10 }
                }}
              >
                <span className="relative z-10">View Work</span>
                <motion.span 
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                  style={{ borderRadius: 'inherit' }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button 
                className="px-8 py-3 font-medium text-lime-400 relative"
                style={{
                  borderRadius: '16px 4px 16px 16px',
                  background: 'rgba(163, 230, 53, 0.08)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(163, 230, 53, 0.2)',
                }}
                whileHover={{
                  y: -2,
                  background: 'rgba(163, 230, 53, 0.12)',
                  transition: { type: 'spring', stiffness: 400, damping: 10 }
                }}
              >
                <span className="relative z-10">Contact</span>
                <motion.div 
                  className="absolute inset-0 bg-lime-400/5 opacity-0 group-hover:opacity-100"
                  style={{ borderRadius: 'inherit' }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-5 mt-8">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 flex items-center justify-center text-gray-400 hover:text-lime-400"
                  whileHover={{ 
                    y: -2,
                    transition: { type: 'spring', stiffness: 400, damping: 10 }
                  }}
                >
                  <div className="absolute w-11 h-11 rounded-full bg-white/5 border border-white/5 group-hover:border-lime-400/20 group-hover:bg-lime-400/5 transition-all duration-300 flex items-center justify-center">
                    <Icon size={18} className="relative z-10" />
                  </div>
                  <motion.div 
                    className="absolute w-11 h-11 rounded-full bg-lime-400/10 opacity-0 group-hover:opacity-100"
                    style={{ filter: 'blur(8px)' }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ 
                      scale: 1.2, 
                      opacity: 1,
                      transition: { duration: 0.4 }
                    }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative w-full max-w-md mx-auto z-[20] mt-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
              animate={{
                borderRadius: [
                  '48% 52% 60% 40% / 42% 45% 55% 58%',
                  '55% 45% 42% 58% / 55% 42% 58% 45%',
                  '48% 52% 60% 40% / 42% 45% 55% 58%',
                ],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <img
                src="/dummy-photo.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
