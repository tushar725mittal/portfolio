'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import styles from '@/styles/ChatWidget.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! 👋 Thanks for visiting my portfolio. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'll get back to you soon. You can also reach me directly at tushar725mittal@gmail.com or connect with me on LinkedIn!",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const quickActions = [
    { label: '👋 Say Hi', message: 'Hi! I would love to connect!' },
    { label: '💼 Work Together', message: "I'm interested in working together!" },
    { label: '📧 Contact Info', message: 'How can I reach you?' },
  ];

  const handleQuickAction = (message: string) => {
    setInputValue(message);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatContainer}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.chatHeader}>
              <div className={styles.headerInfo}>
                <div className={styles.avatar}>
                  <Image
                    src="/tusharphoto.jpeg"
                    alt="Tushar Mittal"
                    width={40}
                    height={40}
                    className={styles.avatarImage}
                  />
                  {isOnline && <div className={styles.onlineIndicator} />}
                </div>
                <div className={styles.headerText}>
                  <h3>Tushar Mittal</h3>
                  <span className={styles.status}>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <button
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.messagesContainer}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`${styles.message} ${
                    message.sender === 'user' ? styles.userMessage : styles.botMessage
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.messageContent}>{message.text}</div>
                  <div className={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className={styles.quickActions}>
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    className={styles.quickActionButton}
                    onClick={() => handleQuickAction(action.message)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {action.label}
                  </motion.button>
                ))}
              </div>
            )}

            <form className={styles.inputContainer} onSubmit={handleSend}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className={styles.input}
              />
              <motion.button
                type="submit"
                className={styles.sendButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={!inputValue.trim()}
              >
                <FaPaperPlane />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={styles.chatToggle}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaComments />
            </motion.div>
          )}
        </AnimatePresence>
        {isOnline && !isOpen && (
          <motion.div
            className={styles.notificationDot}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          />
        )}
      </motion.button>
    </>
  );
}

