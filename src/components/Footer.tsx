import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      {/* Marquee */}
      <div className="overflow-hidden py-8">
        <motion.div className="flex whitespace-nowrap" animate={{ x: [0, '-50%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-6xl md:text-8xl font-display font-bold text-muted-foreground/20 mx-8">
              CONTACT ME • LET'S WORK TOGETHER •
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-muted-foreground font-sans text-sm">
          © 2024 Anish. Crafted with passion and code.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
