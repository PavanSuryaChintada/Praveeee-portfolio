import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Brand Identity - TechFlow',
    description: 'Complete brand redesign with logo, guidelines, and collateral',
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop',
    tags: ['Logo', 'Branding', 'UI/UX'],
    github: '#',
    live: '#',
  },
  {
    id: 2,
    title: 'Festival Poster Series',
    description: 'Eye-catching poster designs for music festivals',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    tags: ['Poster', 'Print', 'Illustration'],
    github: '#',
    live: '#',
  },
  {
    id: 3,
    title: 'SaaS Dashboard UI',
    description: 'Modern analytics dashboard with dark theme',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['UI/UX', 'Dashboard', 'Figma'],
    github: '#',
    live: '#',
  },
  {
    id: 4,
    title: 'Luxury Brand Logo',
    description: 'Minimalist logo design for fashion brand',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    tags: ['Logo', 'Branding', 'Minimalist'],
    github: '#',
    live: '#',
  },
  {
    id: 5,
    title: 'Mobile App Design',
    description: 'Complete UI kit for fitness tracking app',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    tags: ['UI/UX', 'Mobile', 'Figma'],
    github: '#',
    live: '#',
  },
  {
    id: 6,
    title: 'Event Branding Package',
    description: 'Holistic event identity with merchandise designs',
    image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&h=600&fit=crop',
    tags: ['Branding', 'Poster', 'Print'],
    github: '#',
    live: '#',
  },
];

const allTags = ['All', ...new Set(projects.flatMap((p) => p.tags))];

const ProjectGallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="projects" className="py-20 px-6 relative bg-background">
      {/* Top glowing border accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary)) 50%, transparent)',
          boxShadow: '0 0 20px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--primary) / 0.3)',
        }}
      />
      <div 
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--primary) / 0.05), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-mono font-bold text-center mb-12"
          style={{
            background: 'linear-gradient(to bottom, #C0C0C0, #666666)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Featured Projects
        </motion.h2>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-sans font-medium whitespace-nowrap transition-all ${
                activeFilter === tag
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
              data-cursor="hover"
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: typeof projects[0];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group bg-card rounded-2xl border border-border overflow-hidden card-hover hover:border-t-primary"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Glassmorphism overlay with title */}
        <motion.div
          className="absolute inset-0 glassmorphism flex flex-col items-center justify-center gap-4 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-2xl font-sans font-bold text-foreground text-center">
            {project.title}
          </h4>
          <div className="flex gap-4">
            <motion.a
              href={project.github}
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-sans font-medium text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="hover"
            >
              View Details
            </motion.a>
            <motion.a
              href={project.live}
              className="p-2 rounded-full border border-primary text-primary"
              whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary))' }}
              whileTap={{ scale: 0.9 }}
              data-cursor="hover"
            >
              <ExternalLink size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectGallery;
