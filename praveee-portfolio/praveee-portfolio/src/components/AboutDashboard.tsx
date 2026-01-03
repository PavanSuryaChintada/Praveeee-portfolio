import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const skillData = [
  { skill: 'Frontend', value: 95 },
  { skill: 'Backend', value: 85 },
  { skill: 'AI/ML', value: 75 },
  { skill: 'Design', value: 80 },
  { skill: 'DevOps', value: 70 },
];

const AboutDashboard = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-12"
        >
          About <span className="text-primary">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Time Widget */}
          <TimeWidget />

          {/* Now Playing Widget */}
          <NowPlayingWidget />

          {/* Skill Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 md:col-span-2 bg-card rounded-2xl border border-border p-6 card-hover hover:border-t-primary"
          >
            <h3 className="text-sm font-sans font-medium text-muted-foreground mb-4">Skill Set</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="hsl(68, 100%, 52%)"
                    fill="hsl(68, 100%, 52%)"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* GitHub Contribution Graph */}
          <ContributionGraph />
        </div>
      </div>
    </section>
  );
};

const TimeWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card rounded-2xl border border-border p-6 card-hover hover:border-t-primary"
    >
      <h3 className="text-sm font-sans font-medium text-muted-foreground mb-2">Local Time</h3>
      <div className="text-3xl font-mono font-bold text-primary tabular-nums">
        {time.toLocaleTimeString('en-US', { hour12: false })}
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        {time.toLocaleDateString('en-US', { weekday: 'long' })}
      </p>
    </motion.div>
  );
};

const NowPlayingWidget = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-2xl border border-border p-6 card-hover hover:border-t-primary"
    >
      <div className="flex items-center gap-4">
        {/* Rotating Album Art */}
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-4 h-4 rounded-full bg-card border border-border" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-xs text-green-500 font-sans">Now Playing</span>
          </div>
          <p className="text-sm font-medium truncate">Coding Lo-Fi Mix</p>
          <p className="text-xs text-muted-foreground truncate">ChillHop</p>
        </div>
      </div>

      {/* Audio Visualizer */}
      <div className="flex items-end justify-center gap-1 h-8 mt-4">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-green-500 rounded-full"
            animate={{
              height: [8, 20 + Math.random() * 12, 8],
            }}
            transition={{
              duration: 0.5 + Math.random() * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const ContributionGraph = () => {
  const weeks = 20;
  const days = 7;

  const getRandomIntensity = () => Math.floor(Math.random() * 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="col-span-1 md:col-span-2 lg:col-span-1 bg-card rounded-2xl border border-border p-6 card-hover hover:border-t-primary"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-sans font-medium text-muted-foreground">Contributions</h3>
        <span className="text-xs text-primary font-medium">1000+</span>
      </div>
      
      <div className="flex gap-[2px] overflow-hidden">
        {[...Array(weeks)].map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[2px]">
            {[...Array(days)].map((_, dayIndex) => {
              const intensity = getRandomIntensity();
              const opacityClass = intensity === 0 ? 'opacity-10' : 
                                   intensity === 1 ? 'opacity-25' : 
                                   intensity === 2 ? 'opacity-50' : 
                                   intensity === 3 ? 'opacity-75' : 'opacity-100';
              return (
                <motion.div
                  key={dayIndex}
                  className={`w-2 h-2 rounded-sm bg-green-500 ${opacityClass}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (weekIndex * days + dayIndex) * 0.002 }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutDashboard;
