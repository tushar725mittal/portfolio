'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InteractiveBackground from '@/components/InteractiveBackground';
import InteractiveCat from '@/components/InteractiveCat';
import GameManager from '@/components/GameManager';
import ChatWidget from '@/components/ChatWidget';
import NextPagePointer from '@/components/NextPagePointer';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <InteractiveBackground />
      <InteractiveCat />
      <GameManager />
      <ChatWidget />
      <NextPagePointer />
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
}

