'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/NextPagePointer.module.css';

const navOrder = [
  { path: '/', label: 'Home', next: '/about', nextLabel: 'About' },
  { path: '/about', label: 'About', next: '/skills', nextLabel: 'Skills' },
  { path: '/skills', label: 'Skills', next: '/projects', nextLabel: 'Projects' },
  { path: '/projects', label: 'Projects', next: '/experience', nextLabel: 'Experience' },
  { path: '/experience', label: 'Experience', next: '/resume', nextLabel: 'Resume' },
  { path: '/resume', label: 'Resume', next: '/contact', nextLabel: 'Contact' },
  { path: '/contact', label: 'Contact', next: '/', nextLabel: 'Home' }, // Loop back to home or null
];

export default function NextPagePointer() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  
  const currentPage = navOrder.find(p => p.path === pathname);
  
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll position
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const footerHeight = 300; // Approximate footer height
      
      // Show when near bottom
      // We want it to appear when user has scrolled through most content
      // and keep it visible even when they reach the footer
      const nearBottom = scrollPosition > documentHeight - footerHeight - 400;
      
      if (nearBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!currentPage || !currentPage.next) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={styles.container}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          <Link href={currentPage.next} className={styles.link}>
            <div className={styles.catWrapper}>
              <Image
                src="/cat-pointing.gif"
                alt="Next Page"
                width={100}
                height={100}
                className={styles.catImage}
                unoptimized // Since it's a GIF
              />
            </div>
            <div className={styles.message}>
              <span>Next:</span>
              <strong>{currentPage.nextLabel}</strong>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

