'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import styles from '@/styles/Hero.module.css';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.gradient}></div>
        {mounted && [...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.greeting} variants={itemVariants}>
          Hi, I'm
        </motion.div>

        <motion.h1 className={styles.name} variants={itemVariants}>
          <span className="gradient-text">Tushar Mittal</span>
        </motion.h1>

        <motion.h2 className={styles.title} variants={itemVariants}>
          Full Stack Developer
        </motion.h2>

        <motion.p className={styles.description} variants={itemVariants}>
          I build exceptional digital experiences that live on the web.
          Passionate about creating elegant solutions to complex problems.
        </motion.p>

        <motion.div className={styles.buttons} variants={itemVariants}>
          <Link href="/projects" className="btn btn-primary">
            View My Work
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Get In Touch
          </Link>
        </motion.div>

        <motion.div className={styles.social} variants={itemVariants}>
          <motion.a
            href="https://github.com/tushar725mittal"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className={styles.socialIcon}
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/tushar725mittal/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className={styles.socialIcon}
          >
            <FaLinkedin />
          </motion.a>
        </motion.div>

{/* Removed useless scroll indicator since home page only has Hero section */}
      </motion.div>
    </section>
  );
}

