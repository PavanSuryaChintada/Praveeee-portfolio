import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SubSkill = {
  name: string;
  value: number;
};

type SkillCategory = {
  category: string;
  highlight: number;
  description: string;
  items: SubSkill[];
};

const skills: SkillCategory[] = [
  {
    category: "UI/UX Design",
    highlight: 92,
    description: "Human-centered interfaces and interaction design",
    items: [
      { name: "User Research", value: 90 },
      { name: "Wireframing", value: 94 },
      { name: "Prototyping", value: 96 },
      { name: "Usability Testing", value: 88 },
      { name: "Interaction Design", value: 93 }
    ]
  },
  {
    category: "Product Design",
    highlight: 88,
    description: "End-to-end product thinking and execution",
    items: [
      { name: "Product Strategy", value: 86 },
      { name: "Design Thinking", value: 90 },
      { name: "MVP Design", value: 88 },
      { name: "Stakeholder Alignment", value: 84 }
    ]
  },
  {
    category: "Motion Design",
    highlight: 76,
    description: "Meaningful micro-interactions and transitions",
    items: [
      { name: "UI Animation", value: 80 },
      { name: "Micro-interactions", value: 75 },
      { name: "Motion Graphics", value: 72 },
      { name: "Prototyping", value: 78 }
    ]
  },
  {
    category: "Visual Identity",
    highlight: 90,
    description: "Brand systems, logos, and visual language",
    items: [
      { name: "Logo Design", value: 92 },
      { name: "Brand Guidelines", value: 89 },
      { name: "Typography", value: 91 },
      { name: "Color Theory", value: 88 }
    ]
  },
  {
    category: "Design Systems",
    highlight: 85,
    description: "Scalable and consistent design frameworks",
    items: [
      { name: "Component Library", value: 87 },
      { name: "Design Tokens", value: 86 },
      { name: "Documentation", value: 84 },
      { name: "Accessibility", value: 83 }
    ]
  }
];

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayValue, setDisplayValue] = useState(skills[0].highlight);
  const prevValueRef = useRef(skills[0].highlight);
  const activeSkill = skills[activeIndex];

  const radius = 160;
  const center = { x: radius + 20, y: radius + 20 };

  useEffect(() => {
    const target = skills[activeIndex].highlight;
    const start = prevValueRef.current;
    const startTime = performance.now();
    const duration = 500;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      setDisplayValue(Math.round(start + (target - start) * eased));

      if (progress < 1) requestAnimationFrame(tick);
      else prevValueRef.current = target;
    };

    requestAnimationFrame(tick);
  }, [activeIndex]);

  const getDotPosition = (index: number, total: number) => {
    const angle = (index * (2 * Math.PI)) / total - Math.PI / 2;
    return {
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    };
  };

  // Use primary color for all progress bars
  const progressColor = 'hsl(82, 100%, 64%)'; // Primary color from theme

  return (
    <section className="relative w-full py-32 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">

        {/* ===== DESIGNER HEADING (NEW) ===== */}
        <div className="mb-20 max-w-xl">
          <h2 className="text-6xl font-light tracking-tight text-foreground font-['Plus_Jakarta_Sans']">
            Design <span className="text-foreground/60 font-normal">Capabilities</span>
          </h2>
          <p className="mt-4 text-foreground/60 text-sm leading-relaxed tracking-wide font-light">
            A focused view into how I approach design problems — from concept to execution.
          </p>
        </div>

        <div className="flex items-start gap-20">

          {/* ===== WHEEL (ENHANCED, NOT CHANGED) ===== */}
          <div
            className="relative"
            style={{
              width: radius * 2 + 40,
              height: radius * 2 + 40,
              flexShrink: 0,
            }}
          >
            {/* Ambient rotating dashed orbit (NEW) */}
            <motion.div
              className="absolute inset-0 rounded-full border border-foreground/5"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />

            {/* Floating particles (NEW) */}
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full bg-foreground/20"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${10 + i * 14}%`,
                }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 4 + i, repeat: Infinity }}
              />
            ))}

            {/* Original SVG rings */}
            <svg
              className="absolute inset-0 w-full h-full text-foreground/10"
              viewBox={`0 0 ${radius * 2 + 40} ${radius * 2 + 40}`}
            >
              <circle cx={center.x} cy={center.y} r={radius * 0.8} fill="none" stroke="currentColor" strokeOpacity="0.1" />
              <circle cx={center.x} cy={center.y} r={radius * 0.5} fill="none" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="2 2" />
            </svg>

            {/* Center square */}
            <div
              className="absolute bg-foreground/10"
              style={{ 
                width: 8, 
                height: 8, 
                left: '50%', 
                top: '50%', 
                transform: 'translate(-50%, -50%) rotate(45deg)' 
              }}
            />

            {skills.map((skill, index) => {
              const isActive = index === activeIndex;
              const { x, y } = getDotPosition(index, skills.length);

              return (
                <React.Fragment key={skill.category}>
                  {isActive && (
                    <motion.svg
                      className="absolute inset-0 pointer-events-none"
                      viewBox={`0 0 ${radius * 2 + 40} ${radius * 2 + 40}`}
                    >
                      <line
                        x1={center.x}
                        y1={center.y}
                        x2={x}
                        y2={y}
                        stroke="hsl(142.1 76.2% 36.3%)"
                        strokeOpacity="0.3"
                      />
                    </motion.svg>
                  )}

                  <motion.button
                    className="absolute"
                    style={{ 
                      left: x - 8, 
                      top: y - 8, 
                      width: 16, 
                      height: 16,
                      transform: 'rotate(45deg)',
                      transformOrigin: 'center'
                    }}
                    animate={{
                      scale: isActive ? 1.3 : 1,
                      backgroundColor: isActive ? 'hsl(142.1 76.2% 36.3%)' : 'transparent',
                      boxShadow: isActive ? '0 0 16px hsl(142.1 76.2% 36.3% / 0.4)' : 'none',
                      border: '1px solid hsl(0 0% 100% / 0.12)',
                    }}
                    onClick={() => setActiveIndex(index)}
                  />
                </React.Fragment>
              );
            })}
          </div>

          {/* ===== TABLE (UNCHANGED) ===== */}
          <div className="flex-1 max-w-xl mt-12">
            <AnimatePresence mode="wait">
              <motion.div key={activeSkill.category}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-5xl font-light text-primary">[{displayValue}%]</span>
                  <h3 className="text-2xl font-medium text-foreground/90">{activeSkill.category}</h3>
                </div>

                <p className="text-foreground/60 mb-8 pb-8 border-b border-foreground/10">
                  {activeSkill.description}
                </p>

                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  {activeSkill.items.map(item => (
                    <div key={item.name}>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/90">{item.name}</span>
                        <span className="font-mono text-primary/80">{item.value}%</span>
                      </div>
                      <div className="h-px bg-foreground/10">
                        <motion.div
                          className="h-full bg-primary"
                          style={{
                            backgroundColor: progressColor
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
