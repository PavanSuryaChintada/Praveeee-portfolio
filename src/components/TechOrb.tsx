import { motion } from 'framer-motion';

const technologies = [
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Photoshop', color: '#31A8FF' },
  { name: 'Illustrator', color: '#FF9A00' },
  { name: 'After Effects', color: '#9999FF' },
  { name: 'Sketch', color: '#F7B500' },
  { name: 'InDesign', color: '#FF3366' },
  { name: 'XD', color: '#FF61F6' },
  { name: 'Blender', color: '#F5792A' },
  { name: 'Canva', color: '#00C4CC' },
  { name: 'Framer', color: '#0055FF' },
  { name: 'Webflow', color: '#4353FF' },
  { name: 'Premiere', color: '#9999FF' },
];

const TechOrb = () => {
  return (
    <div className="relative w-full h-[200px] flex items-center justify-center">
      {/* Central orb */}
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-primary/20 border border-primary"
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 20px hsl(82, 100%, 64%, 0.3)',
            '0 0 40px hsl(82, 100%, 64%, 0.5)',
            '0 0 20px hsl(82, 100%, 64%, 0.3)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating tech icons */}
      {technologies.map((tech, i) => {
        const angle = (i / technologies.length) * Math.PI * 2;
        const radius = 70 + (i % 3) * 20;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={tech.name}
            className="absolute text-xs font-sans font-medium px-2 py-1 rounded-full bg-card border border-border"
            style={{ color: tech.color }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [x, x + Math.random() * 10 - 5, x],
              y: [y, y + Math.random() * 10 - 5, y],
            }}
            transition={{
              delay: i * 0.05,
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
          >
            {tech.name}
          </motion.div>
        );
      })}
    </div>
  );
};

export default TechOrb;
