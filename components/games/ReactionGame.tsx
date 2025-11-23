'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameAlert from './GameAlert';

interface ReactionGameProps {
  onGameEnd: (score: number) => void;
}

type GameState = 'waiting' | 'ready' | 'go' | 'clicked' | 'finished';

export default function ReactionGame({ onGameEnd }: ReactionGameProps) {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [averageTime, setAverageTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const maxRounds = 5;

  const startRound = useCallback(() => {
    setGameState('ready');
    setReactionTime(null);
    
    // Random delay between 1-4 seconds
    const delay = Math.random() * 3000 + 1000;
    
    timeoutRef.current = setTimeout(() => {
      setGameState('go');
      startTimeRef.current = Date.now();
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    if (gameState === 'ready') {
      // Clicked too early
      setGameState('waiting');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShowAlert(true);
      return;
    }
    
    if (gameState === 'go') {
      const endTime = Date.now();
      const reaction = endTime - startTimeRef.current;
      setReactionTime(reaction);
      setGameState('clicked');
      
      const newAttempts = [...attempts, reaction];
      setAttempts(newAttempts);
      
      // Update best time
      if (!bestTime || reaction < bestTime) {
        setBestTime(reaction);
      }
      
      if (currentRound + 1 >= maxRounds) {
        // Game finished
        const average = newAttempts.reduce((sum, time) => sum + time, 0) / newAttempts.length;
        setAverageTime(average);
        setGameState('finished');
        
        // Calculate score based on average reaction time (lower is better)
        const score = Math.max(0, Math.round((1000 - average) / 10));
        setTimeout(() => onGameEnd(score), 3000);
      } else {
        // Next round
        setTimeout(() => {
          setCurrentRound(prev => prev + 1);
          startRound();
        }, 2000);
      }
    }
  }, [gameState, attempts, bestTime, currentRound, onGameEnd, startRound]);

  const startGame = () => {
    setCurrentRound(0);
    setAttempts([]);
    setAverageTime(null);
    setBestTime(null);
    setReactionTime(null);
    startRound();
  };

  const resetGame = () => {
    setGameState('waiting');
    setCurrentRound(0);
    setAttempts([]);
    setAverageTime(null);
    setBestTime(null);
    setReactionTime(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getStateColor = () => {
    switch (gameState) {
      case 'ready': return '#ef4444'; // Red
      case 'go': return '#10b981'; // Green
      case 'clicked': return '#3b82f6'; // Blue
      default: return 'var(--accent-color)';
    }
  };

  const getStateText = () => {
    switch (gameState) {
      case 'waiting': return 'Click "Start Test" to begin';
      case 'ready': return 'Wait for GREEN...';
      case 'go': return 'CLICK NOW!';
      case 'clicked': return `${reactionTime}ms`;
      case 'finished': return 'Test Complete!';
      default: return '';
    }
  };

  const getPerformanceRating = (time: number) => {
    if (time < 200) return { rating: 'Lightning Fast! ⚡', color: '#10b981' };
    if (time < 250) return { rating: 'Excellent! 🎯', color: '#10b981' };
    if (time < 300) return { rating: 'Great! 👍', color: '#3b82f6' };
    if (time < 400) return { rating: 'Good 👌', color: '#f59e0b' };
    if (time < 500) return { rating: 'Average 😐', color: '#f59e0b' };
    return { rating: 'Try Again! 🐌', color: '#ef4444' };
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '20px',
      height: '100%',
      padding: '20px',
    }}>
      {/* Progress */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        width: '100%', 
        alignItems: 'center' 
      }}>
        <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
          Round: <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>
            {gameState === 'finished' ? maxRounds : currentRound + 1}
          </span> / {maxRounds}
        </div>
        {bestTime && (
          <div style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Best: <span style={{ fontWeight: 'bold', color: '#10b981' }}>{bestTime}ms</span>
          </div>
        )}
        {gameState === 'waiting' && (
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
            Start Reaction Test ⚡
          </motion.button>
        )}
      </div>

      {/* Main Game Area */}
      <motion.div
        animate={{ 
          backgroundColor: getStateColor(),
          scale: gameState === 'go' ? [1, 1.05, 1] : 1,
        }}
        transition={{ 
          backgroundColor: { duration: 0.3 },
          scale: { duration: 0.2, repeat: gameState === 'go' ? Infinity : 0 }
        }}
        onClick={handleClick}
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '200px',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: gameState === 'ready' || gameState === 'go' ? 'pointer' : 'default',
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          border: '3px solid white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{
            opacity: gameState === 'go' ? [1, 0.7, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            repeat: gameState === 'go' ? Infinity : 0,
          }}
        >
          {getStateText()}
        </motion.div>

        {/* Pulse effect for 'go' state */}
        {gameState === 'go' && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '3px solid white',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </motion.div>

      {/* Current Result */}
      <AnimatePresence>
        {gameState === 'clicked' && reactionTime && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              textAlign: 'center',
              background: 'var(--card-background)',
              padding: '15px',
              borderRadius: '10px',
              border: '2px solid var(--accent-color)',
            }}
          >
            <div style={{ 
              fontSize: '1.2rem', 
              color: getPerformanceRating(reactionTime).color,
              fontWeight: 'bold',
              marginBottom: '5px',
            }}>
              {getPerformanceRating(reactionTime).rating}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Results */}
      <AnimatePresence>
        {gameState === 'finished' && averageTime && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              textAlign: 'center',
              background: 'var(--card-background)',
              padding: '20px',
              borderRadius: '15px',
              border: '2px solid var(--accent-color)',
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: '2rem', marginBottom: '15px' }}
            >
              🏆
            </motion.div>
            <h3 style={{ margin: '10px 0', color: 'var(--text-primary)' }}>
              Final Results
            </h3>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
              <p style={{ margin: '5px 0' }}>
                Average: <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>
                  {Math.round(averageTime)}ms
                </span>
              </p>
              <p style={{ margin: '5px 0' }}>
                Best: <span style={{ fontWeight: 'bold', color: '#10b981' }}>
                  {bestTime}ms
                </span>
              </p>
            </div>
            <div style={{ 
              fontSize: '1.1rem', 
              color: getPerformanceRating(averageTime).color,
              fontWeight: 'bold',
            }}>
              {getPerformanceRating(averageTime).rating}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              style={{
                background: 'var(--accent-color)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                marginTop: '15px',
              }}
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {gameState === 'waiting' && (
        <div style={{ 
          textAlign: 'center', 
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          lineHeight: 1.4,
        }}>
          <p>⚡ Test your reaction time over 5 rounds</p>
          <p>🔴 Wait for RED to turn GREEN</p>
          <p>🎯 Click as fast as you can when it turns GREEN!</p>
          <p>⚠️ Don't click early or you'll restart!</p>
        </div>
      )}

      {/* Custom Alert Modal */}
      <GameAlert
        isVisible={showAlert}
        title="Too Early!"
        message="Wait for the signal to turn GREEN before clicking. Take a deep breath and try again!"
        type="warning"
        emoji="⚡"
        onClose={() => setShowAlert(false)}
        autoClose={true}
        duration={2500}
      />
    </div>
  );
}
