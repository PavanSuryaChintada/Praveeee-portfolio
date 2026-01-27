import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

interface Certification {
  issuer: string;
  course: string;
}

interface CertItemProps {
  issuer: string;
  course: string;
  index: number;
  startIndex: number;
}

const allCertifications: Certification[] = [
  { issuer: "GOOGLE DEVELOPERS GROUP", course: "GEN AI STUDY JAM" },
  { issuer: "CISCO", course: "C LANGUAGE" },
  { issuer: "SRKR ENGINEERING COLLEGE", course: "PPT PRESENTATION" },
  { issuer: "CISCO", course: "CYBER SECURITY" },
  { issuer: "PIXELTESTS", course: "MERN" },
  { issuer: "SRKR ENGINEERING COLLEGE", course: "ORATOR" },
  { issuer: "UDEMY", course: "ADVANCED REACT PATTERNS" },
  { issuer: "COURSERA", course: "UX DESIGN SPECIALIZATION" },
  { issuer: "FREECODECAMP", course: "DATA VISUALIZATION" },
  { issuer: "METAMASK", course: "WEB3 DEVELOPMENT" },
  { issuer: "LINKEDIN LEARNING", course: "DESIGN SYSTEMS" },
  { issuer: "IBM", course: "CLOUD PRACTITIONER" },
];

const ITEMS_PER_PAGE = 6;
const snappyTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] };

const CertItem: React.FC<CertItemProps> = ({ issuer, course, index, startIndex }) => {
  const serialNumber = (startIndex + index + 1).toString().padStart(2, '0');
  
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="relative cursor-pointer border-b border-white/10 overflow-hidden group w-full"
    >
      {/* VIBRANT BRIGHT LIME BACKGROUND */}
      <motion.div
        variants={{
          initial: { y: "100%" },
          hover: { y: 0 },
        }}
        transition={snappyTransition}
        className="absolute inset-0 bg-[#bef264] z-0 shadow-[inset_0_0_50px_rgba(190,242,100,0.5)]" 
      />

      <div className="relative z-10 grid grid-cols-12 py-7 px-4 items-center">
        {/* SERIAL NUMBER */}
        <div className="col-span-1 text-white/20 text-[10px] font-mono group-hover:text-black/50 transition-colors duration-300">
          {serialNumber}
        </div>

        {/* ISSUER COLUMN - Decreased font size */}
        <div className="col-span-4 overflow-hidden h-[16px]">
          <motion.div
            variants={{ initial: { y: 0 }, hover: { y: "-50%" } }}
            transition={snappyTransition}
            className="flex flex-col"
          >
            <span className="text-[10px] font-medium text-white/40 tracking-[0.2em] leading-[16px] uppercase">
              {issuer}
            </span>
            <span className="text-[10px] font-bold text-black tracking-[0.2em] leading-[16px] uppercase">
              {issuer}
            </span>
          </motion.div>
        </div>

        {/* COURSE COLUMN - Decreased font size */}
        <div className="col-span-7 overflow-hidden h-[28px]">
          <motion.div
            variants={{ initial: { y: 0 }, hover: { y: "-50%" } }}
            transition={snappyTransition}
            className="flex flex-col"
          >
            <span className="text-base md:text-lg font-medium text-white/80 tracking-tight leading-[28px] uppercase italic">
              {course}
            </span>
            <span className="text-base md:text-lg font-black text-black tracking-tight leading-[28px] uppercase italic">
              {course}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const xTranslate = useTransform(scrollYProgress, [0, 1], [-100, 450]);

  const totalPages = Math.ceil(allCertifications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedCerts = allCertifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section ref={containerRef} className="w-full py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="relative mb-24">
            <div className="relative z-10">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic text-white drop-shadow-2xl">
                Certs
              </h2>
              <div className="h-1.5 w-24 bg-[#bef264] mt-6 shadow-[0_0_15px_rgba(190,242,100,0.4)]" />
            </div>
            
            <motion.h2 
              style={{ 
                x: xTranslate,
                WebkitTextStroke: '1px rgba(255,255,255,0.08)',
                color: 'transparent'
              }}
              className="absolute -top-12 left-0 text-7xl md:text-[12rem] font-black tracking-tighter uppercase italic pointer-events-none select-none whitespace-nowrap z-0"
            >
              Milestones Achievements
            </motion.h2>
          </div>

          <div className="border-t border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {selectedCerts.map((cert, index) => (
                  <CertItem 
                    key={`${currentPage}-${index}`} 
                    issuer={cert.issuer}
                    course={cert.course}
                    index={index}
                    startIndex={startIndex}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between pt-16 border-t border-white/5 mt-8">
            <div className="flex gap-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-[10px] transition-all duration-500 ${
                    currentPage === i + 1 
                      ? 'bg-[#bef264] text-black scale-110 shadow-[0_0_30px_rgba(190,242,100,0.5)]' 
                      : 'border border-white/10 text-white/20 hover:border-[#bef264]/60 hover:text-white'
                  }`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex flex-col items-end gap-3">
              <span className="text-[9px] tracking-[0.6em] uppercase font-black text-white/10">
                Section // 0{currentPage}
              </span>
              <div className="w-24 h-[1px] bg-white/5 relative overflow-hidden">
                <motion.div 
                   className="absolute inset-0 bg-[#bef264]"
                   initial={false}
                   animate={{ x: `${(currentPage / totalPages) * 100 - 100}%` }}
                   transition={{ duration: 0.8, ease: "circOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;