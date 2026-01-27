import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MacBookMockup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    damping: 20,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    damping: 20,
    stiffness: 150,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };

  return (
    <div
      ref={ref}
      className="w-full h-full flex items-center justify-center perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* MacBook frame */}
        <div className="relative w-64 md:w-80">
          {/* Screen */}
          <div className="bg-secondary rounded-t-lg p-2 border-t border-x border-border">
            <div className="relative aspect-[16/10] bg-background rounded overflow-hidden">
              {/* Screen content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    className="text-2xl font-display font-bold text-primary mb-2"
                    animate={{ opacity: isHovering ? 1 : 0.7 }}
                  >
                    Portfolio
                  </motion.div>
                  <div className="flex gap-1 justify-center">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.2,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Glare effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
                animate={{ opacity: isHovering ? 0.3 : 0.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {/* Camera notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-muted" />
          </div>

          {/* Base */}
          <div className="h-4 bg-gradient-to-b from-secondary to-muted rounded-b-lg border-x border-b border-border">
            <div className="h-1 mx-auto w-16 bg-muted-foreground/30 rounded-full mt-1" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MacBookMockup;
