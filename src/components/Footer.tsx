import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Twitter, Instagram, Globe, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { scrollYProgress } = useScroll();
  const xMarquee = useTransform(scrollYProgress, [0.8, 1], ["0%", "-20%"]);

  return (
    <footer className="relative bg-[#050505] pt-40 pb-12 overflow-hidden selection:bg-lime-400 selection:text-black border-t border-white/5">
      
      {/* 1. THE DESIGNER'S MARQUEE (KINETIC OVERLAY) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden py-10 pointer-events-none opacity-[0.03]">
        <motion.div 
          style={{ x: xMarquee }}
          className="flex whitespace-nowrap"
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[15vw] font-black italic uppercase tracking-tighter mx-10">
              STORYTELLER • ENGINEER • VISIONARY • 
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* 2. THE EDITORIAL GRID */}
        <div className="grid lg:grid-cols-12 gap-20 mb-32">
          
          {/* Brand Philosophy */}
          <div className="lg:col-span-5 space-y-10">
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              Pavan <br /> <span className="text-lime-400">Surya.</span>
            </h2>
            <p className="max-w-sm text-white/40 text-sm leading-relaxed italic font-light">
              Designing digital souls through high-fidelity code and poetic interaction. Available for global creative direction.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse shadow-[0_0_10px_#bef264]" />
              <span className="text-[10px] font-mono text-lime-400 uppercase tracking-[0.4em]">System Active // 2026</span>
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em]">Index</span>
              <ul className="space-y-3">
                {['Home', 'Projects', 'About', 'Experience'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase()}`} className="text-sm uppercase italic font-bold tracking-tight hover:text-lime-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em]">Socials</span>
              <ul className="space-y-3">
                {[
                  { name: 'LinkedIn', icon: Linkedin },
                  { name: 'GitHub', icon: Github },
                  { name: 'Instagram', icon: Instagram }
                ].map((social) => (
                  <li key={social.name}>
                    <a href="#" className="group flex items-center gap-2 text-sm uppercase italic font-bold tracking-tight hover:text-lime-400 transition-colors">
                      {social.name} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 col-span-2 md:col-span-1">
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em]">Contact</span>
              <div className="space-y-4">
                <a href="mailto:hello@praveena.com" className="block text-sm uppercase italic font-bold tracking-tight text-lime-400 underline underline-offset-4">
                  HELLO@PAVAN.SURYA
                </a>
                <p className="text-[10px] font-mono text-white/20 leading-loose uppercase">
                  Eluru, Andhra Pradesh <br /> 16.7107° N, 81.1035° E
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. TECHNICAL METADATA (THE "TRUE" FOOTER) */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer italic">Privacy Protocol</span>
            <span className="hover:text-white transition-colors cursor-pointer italic">Terms of Service</span>
          </div>

          <div className="flex items-center gap-3 italic">
            <Cpu size={14} className="text-lime-400/50" />
            <span>Built with React • Framer Motion • Designer Soul</span>
          </div>

          <div className="flex flex-col items-end italic">
             <span>© 2026 Pavan Surya Chintada</span>
             <span className="text-lime-400/40">All Rights Reserved</span>
          </div>
        </div>
      </div>

      {/* BACK TO TOP KINETIC BUTTON */}
      <motion.button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ 
          scale: 1.1, 
          rotate: 5,
          backgroundColor: 'rgba(244, 196, 48, 0.3)'
        }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-12 left-12 w-16 h-16 rounded-full bg-[rgba(244,196,48,0.2)] backdrop-blur-sm border border-[rgba(13,9,7,0.1)] text-[#0D0907] flex items-center justify-center shadow-lg hover:shadow-[#F4C430]/30 hover:shadow-lg z-50 group transition-all"
      >
        <ArrowUpRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
      </motion.button>

    </footer>
  );
};

export default Footer;