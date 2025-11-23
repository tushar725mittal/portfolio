'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameModal from './GameModal';

type GameType = 'snake' | 'memory' | 'whack-mole' | 'reaction' | 'typing';

interface GameTrigger {
  scrollThreshold: number;
  timeThreshold: number;
  clickThreshold: number;
  lastTriggered: number;
  cooldownPeriod: number;
}

export default function GameManager() {
  const [currentGame, setCurrentGame] = useState<GameType | null>(null);
  const [showGamePrompt, setShowGamePrompt] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Tracking refs
  const scrollAmount = useRef(0);
  const timeSpent = useRef(0);
  const clickCount = useRef(0);
  const lastActivity = useRef(Date.now());
  const gameStartTime = useRef(Date.now());

  // Game trigger settings
  const trigger = useRef<GameTrigger>({
    scrollThreshold: 2000, // 2000px scrolled
    timeThreshold: 45000, // 45 seconds on site
    clickThreshold: 15, // 15 clicks/interactions
    lastTriggered: 0,
    cooldownPeriod: 120000, // 2 minutes between games
  });

  // "Maybe Later" cooldown tracking
  const maybeLaterCooldown = useRef<number>(0);
  const maybeLaterCooldownPeriod = 600000; // 10 minutes in milliseconds

  const games: GameType[] = ['snake', 'memory', 'whack-mole', 'reaction', 'typing'];

  useEffect(() => {
    setMounted(true);
    gameStartTime.current = Date.now();
    
    // Load "Maybe Later" cooldown from localStorage
    const savedMaybeLaterTime = localStorage.getItem('gameManagerMaybeLaterTime');
    if (savedMaybeLaterTime) {
      maybeLaterCooldown.current = parseInt(savedMaybeLaterTime, 10);
    }
  }, []);

  // Check if we should trigger a game
  const checkTriggerConditions = useCallback(() => {
    const now = Date.now();
    const timeSinceLastGame = now - trigger.current.lastTriggered;
    const timeSinceMaybeLater = now - maybeLaterCooldown.current;
    
    // Don't trigger if in regular cooldown period
    if (timeSinceLastGame < trigger.current.cooldownPeriod) {
      return false;
    }

    // Don't trigger if user clicked "Maybe Later" within last 10 minutes
    if (timeSinceMaybeLater < maybeLaterCooldownPeriod) {
      return false;
    }

    // Don't trigger if user is inactive
    if (now - lastActivity.current > 10000) { // 10 seconds inactive
      return false;
    }

    const timeOnSite = now - gameStartTime.current;
    
    // Check various trigger conditions
    const conditions = [
      scrollAmount.current >= trigger.current.scrollThreshold,
      timeOnSite >= trigger.current.timeThreshold,
      clickCount.current >= trigger.current.clickThreshold,
    ];

    // Add some randomness - only trigger 30% of the time when conditions are met
    const shouldTrigger = conditions.some(condition => condition) && Math.random() < 0.3;

    if (shouldTrigger) {
      // Reset counters
      scrollAmount.current = 0;
      clickCount.current = 0;
      trigger.current.lastTriggered = now;
      return true;
    }

    return false;
  }, []);

  // Trigger a random game
  const triggerRandomGame = useCallback(() => {
    const randomGame = games[Math.floor(Math.random() * games.length)];
    setShowGamePrompt(true);
    setCurrentGame(randomGame);
  }, [games]);

  // Track scroll behavior
  useEffect(() => {
    if (!mounted) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      scrollAmount.current += scrollDelta;
      lastScrollY = currentScrollY;
      lastActivity.current = Date.now();

      // Check if we should trigger a game
      if (checkTriggerConditions()) {
        triggerRandomGame();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted, checkTriggerConditions, triggerRandomGame]);

  // Track mouse clicks and interactions
  useEffect(() => {
    if (!mounted) return;

    const handleClick = () => {
      clickCount.current += 1;
      lastActivity.current = Date.now();

      if (checkTriggerConditions()) {
        triggerRandomGame();
      }
    };

    const handleMouseMove = () => {
      lastActivity.current = Date.now();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mounted, checkTriggerConditions, triggerRandomGame]);

  // Time-based trigger
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      timeSpent.current = Date.now() - gameStartTime.current;
      
      if (checkTriggerConditions()) {
        triggerRandomGame();
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [mounted, checkTriggerConditions, triggerRandomGame]);

  const handleGameAccept = () => {
    setShowGamePrompt(false);
    // Game will start in the modal
  };

  const handleGameDecline = () => {
    setShowGamePrompt(false);
    setCurrentGame(null);
    
    // Set "Maybe Later" cooldown for 10 minutes
    const now = Date.now();
    maybeLaterCooldown.current = now;
    localStorage.setItem('gameManagerMaybeLaterTime', now.toString());
    
    // Also reset the trigger timer to prevent immediate re-triggering
    trigger.current.lastTriggered = now;
  };

  const handleGameEnd = () => {
    setCurrentGame(null);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Game Prompt Popup */}
      <AnimatePresence>
        {showGamePrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              left: '20px',
              zIndex: 9999,
              background: 'var(--card-background)',
              border: '2px solid var(--accent-color)',
              borderRadius: '15px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              maxWidth: '300px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                style={{ fontSize: '2rem', marginBottom: '10px' }}
              >
                🎮
              </motion.div>
              <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-primary)' }}>
                Surprise Mini-Game!
              </h3>
              <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Take a quick break and play a fun {currentGame?.replace('-', ' ')} game?
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGameAccept}
                  style={{
                    background: 'var(--accent-color)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  Let's Play! 🎯
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGameDecline}
                  style={{
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--text-secondary)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  Maybe Later
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Modal */}
      <AnimatePresence>
        {currentGame && !showGamePrompt && (
          <GameModal gameType={currentGame} onClose={handleGameEnd} />
        )}
      </AnimatePresence>
    </>
  );
}
