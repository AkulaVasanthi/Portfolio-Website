/**
 * Types & Interfaces for Akula Vasanthi Portfolio
 */

export interface SkillItem {
  name: string;
  level: number; // percentage (e.g. 90)
  iconName?: string;
  category: 'programming' | 'ai-data-science' | 'tools' | 'soft-skills';
}

export interface EducationItem {
  id: string;
  degree: string;
  specialization?: string;
  institution: string;
  duration: string;
  status?: string;
  grade?: string;
  description?: string;
}

export interface InternshipItem {
  title: string;
  organization: string;
  association: string;
  duration: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  type: string;
  description: string;
  features: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  highlights: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  metric?: string;
}
