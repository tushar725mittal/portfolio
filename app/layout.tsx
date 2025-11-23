import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutContent from '@/components/LayoutContent';
import { personalInfo, skills, experiences } from '@/lib/data';

const inter = Inter({ subsets: ['latin'] });

// Enhanced Metadata for LLMs and SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://tushar-mittal.contentstackapps.com'),
  title: {
    default: `${personalInfo.name} - Full Stack Developer`,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.bio,
  keywords: [
    'Full Stack Developer',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
    'Tushar Mittal',
    'Tushar Mittal Portfolio',
    'Contentstack Developer',
    'Web Development',
    'Frontend Engineer',
    'Backend Engineer',
    'JavaScript',
    'TypeScript',
    ...skills.map(s => s.name), // Dynamically add all skills as keywords
  ],
  authors: [{ name: personalInfo.name, url: 'https://tushar-mittal.contentstackapps.com' }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'profile',
    firstName: 'Tushar',
    lastName: 'Mittal',
    username: 'tushar725mittal',
    gender: 'male',
    title: `${personalInfo.name} - Full Stack Developer`,
    description: personalInfo.bio,
    url: 'https://tushar-mittal.contentstackapps.com',
    siteName: `${personalInfo.name} Portfolio`,
    images: [
      {
        url: '/tusharphoto.jpeg',
        width: 800,
        height: 800,
        alt: personalInfo.name,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} - Full Stack Developer`,
    description: personalInfo.bio,
    images: ['/tusharphoto.jpeg'],
  },
  alternates: {
    canonical: 'https://tushar-mittal.contentstackapps.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Structured Data for LLMs (Generative Engine Optimization)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    givenName: 'Tushar',
    familyName: 'Mittal',
    url: 'https://tushar-mittal.contentstackapps.com',
    image: 'https://tushar-mittal.contentstackapps.com/tusharphoto.jpeg',
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: experiences[0]?.company || 'Contentstack',
    },
    description: personalInfo.bio,
    email: personalInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressCountry: 'India',
    },
    sameAs: [
      `https://github.com/${personalInfo.github}`,
      `https://linkedin.com/in/${personalInfo.linkedin}`,
      'https://tushar-mittal.contentstackapps.com',
    ],
    knowsAbout: skills.map(skill => skill.name),
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Developer',
      occupationLocation: {
        '@type': 'City',
        name: 'Mumbai'
      },
      skills: skills.map(s => s.name),
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'MIT World Peace University',
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
