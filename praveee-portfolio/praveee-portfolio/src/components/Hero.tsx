import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Dribbble } from 'lucide-react';
import { useState, useEffect, useRef, CSSProperties } from 'react';
import HeroLoader from './HeroLoader';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Dribbble, href: 'https://dribbble.com', label: 'Dribbble' },
];

const greetings = [
  { text: 'Hello', lang: 'English' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Namaste', lang: 'Hindi' },
];

const Hero = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <HeroLoader onComplete={handleLoaderComplete} />;
  }

  // High-end tech aesthetic styles
  const heroStyle: CSSProperties = {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    overflow: 'hidden',
    isolation: 'isolate',
    '--grid-size': '100px',
    '--grid-color': 'rgba(163, 230, 53, 0.03)'
  } as CSSProperties;

  // Button styles with sharp corners
  const buttonBase: CSSProperties = {
    padding: '12px 32px',
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
    borderRadius: '0',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  const primaryButtonStyle: CSSProperties = {
    ...buttonBase,
    backgroundColor: '#bef264',
    color: '#000000',
    border: 'none',
    ':hover': {
      backgroundColor: '#d9f99d',
      transform: 'translateY(-2px)'
    }
  };

  const secondaryButtonStyle: CSSProperties = {
    ...buttonBase,
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '1px solid #bef264',
    ':hover': {
      backgroundColor: 'rgba(190, 242, 100, 0.1)',
      transform: 'translateY(-2px)'
    }
  };

  // Social icon styles with square containers
  const socialIconStyle: CSSProperties = {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    borderRadius: '0',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#2a2a2a',
      transform: 'translateY(-2px)'
    }
  };

  // Grid and effects
  const gridOverlayStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    pointerEvents: 'none',
    background: [
      'linear-gradient(to right, var(--grid-color) 1px, transparent 1px)',
      'linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)',
      'radial-gradient(circle at 20% 10%, rgba(190, 242, 100, 0.12) 0%, transparent 600px)'
    ].join(','),
    backgroundSize: [
      'var(--grid-size) var(--grid-size)',
      'var(--grid-size) var(--grid-size)',
      '100% 100%'
    ].join(','),
    backgroundPosition: [
      '-1px -1px',
      '-1px -1px',
      '0 0'
    ].join(','),
    maskImage: 'radial-gradient(circle at 60% 30%, white, transparent 70%)',
    WebkitMaskImage: 'radial-gradient(circle at 60% 30%, white, transparent 70%)'
  };

  // Content wrapper with proper z-index and positioning
  const contentWrapperStyle: CSSProperties = {
    position: 'relative',
    zIndex: 1,
    height: '100%',
    padding: '80px 0',
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      style={heroStyle}
      className="relative"
    >
      {/* Grid and effects overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: [
            'linear-gradient(to right, var(--grid-color) 1px, transparent 1px)',
            'linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)',
            'radial-gradient(circle at 90% 20%, rgba(190, 242, 100, 0.12) 0%, transparent 600px)'
          ].join(','),
          backgroundSize: [
            'var(--grid-size) var(--grid-size)',
            'var(--grid-size) var(--grid-size)',
            '100% 100%'
          ].join(','),
          backgroundPosition: [
            '-1px -1px',
            '-1px -1px',
            '0 0'
          ].join(','),
          maskImage: 'radial-gradient(circle at 60% 30%, white, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 60% 30%, white, transparent 70%)'
        }}
      />
      
      {/* Glossy overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 10% 20%, rgba(190, 242, 100, 0.12) 0%, transparent 600px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      <div style={contentWrapperStyle} className="container mx-auto px-6 h-full">
        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Content - Left Side */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Greeting */}
              <div className="h-16 mb-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={greetingIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="text-2xl font-mono text-primary"
                  >
                    {greetings[greetingIndex].text}, I'm
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Name */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Anish</span>
              </h1>

              {/* Role */}
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Full Stack Developer & UI/UX Designer
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={primaryButtonStyle}
                >
                  View My Work
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={secondaryButtonStyle}
                >
                  Contact Me
                </motion.button>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#1a1a1a',
                        color: '#ffffff',
                        borderRadius: '0',
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{ 
                        y: -3, 
                        backgroundColor: '#2a2a2a',
                        transition: { duration: 0.2 }
                      }}
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Image - Right Side */}
          <motion.div 
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '500px',
              marginLeft: 'auto'
            }}>
              {/* Offset background */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '-10px',
                right: '10px',
                bottom: '-10px',
                backgroundColor: '#bef264',
                clipPath: 'polygon(0% 15%, 15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)',
                zIndex: 0,
              }} />
              <motion.div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  clipPath: 'polygon(0% 15%, 15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)',
                  zIndex: 1,
                  backgroundColor: '#0a0a0a',
                  overflow: 'hidden'
                } as React.CSSProperties}
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                  <span className="text-7xl md:text-9xl font-bold text-primary">A</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

      </div>
      </div>
    </section>
  );
};

export default Hero;
