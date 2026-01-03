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
    isolation: 'isolate', // important
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

      {/* BACKGROUND TYPOGRAPHY LAYER */}
      <div className="absolute inset-0 pointer-events-none">
        {/* DESIGNER — stays behind image */}
        <motion.div
          className="
            absolute
            top-[14%]
            left-[-2%]
            text-[14vw]
            md:text-[12vw]
            font-extrabold
            tracking-[0.14em]
            text-white/10
            leading-none
            uppercase
            z-[2]
          "
          animate={{ x: [0, 24, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          DESIGNER
        </motion.div>

        {/* PORTFOLIO — ABOVE IMAGE */}
        <motion.div
          className="
            absolute
            bottom-[6%]
            right-[-4%]
            text-[13vw]
            md:text-[11vw]
            font-extrabold
            tracking-[0.16em]
            text-white/15
            leading-none
            uppercase
            z-[30]
          "
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
            <div className="h-12 overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={greetingIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl text-lime-400 font-mono"
                >
                  {greetings[greetingIndex]}, I’m
                </motion.span>
              </AnimatePresence>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-white leading-none">
              ANISH
            </h1>

            <div className="relative inline-block mt-4">
              <span className="text-2xl md:text-3xl text-gray-300 font-light">
                UI/UX & Product Designer
              </span>
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-lime-400/30" />
            </div>

            <p className="mt-8 max-w-md text-gray-400 leading-relaxed">
              Crafting digital experiences with clean aesthetics and intuitive
              interactions.
            </p>

            <div className="flex gap-4 mt-12">
              <button className="px-8 py-3 bg-lime-400 text-black font-medium">
                View Work
              </button>
              <button className="px-8 py-3 border border-lime-400 text-white">
                Contact
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-gray-800 text-gray-300 hover:text-white transition"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT IMAGE (BELOW PORTFOLIO TEXT) */}
          <motion.div
            className="relative w-full max-w-md mx-auto z-[20]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="relative aspect-[3/4] bg-gradient-to-br from-gray-900 to-gray-800"
              style={{
                clipPath:
                  'polygon(0% 0%, 100% 0%, 100% 80%, 85% 100%, 0% 100%)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white/30">
                YOUR PHOTO
              </div>

              <div
                className="absolute inset-0 border border-gray-700/40"
                style={{
                  clipPath:
                    'polygon(0% 0%, 100% 0%, 100% 80%, 85% 100%, 0% 100%)',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
