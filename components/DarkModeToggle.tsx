'use client';

import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';
import styles from '@/styles/DarkModeToggle.module.css';

export default function DarkModeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={styles.toggle} style={{ opacity: 0.5 }}>
        <FaMoon />
      </div>
    );
  }

  return (
    <motion.button
      className={styles.toggle}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </motion.div>
    </motion.button>
  );
}

