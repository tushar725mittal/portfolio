'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Mole {
  id: number;
  isVisible: boolean;
  wasHit: boolean;
}

interface WhackMoleGameProps {
  onGameEnd: (score: number) => void;
}

export default function WhackMoleGame({ onGameEnd }: WhackMoleGameProps) {
  const [moles, setMoles] = useState<Mole[]>(
    Array.from({ length: 9 }, (_, i) => ({ id: i, isVisible: false, wasHit: false }))
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [combo, setCombo] = useState(0);
  
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const timerRef = useRef<NodeJS.Timeout>();

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setCombo(0);
    setGameOver(false);
    setIsPlaying(true);
    setMoles(Array.from({ length: 9 }, (_, i) => ({ id: i, isVisible: false, wasHit: false })));
  };

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setGameOver(true);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => onGameEnd(score), 2000);
  }, [score, onGameEnd]);

  // Game timer
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, gameOver, endGame]);

  // Mole spawning logic
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const spawnMole = () => {
      setMoles(prevMoles => {
        const availableHoles = prevMoles
          .map((mole, index) => ({ ...mole, index }))
          .filter(mole => !mole.isVisible);

        if (availableHoles.length === 0) return prevMoles;

        const randomHole = availableHoles[Math.floor(Math.random() * availableHoles.length)];
        const newMoles = [...prevMoles];
        newMoles[randomHole.index] = { ...newMoles[randomHole.index], isVisible: true, wasHit: false };

        // Hide the mole after 1-2 seconds
        setTimeout(() => {
          setMoles(currentMoles => {
            const updatedMoles = [...currentMoles];
            if (!updatedMoles[randomHole.index].wasHit) {
              updatedMoles[randomHole.index].isVisible = false;
              setCombo(0); // Reset combo if mole wasn't hit
            }
            return updatedMoles;
          });
        }, Math.random() * 1000 + 800); // 0.8-1.8 seconds

        return newMoles;
      });
    };

    gameLoopRef.current = setInterval(spawnMole, Math.random() * 800 + 400); // 0.4-1.2 seconds

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, gameOver]);

  const hitMole = useCallback((moleId: number) => {
    if (!isPlaying || gameOver) return;

    setMoles(prevMoles => {
      const newMoles = [...prevMoles];
      const mole = newMoles[moleId];
      
      if (mole.isVisible && !mole.wasHit) {
        mole.wasHit = true;
        mole.isVisible = false;
        
        setCombo(prev => prev + 1);
        setScore(prev => {
          const basePoints = 10;
          const comboBonus = Math.floor(combo / 3) * 5; // Bonus every 3 hits
          return prev + basePoints + comboBonus;
        });
      }
      
      return newMoles;
    });
  }, [isPlaying, gameOver, combo]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '20px',
      height: '100%',
    }}>
      {/* Game Stats */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        width: '100%', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
      }}>
        <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
          Score: <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>{score}</span>
        </div>
        <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
          Time: <span style={{ fontWeight: 'bold', color: timeLeft < 10 ? '#ef4444' : 'var(--accent-color)' }}>
            {timeLeft}s
          </span>
        </div>
        {combo > 0 && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
            style={{ 
              color: '#10b981', 
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            Combo x{combo}! 🔥
          </motion.div>
        )}
        {!isPlaying && !gameOver && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            style={{
              background: 'var(--accent-color)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            }}
          >
            Start Whack-a-Mole 🔨
          </motion.button>
        )}
      </div>

      {/* Game Board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
        maxWidth: '400px',
        width: '100%',
        padding: '20px',
        background: 'var(--background-secondary)',
        borderRadius: '15px',
        border: '3px solid var(--accent-color)',
      }}>
        {moles.map((mole) => (
          <motion.div
            key={mole.id}
            style={{
              aspectRatio: '1',
              background: 'linear-gradient(145deg, #8B4513, #A0522D)',
              borderRadius: '50%',
              position: 'relative',
              cursor: mole.isVisible ? 'crosshair' : 'default',
              border: '3px solid #654321',
              overflow: 'hidden',
              boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.3)',
            }}
            onClick={() => hitMole(mole.id)}
          >
            {/* Hole depth effect */}
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              right: '20%',
              bottom: '20%',
              background: 'radial-gradient(circle, #2D1810 0%, #1A0F08 100%)',
              borderRadius: '50%',
            }} />

            {/* Mole */}
            <AnimatePresence>
              {mole.isVisible && (
                <motion.div
                  initial={{ y: '100%', scale: 0.8 }}
                  animate={{ y: '0%', scale: 1 }}
                  exit={{ y: '100%', scale: 0.8 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25,
                    duration: 0.3 
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '3rem',
                    zIndex: 2,
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [-5, 5, -5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🐱
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hit effect */}
            <AnimatePresence>
              {mole.wasHit && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '2rem',
                    zIndex: 3,
                  }}
                >
                  💥
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Game Over */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              textAlign: 'center',
              background: 'var(--card-background)',
              padding: '20px',
              borderRadius: '15px',
              border: '2px solid var(--accent-color)',
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: '2rem', marginBottom: '10px' }}
            >
              🎯
            </motion.div>
            <h3 style={{ margin: '10px 0', color: 'var(--text-primary)' }}>
              Game Over!
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: '10px 0' }}>
              You whacked your way to {score} points!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!isPlaying && !gameOver && (
        <div style={{ 
          textAlign: 'center', 
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          lineHeight: 1.4,
        }}>
          <p>🔨 Click on the cats as they pop up!</p>
          <p>⚡ Build combos for bonus points!</p>
          <p>⏱️ You have 30 seconds - be quick!</p>
        </div>
      )}
    </div>
  );
}
