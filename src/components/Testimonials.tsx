import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow',
    content: 'Anish transformed our brand identity completely. The attention to detail and creative vision exceeded all expectations.',
    rating: 5,
    avatar: 'SC',
    featured: false,
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Founder',
    company: 'StartupX',
    content: 'Working with Anish was a game-changer. Our conversion rates increased by 40% after the redesign.',
    rating: 5,
    avatar: 'MJ',
    featured: true,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'DesignCo',
    content: 'The UI/UX work was phenomenal. Users love the new interface and engagement metrics are through the roof.',
    rating: 5,
    avatar: 'ER',
    featured: false,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'CEO',
    company: 'InnovateLab',
    content: 'Exceptional poster designs that captured our brand essence perfectly. Highly recommend for any creative project.',
    rating: 5,
    avatar: 'DK',
    featured: false,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Creative Director',
    company: 'MediaPro',
    content: 'The logo design process was collaborative and the final result was beyond what we imagined. True artistic talent.',
    rating: 5,
    avatar: 'LT',
    featured: false,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(testimonials.length / 2));
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Touch/swipe handling
  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x > 50) {
      handlePrev();
    } else if (info.offset.x < -50) {
      handleNext();
    }
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = diff > testimonials.length / 2 
      ? diff - testimonials.length 
      : diff < -testimonials.length / 2 
        ? diff + testimonials.length 
        : diff;
    
    const isActive = normalizedDiff === 0;
    const isFeatured = testimonials[index].featured;
    
    return {
      x: normalizedDiff * 280,
      scale: isActive ? 1 : 0.85 - Math.abs(normalizedDiff) * 0.05,
      rotateY: normalizedDiff * -15,
      z: isActive ? 100 : 50 - Math.abs(normalizedDiff) * 20,
      opacity: Math.abs(normalizedDiff) > 2 ? 0 : 1 - Math.abs(normalizedDiff) * 0.2,
      filter: isActive ? 'blur(0px)' : `blur(${Math.abs(normalizedDiff) * 2}px)`,
    };
  };

  return (
    <section className="py-24 overflow-hidden relative bg-background">
      {/* Background Text with Parallax */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span 
          className="text-[12vw] font-heading font-bold whitespace-nowrap tracking-wider"
          style={{ 
            color: 'transparent',
            WebkitTextStroke: '1px hsl(var(--muted-foreground) / 0.1)',
          }}
        >
          TESTIMONIALS
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setHasAnimated(true)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            What <span className="text-primary">Clients</span> Say
          </h2>
          <p className="text-muted-foreground font-sans">Trusted by brands worldwide</p>
        </motion.div>

        {/* 3D Carousel */}
        <div 
          ref={containerRef}
          className="relative h-[450px] flex items-center justify-center perspective-1000"
          style={{ perspective: '1000px' }}
        >
          <motion.div
            className="relative w-full flex items-center justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
          >
            <AnimatePresence>
              {testimonials.map((testimonial, index) => {
                const cardStyle = getCardStyle(index);
                const isActive = index === activeIndex;
                const isFeatured = testimonial.featured && isActive;

                return (
                  <motion.div
                    key={testimonial.id}
                    className="absolute cursor-grab active:cursor-grabbing"
                    initial={hasAnimated ? false : { opacity: 0, y: 100, rotateY: 0, scale: 0.5 }}
                    animate={{
                      ...cardStyle,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      },
                    }}
                    whileHover={isActive ? { scale: 1.05 } : {}}
                    transition={{
                      delay: hasAnimated ? 0 : index * 0.1,
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      zIndex: 100 - Math.abs(index - activeIndex),
                    }}
                  >
                    <div
                      className={`w-[320px] md:w-[380px] p-8 rounded-2xl transition-all duration-300 ${
                        isFeatured
                          ? 'bg-primary text-primary-foreground shadow-[0_0_40px_hsl(var(--primary)/0.4)]'
                          : 'bg-[#121212] border border-border'
                      } ${isActive ? 'shadow-[0_0_30px_hsl(var(--primary)/0.2)]' : ''}`}
                    >
                      {/* Rating */}
                      <div className="flex gap-1 mb-6 justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={`${
                              isFeatured
                                ? 'fill-primary-foreground text-primary-foreground'
                                : 'fill-primary text-primary'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <p
                        className={`text-center text-base md:text-lg mb-8 leading-relaxed font-sans ${
                          isFeatured ? 'text-primary-foreground' : 'text-foreground'
                        }`}
                      >
                        "{testimonial.content}"
                      </p>

                      {/* Author */}
                      <div className="flex flex-col items-center gap-3">
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center ${
                            isFeatured
                              ? 'bg-primary-foreground/20'
                              : 'bg-primary/20'
                          }`}
                        >
                          <span
                            className={`font-sans font-bold text-sm ${
                              isFeatured ? 'text-primary-foreground' : 'text-primary'
                            }`}
                          >
                            {testimonial.avatar}
                          </span>
                        </div>
                        <div className="text-center">
                          <p
                            className={`font-sans font-semibold ${
                              isFeatured ? 'text-primary-foreground' : 'text-foreground'
                            }`}
                          >
                            {testimonial.name}
                          </p>
                          <p
                            className={`text-sm font-sans ${
                              isFeatured ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}
                          >
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <motion.button
            onClick={handlePrev}
            className="w-12 h-12 bg-primary flex items-center justify-center rounded-sm"
            whileHover={{ scale: 1.1, backgroundColor: 'hsl(82, 100%, 70%)' }}
            whileTap={{ scale: 0.95 }}
            data-cursor="hover"
          >
            <ChevronLeft size={24} className="text-primary-foreground" />
          </motion.button>
          <motion.button
            onClick={handleNext}
            className="w-12 h-12 bg-primary flex items-center justify-center rounded-sm"
            whileHover={{ scale: 1.1, backgroundColor: 'hsl(82, 100%, 70%)' }}
            whileTap={{ scale: 0.95 }}
            data-cursor="hover"
          >
            <ChevronRight size={24} className="text-primary-foreground" />
          </motion.button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
              }`}
              data-cursor="hover"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
