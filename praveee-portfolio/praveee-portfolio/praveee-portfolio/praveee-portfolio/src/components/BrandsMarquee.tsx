import { motion } from 'framer-motion';

const designDisciplines = [
  { name: 'UI/UX Design', icon: '◉' },
  { name: 'Product Design', icon: '◍' },
  { name: 'Brand Identity', icon: '◈' },
  { name: 'Visual Design', icon: '◐' },
  { name: 'Interaction Design', icon: '◑' },
  { name: 'Design Systems', icon: '◌' },
  { name: 'Typography', icon: '◔' },
  { name: 'Creative Direction', icon: '◕' },
  { name: 'User Research', icon: '◍' },
  { name: 'Prototyping', icon: '◑' },
  { name: 'Motion Design', icon: '◐' },
  { name: 'Design Strategy', icon: '◉' },
];

const DesignMarquee = () => {
  const items = [...designDisciplines, ...designDisciplines]; // Double for seamless loop

  return (
    <section className="py-16 border-t border-white/5 bg-gradient-to-b from-transparent to-black/5">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-16 whitespace-nowrap will-change-transform"
          animate={{ x: [0, '-50%'] }}
          transition={{
            duration: 60, // Slower, more deliberate movement
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={`${item.name}-${i}`}
              className="flex items-center gap-3 group"
              whileHover={{ 
                y: -2,
                transition: { type: 'spring', stiffness: 400, damping: 10 }
              }}
            >
              <span className="text-lime-400/60 text-lg font-mono">
                {item.icon}
              </span>
              <span className="text-white/80 text-xl font-sans font-light tracking-wide group-hover:text-white transition-colors">
                {item.name}
              </span>
              <span className="text-lime-400/30 text-2xl">/</span>
            </motion.div>
          ))}
        </motion.div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
      </div>
    </section>
  );
};

export default DesignMarquee;
