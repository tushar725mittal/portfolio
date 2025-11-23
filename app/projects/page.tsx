'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '@/lib/data';
import { Project } from '@/types';
import styles from '@/styles/Projects.module.css';

const ProjectCard = ({ project, hoveredProject, setHoveredProject }: { project: Project, hoveredProject: string | null, setHoveredProject: (id: string | null) => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={styles.projectCard}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setHoveredProject(project.id)}
      onHoverEnd={() => setHoveredProject(null)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className={styles.imageContainer}>
        <div className={styles.imagePlaceholder}>
          <span>{project.title}</span>
        </div>
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{
            opacity: hoveredProject === project.id ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.links}>
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaExternalLinkAlt />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>

      <div className={styles.content}>
        {project.featured && (
          <span className={styles.badge}>Featured</span>
        )}
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [filter, setFilter] = useState<string>('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.tags.includes(filter));

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className={styles.projects}>
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className={styles.header}
        >
          <h1>
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className={styles.subtitle}>
            A collection of projects I&apos;ve worked on
          </p>
        </motion.div>

        <motion.div
          className={styles.filters}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              className={`${styles.filterBtn} ${filter === tag ? styles.active : ''}`}
              onClick={() => setFilter(tag)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className={styles.grid}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                hoveredProject={hoveredProject} 
                setHoveredProject={setHoveredProject} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            className={styles.noResults}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No projects found with the selected filter.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
