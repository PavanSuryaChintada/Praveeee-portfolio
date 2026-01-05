import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  // Simulate real loading progress for now
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const loadingText = "PRAVEEEEE"; // Replace with your brand/portfolio name

  useEffect(() => {
    // TODO: Replace with real asset/font/image/app readiness logic
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 300);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 3;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  // Calculate how many letters to show based on progress
  const totalLetters = loadingText.length;
  const visibleLetters = Math.floor((progress / 100) * totalLetters);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, filter: 'blur(2px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
          style={{ fontFamily: 'Inter, Satoshi, General Sans, sans-serif' }}
        >
          <div className="w-full flex flex-col items-center">
            <div
              className="flex flex-row justify-center items-center"
              style={{
                letterSpacing: '0.12em',
                fontWeight: 500,
                fontSize: '2.7rem',
                color: '#F5F6F7',
                textTransform: 'uppercase',
                fontFamily: 'Inter, Satoshi, General Sans, sans-serif',
              }}
            >
              {loadingText.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 18, filter: 'blur(3px)' }}
                  animate={i < visibleLetters ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 18, filter: 'blur(3px)' }}
                  transition={{
                    duration: 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ display: 'inline-block', minWidth: '0.7em' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
