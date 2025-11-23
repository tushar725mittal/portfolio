export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
  logo?: string;
  location?: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Other';
  level?: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
  content?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution?: string;  // For college/university
  school?: string;       // For school education
  location: string;
  startDate?: string;    // For date range format
  endDate?: string;      // For date range format
  year?: string;         // For single year format
  gpa?: string;
  percentage?: string;   // Alternative to GPA
  achievements?: string[];
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  description?: string;
}

