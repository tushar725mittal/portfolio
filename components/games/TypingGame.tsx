'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypingGameProps {
  onGameEnd: (score: number) => void;
}

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "Life is what happens when you're busy making other plans.",
  "To be or not to be, that is the question.",
  "In the beginning was the Word, and the Word was with God.",
  "May the Force be with you, always and forever.",
  "I have a dream that one day this nation will rise up.",
  "Ask not what your country can do for you.",
  "That's one small step for man, one giant leap for mankind.",
  "The only thing we have to fear is fear itself.",
  "Elementary, my dear Watson, the game is afoot.",
  "Houston, we have a problem that needs solving.",
  "Winter is coming to the seven kingdoms of Westeros.",
  "With great power comes great responsibility and wisdom.",
  "I'll be back to finish what we started here.",
];

export default function TypingGame({ onGameEnd }: TypingGameProps) {
  const [currentSentence, setCurrentSentence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [sentencesCompleted, setSentencesCompleted] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const getRandomSentence = useCallback(() => {
    return sentences[Math.floor(Math.random() * sentences.length)];
  }, []);

  const startGame = () => {
    const sentence = getRandomSentence();
    setCurrentSentence(sentence);
    setUserInput('');
    setCurrentIndex(0);
    setTimeLeft(60);
    setWordsPerMinute(0);
    setAccuracy(100);
    setCorrectChars(0);
    setTotalChars(0);
    setGameOver(false);
    setSentencesCompleted(0);
    setIsPlaying(true);
    startTimeRef.current = Date.now();
    
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setGameOver(true);
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Calculate final score based on WPM and accuracy
    const score = Math.round(wordsPerMinute * (accuracy / 100) + sentencesCompleted * 50);
    setTimeout(() => onGameEnd(score), 3000);
  }, [wordsPerMinute, accuracy, sentencesCompleted, onGameEnd]);

  // Timer
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

  // Calculate stats
  useEffect(() => {
    if (!isPlaying || totalChars === 0) return;

    const timeElapsed = (Date.now() - startTimeRef.current) / 1000 / 60; // minutes
    const wordsTyped = totalChars / 5; // Standard: 5 characters = 1 word
    const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    const acc = Math.round((correctChars / totalChars) * 100);

    setWordsPerMinute(wpm);
    setAccuracy(acc);
  }, [correctChars, totalChars, isPlaying]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying || gameOver) return;

    const value = e.target.value;
    setUserInput(value);

    // Check if sentence is completed
    if (value === currentSentence) {
      setSentencesCompleted(prev => prev + 1);
      // Load new sentence
      const newSentence = getRandomSentence();
      setCurrentSentence(newSentence);
      setUserInput('');
      setCurrentIndex(0);
      return;
    }

    // Update character tracking
    const newTotalChars = value.length;
    let newCorrectChars = 0;

    for (let i = 0; i < Math.min(value.length, currentSentence.length); i++) {
      if (value[i] === currentSentence[i]) {
        newCorrectChars++;
      }
    }

    setTotalChars(prev => Math.max(prev, newTotalChars));
    setCorrectChars(prev => Math.max(prev, newCorrectChars));
    setCurrentIndex(value.length);
  }, [currentSentence, isPlaying, gameOver, getRandomSentence]);

  const getCharacterStyle = (index: number) => {
    if (index >= userInput.length) {
      return { color: 'var(--text-secondary)' }; // Not typed yet
    }
    
    if (userInput[index] === currentSentence[index]) {
      return { color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)' }; // Correct
    } else {
      return { color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }; // Incorrect
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '20px',
      height: '100%',
    }}>
      {/* Start Button - Prominent Display */}
      {!isPlaying && !gameOver && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          width: '100%',
          marginBottom: '20px',
        }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            style={{
              background: 'var(--accent-color)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            }}
          >
            Start Typing Challenge ⌨️
          </motion.button>
        </div>
      )}

      {/* Game Stats */}
      {isPlaying && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '0.9rem',
          marginBottom: '20px',
        }}>
          <div style={{ color: 'var(--text-primary)' }}>
            WPM: <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>{wordsPerMinute}</span>
          </div>
          <div style={{ color: 'var(--text-primary)' }}>
            Accuracy: <span style={{ fontWeight: 'bold', color: accuracy > 95 ? '#10b981' : accuracy > 85 ? '#f59e0b' : '#ef4444' }}>
              {accuracy}%
            </span>
          </div>
          <div style={{ color: 'var(--text-primary)' }}>
            Completed: <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>{sentencesCompleted}</span>
          </div>
          <div style={{ color: 'var(--text-primary)' }}>
            Time: <span style={{ fontWeight: 'bold', color: timeLeft < 10 ? '#ef4444' : 'var(--accent-color)' }}>
              {timeLeft}s
            </span>
          </div>
        </div>
      )}

      {/* Typing Area */}
      <div style={{
        width: '100%',
        maxWidth: '600px',
        background: 'var(--card-background)',
        borderRadius: '12px',
        padding: '20px',
        border: '2px solid var(--accent-color)',
        minHeight: '120px',
      }}>
        {/* Text Display */}
        <div style={{
          fontSize: '1.2rem',
          lineHeight: 1.6,
          marginBottom: '15px',
          fontFamily: 'monospace',
          minHeight: '60px',
          padding: '10px',
          background: 'var(--background-secondary)',
          borderRadius: '8px',
        }}>
          {currentSentence.split('').map((char, index) => (
            <motion.span
              key={index}
              style={{
                ...getCharacterStyle(index),
                position: 'relative',
              }}
              animate={index === currentIndex ? {
                backgroundColor: ['transparent', 'var(--accent-color)', 'transparent'],
              } : {}}
              transition={{
                duration: 1,
                repeat: index === currentIndex ? Infinity : 0,
              }}
            >
              {char}
              {index === currentIndex && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    right: '-2px',
                    top: 0,
                    width: '2px',
                    height: '100%',
                    backgroundColor: 'var(--accent-color)',
                  }}
                />
              )}
            </motion.span>
          ))}
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={!isPlaying || gameOver}
          placeholder={isPlaying ? "Start typing..." : "Click 'Start Typing' to begin"}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '1.1rem',
            fontFamily: 'monospace',
            border: '2px solid var(--text-secondary)',
            borderRadius: '8px',
            background: 'var(--background)',
            color: 'var(--text-primary)',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--accent-color)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--text-secondary)';
          }}
        />
      </div>

      {/* Progress Bar */}
      {isPlaying && (
        <div style={{
          width: '100%',
          maxWidth: '600px',
          height: '8px',
          background: 'var(--background-secondary)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${(userInput.length / currentSentence.length) * 100}%` }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent-color), #10b981)',
              borderRadius: '4px',
            }}
          />
        </div>
      )}

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
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: '2rem', marginBottom: '15px' }}
            >
              ⌨️
            </motion.div>
            <h3 style={{ margin: '10px 0', color: 'var(--text-primary)' }}>
              Typing Complete!
            </h3>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
              <p style={{ margin: '5px 0' }}>
                Speed: <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>
                  {wordsPerMinute} WPM
                </span>
              </p>
              <p style={{ margin: '5px 0' }}>
                Accuracy: <span style={{ fontWeight: 'bold', color: '#10b981' }}>
                  {accuracy}%
                </span>
              </p>
              <p style={{ margin: '5px 0' }}>
                Sentences: <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>
                  {sentencesCompleted}
                </span>
              </p>
            </div>
            <div style={{ 
              fontSize: '1rem', 
              color: wordsPerMinute > 60 ? '#10b981' : wordsPerMinute > 40 ? '#f59e0b' : '#ef4444',
              fontWeight: 'bold',
            }}>
              {wordsPerMinute > 80 ? 'Lightning Fast! ⚡' :
               wordsPerMinute > 60 ? 'Excellent! 🎯' :
               wordsPerMinute > 40 ? 'Good Job! 👍' :
               wordsPerMinute > 20 ? 'Keep Practicing! 📚' :
               'Try Again! 🔄'}
            </div>
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
          <p>⌨️ Type the sentences as accurately and quickly as possible!</p>
          <p>🎯 Green = correct, Red = incorrect</p>
          <p>⏱️ You have 60 seconds to type as many sentences as you can!</p>
        </div>
      )}
    </div>
  );
}
