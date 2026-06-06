import React, { useState } from "react";
import { GraduationCap, ChevronRight, Target, Bookmark, Cpu, Briefcase, Globe2, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { ScrollReveal, RevealItem } from "./ScrollReveal";

interface AboutViewProps {
  isDarkMode: boolean;
}

interface SkillItem {
  name: string;
  category: "frontend" | "animation" | "backend" | "devops" | "security" | "design";
  level: "Advanced" | "Proficient" | "Experimenting";
}

export default function AboutView({ isDarkMode }: AboutViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const skillCategories = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend Core" },
    { id: "animation", label: "Animation & 3D" },
    { id: "backend", label: "Backend & Database" },
    { id: "devops", label: "Tools & DevOps" },
    { id: "security", label: "Cyber Security" },
    { id: "design", label: "Visual UX Design" }
  ];

  const skillSets: SkillItem[] = [
    // Frontend
    { name: "HTML5 & CSS3", category: "frontend", level: "Advanced" },
    { name: "JavaScript", category: "frontend", level: "Advanced" },
    { name: "TypeScript", category: "frontend", level: "Advanced" },
    { name: "React", category: "frontend", level: "Advanced" },
    { name: "Next.js", category: "frontend", level: "Proficient" },
    { name: "Tailwind CSS", category: "frontend", level: "Advanced" },
    { name: "Bootstrap", category: "frontend", level: "Proficient" },
    { name: "Electron", category: "frontend", level: "Proficient" },

    // Animation & 3D
    { name: "GSAP (GreenSock)", category: "animation", level: "Advanced" },
    { name: "Lenis Smooth Scroll", category: "animation", level: "Advanced" },
    { name: "Barba.js", category: "animation", level: "Proficient" },
    { name: "Three.js", category: "animation", level: "Advanced" },
    { name: "WebGL", category: "animation", level: "Proficient" },
    { name: "Blender 3D Modeling", category: "animation", level: "Proficient" },

    // Backend
    { name: "Node.js", category: "backend", level: "Advanced" },
    { name: "Express.js", category: "backend", level: "Advanced" },
    { name: "Python", category: "backend", level: "Advanced" },
    { name: "Java Core", category: "backend", level: "Proficient" },
    { name: "PHP", category: "backend", level: "Proficient" },
    { name: "MySQL", category: "backend", level: "Advanced" },
    { name: "PostgreSQL", category: "backend", level: "Proficient" },
    { name: "MongoDB", category: "backend", level: "Proficient" },
    { name: "Supabase", category: "backend", level: "Advanced" },

    // DevOps
    { name: "Git & GitHub", category: "devops", level: "Advanced" },
    { name: "GitLab", category: "devops", level: "Proficient" },
    { name: "Docker", category: "devops", level: "Proficient" },
    { name: "Vercel & Netlify", category: "devops", level: "Advanced" },
    { name: "Cloudflare", category: "devops", level: "Proficient" },
    { name: "Linux Bash / Shell", category: "devops", level: "Advanced" },

    // Security
    { name: "OWASP Hardening", category: "security", level: "Proficient" },
    { name: "Metasploit", category: "security", level: "Experimenting" },
    { name: "Nmap Scripting", category: "security", level: "Proficient" },
    { name: "OpenVAS Security Auditing", category: "security", level: "Proficient" },
    { name: "OSSEC Configuration", category: "security", level: "Experimenting" },

    // Design
    { name: "Photoshop", category: "design", level: "Advanced" },
    { name: "Canva Design", category: "design", level: "Advanced" },
    { name: "Figma UI Prototyping", category: "design", level: "Advanced" }
  ];

  const filteredSkills = selectedCategory === "all" 
    ? skillSets 
    : skillSets.filter(skill => skill.category === selectedCategory);

  const activities = [
    { name: "Immersive Web Animations", role: "Researcher", desc: "Building modular WebGL physics fields and exploring native WebGPU rendering systems to create responsive, lightweight page elements." },
    { name: "Cyber Security CTFs", role: "Contributor", desc: "Participating in cybersecurity challenge rooms. Reviewing script safety parameters, scanning networks with Nmap, and configuring Owasp guidelines." },
    { name: "3D Blender Compositing", role: "Artist", desc: "Modeling abstract shapes and low-poly items to bake directly into JSON models for fast loading on local Three.js web screens." }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <div className="space-y-16 md:space-y-24 animate-fade-in text-center flex flex-col items-center w-full">
      
      {/* Editorial Profile Header */}
      <ScrollReveal className="space-y-6 flex flex-col items-center text-center">
        <div className="flex items-center space-x-2 justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest font-bold">/ IDENTITY</span>
        </div>
        <RevealItem>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-tight text-center">
            Designing beautiful interactive <span className="italic block mt-1">experiences with clean code.</span>
          </h2>
        </RevealItem>
        <RevealItem delay={0.1}>
          <p className="font-serif italic text-xl text-slate-500 max-w-xl text-center">
            Student, Builder, and Founder.
          </p>
        </RevealItem>
      </ScrollReveal>


      {/* Grid section split story vs facts */}
      <ScrollReveal className="flex flex-col items-center justify-center gap-8 w-full max-w-3xl">
        {/* Story Text Column */}
        <div 
          className="w-full space-y-6 text-base sm:text-lg opacity-90 leading-relaxed font-light text-center sm:text-left p-4 sm:p-8 md:p-12 rounded-2xl border border-current/10 flex flex-col justify-center sm:items-start items-center bg-current/[0.01]"
        >
          <RevealItem className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <h3 className="font-serif text-3xl font-normal italic">About My Path</h3>
          </RevealItem>
          <RevealItem delay={0.05}>
            <p className="font-light tracking-wide text-current/80">
              I am Pranav, a 15-year old student founder and software builder. I love systems architecture, interactive frontend layouts, and compiling fully secure full-stack software products.
            </p>
          </RevealItem>
          <RevealItem delay={0.1}>
            <p className="font-light tracking-wide text-current/80">
              I am the creator of Stavex and Kairo Planner. I enjoy utilizing clean, structural React frameworks coupled with responsive, lightweight motion dynamics so interactions remain direct and non-blocking.
            </p>
          </RevealItem>
          <RevealItem delay={0.15}>
            <p className="font-light tracking-wide text-current/80">
              In addition, I enjoy researching cybersecurity hardening practices. Exploring virtual sandbox target boxes, auditing network traffic routes, and following strict OWASP practices protect the integrity of the code bases I release.
            </p>
          </RevealItem>
          
          <RevealItem delay={0.2} className="pt-6 border-t border-current/5 flex flex-wrap gap-x-8 gap-y-4 text-sm font-mono text-current/60 w-full justify-center sm:justify-start">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold opacity-50 tracking-wider">Located</span>
              <span className="text-current font-semibold">Singapore</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold opacity-50 tracking-wider">Contact</span>
              <span><a href="mailto:pranav@stavex.org" className="text-indigo-500 hover:underline">pranav@stavex.org</a></span>
            </div>
          </RevealItem>
        </div>
      </ScrollReveal>


      {/* Dynamic Interactive Skills Matrix Hub */}
      <section className="space-y-6 pt-4 flex flex-col items-center w-full max-w-5xl">
        <div className="flex flex-col items-center space-y-2 border-b border-current/10 pb-4 w-full justify-center">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <h3 className="font-serif text-2xl font-normal uppercase tracking-wide text-center">Interactive Technology Suite</h3>
          <p className="text-xs opacity-60 font-mono text-center">Tap category buttons below to filter skills in real-time</p>
        </div>

        {/* Categories selector buttons (Super responsive layout) */}
        <div className="flex flex-wrap justify-center gap-2 py-2 max-w-3xl">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono uppercase transition-all duration-200 border cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-indigo-500 text-white border-indigo-500 font-bold scale-[1.02] shadow-sm"
                  : isDarkMode 
                    ? "border-white/10 hover:border-current/30 text-white/75 bg-[#09090a]" 
                    : "border-black/10 hover:border-current/30 text-black/75 bg-[#fefefe]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        {/* Responsive Staggered Skills Box wrapper */}
        <motion.div 
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full pt-4"
        >
          {filteredSkills.map((tech) => (
            <motion.div 
              key={tech.name}
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 15 } }}
              className={`p-4 rounded border flex flex-col justify-between transition-all duration-200 text-center sm:text-left items-center sm:items-start relative overflow-hidden h-[100px] ${
                isDarkMode 
                  ? "border-white/10 bg-[#0c0c0e] hover:border-indigo-400" 
                  : "border-black/5 bg-[#fafcfc] hover:border-indigo-500"
              }`}
            >
              <div className="space-y-1 w-full">
                <span className="text-[8px] uppercase tracking-widest font-mono text-indigo-500 font-bold block text-center sm:text-left">
                  {tech.category}
                </span>
                <h4 className="font-sans text-sm font-semibold tracking-tight leading-tight text-center sm:text-left">
                  {tech.name}
                </h4>
              </div>
              
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-current/5 font-mono text-[9px] opacity-65 w-full">
                <span>STAGE:</span>
                <span className={`font-bold uppercase ${
                  tech.level === "Advanced" ? "text-indigo-400" : tech.level === "Proficient" ? "text-emerald-400" : "text-amber-400"
                }`}>{tech.level}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Structured hobbies/activities list */}
      <ScrollReveal staggerChildren={0.12} className="space-y-6 flex flex-col items-center w-full max-w-5xl">
        <RevealItem className="flex flex-col items-center space-y-2 border-b border-current/10 pb-4 w-full justify-center">
          <Target className="w-5 h-5 text-indigo-500" />
          <h3 className="font-serif text-2xl font-normal uppercase tracking-wide text-center">Experimental Interests</h3>
        </RevealItem>

        <div className="space-y-4 w-full max-w-4xl">
          {activities.map((act) => (
            <RevealItem key={act.name} className="w-full">
              <div 
                className="p-4 sm:p-5 rounded-2xl border border-current/10 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-current/[0.02] transition-colors text-center sm:text-left hover:scale-[1.01]"
              >
                <div className="space-y-1 max-w-xl flex flex-col sm:items-start items-center w-full">
                  <span className="font-mono text-[9px] text-indigo-500 font-bold uppercase">{act.role}</span>
                  <h4 className="font-serif text-2xl font-normal leading-tight">{act.name}</h4>
                  <p className="text-xs opacity-80 font-light leading-relaxed">{act.desc}</p>
                </div>
                <div className="flex items-center justify-center space-x-1.5 text-xs font-mono opacity-50 shrink-0">
                  <ChevronRight className="w-4 h-4 hidden sm:block" />
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </ScrollReveal>

    </div>
  );
}
