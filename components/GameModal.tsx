'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import SnakeGame from './games/SnakeGame';
import MemoryGame from './games/MemoryGame';
import WhackMoleGame from './games/WhackMoleGame';
import ReactionGame from './games/ReactionGame';
import TypingGame from './games/TypingGame';

type GameType = 'snake' | 'memory' | 'whack-mole' | 'reaction' | 'typing';

interface GameModalProps {
  gameType: GameType;
  onClose: () => void;
}

export default function GameModal({ gameType, onClose }: GameModalProps) {
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);

  const gameComponents = {
    snake: SnakeGame,
    memory: MemoryGame,
    'whack-mole': WhackMoleGame,
    reaction: ReactionGame,
    typing: TypingGame,
  };

  const gameEmojis = {
    snake: '🐍',
    memory: '🧠',
    'whack-mole': '🔨',
    reaction: '⚡',
    typing: '⌨️',
  };

  const gameTitles = {
    snake: 'Snake Game',
    memory: 'Memory Match',
    'whack-mole': 'Whack-a-Mole',
    reaction: 'Reaction Test',
    typing: 'Speed Typing',
  };

  const GameComponent = gameComponents[gameType];

  const handleGameEnd = (finalScore: number) => {
    setScore(finalScore);
    setIsGameActive(false);
  };

  const handlePlayAgain = () => {
    setScore(0);
    setIsGameActive(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="game-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        backdropFilter: 'blur(5px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 50 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--card-background)',
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '600px',
          maxHeight: '80vh',
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 3px var(--accent-color)',
          border: '3px solid var(--accent-color)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            zIndex: 1,
          }}
        >
          ×
        </motion.button>

        {/* Game Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            style={{ fontSize: '3rem', marginBottom: '10px' }}
          >
            {gameEmojis[gameType]}
          </motion.div>
          <h2 style={{ 
            margin: '0 0 10px 0', 
            color: 'var(--text-primary)',
            fontSize: '1.8rem'
          }}>
            {gameTitles[gameType]}
          </h2>
          {score > 0 && !isGameActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                background: 'var(--accent-color)',
                color: 'white',
                padding: '5px 15px',
                borderRadius: '20px',
                display: 'inline-block',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              Final Score: {score}
            </motion.div>
          )}
        </div>

        {/* Game Container */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '400px',
          position: 'relative'
        }}>
          {isGameActive ? (
            <GameComponent onGameEnd={handleGameEnd} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                textAlign: 'center',
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ fontSize: '4rem', marginBottom: '20px' }}
              >
                🎉
              </motion.div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>
                Great Job!
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '25px' }}>
                You scored {score} points! Want to try again?
              </p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayAgain}
                  style={{
                    background: 'var(--accent-color)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  }}
                >
                  Play Again 🎮
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  style={{
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '2px solid var(--text-secondary)',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{
            x: [0, 10, 0],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            opacity: 0.3,
            fontSize: '1.5rem',
          }}
        >
          ✨
        </motion.div>
        <motion.div
          animate={{
            x: [0, -8, 0],
            y: [0, 8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            opacity: 0.3,
            fontSize: '1.2rem',
          }}
        >
          🎯
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
