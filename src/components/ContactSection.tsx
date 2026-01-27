import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useRef } from 'react';
import { ArrowUpRight, Github, Linkedin, Twitter, Mail, Instagram, Send, Check } from 'lucide-react';

const ContactSection = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Designer Parallax: Text layers moving at different speeds
  const xSlow = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);
  const xFast = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      className="relative min-h-screen py-40 bg-[#050505] overflow-hidden selection:bg-lime-400 selection:text-black"
    >
      {/* 1. KINETIC EDITORIAL BACKGROUND (No Boxes) */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center pointer-events-none select-none opacity-[0.03]">
        <motion.h2 style={{ x: xSlow }} className="text-[25vw] font-black italic whitespace-nowrap leading-none uppercase">
          INITIATE • DIALOGUE • INITIATE •
        </motion.h2>
        <motion.h2 style={{ x: xFast }} className="text-[25vw] font-black italic whitespace-nowrap leading-none uppercase outline-text-stroke">
          EVOLVE • CREATE • EVOLVE •
        </motion.h2>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        
        {/* HEADER: ASYMMETRIC TYPOGRAPHY */}
        <div className="mb-48 grid lg:grid-cols-12 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[1px] bg-lime-400/50" />
              <span className="text-lime-400 font-mono text-[10px] uppercase tracking-[0.5em]">Sequence 04 // Contact</span>
            </div>
            <h2 className="text-7xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-[0.75]">
              Let's <br /> <span className="text-white/10 outline-text-thick">Converse.</span>
            </h2>
          </motion.div>
          <div className="lg:col-span-4 lg:text-right pt-20 hidden lg:block">
             <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em] leading-loose italic">
               Pavan Surya Chintada <br /> 
               Eluru, Andhra Pradesh <br /> 
               16.7107° N, 81.1035° E
             </p>
          </div>
        </div>

        {/* THE DESIGNER'S WORKSPACE */}
        <div className="grid lg:grid-cols-12 gap-16 border-t border-white/5 pt-20">
          
          {/* LEFT: BRUTALIST SOCIAL RIBBON */}
          <div className="lg:col-span-4 space-y-32">
            <div className="space-y-10">
               <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.6em] italic">Digital Presence</span>
               <div className="flex flex-col">
                  {[
                    { name: 'LinkedIn', icon: Linkedin },
                    { name: 'Instagram', icon: Instagram },
                    { name: 'GitHub', icon: Github },
                    { name: 'Twitter', icon: Twitter }
                  ].map((social) => (
                    <motion.a 
                      key={social.name}
                      href="#" 
                      whileHover={{ x: 15 }}
                      className="group flex items-center justify-between py-6 border-b border-white/5 text-3xl font-black italic tracking-tighter text-white/40 hover:text-lime-400 transition-all duration-500"
                    >
                      {social.name.toUpperCase()}
                      <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-all group-hover:rotate-12" />
                    </motion.a>
                  ))}
               </div>
            </div>

            <div className="space-y-4">
               <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.6em] italic">Direct Inquiry</span>
               <a href="mailto:hello@praveena.com" className="text-2xl font-light italic text-white hover:text-lime-400 transition-colors uppercase tracking-tighter">
                  PAVAN.SURYA@STUDIO.DESIGN
               </a>
            </div>
          </div>

          {/* RIGHT: THE SIGNATURE INQUIRY FORM (No Box) */}
          <div className="lg:col-span-8 lg:pl-20">
            <form onSubmit={handleSubmit} className="space-y-24">
               <div className="grid md:grid-cols-2 gap-20">
                  <div className="relative group/field">
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] block mb-2 group-focus-within/field:text-lime-400 transition-colors italic">01 // Identity</span>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="NAME / BRAND"
                      className="w-full bg-transparent border-b border-white/10 py-6 text-3xl md:text-5xl font-light italic tracking-tighter focus:outline-none focus:border-lime-400 transition-colors placeholder:text-white/5 uppercase"
                    />
                  </div>
                  <div className="relative group/field">
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] block mb-2 group-focus-within/field:text-lime-400 transition-colors italic">02 // Digital Node</span>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="EMAIL ADDRESS"
                      className="w-full bg-transparent border-b border-white/10 py-6 text-3xl md:text-5xl font-light italic tracking-tighter focus:outline-none focus:border-lime-400 transition-colors placeholder:text-white/5 uppercase"
                    />
                  </div>
               </div>

               <div className="relative group/field">
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] block mb-2 group-focus-within/field:text-lime-400 transition-colors italic">03 // The Vision</span>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="DESCRIBE THE OBJECTIVE..."
                    className="w-full bg-transparent border-b border-white/10 py-6 text-3xl md:text-5xl font-light italic tracking-tighter focus:outline-none focus:border-lime-400 transition-colors placeholder:text-white/5 resize-none uppercase"
                  />
               </div>

               <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-10">
                  <motion.button
                    type="submit"
                    disabled={isSubmitted}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-20 py-10 rounded-full font-black uppercase tracking-[0.5em] text-xs transition-all duration-700 ${
                      isSubmitted ? 'bg-white text-black' : 'bg-lime-400 text-black hover:shadow-[0_0_60px_-10px_#bef264]'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      {isSubmitted ? (
                        <>TRANSMISSION VERIFIED <Check size={20} /></>
                      ) : (
                        <>INITIATE CONTACT <Send size={16} /></>
                      )}
                    </span>
                  </motion.button>

                  <div className="flex items-center gap-6 opacity-20">
                     <div className="flex flex-col items-end">
                        <span className="text-[9px] font-mono uppercase tracking-widest italic">Current Status</span>
                        <span className="text-xs font-bold uppercase tracking-tight">System Online</span>
                     </div>
                     <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse shadow-[0_0_10px_#bef264]" />
                  </div>
               </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .outline-text-stroke {
          -webkit-text-stroke: 1px rgba(255,255,255,0.05);
          color: transparent;
        }
        .outline-text-thick {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.15);
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;