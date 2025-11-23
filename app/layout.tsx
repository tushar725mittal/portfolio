import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutContent from '@/components/LayoutContent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tushar Mittal - Full Stack Developer Portfolio',
  description: 'Portfolio website showcasing projects, skills, and experience of Tushar Mittal, a passionate full-stack developer specializing in React, Next.js, and Contentstack.',
  keywords: ['portfolio', 'web developer', 'full stack', 'react', 'nextjs', 'typescript', 'contentstack', 'tushar mittal'],
  authors: [{ name: 'Tushar Mittal' }],
  openGraph: {
    title: 'Tushar Mittal - Full Stack Developer',
    description: 'Portfolio website showcasing projects, skills, and experience',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
