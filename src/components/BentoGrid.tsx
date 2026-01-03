import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TechOrb from './TechOrb';
import MacBookMockup from './MacBookMockup';

const BentoGrid = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-sans font-extrabold text-center mb-12"
        >
          At a <span className="text-primary">Glance</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Dribbble Followers */}
          <StatCard
            title="Dribbble"
            value={15}
            suffix="K+"
            label="Followers"
            delay={0}
          />

          {/* Behance Views */}
          <StatCard
            title="Behance"
            value={250}
            suffix="K+"
            label="Project Views"
            delay={0.1}
          />

          {/* Tech Orb - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="col-span-1 md:col-span-2 bg-card rounded-2xl border border-border p-6 min-h-[300px] card-hover hover:border-t-primary overflow-hidden"
          >
            <h3 className="text-sm font-sans font-medium text-muted-foreground mb-4">Design Tools</h3>
            <TechOrb />
          </motion.div>

          {/* Years Experience */}
          <StatCard
            title="Experience"
            value={7}
            suffix="+"
            label="Years"
            delay={0.3}
          />

          {/* MacBook Mockup - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className="col-span-1 md:col-span-2 bg-card rounded-2xl border border-border p-6 min-h-[300px] card-hover hover:border-t-primary overflow-hidden"
          >
            <h3 className="text-sm font-sans font-medium text-muted-foreground mb-4">Featured Work</h3>
            <MacBookMockup />
          </motion.div>

          {/* Clients Served */}
          <StatCard
            title="Clients"
            value={120}
            suffix="+"
            label="Brands Served"
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatCard = ({ title, value, suffix, label, delay }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="bg-card rounded-2xl border border-border p-6 card-hover hover:border-t-primary"
    >
      <h3 className="text-sm font-sans font-medium text-muted-foreground mb-2">{title}</h3>
      <div className="text-4xl font-display font-bold text-primary">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
};

export default BentoGrid;
