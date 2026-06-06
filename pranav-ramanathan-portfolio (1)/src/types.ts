export interface CreativeProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  role: string;
  year: string;
  interactiveFeature: string;
}

export type ViewTab = "home" | "about" | "ventures" | "stavex" | "kairo" | "contact";
