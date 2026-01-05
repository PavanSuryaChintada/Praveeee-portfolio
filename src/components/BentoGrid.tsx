import { motion, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Palette, PenTool, Layers, Code, ArrowRight, Sparkles } from 'lucide-react';

// Abstract shape component for visual interest
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

// Floating capability item component
const FloatingCapability = ({ children, x, y, delay }: { children: React.ReactNode; x: string; y: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className={`absolute ${x} ${y} bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border text-sm whitespace-nowrap`}
  >
    {children}
  </motion.div>
);

const StickyCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  
  const y = 0;
const opacity = 1;
const scale = 1;

  return (
    <motion.div 
      ref={ref}
      className={`sticky-element ${className}`}
      style={{ y, opacity, scale }}
    >
      {children}
    </motion.div>
  );
};

const BentoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  
  return (
    <section ref={containerRef} className="relative py-32 px-6 overflow-hidden min-h-[200vh]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-sans font-bold tracking-tight mb-4"
          >
            Design <span className="text-primary">Perspective</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            A thoughtful approach to creating meaningful digital experiences
          </motion.p>
        </motion.div>

        {/* Main Grid - Asymmetric Layout */}
        <div className="relative">
          {/* Abstract Background Shapes */}
          <AbstractShape className="-top-32 -left-32 w-64 h-64 text-primary" />
          <AbstractShape className="bottom-0 right-0 w-96 h-96 text-primary/30" />

          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Philosophy Card - Large */}
            <StickyCard className="lg:w-2/3 bg-card/50 backdrop-blur-md rounded-3xl border border-border p-10 relative overflow-hidden">
              <div className="absolute top-8 right-8 text-8xl opacity-5">
                <Palette className="w-20 h-20" />
              </div>
              <span className="inline-block text-sm font-medium text-primary mb-6">Design Philosophy</span>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                Crafting <span className="text-primary">intuitive</span> experiences that feel <span className="relative">
                  inherently right
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/20 -z-10"></span>
                </span>
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl">
                I believe in creating digital experiences that feel effortless. By focusing on clarity and intention, 
                I design interfaces that guide users naturally to their goals without unnecessary friction or decoration.
              </p>
            </StickyCard>

            {/* Capabilities Card - Small */}
            <StickyCard className="lg:w-1/3 bg-card/80 backdrop-blur-sm rounded-3xl border border-border p-8 relative overflow-hidden mt-12">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Layers className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Capabilities</h3>
                </div>
                <div className="relative h-64">
                  <FloatingCapability x="left-4 top-4" y="top-4" delay={0.1}>UI/UX Design</FloatingCapability>
                  <FloatingCapability x="right-4 top-12" y="top-12" delay={0.2}>Product Design</FloatingCapability>
                  <FloatingCapability x="left-8 top-24" y="top-24" delay={0.3}>Brand Identity</FloatingCapability>
                  <FloatingCapability x="right-8 top-36" y="top-36" delay={0.4}>Design Systems</FloatingCapability>
                  <FloatingCapability x="left-12 top-48" y="top-48" delay={0.5}>Interaction Design</FloatingCapability>
                  <FloatingCapability x="right-12 top-56" y="top-56" delay={0.6}>Motion Design</FloatingCapability>
                </div>
              </div>
            </StickyCard>
          </div>

          {/* Row 2 - Reversed on larger screens */}
          <div className="flex flex-col lg:flex-row-reverse gap-6">
            {/* Process Card - Medium */}
            <StickyCard className="lg:w-1/2 bg-card/60 backdrop-blur-sm rounded-3xl border border-border p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Code className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Design Process</h3>
                </div>
                <div className="space-y-6">
                  {[
                    { title: 'Discover', desc: 'Understanding the problem space and user needs through research and analysis.' },
                    { title: 'Define', desc: 'Articulating clear goals and strategy for the solution.' },
                    { title: 'Design', desc: 'Creating and iterating on concepts and prototypes.' },
                    { title: 'Refine', desc: 'Testing and refining based on feedback and data.' },
                    { title: 'Deliver', desc: 'Implementing the final solution with attention to detail.' },
                  ].map((item, i) => (
                    <div key={i} className="group">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary mt-0.5 flex-shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium group-hover:text-primary transition-colors">{item.title}</h4>
                            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all" />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                        </div>
                      </div>
                      {i < 4 && <div className="h-px bg-border/50 my-4 w-10/12 ml-12"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </StickyCard>

            {/* Values & Signature - Stacked */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              {/* Values Card */}
              <StickyCard className="bg-card/70 backdrop-blur-sm rounded-3xl border border-border p-8 flex-1 relative overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-8">
                    <PenTool className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold">Core Values</h3>
                  </div>
                  <div className="space-y-6 mt-auto">
                    {[
                      { title: 'Clarity First', desc: 'Prioritizing clear communication and intuitive interfaces over decorative elements.' },
                      { title: 'User-Centered', desc: 'Designing with empathy and focus on real user needs and behaviors.' },
                      { title: 'Thoughtful Simplicity', desc: 'Reducing complexity to create elegant, purposeful solutions.' },
                    ].map((item, i) => (
                      <div key={i} className="group">
                        <h4 className="font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1 pl-5">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </StickyCard>

              {/* Signature Card */}
              <StickyCard className="bg-primary/5 rounded-3xl border border-border p-8 text-center relative overflow-hidden mt-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-30"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Intentional Design</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Every detail is considered, every interaction is meaningful, and every solution is crafted with purpose.
                  </p>
                  <div className="mt-6">
                    <span className="inline-block text-sm font-mono border-b border-primary/30 pb-1 text-primary">
                      Design with intention
                    </span>
                  </div>
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

// Add global styles for sticky elements
const style = document.createElement('style');
style.textContent = `
  .sticky-element {
    position: sticky;
    top: 5%;
    will-change: transform, opacity;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    backface-visibility: hidden;
    transform: translateZ(0);
  }
  
  @media (hover: hover) {
    .sticky-element {
      cursor: none;
    }
    
    .sticky-element:hover {
      transform: translateY(-4px) scale(1.01);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
    }
  }
`;
document.head.appendChild(style);
