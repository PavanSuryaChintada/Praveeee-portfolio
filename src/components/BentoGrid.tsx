import { motion, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Palette, PenTool, Layers, Code, ArrowRight, Sparkles } from 'lucide-react';

// --- TECH SPHERE LOGIC ---

const techLogos = [
  { name: "React", url: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", url: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "TypeScript", url: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Tailwind", url: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Framer", url: "https://cdn.simpleicons.org/framer/black" },
  { name: "Figma", url: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Node.js", url: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Three.js", url: "https://cdn.simpleicons.org/threedotjs/white" },
  { name: "Vite", url: "https://cdn.simpleicons.org/vite/646CFF" },
  { name: "JavaScript", url: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "Adobe", url: "https://cdn.simpleicons.org/adobecreativecloud/DA1E1E" },
  { name: "Git", url: "https://cdn.simpleicons.org/git/F05032" },
  { name: "OpenAI", url: "https://cdn.simpleicons.org/openai/white" },
  { name: "Python", url: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Vercel", url: "https://cdn.simpleicons.org/vercel/white" },
];

const SphereItem = ({ item, springX, springY, autoRotation }: { item: any; springX: any; springY: any; autoRotation: number }) => {
  const rotationX = useTransform(springY, [-1, 1], [30, -30]);
  const rotationY = useTransform(springX, (val) => val * 35 + autoRotation);

  const opacity = useTransform(rotationY, (val) => {
    const angle = (val + item.phi) * (Math.PI / 180);
    const z = Math.cos(angle) * item.radius;
    const depth = (z + 100) / 200;
    return Math.max(0.1, depth);
  });

  const scale = useTransform(opacity, [0.1, 1], [0.5, 1.2]);

  return (
    <motion.div
      className="absolute flex items-center justify-center p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden"
      style={{
        x: useTransform(rotationY, (val) => {
          const rad = (val + item.phi) * (Math.PI / 180);
          return Math.cos(rad) * Math.sin(item.theta) * item.radius;
        }),
        y: useTransform(rotationX, (val) => {
          const rad = val * (Math.PI / 180);
          return Math.cos(item.theta) * item.radius + (Math.sin(rad) * 20);
        }),
        opacity,
        scale,
        zIndex: Math.round(opacity.get() * 100),
      }}
    >
      <img 
        src={item.url} 
        alt={item.name} 
        className="w-6 h-6 object-contain filter drop-shadow-md"
        loading="lazy"
      />
    </motion.div>
  );
};

const TechSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotation, setAutoRotation] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      // Increased base speed to 0.8 and multiplier to 2.5 for a faster revolution
      const speed = 0.8 + (Math.abs(mouseX.get()) * 2.5);
      setAutoRotation((prev) => (prev + speed) % 360);
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const sphereItems = useMemo(() => {
    const radius = 115; // Slightly reduced radius to make the rotation feel faster
    return techLogos.map((logo, i) => {
      const phi = Math.acos(-1 + (2 * i) / techLogos.length) * (180 / Math.PI);
      const theta = Math.sqrt(techLogos.length * Math.PI) * phi * (Math.PI / 180);
      return { ...logo, phi, theta, radius };
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {sphereItems.map((item, i) => (
        <SphereItem key={i} item={item} springX={springX} springY={springY} autoRotation={autoRotation} />
      ))}
    </div>
  );
};

// --- BENTO GRID COMPONENTS ---

const AbstractShape = ({ className }: { className?: string }) => (
  <div className={`absolute -z-10 opacity-10 pointer-events-none ${className}`}>
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M45.2,-58.2C58.2,-48.8,67.6,-34.2,72.6,-17.9C77.6,-1.6,78.1,16.4,69.5,29.6C60.9,42.8,43.2,51.2,26.5,57.6C9.8,64.1,-6,68.6,-20.1,63.3C-34.2,58,-46.6,42.9,-55.5,25.7C-64.5,8.5,-70,-10.8,-65.2,-26.6C-60.3,-42.4,-45.1,-54.7,-29.4,-63.4C-13.7,-72.1,2.5,-77.2,18.8,-73.8C35.1,-70.4,51.4,-58.5,45.2,-58.2Z"
        transform="translate(100 100)"
      />
    </svg>
  </div>
);

const StickyCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  return (
    <motion.div 
      ref={ref}
      className={`sticky-element ${className}`}
    >
      {children}
    </motion.div>
  );
};

const BentoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} className="relative py-32 px-6 overflow-hidden min-h-[150vh] bg-background">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 className="text-5xl md:text-7xl font-sans font-bold tracking-tight mb-4 text-white uppercase italic tracking-tighter">
            DESIGN<span className="text-[#bef264]"> PERSPECTIVE</span>
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A thoughtful approach to creating meaningful digital experiences
          </motion.p>
        </motion.div>

        <div className="relative">
          <AbstractShape className="-top-32 -left-32 w-64 h-64 text-[#bef264]" />
          <AbstractShape className="bottom-0 right-0 w-96 h-96 text-[#bef264]/30" />

          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Philosophy Card */}
            <StickyCard className="lg:w-2/3 bg-card/50 backdrop-blur-md rounded-3xl border border-white/10 p-10 relative overflow-hidden">
              <div className="absolute top-8 right-8 text-8xl opacity-5">
                <Palette className="w-20 h-20 text-white" />
              </div>
              <span className="inline-block text-sm font-medium text-[#bef264] mb-6 uppercase tracking-[0.2em]">Philosophy</span>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-white uppercase italic tracking-tighter">
                Crafting <span className="text-[#bef264]">intuitive</span> experiences that feel <span className="relative">
                  inherently right
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#bef264]/20 -z-10"></span>
                </span>
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl">
                I believe in creating digital experiences that feel effortless. By focusing on clarity and intention, 
                I design interfaces that guide users naturally to their goals without unnecessary friction or decoration.
              </p>
            </StickyCard>

            {/* Capabilities Card - REVOLVING LOGO SPHERE */}
            <StickyCard className="lg:w-1/3 bg-card/80 backdrop-blur-sm rounded-3xl border border-white/10 p-8 relative overflow-hidden flex flex-col h-[480px]">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#bef264]/5 rounded-full"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-6 h-6 text-[#bef264]" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Capabilities</h3>
                </div>
                
                <div className="flex-grow">
                  <TechSphere />
                </div>
              </div>
            </StickyCard>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row-reverse gap-6">
            {/* Process Card */}
            <StickyCard className="lg:w-1/2 bg-card/60 backdrop-blur-sm rounded-3xl border border-white/10 p-8 relative overflow-hidden text-white">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#bef264]/5 rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Code className="w-6 h-6 text-[#bef264]" />
                  <h3 className="text-sm font-bold uppercase tracking-widest">Design Process</h3>
                </div>
                <div className="space-y-6">
                  {[
                    { title: 'Discover', desc: 'Understanding the problem space and user needs.' },
                    { title: 'Define', desc: 'Articulating clear goals and strategy.' },
                    { title: 'Design', desc: 'Creating and iterating on concepts and prototypes.' },
                    { title: 'Refine', desc: 'Testing and refining based on feedback.' },
                    { title: 'Deliver', desc: 'Implementing final solution with attention to detail.' },
                  ].map((item, i) => (
                    <div key={i} className="group">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#bef264]/10 flex items-center justify-center text-sm font-medium text-[#bef264] mt-0.5 flex-shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium group-hover:text-[#bef264] transition-colors">{item.title}</h4>
                            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all" />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                        </div>
                      </div>
                      {i < 4 && <div className="h-px bg-white/5 my-4 w-10/12 ml-12"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </StickyCard>

            {/* Values & Signature */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              <StickyCard className="bg-card/70 backdrop-blur-sm rounded-3xl border border-white/10 p-8 flex-1 relative overflow-hidden text-white">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#bef264]/5 rounded-full"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-8">
                    <PenTool className="w-6 h-6 text-[#bef264]" />
                    <h3 className="text-sm font-bold uppercase tracking-widest">Core Values</h3>
                  </div>
                  <div className="space-y-6 mt-auto font-black uppercase italic">
                    {[
                      { title: 'Clarity First', desc: 'Prioritizing clear communication over decoration.' },
                      { title: 'User-Centered', desc: 'Designing with empathy and focus on real needs.' },
                      { title: 'Thoughtful Simplicity', desc: 'Reducing complexity to create elegant solutions.' },
                    ].map((item, i) => (
                      <div key={i} className="group">
                        <h4 className="text-2xl flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#bef264]"></span>
                          {item.title}
                        </h4>
                        <p className="text-[10px] tracking-widest text-muted-foreground mt-1 pl-6 normal-case font-medium">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </StickyCard>

              <StickyCard className="bg-[#bef264]/5 rounded-3xl border border-white/10 p-8 text-center relative overflow-hidden mt-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#bef264]/5 to-transparent opacity-30"></div>
                <div className="relative z-10 text-white">
                  <div className="w-16 h-16 rounded-full bg-[#bef264]/10 flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-[#bef264]" />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3">Intentional Design</h3>
                  <p className="text-muted-foreground max-w-md mx-auto text-sm font-medium">
                    Every detail is considered, every interaction is meaningful.
                  </p>
                </div>
              </StickyCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;

// Global styles for sticky logic
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .sticky-element {
      position: sticky;
      top: 12%;
      will-change: transform, opacity;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @media (hover: hover) {
      .sticky-element:hover {
        transform: translateY(-5px);
        box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
      }
    }
  `;
  document.head.appendChild(style);
}