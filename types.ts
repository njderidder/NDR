export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string; // Freelance, Full-time, etc.
  period: string;
  location: string;
  logo: string;
  bullets: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  details: {
    problem: string;
    solution: string;
    tech: string[];
  };
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  logo: string;
  notes?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface CVData {
  hero: {
    name: string;
    headline: string;
    subheadline: string;
    badges: string[];
  };
  about: {
    summary: string;
    now: string;
    image?: string;
  };
  highlights: Array<{ title: string; subtitle: string }>;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  skills: SkillGroup[];
  contact: {
    email: string;
    linkedin: string;
    whatsapp: string;
    phone: string;
  };
}
