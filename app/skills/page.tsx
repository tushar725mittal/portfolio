'use client';

import { motion } from 'framer-motion';
import { skills } from '@/lib/data';
import * as SimpleIcons from 'react-icons/si';
import styles from '@/styles/Skills.module.css';

type IconName = keyof typeof SimpleIcons;

export default function Skills() {
  const categories = ['Frontend', 'Backend', 'Tools'] as const;

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const getIcon = (iconName: string) => {
    const Icon = SimpleIcons[iconName as IconName];
    return Icon ? <Icon /> : null;
  };

  return (
    <section className={styles.skills}>
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className={styles.header}
        >
          <h1>
            My <span className="gradient-text">Skills</span>
          </h1>
          <p className={styles.subtitle}>
            Technologies and tools I work with
          </p>
        </motion.div>

        {categories.map((category) => {
          const categorySkills = skills.filter((skill) => skill.category === category);
          
          return (
            <motion.div
              key={category}
              className={styles.category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <motion.h2
                variants={fadeInUp}
                className={styles.categoryTitle}
              >
                {category}
              </motion.h2>
              
              <div className={styles.skillGrid}>
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    className={styles.skillCard}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.4 },
                      },
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className={styles.skillIcon}>
                      {getIcon(skill.icon)}
                    </div>
                    <h3 className={styles.skillName}>{skill.name}</h3>
                    {skill.level && (
                      <div className={styles.skillLevel}>
                        <div className={styles.levelBar}>
                          <motion.div
                            className={styles.levelFill}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                        <span className={styles.levelText}>{skill.level}%</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

        <motion.div
          className={styles.cta}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2>Let&apos;s Work Together</h2>
          <p>I&apos;m always interested in hearing about new projects and opportunities.</p>
          <a href="/contact" className="btn btn-primary">
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}

