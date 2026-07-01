export interface Profile {
  name: string;
  alias: string;
  traits: string[];
  tagline: string;
  subtitle: string;
  motto: string;
  lifeTheme: string;
  currentMission: string[];
  contact: {
    title: string;
    github: string;
    email: string;
    linkedin: string;
  };
}

export interface Mission {
  id: string;
  number: string;
  title: string;
  purpose: string;
  technologies: string[];
  learned: string;
  impact: string;
}

export interface SkillItem {
  name: string;
  level?: string;
  type?: string;
}

export interface SkillConcept {
  name: string;
  desc: string;
}

export interface Skills {
  coreSystems: SkillItem[];
  supportingSystems: SkillItem[];
  concepts: SkillConcept[];
}

export interface JourneyChapter {
  chapter: string;
  title: string;
  stage: string;
  description: string;
}
