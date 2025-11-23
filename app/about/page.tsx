'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { personalInfo } from '@/lib/data';
import LocationWidget from '@/components/LocationWidget';
import GitHubHeatmap from '@/components/GitHubHeatmap';
import styles from '@/styles/About.module.css';

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className={styles.about}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={styles.header}
        >
          <h1>
            About <span className="gradient-text">Me</span>
          </h1>
          <p className={styles.subtitle}>Get to know me better</p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.imageContainer}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.imageWrapper}>
              <div className={styles.profileImage}>
                <Image
                  src="/tusharphoto.jpeg"
                  alt="Tushar Mittal"
                  width={400}
                  height={400}
                  priority
                  className={styles.image}
                />
              </div>
              <div className={styles.imageDecor}></div>
            </div>
          </motion.div>

          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Hello, I&apos;m {personalInfo.name}</h2>
            <h3 className={styles.role}>{personalInfo.title}</h3>
            <p className={styles.bio}>{personalInfo.bio}</p>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Location:</span>
                <span className={styles.value}>{personalInfo.location}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Email:</span>
                <a href={`mailto:${personalInfo.email}`} className={styles.value}>
                  {personalInfo.email}
                </a>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Status:</span>
                <span className={`${styles.value} ${styles.available}`}>
                  {personalInfo.availability}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.highlights}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {[
            { number: '2', label: 'Years Experience' },
            { number: '10+', label: 'Projects Completed' },
            { number: '100%', label: 'Satisfaction Rate' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={styles.highlight}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="gradient-text">{item.number}</h3>
              <p>{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.interests}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2>What I Do</h2>
          <div className={styles.interestGrid}>
            {[
              {
                title: 'Web Development',
                description: 'Building responsive and performant web applications using modern frameworks and best practices.',
              },
              {
                title: 'Backend Development',
                description: 'Developing robust server-side applications and RESTful APIs with scalability in mind.',
              },
              {
                title: 'Problem Solving',
                description: 'Tackling complex challenges with creative solutions and efficient algorithms.',
              },
            ].map((interest, index) => (
              <motion.div
                key={index}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className={styles.widgetsSection}>
          <div className={styles.widgetGrid}>
            <LocationWidget
              city="Mumbai - 401303"
              country={personalInfo.location}
              latitude={19.4560}
              longitude={72.7925}
              timezone="Asia/Kolkata"
            />
          </div>
        </div>

        <GitHubHeatmap username={personalInfo.github} />
      </div>
    </section>
  );
}

