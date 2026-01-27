import { motion } from 'framer-motion';
import { useState } from 'react';

const brands = [
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Adobe', color: '#FF0000' },
  { name: 'Sketch', color: '#F7B500' },
  { name: 'Photoshop', color: '#31A8FF' },
  { name: 'Illustrator', color: '#FF9A00' },
  { name: 'After Effects', color: '#9999FF' },
  { name: 'Blender', color: '#F5792A' },
  { name: 'Canva', color: '#00C4CC' },
  { name: 'InVision', color: '#FF3366' },
  { name: 'Framer', color: '#0055FF' },
  { name: 'Webflow', color: '#4353FF' },
  { name: 'Dribbble', color: '#EA4C89' },
];

const BrandsMarquee = () => {
  return (
    <section className="py-12 border-y border-border overflow-hidden">
      <div className="flex items-center">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: [0, '-50%'] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <BrandItem key={`${brand.name}-${i}`} brand={brand} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const BrandItem = ({ brand }: { brand: { name: string; color: string } }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex items-center gap-3 cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-300"
        style={{
          backgroundColor: isHovered ? brand.color : 'hsl(var(--secondary))',
          color: isHovered ? '#fff' : 'hsl(var(--muted-foreground))',
        }}
      >
        {brand.name.charAt(0)}
      </motion.div>
      <span
        className="text-xl font-sans font-medium transition-colors duration-300"
        style={{
          color: isHovered ? brand.color : 'hsl(var(--muted-foreground))',
        }}
      >
        {brand.name}
      </span>
    </motion.div>
  );
};

export default BrandsMarquee;
