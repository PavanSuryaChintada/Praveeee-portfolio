import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'hover'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{
            scale: isHovering ? 2.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ 
            type: 'spring',
            damping: 20,
            stiffness: 300,
            mass: 0.2
          }}
        >
          <div className="relative">
            {/* Main cursor dot */}
            <div 
              className={`absolute inset-0 rounded-full ${
                isHovering 
                  ? 'w-5 h-5 bg-transparent border-2 border-lime-400/80' 
                  : 'w-3 h-3 bg-lime-400/90'
              } transition-all duration-300 transform-gpu`}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(163, 230, 53, 0.5))',
                willChange: 'transform, opacity, width, height'
              }}
            />
            
            {/* Pulse effect on hover */}
            {isHovering && (
              <motion.div 
                className="absolute inset-0 rounded-full bg-lime-400/20"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ 
                  scale: 1.8, 
                  opacity: 0,
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeOut'
                }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
