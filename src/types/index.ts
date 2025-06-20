export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface PersonalData {
  name: string;
  title: string;
  description: string;
  telegramUrl: string;
  skills: string[];
  contactNote: string;
}
