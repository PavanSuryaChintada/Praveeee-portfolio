import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, Linkedin, Twitter, Mail, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const bgTextY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(smoothProgress, [0, 0.5], [1, 1.1]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-lime-400 selection:text-black overflow-hidden">
      <Navigation />

      {/* 1. HERO ARCHITECTURAL BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: bgTextY }}
          className="absolute inset-0 flex flex-col justify-around opacity-[0.02] select-none"
        >
          <h2 className="text-[30vw] font-black italic leading-none -ml-20">STORY</h2>
          <h2 className="text-[30vw] font-black italic leading-none self-end -mr-20">DESIGN</h2>
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(#bef264_0.5px,transparent_0.5px)] [background-size:40px_40px] opacity-[0.05]" />
      </div>

      <motion.main 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-24"
      >
        {/* BACK NAVIGATION */}
        <div className="container mx-auto mb-20">
          <Link to="/" className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-white/40 hover:text-lime-400 transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Index
          </Link>
        </div>

        <div className="container mx-auto max-w-7xl">
          {/* 2. HEADER SECTION */}
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-32">
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <span className="text-lime-400 font-mono text-sm tracking-[0.4em] uppercase">01 // Identity</span>
                <h1 className="text-6xl md:text-[9rem] font-bold tracking-tighter leading-[0.8] uppercase italic">
                  Architecting <br />
                  <span className="text-white/20 outline-text-thin">Digital Souls</span>
                </h1>
              </motion.div>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="text-white/40 font-mono text-xs uppercase tracking-widest leading-loose">
                Based in Andhra Pradesh, India <br />
                Available Globally // 2026
              </p>
            </div>
          </div>

          {/* 3. DYNAMIC CONTENT GRID */}
          <div className="grid lg:grid-cols-12 gap-20 mb-40">
            {/* LARGE IMAGE ELEMENT */}
            <motion.div 
              style={{ scale: imageScale }}
              className="lg:col-span-7 relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl"
            >
              <img 
                src="/your-designer-profile.jpg" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                alt="Portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              
              {/* INTERACTION BADGE */}
              <div className="absolute bottom-10 left-10 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-lime-400 flex items-center justify-center">
                  <MousePointer2 className="text-black fill-black" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono font-bold">Designer Status</span>
                  <span className="text-white text-sm font-bold uppercase tracking-tight">Active & Focused</span>
                </div>
              </div>
            </motion.div>

            {/* MANIFESTO SECTION */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-12">
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold uppercase italic tracking-tight border-b border-lime-400/20 pb-4">Philosophy</h2>
                <p className="text-xl text-white/70 leading-relaxed font-light italic">
                   "I don't just build websites. I craft <span className="text-white">narratives</span> through code, ensuring that <span className="text-lime-400 underline decoration-1 underline-offset-8">functional logic</span> meets poetic design."
                </p>
                <p className="text-white/50 leading-relaxed">
                  With a deep-rooted passion for clean aesthetics and high-performance engineering, I specialize in bridging the gap between what is possible and what is beautiful.
                </p>
              </motion.div>

              {/* CORE PILLARS */}
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "01", title: "Strategy", desc: "Thinking beyond pixels." },
                  { label: "02", title: "Engineering", desc: "Clean, robust systems." },
                  { label: "03", title: "Interaction", desc: "Micro-moments of joy." },
                  { label: "04", title: "Motion", desc: "The soul of digital." }
                ].map((item, i) => (
                  <div key={i} className="space-y-2 group">
                    <span className="text-lime-400 font-mono text-[10px]">{item.label}</span>
                    <h3 className="font-bold uppercase tracking-tighter text-lg group-hover:text-lime-400 transition-colors">{item.title}</h3>
                    <p className="text-white/40 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. SKILLS & METRICS SECTION */}
          <div className="grid lg:grid-cols-3 gap-8 mb-40">
            {[
              { title: "Visual Design", val: "95%" },
              { title: "React Architecture", val: "90%" },
              { title: "Backend Systems", val: "85%" }
            ].map((skill, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-10 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between h-64 group"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold uppercase tracking-tighter leading-none italic">{skill.title}</h3>
                  <ArrowUpRight className="text-white/20 group-hover:text-lime-400 transition-colors" />
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between font-mono text-[10px] text-white/40">
                      <span>proficiency</span>
                      <span>{skill.val}</span>
                   </div>
                   <div className="w-full h-[2px] bg-white/10 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.val }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-lime-400"
                      />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 5. CALL TO ACTION */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="relative p-1 bg-gradient-to-r from-lime-400/20 to-emerald-400/20 rounded-[3rem] overflow-hidden group"
          >
            <div className="relative bg-[#0a0a0a] rounded-[2.9rem] p-16 text-center space-y-10">
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
                Got a vision? <br />
                <span className="text-lime-400 underline decoration-1">Let's build it.</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                <a href="mailto:hello@abc.com" className="flex items-center gap-2 group/btn">
                  <Mail className="text-lime-400" size={18} />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] group-hover/btn:text-lime-400 transition-colors">Connect via Email</span>
                </a>
                <div className="w-[1px] h-4 bg-white/20 hidden md:block" />
                <div className="flex gap-6">
                  {[Github, Linkedin, Twitter].map((Icon, i) => (
                    <Icon key={i} className="text-white/40 hover:text-lime-400 cursor-pointer transition-all hover:scale-110" size={18} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>

      <Footer />

      <style>{`
        .outline-text-thin {
          -webkit-text-stroke: 1px rgba(255,255,255,0.15);
          color: transparent;
        }
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;