"use client";

import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "#projects" },
  { name: "AI-Chat", href: "#ai-chat" },
];

type NavigationProps = {
  showBrand?: boolean;
};

const Navigation = forwardRef<HTMLSpanElement, NavigationProps>(
  ({ showBrand = true }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<number | null>(null);

    // Scroll state
    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 10);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Expose brand ref for loader → navbar morph
    useImperativeHandle(ref, () => document.querySelector('.brand-span') as HTMLSpanElement | null);

    const location = useLocation();
    
    const handleNavClick = (href: string) => {
      setIsOpen(false);
      // Only handle scroll for hash links
      if (href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };
    
    // Close mobile menu when route changes
    useEffect(() => {
      setIsOpen(false);
    }, [location]);

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.15 },
      },
    };

    const itemVariants = {
      hidden: { y: -16, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 120, damping: 14 },
      },
    };

    const mobileMenuVariants = {
      closed: { opacity: 0, y: -20 },
      open: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.08 },
      },
    };

    return (
      <>
        {/* NAVBAR */}
        <motion.header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "py-2" : "py-4"
          }`}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container mx-auto px-6">
            <motion.nav
              className={`relative flex items-center justify-between rounded-2xl p-4 transition-all duration-300 ${
                scrolled
                  ? "bg-[#FAFAFA] backdrop-blur-lg border border-[#0D0907]/10 shadow-lg"
                  : "bg-[#FAFAFA]/95 backdrop-blur-sm border border-[#0D0907]/5"
              }`}
              variants={itemVariants}
            >
              {/* BRAND */}
              <motion.div
                className="text-2xl font-bold text-[#0D0907] mb-6 relative group"
                variants={itemVariants}
              >
                <Link 
                  to="/" 
                  className={`text-sm font-medium transition-colors hover:text-[#0D0907] ${
                    location.pathname === "/" ? 'text-[#0D0907]' : 'text-[#0D0907]/60'
                  }`}
                  onClick={() => handleNavClick("#hero")}
                >
                  <span
                    ref={ref}
                    className="relative z-10 block brand-span"
                    style={{
                      opacity: showBrand ? 1 : 0,
                      transition: "opacity 0.35s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    Praveeee
                  </span>
                  <span className="w-full h-0.5 bg-[#F4C430] absolute bottom-0 left-0" />
                </Link>
              </motion.div>

              {/* DESKTOP LINKS */}
              <motion.div
                className="hidden md:flex items-center space-x-1"
                variants={itemVariants}
              >
                {navLinks.map((link, i) => (
                  <motion.li key={i} variants={mobileMenuVariants}>
                    <Link
                      to={link.href}
                      className={`block px-4 py-3 text-lg font-medium text-[#0D0907]/60 hover:text-[#0D0907] transition-colors ${
                        location.pathname === link.href ? 'text-[#0D0907]' : ''
                      }`}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
                <motion.button
                  className="ml-2 px-4 py-2 bg-[#F4C430]/10 hover:bg-[#F4C430]/20 text-[#F4C430] rounded-lg border border-[#F4C430]/20 transition-all duration-300 text-sm font-medium"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get in Touch
                </motion.button>
              </motion.div>

              {/* MOBILE TOGGLE */}
              <motion.button
                className="md:hidden p-2 text-[#0D0907]/60 hover:text-[#0D0907] transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                variants={itemVariants}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </motion.nav>
          </div>
        </motion.header>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-[#0D0907]/80 backdrop-blur-sm z-40 pt-24 px-6 pb-8"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <motion.div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-xl py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
                  >
                    {link.name}
                  </motion.a>
                ))}

                <motion.button className="mt-4 w-full py-3 bg-lime-400/10 hover:bg-lime-400/20 text-lime-400 rounded-lg border border-lime-400/20 font-medium">
                  Get in Touch
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

Navigation.displayName = "Navigation";
export default Navigation;
