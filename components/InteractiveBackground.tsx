'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/InteractiveBackground.module.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 80;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
    }));

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get theme
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const particleColor = isDark ? 'rgba(129, 140, 248, 0.3)' : 'rgba(99, 102, 241, 0.2)';
      const lineColor = isDark ? 'rgba(129, 140, 248, 0.1)' : 'rgba(99, 102, 241, 0.08)';

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction - attract particles
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.02;
          particle.vy += (dy / distance) * force * 0.02;
        }

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Draw connections to nearby particles
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 - distance / 120;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted, mousePos.x, mousePos.y]);

  if (!mounted) return null;

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
      
      {/* Floating gradient orbs */}
      <div className={styles.orbs}>
        {/* Top left orb */}
        <motion.div
          className={styles.orb}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
            left: '10%',
            top: '10%',
          }}
        />
        {/* Top right orb */}
        <motion.div
          className={styles.orb}
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, transparent 70%)',
            right: '10%',
            top: '20%',
          }}
        />
        {/* Center orb */}
        <motion.div
          className={styles.orb}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
            left: '50%',
            top: '40%',
          }}
        />
        {/* Bottom left orb */}
        <motion.div
          className={styles.orb}
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, transparent 70%)',
            left: '20%',
            bottom: '20%',
          }}
        />
        {/* Bottom right orb */}
        <motion.div
          className={styles.orb}
          animate={{
            x: [0, 70, 0],
            y: [0, -70, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.14) 0%, transparent 70%)',
            right: '15%',
            bottom: '15%',
          }}
        />
      </div>

      {/* Mouse follower glow */}
      <motion.div
        className={styles.mouseGlow}
        animate={{
          x: mousePos.x - 150,
          y: mousePos.y - 150,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
        }}
      />
    </>
  );
}

