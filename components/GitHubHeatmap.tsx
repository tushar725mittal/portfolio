'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import styles from '@/styles/GitHubHeatmap.module.css';

// Dynamic import to avoid SSR issues
import dynamic from 'next/dynamic';

const GitHubCalendar = dynamic(() => import('./GitHubCalendarWrapper'), {
  ssr: false,
});

interface GitHubHeatmapProps {
  username: string;
}

export default function GitHubHeatmap({ username }: GitHubHeatmapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <motion.div
      className={styles.githubHeatmap}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.header}>
        <FaGithub className={styles.icon} />
        <h3 className={styles.title}>GitHub Contributions</h3>
      </div>

      {mounted && (
        <div className={styles.calendarContainer}>
          <GitHubCalendar
            username={username}
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            fontSize={14}
            theme={colorTheme}
            style={{
              width: '100%',
            }}
          />
        </div>
      )}

      <div className={styles.footer}>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          View GitHub Profile →
        </a>
      </div>
    </motion.div>
  );
}

