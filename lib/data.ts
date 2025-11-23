import { Project, Experience, Skill, BlogPost, SocialLink, Education, Certification } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Compass Starter',
    description: 'A comprehensive starter template for Contentstack projects with modern architecture and best practices.',
    longDescription: 'Built with Next.js and Contentstack CMS. Features include content modeling, live preview, and optimized performance for headless CMS implementations. Includes TypeScript support, responsive design, and SEO optimization.',
    image: '/projects/compass-starter.jpg',
    tags: ['Next.js', 'Contentstack', 'TypeScript'],
    liveUrl: 'https://compass-starter.contentstackapps.com',
    githubUrl: 'https://github.com/tushar725mittal',
    featured: true,
  },
  {
    id: '2',
    title: 'RedPanda Commerce',
    description: 'Modern e-commerce platform built with cutting-edge web technologies for seamless shopping experience.',
    longDescription: 'Full-featured e-commerce solution with product management, cart functionality, payment integration, and admin dashboard. Built with focus on performance and user experience.',
    image: '/projects/redpanda-commerce.jpg',
    tags: ['Next.js', 'Node.js', 'Supabase', 'PostgreSQL', 'AWS Lambda'],
    liveUrl: 'https://www.redpanda-commerce.com',
    githubUrl: 'https://github.com/tushar725mittal',
    featured: true,
  },
  {
    id: '3',
    title: 'Launchpad Startups',
    description: 'A platform designed to help startups launch, grow, and manage their ventures with essential tools and resources.',
    longDescription: 'Comprehensive startup management platform with features for tracking progress, managing team, and accessing resources. Includes pitch deck builder, investor tracking, and milestone management.',
    image: '/projects/launchpad.jpg',
    tags: ['React', 'Firebase', 'JavaScript', 'Startup Tools', 'Web App'],
    liveUrl: 'https://launchpad-startups.web.app/',
    githubUrl: 'https://github.com/tushar725mittal',
    featured: true,
  },
  {
    id: '4',
    title: 'PHD Tracker',
    description: 'A web application to track PhD research progress, manage publications, and organize academic milestones.',
    longDescription: 'Full-stack application built with modern web technologies for academic progress tracking and research management. Features include publication management, citation tracking, and research timeline visualization.',
    image: '/projects/phd-tracker.jpg',
    tags: ['React', 'Firebase', 'JavaScript', 'Academic', 'Web App'],
    liveUrl: 'https://phd-tracker.web.app/',
    githubUrl: 'https://github.com/tushar725mittal',
    featured: true,
  },
  {
    id: '5',
    title: 'Portfolio Website',
    description: 'Personal portfolio website showcasing projects, skills, and professional experience with modern design.',
    longDescription: 'Interactive portfolio built with Next.js featuring animated transitions, dark mode, interactive games, and responsive design. Showcases full-stack development capabilities and modern web technologies.',
    image: '/projects/portfolio.jpg',
    tags: ['Next.js', 'TypeScript', 'Framer Motion'],
    liveUrl: 'https://tushar-mittal.contentstackapps.com/',
    githubUrl: 'https://github.com/tushar725mittal',
  },
];

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Contentstack',
    position: 'Associate Software Developer',
    startDate: '2024-07',
    endDate: 'Present',
    location: 'Mumbai, India',
    description: [
      'Solely responsible for the end-to-end development of a new in-house Commerce platform (PIMS), designing the ERD, database architecture, and fullstack implementation. The platform is projected to be used by 50 Solutions Engineers worldwide.',
      'Engineered high impact POCs for major enterprise customers (e.g., United Airlines, Vuori), showcasing unique product applications and directly contributing to the finalization of 4 deals.',
      'Built and deployed solutions to seamlessly link newly acquired Lytics services with the core Contentstack CMS, successfully securing data of over 15,000 visitors in a month and enhancing platform functionality.',
    ],
  },
  {
    id: '2',
    company: 'Contentstack',
    position: 'Associate Software Developer Intern',
    startDate: '2024-01',
    endDate: '2024-07',
    location: 'Mumbai, India',
    description: [
      'Passionate about startup culture and leading from the front, spearheaded a 9-member team to deliver a modular event website using Next.js and Headless CMS.',
      'Working on in production projects with a team of Developers and QAs following a proper Software Development Lifecycle. Creating POCs for various customers demonstrating the capabilities of the product. Development of 3 in-house tools.',
      'Contributed to the development and independently owned the integration of 4 flagship features — Visual Builder, Timeline Preview, Lytics CDP, and Personalize by identifying key use cases and seamlessly implementing them across React, Next.js, and Vue.js.',
      'Actively contributed to Compass, Contentstack’s flagship demo platform and customer entry point, which serves as the 1st launchpad for all new features, setting the standard for platform best practices.',
      'Led a team of 3 to develop the official BayFC fan club website, ensuring brand alignment and high performance across devices',
    ],
  },
];

export const skills: Skill[] = [
  // Frontend
  { id: '1', name: 'React', icon: 'SiReact', category: 'Frontend', level: 95 },
  { id: '2', name: 'Next.js', icon: 'SiNextdotjs', category: 'Frontend', level: 90 },
  { id: '3', name: 'TypeScript', icon: 'SiTypescript', category: 'Frontend', level: 90 },
  { id: '4', name: 'JavaScript', icon: 'SiJavascript', category: 'Frontend', level: 95 },
  { id: '5', name: 'Vue.js', icon: 'SiVuedotjs', category: 'Frontend', level: 80 },
  { id: '6', name: 'HTML5', icon: 'SiHtml5', category: 'Frontend', level: 95 },
  { id: '7', name: 'CSS3', icon: 'SiCss3', category: 'Frontend', level: 95 },
  { id: '8', name: 'Tailwind CSS', icon: 'SiTailwindcss', category: 'Frontend', level: 90 },

  // Backend
  { id: '9', name: 'Node.js', icon: 'SiNodedotjs', category: 'Backend', level: 85 },
  { id: '10', name: 'Express', icon: 'SiExpress', category: 'Backend', level: 85 },
  { id: '11', name: 'Python', icon: 'SiPython', category: 'Backend', level: 75 },
  { id: '12', name: 'PostgreSQL', icon: 'SiPostgresql', category: 'Backend', level: 80 },
  { id: '13', name: 'MongoDB', icon: 'SiMongodb', category: 'Backend', level: 85 },
  { id: '14', name: 'Firebase', icon: 'SiFirebase', category: 'Backend', level: 80 },
  { id: '15', name: 'GraphQL', icon: 'SiGraphql', category: 'Backend', level: 75 },

  // Tools
  { id: '16', name: 'Git', icon: 'SiGit', category: 'Tools', level: 90 },
  { id: '17', name: 'Docker', icon: 'SiDocker', category: 'Tools', level: 75 },
  { id: '18', name: 'AWS', icon: 'SiAws', category: 'Tools', level: 70 },
  { id: '19', name: 'Vercel', icon: 'SiVercel', category: 'Tools', level: 85 },
  { id: '20', name: 'Figma', icon: 'SiFigma', category: 'Tools', level: 80 },
  { id: '21', name: 'VS Code', icon: 'SiVscode', category: 'Tools', level: 95 },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 14',
    description: 'A comprehensive guide to building modern web applications with Next.js 14 and the new App Router.',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['Next.js', 'React', 'Web Development'],
    coverImage: '/blog/nextjs-guide.jpg',
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for 2024',
    description: 'Learn the latest TypeScript best practices and patterns to write better, more maintainable code.',
    date: '2024-01-10',
    readTime: '10 min read',
    tags: ['TypeScript', 'Best Practices', 'JavaScript'],
    coverImage: '/blog/typescript.jpg',
  },
  {
    slug: 'css-animations-guide',
    title: 'Mastering CSS Animations',
    description: 'Create stunning animations and transitions using modern CSS techniques and best practices.',
    date: '2024-01-05',
    readTime: '12 min read',
    tags: ['CSS', 'Animations', 'Web Design'],
    coverImage: '/blog/css-animations.jpg',
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: '1',
    name: 'GitHub',
    url: 'https://github.com/tushar725mittal',
    icon: 'FaGithub',
  },
  {
    id: '2',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tushar725mittal/',
    icon: 'FaLinkedin',
  },
  {
    id: '3',
    name: 'Portfolio',
    url: 'https://tushar-mittal.contentstackapps.com/',
    icon: 'FaGlobe',
  },
  {
    id: '4',
    name: 'Email',
    url: 'mailto:tushar725mittal@gmail.com',
    icon: 'FaEnvelope',
  },
];

export const personalInfo = {
  name: 'Tushar Mittal',
  title: 'Full Stack Developer',
  bio: 'Passionate fullstack developer with expertise in building modern web applications. Specialized in React, Next.js, Node.js, and Contentstack. Love creating elegant solutions to complex problems and delivering high quality user experiences. With a strong foundation in both frontend and backend technologies, I focus on building scalable, performant, and user-friendly applications.',
  email: 'tushar725mittal@gmail.com',
  location: 'India',
  city: 'Mumbai - 401303',
  availability: 'Available for new opportunities',
  github: 'tushar725mittal',
  linkedin: 'tushar725mittal',
};

export const education: Education[] = [
  {
    id: '1',
    degree: 'Bachelor of Technology',
    field: 'Computer Science & Engineering',
    institution: 'MIT World Peace University',
    location: 'Pune, India',
    startDate: '2020-07',
    endDate: '2024-05',
    gpa: '9.7/10',
    description: 'Focused on software engineering, web development, and data structures & algorithms.',
  },
  {
    id: '2',
    degree: '12th',
    field: 'CSBE',
    school: 'Apex Internation School, Jaipur',
    location: 'Jaipur, India',
    year: '2019',
    percentage: '89.90%',
  },
  {
    id: '3',
    degree: '10th',
    field: 'CBSE',
    school: 'St. Xavier\'s School, Jaipur',
    location: 'Jaipur, India',
    year: '2017',
    gpa: '10/10',
  }
];

export const certifications: Certification[] = [
  // {
  //   id: '1',
  //   name: 'AWS Certified Developer',
  //   issuer: 'Amazon Web Services',
  //   date: '2023-06',
  //   description: 'Certification in AWS cloud services and serverless architecture',
  // },
  // {
  //   id: '2',
  //   name: 'React Professional Certificate',
  //   issuer: 'Meta',
  //   date: '2022-11',
  //   description: 'Advanced React patterns and best practices',
  // },
];

