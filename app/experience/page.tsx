'use client';

import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { experiences } from '@/lib/data';
import styles from '@/styles/Experience.module.css';

export default function Experience() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const formatDate = (dateString: string) => {
    if (dateString === 'Present') return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section className={styles.experience}>
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className={styles.header}
        >
          <h1>
            Work <span className="gradient-text">Experience</span>
          </h1>
          <p className={styles.subtitle}>My professional journey</p>
        </motion.div>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={styles.timelineMarker}>
                <motion.div
                  className={styles.markerDot}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaBriefcase />
                </motion.div>
              </div>

              <motion.div
                className={styles.timelineContent}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.timelineHeader}>
                  <div>
                    <h3 className={styles.position}>{exp.position}</h3>
                    <h4 className={styles.company}>{exp.company}</h4>
                  </div>
                  <div className={styles.logoPlaceholder}>
                    {exp.company.charAt(0)}
                  </div>
                </div>

                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <FaCalendarAlt />
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                  {exp.location && (
                    <span className={styles.metaItem}>
                      <FaMapMarkerAlt />
                      {exp.location}
                    </span>
                  )}
                </div>

                <ul className={styles.responsibilities}>
                  {exp.description.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2>Excited for More Amazing Experiences Ahead!</h2>
          <p>This is just the beginning. Excited to create more innovative solutions and contribute to groundbreaking projects. Let&apos;s connect!</p>
          <div className={styles.ctaButtons}>
            <a href="/contact" className="btn btn-primary">
              Let&apos;s Work Together
            </a>
            <a href="/projects" className="btn btn-outline">
              View My Projects
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

