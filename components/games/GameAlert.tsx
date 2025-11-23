'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GameAlertProps {
  isVisible: boolean;
  title: string;
  message: string;
  type?: 'error' | 'warning' | 'info' | 'success';
  emoji?: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function GameAlert({
  isVisible,
  title,
  message,
  type = 'error',
  emoji,
  onClose,
  autoClose = true,
  duration = 3000,
}: GameAlertProps) {
  
  // Auto close functionality
  React.useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: '#ef4444',
          iconColor: '#ef4444',
          defaultEmoji: '⚠️',
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderColor: '#f59e0b',
          iconColor: '#f59e0b',
          defaultEmoji: '⚡',
        };
      case 'success':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: '#10b981',
          iconColor: '#10b981',
          defaultEmoji: '✅',
        };
      case 'info':
      default:
        return {
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderColor: 'var(--accent-color)',
          iconColor: 'var(--accent-color)',
          defaultEmoji: 'ℹ️',
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10001, // Higher than game modal
            backdropFilter: 'blur(4px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.7, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.7, y: 50, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.4 
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--card-background)',
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center',
              border: `3px solid ${typeStyles.borderColor}`,
              boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${typeStyles.borderColor}`,
              position: 'relative',
              ...typeStyles.backgroundColor && { backgroundColor: typeStyles.backgroundColor },
            }}
          >
            {/* Animated Icon */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: type === 'error' ? [0, -10, 10, 0] : [0, 5, -5, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: 2,
                ease: "easeInOut",
              }}
              style={{
                fontSize: '3rem',
                marginBottom: '15px',
              }}
            >
              {emoji || typeStyles.defaultEmoji}
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                margin: '0 0 10px 0',
                color: typeStyles.iconColor,
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              {title}
            </motion.h3>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                margin: '0 0 20px 0',
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.5,
              }}
            >
              {message}
            </motion.p>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              style={{
                background: typeStyles.iconColor,
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                boxShadow: `0 4px 12px ${typeStyles.iconColor}33`,
              }}
            >
              Got it! 👍
            </motion.button>

            {/* Auto-close progress bar */}
            {autoClose && (
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '3px',
                  backgroundColor: typeStyles.iconColor,
                  borderRadius: '0 0 20px 20px',
                  opacity: 0.6,
                }}
              />
            )}

            {/* Decorative particles */}
            <motion.div
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                fontSize: '1rem',
              }}
            >
              ✨
            </motion.div>

            <motion.div
              animate={{
                scale: [0, 1, 0],
                rotate: [0, -180, -360],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{
                position: 'absolute',
                bottom: '15px',
                left: '15px',
                fontSize: '0.8rem',
              }}
            >
              💫
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
