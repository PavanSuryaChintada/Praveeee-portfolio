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
  const items = [...designDisciplines, ...designDisciplines]; 

  return (
    // Background changed to Soft White (#FAFAFA) and height decreased to py-8
    <section className="py-8 border-y border-[#0D0907]/10 bg-[#FAFAFA] relative z-20">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-20 whitespace-nowrap will-change-transform"
          animate={{ x: [0, '-50%'] }}
          transition={{
            duration: 45, 
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={`${item.name}-${i}`}
              className="flex items-center gap-5 group cursor-default"
            >
              {/* Accent Icon in Creative Yellow #F4C430 */}
              <span className="text-[#F4C430] text-lg font-mono">
                {item.icon}
              </span>
              
              {/* Text changed to Deep Black (#0D0907) for the white background */}
              {/* Maintained Bold Italic Editorial style */}
              <span className="text-[#0D0907]/30 text-2xl font-black italic tracking-tighter uppercase group-hover:text-[#0D0907] transition-all duration-300">
                {item.name}
              </span>

              {/* Minimalist dot separator */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#0D0907]/10 group-hover:bg-[#F4C430] transition-colors" />
            </motion.div>
          ))}
        </motion.div>

        {/* Fading Mask updated for White Background */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default DesignMarquee;