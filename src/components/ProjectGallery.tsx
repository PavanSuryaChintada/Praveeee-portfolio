import React, { useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- Project Data ---
const projects = [
  {
    id: "01",
    title: "DSA Hub",
    category: "Web Dev",
    description: "DSA Hub is a modern web application designed to master data structures and algorithms through interactive visualizations and practice problems. Built with React and TypeScript, this platform provides an engaging way to learn complex algorithmic concepts.",
    features: ["Interactive visualizations", "Coding exercises", "Algorithmic concepts"],
    stack: [
      { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" }
    ],
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80", "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80", "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&q=80"]
  },
  {
    id: "02",
    title: "Eco-Stream",
    category: "Web Dev",
    description: "Real-time environmental monitoring dashboard with high-performance data streaming and predictive analytics. A comprehensive tool for tracking global sustainability metrics in a clean interface.",
    features: ["Real-time data", "Predictive ML", "Responsive UI"],
    stack: [{ name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/white" }, { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" }],
    images: ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80", "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80"]
  },
  {
    id: "03",
    title: "Neural Code",
    category: "Web Dev",
    description: "AI-integrated code editor supporting collaborative pair programming and automated unit test generation. Empowering developers with smart completions and real-time collaboration features.",
    features: ["AI Pair Pilot", "Live Collab", "Test Gen"],
    stack: [{ name: "VS Code", logo: "https://cdn.simpleicons.org/visualstudiocode/007ACC" }, { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" }],
    images: ["https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80", "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80", "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80"]
  },
  {
    id: "04",
    title: "Venture OS",
    category: "UI/UX",
    description: "Comprehensive productivity ecosystem designed for high-performance creative workflows and real-time team collaboration. Streamlining complex tasks into a minimalist digital workspace.",
    features: ["Minimalist design", "High performance", "Real-time sync"],
    stack: [{ name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" }, { name: "Framer", logo: "https://cdn.simpleicons.org/framer/0055FF" }],
    images: ["https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1200&q=80", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80"]
  },
  {
    id: "05",
    title: "Zenith App",
    category: "UI/UX",
    description: "Meditation and wellness application focused on haptic feedback and serene interaction design. Helping users find their balance through a tactile and visual sensory experience.",
    features: ["Haptic UI", "Serene Palette", "Fluid Motion"],
    stack: [{ name: "Adobe XD", logo: "https://cdn.simpleicons.org/adobexd/FF61F6" }, { name: "Lottie", logo: "https://cdn.simpleicons.org/lottiefiles/00DAD8" }],
    images: ["https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80", "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80", "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&q=80"]
  },
  {
    id: "06",
    title: "Flux Design",
    category: "UI/UX",
    description: "Next-gen design system for fintech applications, prioritizing accessibility and data density. A modular framework built for scalability in complex financial data environments.",
    features: ["Accessibility first", "Dark mode", "Modular grid"],
    stack: [{ name: "Sketch", logo: "https://cdn.simpleicons.org/sketch/FDB300" }, { name: "Storybook", logo: "https://cdn.simpleicons.org/storybook/FF4785" }],
    images: ["https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=1200&q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"]
  },
  {
    id: "07",
    title: "Pulse Branding",
    category: "Logo",
    description: "Minimalist brand identity for a high-tech medical startup, focusing on trust and precision. Creating a visual language for the future of healthcare.",
    features: ["Vector precision", "Gold ratio", "Scalable identity"],
    stack: [{ name: "Illustrator", logo: "https://cdn.simpleicons.org/adobeillustrator/FF9A00" }, { name: "Canva", logo: "https://cdn.simpleicons.org/canva/00C4CC" }],
    images: ["https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80", "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80", "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=600&q=80"]
  },
  {
    id: "08",
    title: "Nova Identity",
    category: "Logo",
    description: "Futuristic emblem design for a space-exploration research center. Inspired by celestial mechanics and the vast geometry of the universe.",
    features: ["Space aesthetic", "Glow gradients", "Monolithic"],
    stack: [{ name: "Inkscape", logo: "https://cdn.simpleicons.org/inkscape/white" }],
    images: ["https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=1200&q=80", "https://images.unsplash.com/photo-1557683316-973673baf926?w=600&q=80", "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&q=80"]
  },
  {
    id: "09",
    title: "Koda Symbol",
    category: "Logo",
    description: "Iconic symbol for a minimalist clothing brand, using negative space and geometry. A study in simplicity and high-end fashion branding.",
    features: ["Negative space", "Geometric", "Iconic"],
    stack: [{ name: "Affinity Designer", logo: "https://cdn.simpleicons.org/affinitydesigner/1B1B1F" }],
    images: ["https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&q=80", "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80", "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&q=80"]
  }
];

const categories = ["UI/UX", "Logo", "Web Dev", "All"];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={cardRef} className="relative h-screen w-full flex items-center justify-center sticky top-0 overflow-hidden bg-black group selection:bg-[#bef264] selection:text-black">
      <motion.div style={{ scale, opacity }} className="container mx-auto px-6 md:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="order-2 lg:order-1 space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-[#bef264]" />
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">{project.title}</h3>
          </motion.div>

          <p className="text-white/70 text-lg leading-relaxed italic font-light max-w-xl">🚀 {project.description}</p>

          <ul className="space-y-3">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-white/80 font-medium">
                <span className="text-[#bef264] mt-1 text-sm">✦</span> {feature}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((tech) => (
              <div key={tech.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60 font-mono uppercase tracking-widest">
                <img src={tech.logo} alt={tech.name} className="w-3 h-3 object-contain" /> {tech.name}
              </div>
            ))}
          </div>

          <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-3 px-10 py-4 bg-[#bef264] text-black rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_20px_-10px_#bef264]">
            Explore Showcase <ArrowRight size={18} />
          </motion.button>
        </div>

        <div className="order-1 lg:order-2 flex flex-col gap-2 h-[75vh]">
          <div className="h-[65%] w-full rounded-2xl overflow-hidden border border-white/10">
            <img src={project.images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="main" />
          </div>
          <div className="h-[33%] flex gap-2 w-full">
             <div className="flex-1 rounded-2xl overflow-hidden border border-white/10">
                <img src={project.images[1]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="sub1" />
             </div>
             <div className="flex-1 rounded-2xl overflow-hidden border border-white/10">
                <img src={project.images[2]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="sub2" />
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function VentureShowcase() {
  const [activeFilter, setActiveFilter] = useState("UI/UX");
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const filteredProjects = useMemo(() => 
    activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter),
    [activeFilter]
  );

  // DYNAMIC COUNTER LOGIC
  const currentProjectIndex = useTransform(scrollYProgress, [0, 1], [1, filteredProjects.length]);
  const displayNum = useTransform(currentProjectIndex, (latest) => Math.ceil(latest).toString().padStart(2, '0'));

  return (
    <section ref={sectionRef} className="relative bg-black">
      
      {/* 1. FIXED DYNAMIC SIDEBAR BRIDGE */}
      <div className="fixed left-6 md:left-10 top-0 h-full w-[40px] z-[100] flex flex-col items-center justify-center pointer-events-none">
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]) }} 
          className="relative h-full flex flex-col items-center justify-center"
        >
          {/* Vertical Label */}
          <div className="absolute top-24 -rotate-90 origin-left text-[10px] font-mono text-white/20 uppercase tracking-[0.6em] whitespace-nowrap">
            Venture Showcase // Rune
          </div>

          {/* Sidebar Center Group: Counter + Progress Bridge */}
          <div className="flex flex-col items-center gap-6">
            
            {/* Dynamic Project Number */}
            <div className="flex flex-col items-center gap-2">
                <motion.span className="text-[#bef264] font-mono font-black text-lg tracking-widest leading-none">
                    {displayNum}
                </motion.span>
                {/* Visibility Divider Line */}
                <div className="w-[1px] h-8 bg-[#bef264]/40" />
                <span className="text-white/20 font-mono text-[10px]">{filteredProjects.length.toString().padStart(2, '0')}</span>
            </div>

            {/* Progress Bar Bridge */}
            <div className="relative h-[40vh] w-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                className="absolute top-0 left-0 w-full bg-[#bef264] origin-top shadow-[0_0_20px_#bef264]" 
                style={{ scaleY: smoothProgress }} 
                />
            </div>

            <div className="w-1.5 h-1.5 rounded-full bg-[#bef264] animate-pulse shadow-[0_0_10px_#bef264]" />
          </div>

        </motion.div>
      </div>

      {/* 2. SECTION HEADER & CATEGORIES */}
      <div className="pt-32 pb-16 container mx-auto px-6 md:px-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-6xl md:text-9xl font-black text-white italic uppercase tracking-tighter mb-4">
            Selected <span className="text-[#bef264]">Works</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/70 text-lg leading-relaxed">
            A curated collection of my most impactful projects, showcasing expertise in modern web development, 
            intuitive UI/UX design, and memorable brand identities. Each piece reflects a commitment to 
            clean aesthetics and functional excellence.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === cat ? "bg-[#bef264] text-black shadow-[0_10px_20px_-10px_#bef264]" : "bg-white/5 text-white/40 border border-white/10 hover:border-[#bef264] hover:text-[#bef264]"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PINNED PROJECT STACK */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. FOOTER STATUS */}
      <div className="fixed bottom-12 right-12 z-50">
        <motion.div style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]) }} className="flex items-center gap-4">
          <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">Scroll to Explore</span>
          <div className="w-12 h-[1px] bg-[#bef264]" />
        </motion.div>
      </div>
    </section>
  );
}