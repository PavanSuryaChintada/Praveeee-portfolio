import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useLayoutEffect, useRef } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  brandRef: React.RefObject<HTMLSpanElement>;
  setShowBrand: (show: boolean) => void;
}

const LoadingScreen = ({ onComplete, brandRef, setShowBrand }: LoadingScreenProps) => {
  // Simulate real loading progress for now
  const [progress, setProgress] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const loadingText = "PRAVEEEEE"; // Must match navbar brand

  // Simulate real loading progress with rAF (replace with real logic for production)
  useEffect(() => {
    let frame: number;
    let last = performance.now();
    function step(now: number) {
      if (progress < 100) {
        // Slow, intentional ramp (adjust speed as needed)
        const delta = Math.max(0.12, (100 - progress) * 0.008);
        setProgress(p => Math.min(100, p + delta));
        frame = requestAnimationFrame(step);
      } else {
        setTimeout(() => setShowBorder(true), 350);
        // Wait for border draw, then morph
        setTimeout(() => setIsExiting(true), 1200);
      }
    }
    document.body.style.overflow = 'hidden';
    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = 'auto';
    };
  }, [progress]);

  // Calculate how many letters to show based on progress
  const totalLetters = loadingText.length;
  const visibleLetters = Math.floor((progress / 100) * totalLetters);

  // Morph animation logic
  const loaderTextRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (progress < 100) return;
    // Hold for 400ms, then start zoom
    const pause = setTimeout(() => {
      // Dynamically calculate scale to fill viewport
      if (loaderTextRef.current) {
        const rect = loaderTextRef.current.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const scaleW = vw / rect.width;
        const scaleH = vh / rect.height;
        const scale = Math.max(scaleW, scaleH) * 2.1; // 28% overflow for complete movie-style coverage
        setZoomScale(scale);
      }
      setIsZooming(true);
      // After zoom, fade out
      setTimeout(() => {
        setShowSubtitle(true);
        // Hold subtitle for ~300ms, then fade both out
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            document.body.style.overflow = 'auto';
            onComplete();
          }, 500); // fade duration
        }, 300); // subtitle hold
      }, 400); // subtitle fade in after zoom hold
    }, 500); // hold at peak scale
    return () => clearTimeout(pause);
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isZooming ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            fontFamily: 'Inter, Satoshi, General Sans, sans-serif',
            background: isZooming ? 'rgba(16,16,18,0.7)' : '#101012',
            transition: 'background 0.9s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Optional vignette for polish */}
          {isZooming && (
            <div style={{
              pointerEvents: 'none',
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.12) 85%, rgba(0,0,0,0.18) 100%)',
              transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1)',
              opacity: isZooming ? 1 : 0
            }} />
          )}
          <div className="w-full flex flex-col items-center" style={{ zIndex: 2 }}>
            <motion.div
              ref={loaderTextRef}
              className="relative flex flex-row justify-center items-center"
              style={{
                letterSpacing: '0.13em',
                fontWeight: 500,
                fontSize: '2.8rem',
                textTransform: 'uppercase',
                fontFamily: 'Inter, Satoshi, General Sans, sans-serif',
                lineHeight: 1.1,
                minHeight: '3.2rem',
              }}
              animate={isZooming ? { scale: 1.6, opacity: 0.9 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Letters: outline + fill layers */}
              {loadingText.split('').map((char, i) => {
                // Outline fades at 100% progress
                const outlineOpacity = progress >= 100 ? 0 : 0.38;
                // Fill percent for liquid effect (progressively fills each letter)
                const fillProgress = Math.max(0, Math.min(1, (progress / 100) * totalLetters - i));
                return (
                  <span key={i} style={{ position: 'relative', display: 'inline-block', minWidth: '0.7em' }}>
                    {/* Outline Layer */}
                    <motion.span
                      initial={{ opacity: 0, filter: 'blur(2px)', y: 4 }}
                      animate={{ opacity: outlineOpacity, filter: 'blur(0px)', y: 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        WebkitTextStroke: '1.2px rgba(220,220,225,0.38)',
                        color: 'transparent',
                        fontWeight: 500,
                        pointerEvents: 'none',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        height: '100%',
                        userSelect: 'none',
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                    {/* Fill Layer: liquid mask bottom→top */}
                    <motion.span
                      initial={{
                        opacity: 0,
                        y: 6,
                        filter: 'blur(2.5px)',
                        WebkitMaskImage: 'linear-gradient(to top, #000 0%, #000 0%, transparent 0%)',
                        maskImage: 'linear-gradient(to top, #000 0%, #000 0%, transparent 0%)',
                      }}
                      animate={{
                        opacity: fillProgress > 0 ? 1 : 0,
                        y: fillProgress > 0 ? 0 : 6,
                        filter: fillProgress > 0.99 ? 'blur(0px)' : 'blur(1.5px)',
                        WebkitMaskImage: `linear-gradient(to top, #000 ${fillProgress*100}%, transparent ${fillProgress*100}%)`,
                        maskImage: `linear-gradient(to top, #000 ${fillProgress*100}%, transparent ${fillProgress*100}%)`,
                      }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        color: '#F5F6F7',
                        fontWeight: 500,
                        position: 'relative',
                        zIndex: 2,
                        display: 'inline-block',
                        userSelect: 'none',
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  </span>
                );
              })}
            </motion.div>
            {/* Subtitle micro-moment */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
              animate={showSubtitle ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(8px)', y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: '1.03rem',
                letterSpacing: '0.22em',
                color: '#D3D4D6',
                marginTop: '1.1em',
                fontWeight: 400,
                textTransform: 'uppercase',
                textAlign: 'center',
                opacity: showSubtitle ? 1 : 0,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              UI / UX & Product Designer
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
