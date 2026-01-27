import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react';
import { useRef, useState } from 'react';

const socialLinks = [
  { icon: Github, label: 'GH' },
  { icon: Linkedin, label: 'LI' },
  { icon: Twitter, label: 'TW' },
  { icon: Instagram, label: 'IG' },

  
];

const metadata = [
  "FAFA9007", "IG ODLNGRLLS 1212122", "REATENTTE", "IG ODCOMPAIT", "PEAS7.03", "OD098LA"
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState(0);
  
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 80]);

  const skillData = [
    { label: "Py", color: "#F4C430", text: "Python & AI logic automation expert." },
    { label: "UI", color: "#F4C430", text: "Figma to High-Fidelity interactive prototypes." },
    { label: "Dev", color: "#F4C430", text: "Fullstack MERN with Agentic AI workflows." }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-[#FAFAFA] overflow-hidden flex flex-col selection:bg-[#F4C430] selection:text-[#0D0907]"
    >
      {/* 1. TOP GHOST TYPOGRAPHY HEADER */}
      <div className="relative h-[38vh] w-full flex flex-col justify-center items-center border-b border-[#0D0907]/10 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
             style={{ backgroundImage: `radial-gradient(#0D0907 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />
        
        <motion.h2 style={{ y: yText }} className="text-[15vw] font-black italic outline-text-ghost leading-none uppercase tracking-tighter">
          -------
        </motion.h2>
        <motion.h2 style={{ y: useTransform(scrollY, [0, 500], [0, -40]) }} className="text-[15vw] font-black italic outline-text-ghost leading-none uppercase tracking-tighter -mt-6">
          Designer
        </motion.h2>
      </div>

      {/* 2. SUB-HEADER METADATA BAR */}
      <div className="w-full py-4 border-b border-[#0D0907]/10 flex justify-center gap-10 bg-white overflow-hidden px-6">
        {metadata.map((text, i) => (
          <span key={i} className="text-[10px] font-bold text-[#0D0907]/50 hover:text-[#F4C430] font-mono flex items-center gap-2 whitespace-nowrap uppercase tracking-tight transition-colors duration-200 group">
             <div className="w-3.5 h-3.5 border border-[#0D0907]/20 group-hover:border-[#F4C430] rounded-sm transition-colors duration-200" /> {text}
          </span>
        ))}
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <div className="flex-grow grid lg:grid-cols-12 relative h-full">
        
        {/* LEFT BLACK SIDEBAR */}
        <div className="lg:col-span-1 border-r border-[#0D0907]/10 flex flex-col justify-between items-center py-12 bg-[#0D0907] text-white">
          <div className="flex flex-col gap-7">
            {socialLinks.map(({ icon: Icon, label }, i) => (
              <a 
                key={i} 
                href="#" 
                className="flex flex-col items-center gap-1 group transition-all duration-300"
              >
                <div className="p-2 rounded-full group-hover:bg-[#F4C430]/10 group-hover:shadow-[0_0_15px_rgba(244,196,48,0.5)] transition-all duration-300">
                  <Icon size={20} className="text-white group-hover:text-[#F4C430] transition-colors duration-300" />
                </div>
                <span className="text-[9px] font-black text-white/40 group-hover:text-[#F4C430] uppercase tracking-tighter transition-colors duration-300">
                  {label}
                </span>
              </a>
            ))}
          </div>
          <div className="vertical-text text-[12px] font-black text-white/60 uppercase tracking-[0.5em] italic pb-8">
            Est // 2026
          </div>
        </div>

        {/* CENTER TEXT BLOCK */}
        <div className="lg:col-span-6 flex flex-col justify-center px-16 lg:px-24 py-16 z-20">
          <div className="space-y-10">
            <div className="flex flex-col gap-4">
               <div className="w-24 h-2 bg-[#0D0907] rounded-full flex overflow-hidden">
                  <div className="w-[70%] h-full bg-[#F4C430]" />
               </div>
               <span className="bg-[#F4C430] text-[#0D0907] text-[11px] font-black px-3 py-1 italic w-fit uppercase tracking-tighter">
                  System.Initialize // Active
               </span>
            </div>

            <h1 className="flex flex-col leading-[0.8] tracking-tighter">
              <span className="text-[7.5vw] font-black text-[#0D0907] uppercase italic relative">
                Praveena <span className="text-3xl absolute top-0 italic font-light">®</span>
              </span>
              <span className="text-[6.5vw] font-black italic outline-text-main uppercase -mt-1">
                Rudrakshula
              </span>
              <div className="w-[180px] h-[1.5px] bg-[#0D0907] mt-6 opacity-30" />
            </h1>

            <div className="flex flex-col gap-10 pt-6">
              {/* REFINED CIRCULAR BUTTONS (DECREASED SIZE) */}
              <div className="flex items-center gap-6 group text-left outline-none min-h-[60px]">
                <div className="flex gap-2.5">
                  {skillData.map((skill, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveSkill(index)}
                      className="flex flex-col items-center gap-1.5 group outline-none"
                    >
                      <motion.div 
                        animate={{ 
                          scale: activeSkill === index ? 1.1 : 1,
                          borderColor: activeSkill === index ? "#F4C430" : "#0D0907"
                        }}
                        className={`w-11 h-11 rounded-full border-2 flex items-center justify-center p-1 transition-all shadow-sm ${activeSkill === index ? 'bg-[#0D0907]/5' : ''}`}
                      >
                         <div className="w-full h-full bg-[#F4C430]/10 rounded-full flex items-center justify-center">
                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSkill === index ? 'bg-[#F4C430] scale-125' : 'bg-[#0D0907]/30'}`} />
                         </div>
                      </motion.div>
                      <span className={`text-[8px] font-black uppercase tracking-widest transition-colors ${activeSkill === index ? 'text-[#F4C430]' : 'text-[#0D0907]/40'}`}>
                        {skill.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="h-8 w-[1px] bg-[#0D0907]/10 mx-1" />

                <AnimatePresence mode="wait">
                  <motion.p 
                    key={activeSkill}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    className="text-[12px] font-black leading-tight text-[#0D0907]/70 uppercase tracking-tighter w-48"
                  >
                    {skillData[activeSkill].text}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4">
                <button className="bg-[#0D0907] text-white px-9 py-3.5 rounded-full font-black text-[10px] uppercase flex items-center gap-3 group relative overflow-hidden transition-all hover:bg-[#F4C430] hover:text-[#0D0907]">
                  View Work <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                <button className="border-2 border-[#0D0907] text-[#0D0907] px-9 py-3.5 rounded-full font-black text-[10px] uppercase transition-all hover:bg-[#F4C430] hover:border-[#F4C430] hover:text-[#0D0907]">
                  Available
                </button>
              </div>
              
              <div className="flex flex-col border-l-[2px] border-[#F4C430] pl-5">
                 <span className="text-[9px] font-black text-[#F4C430] uppercase tracking-[0.3em]">Region</span>
                 <span className="text-[12px] font-black text-[#0D0907] font-mono tracking-tighter uppercase">Andhra Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PORTRAIT SECTION (REMOVED BACKGROUND AND FLOATING BOXES) */}
        <div className="lg:col-span-5 relative flex items-center justify-center p-16 z-10">
           <div className="relative w-full max-w-[460px]">
              
              {/* Minimalist Image Container */}
              <div className="aspect-square rounded-[80px] bg-transparent overflow-hidden border-[12px] border-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative group">
                  <div className="w-full h-full bg-[#F5F5F5] flex items-center justify-center">
                    <span className="text-[#0D0907]/10 font-black text-[10vw] italic tracking-tighter select-none">PRVN</span>
                  </div>
                  {/* Glowing Subtle Ring */}
                  <div className="absolute inset-0 border-[30px] border-[#F4C430]/5 rounded-full pointer-events-none" />
              </div>

              {/* SCROLL INDICATOR (SUBTLE) */}
              <div className="absolute bottom-4 -right-10 flex flex-col items-center gap-4">
                 <span className="vertical-text text-[9px] font-black text-[#F4C430] uppercase tracking-[0.4em]">Scroll</span>
                 <div className="w-[1px] h-12 bg-gradient-to-b from-[#F4C430] to-transparent" />
              </div>
           </div>
        </div>
      </div>

      <style>{`
        .vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }
        .outline-text-ghost { -webkit-text-stroke: 1.5px rgba(13, 9, 7, 0.12); color: transparent; }
        .outline-text-main { -webkit-text-stroke: 1.5px rgba(13, 9, 7, 0.22); color: transparent; }
      `}</style>
    </section>
  );
};

export default Hero;