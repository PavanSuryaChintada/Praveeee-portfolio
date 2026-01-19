import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Github, Linkedin, Twitter, Mail, Sparkles, Layers, Code, Brush, Dribbble, Figma, Database, Zap, ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridOffset, setGridOffset] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Designer Parallax Transforms
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.85]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const maskX = useTransform(smoothProgress, [0.1, 0.4], ["100%", "0%"]);
  const manifestoScale = useTransform(smoothProgress, [0.8, 1], [0.9, 1]);

  // --- TRIPLE LAYER SKILL MOTION (REFINED SIZE) ---
  const line1X = useTransform(smoothProgress, [0.2, 0.8], ["0%", "-25%"]);
  const line2X = useTransform(smoothProgress, [0.2, 0.8], ["-20%", "5%"]);
  const line3X = useTransform(smoothProgress, [0.2, 0.8], ["-5%", "-20%"]);

  const skillLayers = [
    {
      motion: line1X,
      items: [
        { name: "React", logo: "react" },
        { name: "Next.js", logo: "nextdotjs" },
        { name: "TypeScript", logo: "typescript" },
        { name: "Tailwind", logo: "tailwindcss" },
        { name: "Framer", logo: "framer" },
        { name: "Redux", logo: "redux" }
      ]
    },
    {
      motion: line2X,
      items: [
        { name: "Node.js", logo: "nodedotjs" },
        { name: "PostgreSQL", logo: "postgresql" },
        { name: "MongoDB", logo: "mongodb" },
        { name: "Prisma", logo: "prisma" },
        { name: "Docker", logo: "docker" },
        { name: "AWS", logo: "amazonaws" }
      ]
    },
    {
      motion: line3X,
      items: [
        { name: "Figma", logo: "figma" },
        { name: "Photoshop", logo: "adobephotoshop" },
        { name: "Illustrator", logo: "adobeillustrator" },
        { name: "OpenAI", logo: "openai" },
        { name: "Python", logo: "python" },
        { name: "GitHub", logo: "github" }
      ]
    }
  ];

  // Mouse-responsive background grid
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 40;
    const y = (clientY / window.innerHeight - 0.5) * 40;
    setGridOffset({ x, y });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-lime-400 selection:text-black overflow-x-hidden font-sans relative">
      <Navigation />

      {/* 1. GENERATIVE DESIGNER GRID */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23bef264' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          x: gridOffset.x,
          y: gridOffset.y
        }}
      />
      <div className="fixed inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#bef264_0%,transparent_80%)] opacity-[0.03] blur-[120px]" />

      {/* BACKGROUND TEXT - INCREASED VISIBILITY */}
      <div className="absolute inset-0 flex flex-col justify-between py-12 pointer-events-none select-none overflow-hidden">
        <motion.h2 
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 0.18 }}
          transition={{ duration: 1.8 }}
          className="text-[22vw] leading-none font-black italic -ml-10 outline-text-thick text-white/20"
        >
          CREATIVE
        </motion.h2>
        <motion.h2 
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 0.18 }}
          transition={{ duration: 1.8 }}
          className="text-[22vw] leading-none font-black italic self-end -mr-10 outline-text-thick text-white/20"
        >
          DIRECTOR
        </motion.h2>
      </div>

      <motion.main className="relative z-20 pt-40 pb-24 px-6 md:px-16 lg:px-24">
        
        {/* SECTION 01: THE HERO NARRATIVE */}
        <section className="min-h-[90vh] flex flex-col justify-center items-start relative mb-40">
           <Link to="/" className="group inline-flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.5em] text-white/30 hover:text-lime-400 transition-all mb-16">
             <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
             Return to base
           </Link>

           <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="z-30">
              <h1 className="text-7xl md:text-[12vw] font-black tracking-tighter leading-[0.8] uppercase italic">
                 <span className="text-white/10 outline-text-stroke">Poetic</span> <br />
                 <span className="text-lime-400">Logic.</span>
              </h1>
              <p className="mt-12 text-xl md:text-3xl font-light text-white/50 max-w-2xl italic leading-relaxed">
                "I don't just build interfaces; I architect <span className="text-white underline decoration-lime-400/30 underline-offset-8">digital emotions</span> through high-fidelity engineering."
              </p>
           </motion.div>

           <motion.div 
              style={{ x: maskX }}
              className="absolute top-0 right-0 w-full max-w-3xl aspect-[4/5] overflow-hidden rounded-[4rem] border border-white/5 z-10 opacity-40 grayscale group hover:grayscale-0 transition-all duration-1000"
           >
              <img src="/your-designer-profile.jpg" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]" alt="Portrait" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-transparent to-transparent" />
           </motion.div>
        </section>

        {/* SECTION 02: THE MANIFESTO (Interlocking Depth) */}
        <section className="mb-60 grid lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-12">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-[1px] bg-lime-400/50" />
                 <span className="text-lime-400 font-mono text-xs tracking-[0.4em] uppercase">Manifesto // 01</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
                 Form <br /> <span className="text-white/20">Follows</span> <br /> Feeling.
              </h2>
              <p className="text-lg text-white/60 leading-relaxed font-light italic">
                 My approach is rooted in the belief that clean code is a prerequisite, but 
                 <span className="text-white"> intentional interaction</span> is what creates soul. 
                 I dismantle the boundary between user needs and aesthetic desire.
              </p>
           </div>
           
           <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Layers size={24}/>, label: "Structural Design", desc: "Building from the skeleton up." },
                { icon: <Zap size={24}/>, label: "Kinetic Motion", desc: "Animation as a functional language." }
              ].map((card, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-lime-400/40 transition-colors group">
                   <div className="text-lime-400 mb-6 group-hover:scale-110 transition-transform">{card.icon}</div>
                   <h3 className="font-bold uppercase tracking-tight text-sm mb-2">{card.label}</h3>
                   <p className="text-white/30 text-[10px] uppercase tracking-widest leading-loose">{card.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* SECTION 03: THE KINETIC ARSENAL (Refined & Smaller) */}
        <section className="mb-60 space-y-12">
          <div className="px-6 md:px-24">
             <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white/5">ARSENAL</h2>
          </div>

          <div className="flex flex-col gap-6">
            {skillLayers.map((layer, index) => (
              <div key={index} className="overflow-hidden border-y border-white/5 py-6 bg-white/[0.01]">
                <motion.div 
                  style={{ x: layer.motion }} 
                  className="flex gap-10 whitespace-nowrap px-8"
                >
                  {[...layer.items, ...layer.items, ...layer.items].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 group cursor-default">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-lime-400/10 group-hover:border-lime-400/50 transition-all duration-500">
                        <img 
                          src={`https://cdn.simpleicons.org/${item.logo}/bef264`} 
                          className="w-6 h-6 object-contain transition-all duration-500" 
                          alt={item.name} 
                        />
                      </div>
                      <span className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-white/10 group-hover:text-white transition-colors duration-500">
                        {item.name}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-lime-400/20 group-hover:bg-lime-400 transition-colors" />
                    </div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 04: THE CONNECTION (Cinematic CTA) */}
        <section className="flex justify-center items-center py-40">
           <motion.div 
             style={{ scale: manifestoScale }}
             className="w-full max-w-5xl aspect-video rounded-[5rem] overflow-hidden border border-white/10 bg-[#0a0a0a] relative group flex flex-col items-center justify-center text-center p-12 shadow-2xl"
           >
              <div className="absolute inset-0 bg-lime-400 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000" />
              <Sparkles className="absolute top-12 text-lime-400 animate-pulse" size={48} />
              
              <div className="space-y-10">
                 <h2 className="text-5xl md:text-[7vw] font-black uppercase italic tracking-tighter leading-none">
                    Let's Build <br /> <span className="text-lime-400 outline-text-stroke">The Future.</span>
                 </h2>
                 <a href="mailto:hello@praveena.com" className="inline-flex items-center gap-6 px-12 py-5 rounded-full bg-white text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-lime-400 transition-all hover:scale-105 active:scale-95 shadow-xl">
                    <Mail size={18} /> Initiate Contact
                 </a>
              </div>

              <div className="absolute bottom-12 flex gap-10 opacity-20 group-hover:opacity-100 transition-all">
                 <Github className="hover:text-lime-400 cursor-pointer" size={20} />
                 <Linkedin className="hover:text-lime-400 cursor-pointer" size={20} />
                 <Twitter className="hover:text-lime-400 cursor-pointer" size={20} />
              </div>
           </motion.div>
        </section>

      </motion.main>

      <Footer />

      <style>{`
        .outline-text-stroke {
          -webkit-text-stroke: 2px rgba(255,255,255,0.15);
          color: transparent;
        }
        .outline-text-thick {
          -webkit-text-stroke: 3px rgba(255,255,255,0.1);
          color: transparent;
        }
        @import url('https://fonts.googleapis.com/css2?family=Spline+Sans+Mono:wght@300;700&display=swap');
      `}</style>
    </div>
  );
};

export default AboutPage;