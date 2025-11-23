'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import Image from 'next/image';
import styles from '@/styles/InteractiveCat.module.css';

export default function InteractiveCat() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(false);
  const [catState, setCatState] = useState<'sitting' | 'playing' | 'chasing'>('sitting');
  const [chasingEndTime, setChasingEndTime] = useState(0);
  
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef(Date.now());
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const velocity = useRef<number>(0);

  const catX = useSpring(0, { stiffness: 150, damping: 25, mass: 0.5 });
  const catY = useSpring(0, { stiffness: 150, damping: 25, mass: 0.5 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastMoveTime.current;
      
      // Calculate velocity
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      velocity.current = timeDiff > 0 ? distance / timeDiff : 0;

      setMousePos({ x: e.clientX, y: e.clientY });
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = currentTime;

      // Clear idle timer
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }

      // Check if moving fast (velocity > 1.2) - lowered threshold for more responsiveness
      if (velocity.current > 1.2) {
        setIsIdle(false);
        setCatState('chasing');
        setChasingEndTime(currentTime + 500); // Show running cat for at least 0.5 seconds
      } else if (!isIdle && currentTime > chasingEndTime) {
        setCatState('sitting');
      }

      // Set new idle timer
      idleTimer.current = setTimeout(() => {
        setIsIdle(true);
        setCatState('playing');
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
    };
  }, [mounted, chasingEndTime, isIdle]);

  // Update cat position
  useEffect(() => {
    if (!mounted) return;

    if (catState === 'chasing') {
      // Chase directly towards mouse
      catX.set(mousePos.x - 30);
      catY.set(mousePos.y - 30);
    } else if (catState === 'playing') {
      // Circle around the idle mouse
      const angle = (Date.now() / 1000) % (Math.PI * 2);
      const radius = 80;
      catX.set(mousePos.x + Math.cos(angle) * radius - 30);
      catY.set(mousePos.y + Math.sin(angle) * radius - 30);
    } else {
      // Sit at a distance from mouse
      const dx = mousePos.x - catX.get();
      const dy = mousePos.y - catY.get();
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 200) {
        // Move closer
        catX.set(catX.get() + dx * 0.02);
        catY.set(catY.get() + dy * 0.02);
      } else if (distance < 150) {
        // Move away
        catX.set(catX.get() - dx * 0.01);
        catY.set(catY.get() - dy * 0.01);
      }
    }
  }, [mousePos, catState, mounted, catX, catY, chasingEndTime, isIdle]);

  // Animation loop for playing state - using requestAnimationFrame for smoother animation
  useEffect(() => {
    if (catState !== 'playing') return;

    let frameId: number;
    const animate = () => {
      const angle = (Date.now() / 1000) % (Math.PI * 2);
      const radius = 80;
      catX.set(mousePos.x + Math.cos(angle) * radius - 30);
      catY.set(mousePos.y + Math.sin(angle) * radius - 30);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [catState, mousePos, catX, catY]);

  if (!mounted) return null;

  return (
    <motion.div
      className={styles.cat}
      style={{
        x: catX,
        y: catY,
      }}
    >
      <motion.div
        className={styles.catBody}
        animate={{
          scale: catState === 'chasing' ? [1, 1.1, 1] : 1,
          rotate: catState === 'playing' ? [0, 5, 0, -5, 0] : 0,
        }}
        transition={{
          duration: catState === 'chasing' ? 0.4 : 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Real Cat GIF */}
        <motion.div
          className={styles.catGif}
          animate={{
            scaleX: catState === 'chasing' ? [-1, -1.1, -1] : -1,
            rotateZ: catState === 'playing' ? [0, 5, 0, -5, 0] : 0,
          }}
          transition={{
            scaleX: { duration: 0.3, repeat: catState === 'chasing' ? Infinity : 0 },
            rotateZ: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <Image 
            src={catState === 'chasing' ? '/cat_running.gif' : '/cat.gif'}
            alt={catState === 'chasing' ? 'Running cat' : 'Cat'}
            width={70}
            height={56}
            className={styles.catImage}
            draggable={false}
            unoptimized={true}
          />
        </motion.div>

        {/* Speed lines when chasing */}
        {catState === 'chasing' && (
          <div className={styles.speedLines}>
            <motion.div 
              className={styles.speedLine}
              animate={{ x: [-15, -40], opacity: [0.8, 0] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            ></motion.div>
            <motion.div 
              className={styles.speedLine}
              animate={{ x: [-15, -40], opacity: [0.8, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, delay: 0.07 }}
            ></motion.div>
            <motion.div 
              className={styles.speedLine}
              animate={{ x: [-15, -40], opacity: [0.8, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, delay: 0.14 }}
            ></motion.div>
          </div>
        )}

        {/* Heart eyes when playing */}
        {catState === 'playing' && (
          <motion.div
            className={styles.heartEyes}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
            }}
          >
            💕
          </motion.div>
        )}
      </motion.div>

      {/* Paw prints trail when chasing */}
      {catState === 'chasing' && (
        <motion.div
          className={styles.pawPrint}
          initial={{ opacity: 1, scale: 0.5 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.pawMain}></div>
          <div className={styles.pawToe1}></div>
          <div className={styles.pawToe2}></div>
          <div className={styles.pawToe3}></div>
        </motion.div>
      )}

      {/* Playful sparkles when playing */}
      {catState === 'playing' && (
        <>
          <motion.div
            className={styles.sparkle}
            style={{ top: -10, left: -10 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0,
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className={styles.sparkle}
            style={{ top: -10, right: -10 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            ✨
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

