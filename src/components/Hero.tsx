import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Dribbble, ArrowUpRight, MousePointer2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import HeroLoader from './HeroLoader';

const socialLinks = [
  { icon: Github, href: '#', label: 'GH' },
  { icon: Linkedin, href: '#', label: 'LI' },
  { icon: Twitter, href: '#', label: 'TW' },
  { icon: Dribbble, href: '#', label: 'DR' },
];

const greetings = ['Hello', 'Bonjour', 'Ciao', 'Hola', 'Namaste'];

const Hero = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <HeroLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] overflow-hidden flex items-center justify-center selection:bg-lime-400 selection:text-black"
    >
      {/* 1. DYNAMIC GRID & AMBIENT GLOW */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(#a3e635 0.5px, transparent 0.5px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-5%] right-[-2%] w-[600px] h-[600px] bg-lime-400/15 blur-[140px] rounded-full"
        />
      </div>

      {/* 2. ENHANCED BACKGROUND TEXT (More Visible) */}
      <div className="absolute inset-0 flex flex-col justify-between py-12 pointer-events-none select-none overflow-hidden">
        <motion.h2 
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 0.15 }}
          transition={{ duration: 1.8 }}
          className="text-[22vw] leading-none font-black italic -ml-10 outline-text-thick text-white/20"
        >
          CREATIVE
        </motion.h2>
        <motion.h2 
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 0.15 }}
          transition={{ duration: 1.8 }}
          className="text-[22vw] leading-none font-black italic self-end -mr-10 outline-text-thick text-white/20"
        >
          DIRECTOR
        </motion.h2>
      </div>

      {/* 3. MAIN INTERACTION LAYER */}
      <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-12 gap-4 items-center">
        
        {/* Left Sidebar Metadata */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-12 h-[400px] justify-center border-l border-white/10 pl-8">
            <div className="flex flex-col gap-6">
                {socialLinks.map(({ icon: Icon, label }) => (
                    <a key={label} href="#" className="text-white/30 hover:text-lime-400 transition-colors duration-300 group">
                        <Icon size={14} className="group-hover:scale-110 transition-transform"/>
                    </a>
                ))}
            </div>
            <div className="text-[10px] text-white/20 font-mono vertical-text tracking-[0.3em] uppercase">
                Est // 2024
            </div>
        </div>

        {/* Center: Content Block */}
        <motion.div 
          style={{ opacity }}
          className="lg:col-span-6 space-y-6 z-20"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[1px] bg-lime-400/50" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={greetingIndex}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="text-lime-400 font-mono text-xs tracking-[0.2em] uppercase"
                >
                  {greetings[greetingIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            
            <h1 className="text-6xl md:text-[7rem] font-bold text-white tracking-tighter leading-[0.8] flex flex-col">
              <span className="relative z-10">
                PRAVEENA<span className="text-lime-400 text-xl absolute top-2 md:top-4 ml-2 italic">©</span>
              </span>
              {/* Overlapping Text: Increased Z-index and relative positioning to cover image */}
              <span className="text-white/30 outline-text-thin relative z-[50] mt-[-5px] md:mt-[-10px] transform md:translate-x-12">
                RUDRAKSHULA
              </span>
            </h1>
          </div>

          <div className="max-w-sm space-y-8">
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
              Merging <span className="text-white">clean aesthetics</span> with <span className="text-white">functional logic</span> to build digital products.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                className="bg-lime-400 text-black px-7 py-3.5 rounded-full font-bold text-xs flex items-center gap-3 group overflow-hidden relative shadow-[0_0_20px_-5px_rgba(163,230,53,0.5)]"
              >
                <span className="relative z-10 uppercase tracking-widest">VIEW WORK</span>
                <ArrowUpRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <div className="flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80">
                <div className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase">AVAILABLE</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Portrait Image (Positioned behind the overlapping name) */}
        <motion.div 
          className="lg:col-span-5 relative hidden lg:flex items-center justify-center z-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <div className="relative group">
            <motion.div
              animate={{
                borderRadius: [
                  "42% 58% 70% 30% / 45% 45% 55% 55%",
                  "70% 30% 46% 54% / 30% 39% 61% 70%",
                  "42% 58% 70% 30% / 45% 45% 55% 55%",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[420px] h-[540px] overflow-hidden bg-[#111] border border-white/5 shadow-2xl"
            >
                <img 
                    src="/your-designer-profile.jpg" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    alt="Profile"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
            </motion.div>

            {/* Interaction Badge */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-10 p-5 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl flex flex-col shadow-2xl z-30"
            >
                <div className="flex flex-col">
                    <span className="text-[10px] text-lime-400 uppercase tracking-widest font-mono font-bold">Base</span>
                    <span className="text-white text-sm font-bold uppercase tracking-tight">India</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
                   <MousePointer2 className="text-lime-400 -rotate-12" size={16}/>
                   <span className="text-[9px] text-white/40 font-mono">©24</span>
                </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer Details */}
      <div className="absolute bottom-10 left-0 w-full px-10 flex justify-between items-end">
        <div className="flex gap-4">
            <div className="w-px h-12 bg-white/10" />
            <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Location</span>
                <span className="text-xs text-white uppercase font-mono">28.61° N, 77.20° E</span>
            </div>
        </div>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="vertical-text text-[9px] text-white/20 uppercase tracking-[0.5em]">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
        .outline-text-thick {
          -webkit-text-stroke: 3px rgba(255,255,255,0.1);
          color: transparent;
        }
        .outline-text-thin {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default Hero;