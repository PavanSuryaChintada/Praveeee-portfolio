import { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
}

const MagneticButton = ({ children, onClick, variant = 'primary', className = '' }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses = 'px-8 py-4 rounded-full font-sans font-medium text-sm tracking-wider transition-all duration-300';
  const variantClasses = variant === 'primary'
    ? 'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30'
    : 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10';

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses} ${className}`}
      data-cursor="hover"
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
