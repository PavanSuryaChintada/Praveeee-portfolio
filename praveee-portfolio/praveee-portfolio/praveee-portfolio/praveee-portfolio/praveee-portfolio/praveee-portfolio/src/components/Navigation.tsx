import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'AI-Chat', href: '#ai-chat' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.3 }
    },
    open: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 50 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Menu Button */}
      <motion.button
        className="fixed top-6 right-6 z-50 px-6 py-3 bg-card border border-border rounded-full font-sans text-sm font-medium tracking-wider hover:border-primary transition-colors"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="hover"
      >
        MENU
      </motion.button>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-6 right-6 p-4 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              data-cursor="hover"
            >
              <X size={32} />
            </motion.button>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  onClick={() => handleNavClick(link.href)}
                  className="text-5xl md:text-7xl font-display font-semibold text-foreground hover:text-primary transition-colors relative group"
                  data-cursor="hover"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
