'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaGlobe, FaEnvelope, FaHeart } from 'react-icons/fa';
import styles from '@/styles/Footer.module.css';

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/tushar725mittal', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/tushar725mittal/', label: 'LinkedIn' },
  { icon: FaGlobe, href: 'https://tushar-mittal.contentstackapps.com/', label: 'Portfolio' },
  { icon: FaEnvelope, href: 'mailto:tushar725mittal@gmail.com', label: 'Email' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>Let&apos;s Connect</h3>
            <p className={styles.description}>
              Feel free to reach out for collaborations or just a friendly hello
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  <link.icon />
                </motion.a>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>Quick Links</h3>
            <ul className={styles.links}>
              <li><a href="/about">About</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/resume">Resume</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>Get in Touch</h3>
            <p className={styles.contactInfo}>
              <a href="mailto:tushar725mittal@gmail.com">tushar725mittal@gmail.com</a>
            </p>
            <p className={styles.contactInfo}>India</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Tushar Mittal. Made with <FaHeart className={styles.heart} /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}

