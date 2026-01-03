import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Power4 } from 'gsap';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HeroLoader = ({ onComplete }: { onComplete: () => void }) => {
  const curtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial styles
    gsap.set(curtainRef.current, { y: 0 });
    gsap.set([imageRef.current, headingRef.current, subheadingRef.current, buttonRef.current], { 
      opacity: 0, 
      y: 50 
    });
    gsap.set('.tech-icon', { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    });

    // Create the animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Re-enable scrolling when animation is complete
        document.body.style.overflow = 'auto';
        onComplete();
      },
      defaults: { ease: 'power3.out' }
    });

    // Animation sequence
    tl.to(curtainRef.current, {
      y: '-100%',
      duration: 1.2,
      ease: 'power3.inOut',
      delay: 0.5
    })
    .fromTo(imageRef.current, 
      { scale: 0.8, y: 50, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 1, ease: 'back.out(1.4)' },
      '-=0.8'
    )
    .fromTo(headingRef.current?.querySelectorAll('span'),
      { y: '100%', opacity: 0 },
      { 
        y: '0%', 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.05,
        ease: 'power3.out'
      },
      '-=0.6'
    )
    .fromTo(subheadingRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(buttonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo('.tech-icon',
      { y: 30, opacity: 0, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.05,
        ease: 'back.out(1.4)'
      },
      '-=0.4'
    );

    // Disable scrolling during animation
    document.body.style.overflow = 'hidden';

    // Add parallax effect after animation
    const parallaxElements = [imageRef.current, headingRef.current, subheadingRef.current];
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (window.innerWidth / 2 - clientX) / 20;
      const y = (window.innerHeight / 2 - clientY) / 20;
      
      gsap.to(parallaxElements, {
        x: x * 0.5,
        y: y * 0.5,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.05
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Curtain */}
      <div 
        ref={curtainRef}
        className="fixed inset-0 bg-[#95ff00] z-50 transform origin-bottom"
      />
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="text-left">
              <div className="overflow-hidden">
                <h1 
                  ref={headingRef} 
                  className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                  <span className="inline-block overflow-hidden">
                    <span className="inline-block">Helping brands to</span>
                  </span>
                  <span className="inline-block overflow-hidden">
                    <span className="inline-block text-[#95ff00]">stand out</span>
                  </span>
                  <span className="inline-block overflow-hidden">
                    <span className="inline-block">in the digital age</span>
                  </span>
                </h1>
              </div>
              
              <p 
                ref={subheadingRef}
                className="text-xl text-gray-400 mb-8 max-w-lg"
              >
                I'm a creative developer focused on building exceptional digital experiences that blend design and technology.
              </p>
              
              <div ref={buttonRef} className="mb-12">
                <button className="px-8 py-4 bg-[#95ff00] text-black font-medium rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
                  View My Work
                </button>
              </div>

              {/* Tech Icons */}
              <div className="flex flex-wrap gap-6" ref={iconsRef}>
                {['React', 'TypeScript', 'Node.js', 'Next.js', 'Figma'].map((tech, index) => (
                  <div key={tech} className="tech-icon">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                      <span className="text-xs font-medium">{tech}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center lg:justify-end">
              <div 
                ref={imageRef}
                className="relative w-64 h-80 md:w-80 md:h-96 bg-gray-800 rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span>Your Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLoader;
