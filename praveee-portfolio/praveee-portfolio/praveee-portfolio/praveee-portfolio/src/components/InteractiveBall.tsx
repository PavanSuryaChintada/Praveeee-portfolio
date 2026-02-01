import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const InteractiveBall = () => {
  const ballRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ballX = useSpring(0, { stiffness: 100, damping: 30 });
  const ballY = useSpring(0, { stiffness: 100, damping: 30 });
  const scale = useSpring(1, { stiffness: 150, damping: 15 });
  const velocity = useMotionValue(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  // Track mouse position and velocity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const timeDelta = now - lastTime.current;
      
      if (timeDelta > 0) {
        const x = e.clientX;
        const xVelocity = Math.abs(x - lastX.current) / timeDelta;
        velocity.set(Math.min(xVelocity * 0.5, 1));
        lastX.current = x;
        lastTime.current = now;
      }

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, velocity]);

  // Update ball position with lerp
  useEffect(() => {
    const updateBallPosition = () => {
      if (!ballRef.current) return;
      
      const ballSize = ballRef.current.offsetWidth;
      const halfBallSize = ballSize / 2;
      
      // Apply lerp to position
      ballX.set(mouseX.get() - halfBallSize);
      ballY.set(mouseY.get() - halfBallSize);
      
      // Apply stretch based on velocity
      const velocityValue = velocity.get();
      scale.set(1 + velocityValue * 0.3);
      
      requestAnimationFrame(updateBallPosition);
    };
    
    const frame = requestAnimationFrame(updateBallPosition);
    return () => cancelAnimationFrame(frame);
  }, [mouseX, mouseY, ballX, ballY, scale, velocity]);

  // Handle hover states for interactive elements
  useEffect(() => {
    const handleHoverStart = () => {
      scale.set(1.5);
    };
    
    const handleHoverEnd = () => {
      scale.set(1);
    };

    const interactiveElements = document.querySelectorAll('a, button, [data-interactive]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [scale]);

  return (
    <motion.div
      ref={ballRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full bg-primary/20 backdrop-blur-sm pointer-events-none z-50 mix-blend-difference"
      style={{
        x: ballX,
        y: ballY,
        scale: scale,
      }}
    />
  );
};
