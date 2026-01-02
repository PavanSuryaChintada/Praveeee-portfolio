import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 300);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
            className="relative mb-12"
          >
            <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center glow">
              <span className="text-4xl font-display font-bold text-primary">A</span>
            </div>
            
            {/* Orbiting dot */}
            <motion.div
              className="absolute w-3 h-3 bg-primary rounded-full"
              style={{ top: '50%', left: '50%' }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.div
                className="absolute w-3 h-3 bg-primary rounded-full glow"
                style={{ transform: 'translate(-50%, -50%) translateX(48px)' }}
              />
            </motion.div>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-muted-foreground font-sans text-sm tracking-widest uppercase mb-4">
              Crafting Experience
            </p>
            
            {/* Progress Bar */}
            <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <motion.p
              className="mt-4 text-primary font-sans font-bold text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute bottom-12 left-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="font-display text-6xl text-muted-foreground/20">Design</p>
          </motion.div>
          
          <motion.div
            className="absolute top-12 right-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <p className="font-display text-6xl text-muted-foreground/20">Create</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
