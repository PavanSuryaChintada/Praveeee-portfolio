// Mock data for development when Supabase is not available
export const mockProjects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'A sample project description',
    image_url: '/project-placeholder.jpg',
    tags: ['React', 'TypeScript'],
    github_url: '#',
    demo_url: '#',
    created_at: new Date().toISOString()
  },
  // Add more mock projects as needed
];

export const mockExperience = [
  {
    id: 1,
    role: 'Full Stack Developer',
    company: 'Your Company',
    period: '2023 - Present',
    description: 'Worked on amazing projects',
    skills: ['React', 'Node.js', 'TypeScript'],
    logo: '/company-logo-placeholder.png'
  },
  // Add more experience items as needed
];

export const mockSkills = [
  {
    id: 1,
    name: 'React',
    level: 90,
    category: 'Frontend',
    icon: 'react'
  },
  {
    id: 2,
    name: 'TypeScript',
    level: 85,
    category: 'Frontend',
    icon: 'typescript'
  },
  // Add more skills as needed
];

export const mockTestimonials = [
  {
    id: 1,
    name: 'Client Name',
    role: 'CEO, Company',
    content: 'Great work!',
    avatar: '/avatar-placeholder.jpg',
    rating: 5
  },
  // Add more testimonials as needed
];
