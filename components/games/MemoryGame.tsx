'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onGameEnd: (score: number) => void;
}

const emojis = ['🐱', '🐶', '🦊', '🐸', '🐼', '🦋', '🌟', '💎'];

export default function MemoryGame({ onGameEnd }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  // Initialize cards
  const initializeCards = useCallback(() => {
    const shuffledEmojis = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(shuffledEmojis);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setScore(1000); // Start with 1000 points
    setTimeLeft(60);
    setGameOver(false);
    setIsPlaying(true);
  }, []);

  // Handle card click
  const handleCardClick = useCallback((cardId: number) => {
    if (!isPlaying || gameOver) return;

    setCards(prevCards => {
      const newCards = [...prevCards];
      const clickedCard = newCards.find(card => card.id === cardId);
      
      if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) {
        return prevCards;
      }

      // If this is the first or third card being flipped
      if (flippedCards.length === 0) {
        clickedCard.isFlipped = true;
        setFlippedCards([cardId]);
      } else if (flippedCards.length === 1) {
        clickedCard.isFlipped = true;
        setFlippedCards(prev => [...prev, cardId]);
        setMoves(prev => prev + 1);

        // Check for match after a short delay
        setTimeout(() => {
          setCards(currentCards => {
            const updatedCards = [...currentCards];
            const [firstId, secondId] = [flippedCards[0], cardId];
            const firstCard = updatedCards.find(card => card.id === firstId);
            const secondCard = updatedCards.find(card => card.id === secondId);

            if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
              // Match found
              firstCard.isMatched = true;
              secondCard.isMatched = true;
              setMatchedPairs(prev => prev + 1);
              setScore(prev => prev + 100); // Bonus points for match
            } else {
              // No match - flip cards back
              firstCard!.isFlipped = false;
              secondCard!.isFlipped = false;
              setScore(prev => Math.max(0, prev - 10)); // Lose points for wrong match
            }

            setFlippedCards([]);
            return updatedCards;
          });
        }, 1000);
      }

      return newCards;
    });
  }, [flippedCards, isPlaying, gameOver]);

  // Timer effect
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
      setScore(prev => Math.max(0, prev - 1)); // Lose 1 point per second
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, gameOver]);

  // Check for game completion
  useEffect(() => {
    if (matchedPairs === emojis.length && isPlaying) {
      setIsPlaying(false);
      setGameOver(true);
      // Bonus points for completion and remaining time
      setScore(prev => prev + (timeLeft * 10) + 500);
    }
  }, [matchedPairs, isPlaying, timeLeft]);

  // End game
  useEffect(() => {
    if (gameOver) {
      setTimeout(() => onGameEnd(score), 2000);
    }
  }, [gameOver, score, onGameEnd]);

  const startGame = () => {
    initializeCards();
  };

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
        gap: '10px',
      }}>
        <div style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
          Score: <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>{score}</span>
        </div>
        <div style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
          Moves: <span style={{ fontWeight: 'bold' }}>{moves}</span>
        </div>
        <div style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
          Time: <span style={{ fontWeight: 'bold', color: timeLeft < 10 ? '#ef4444' : 'var(--accent-color)' }}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
        {!isPlaying && !gameOver && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            style={{
              background: 'var(--accent-color)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            }}
          >
            Start Memory Game 🧠
          </motion.button>
        )}
      </div>

      {/* Game Board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        maxWidth: '400px',
        width: '100%',
      }}>
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ scale: 0, rotateY: 0 }}
              animate={{ 
                scale: 1, 
                rotateY: card.isFlipped || card.isMatched ? 180 : 0 
              }}
              exit={{ scale: 0 }}
              whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(card.id)}
              style={{
                aspectRatio: '1',
                background: card.isFlipped || card.isMatched 
                  ? 'var(--accent-color)' 
                  : 'var(--card-bg)',
                border: `2px solid ${card.isMatched ? '#10b981' : 'var(--text-secondary)'}`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: card.isFlipped || card.isMatched ? 'default' : 'pointer',
                fontSize: '2rem',
                position: 'relative',
                transformStyle: 'preserve-3d',
                boxShadow: card.isMatched 
                  ? '0 0 20px rgba(16, 185, 129, 0.5)' 
                  : '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              {/* Card Back */}
              <div style={{
                position: 'absolute',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  ❓
                </motion.div>
              </div>

              {/* Card Front */}
              <div style={{
                position: 'absolute',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}>
                <motion.div
                  animate={card.isMatched ? {
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0],
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {card.emoji}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
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
              marginTop: '20px',
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: '2rem', marginBottom: '10px' }}
            >
              {matchedPairs === emojis.length ? '🎉' : '⏰'}
            </motion.div>
            <h3 style={{ margin: '10px 0', color: 'var(--text-primary)' }}>
              {matchedPairs === emojis.length ? 'Congratulations!' : 'Time\'s Up!'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: '10px 0' }}>
              {matchedPairs === emojis.length 
                ? `Perfect! You matched all pairs in ${moves} moves!`
                : `You matched ${matchedPairs} out of ${emojis.length} pairs!`
              }
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
          <p>🧠 Match all pairs of cards to win!</p>
          <p>⏱️ You have 60 seconds to complete the game</p>
          <p>🎯 Fewer moves = Higher score!</p>
        </div>
      )}
    </div>
  );
}
