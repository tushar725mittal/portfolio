'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface SnakeGameProps {
  onGameEnd: (score: number) => void;
}

const GRID_SIZE = 20;
const GAME_WIDTH = 400;
const GAME_HEIGHT = 400;

export default function SnakeGame({ onGameEnd }: SnakeGameProps) {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 0, y: -1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const directionRef = useRef(direction);

  // Update direction ref when direction changes
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const generateFood = useCallback(() => {
    const maxX = Math.floor(GAME_WIDTH / GRID_SIZE) - 1;
    const maxY = Math.floor(GAME_HEIGHT / GRID_SIZE) - 1;
    
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    return newFood;
  }, [snake]);

  const moveSnake = useCallback(() => {
    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += directionRef.current.x;
      head.y += directionRef.current.y;

      // Check wall collision
      const maxX = Math.floor(GAME_WIDTH / GRID_SIZE) - 1;
      const maxY = Math.floor(GAME_HEIGHT / GRID_SIZE) - 1;
      
      if (head.x < 0 || head.x > maxX || head.y < 0 || head.y > maxY) {
        setGameOver(true);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, generateFood]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isPlaying) return;

    const { key } = e;
    const currentDir = directionRef.current;

    switch (key) {
      case 'ArrowUp':
        if (currentDir.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (currentDir.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (currentDir.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (currentDir.x !== -1) setDirection({ x: 1, y: 0 });
        break;
    }
  }, [isPlaying]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const endGame = () => {
    setIsPlaying(false);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    onGameEnd(score);
  };

  // Game loop
  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, 150);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameOver, moveSnake]);

  // Handle game over
  useEffect(() => {
    if (gameOver) {
      setTimeout(endGame, 1000);
    }
  }, [gameOver, score]);

  // Keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '20px',
      height: '100%',
    }}>
      {/* Score */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        width: '100%', 
        alignItems: 'center' 
      }}>
        <div style={{ 
          color: 'var(--text-primary)', 
          fontSize: '1.2rem', 
          fontWeight: 'bold' 
        }}>
          Score: {score}
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
              padding: '12px 24px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            }}
          >
            Start Snake Game 🐍
          </motion.button>
        )}
      </div>

      {/* Game Board */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          border: '3px solid var(--accent-color)',
          borderRadius: '10px',
          position: 'relative',
          background: 'var(--background-secondary)',
          overflow: 'hidden',
        }}
      >
        {/* Snake */}
        {snake.map((segment, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: 'absolute',
              left: segment.x * GRID_SIZE,
              top: segment.y * GRID_SIZE,
              width: GRID_SIZE - 1,
              height: GRID_SIZE - 1,
              backgroundColor: index === 0 ? 'var(--accent-color)' : '#4ade80',
              borderRadius: index === 0 ? '4px' : '2px',
              border: index === 0 ? '2px solid white' : 'none',
            }}
          />
        ))}

        {/* Food */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            left: food.x * GRID_SIZE,
            top: food.y * GRID_SIZE,
            width: GRID_SIZE - 1,
            height: GRID_SIZE - 1,
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
          🍎
        </motion.div>

        {/* Game Over Overlay */}
        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              💥 Game Over! 💥
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Controls */}
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
          Use arrow keys to control the snake
        </p>
        <p style={{ margin: '5px 0', fontSize: '0.8rem' }}>
          Eat the apples to grow and increase your score!
        </p>
      </div>

      {/* Mobile Controls */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '10px',
        width: '200px',
      }}>
        <div></div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => isPlaying && setDirection({ x: 0, y: -1 })}
          style={{
            padding: '10px',
            background: 'var(--accent-color)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1.2rem',
          }}
        >
          ↑
        </motion.button>
        <div></div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => isPlaying && setDirection({ x: -1, y: 0 })}
          style={{
            padding: '10px',
            background: 'var(--accent-color)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1.2rem',
          }}
        >
          ←
        </motion.button>
        <div></div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => isPlaying && setDirection({ x: 1, y: 0 })}
          style={{
            padding: '10px',
            background: 'var(--accent-color)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1.2rem',
          }}
        >
          →
        </motion.button>
        
        <div></div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => isPlaying && setDirection({ x: 0, y: 1 })}
          style={{
            padding: '10px',
            background: 'var(--accent-color)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1.2rem',
          }}
        >
          ↓
        </motion.button>
        <div></div>
      </div>
    </div>
  );
}
