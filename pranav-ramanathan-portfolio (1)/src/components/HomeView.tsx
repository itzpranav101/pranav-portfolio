import React from "react";
import { 
  ArrowUpRight, 
  Compass, 
  Sparkles,
  ExternalLink,
  Cpu,
  Smartphone,
  ShieldAlert,
  Terminal,
  MousePointerClick
} from "lucide-react";
import { motion } from "motion/react";
import { ViewTab } from "../types";
import HobbiesDashboard from "./HobbiesDashboard";
import { ScrollReveal, RevealItem } from "./ScrollReveal";

interface HomeViewProps {
  isDarkMode: boolean;
  setActiveTab: (tab: ViewTab) => void;
  readStates?: Record<string, boolean>;
}

export default function HomeView({ isDarkMode, setActiveTab, readStates }: HomeViewProps) {
  // Trace mouse position normalized from -1 to 1 centered in the container
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  // Pre-calculate stable random details for the ambient floating particles
  const particles = React.useMemo(() => {
    return Array.from({ length: 32 }).map((_, idx) => ({
      id: idx,
      left: `${(idx * 7.3) % 96 + 2}%`,
      top: `${(idx * 11.9) % 94 + 3}%`,
      size: ((idx * 3.7) % 5) + 2, // 2px to 6px
      delay: (idx * 0.4) % 4,
      duration: ((idx * 1.3) % 8) + 12, // 12s to 20s
      influence: ((idx * 2.7) % 25) + 15, // displacement up to ~40px
    }));
  }, []);

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative space-y-16 md:space-y-24 text-center flex flex-col items-center w-full min-h-screen overflow-visible select-text"
    >
      {/* Dynamic Background Interactive Particles layer (Absolute position behind content) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          >
            <motion.div
              style={{
                width: p.size,
                height: p.size,
              }}
              className="rounded-full bg-indigo-500/15 dark:bg-indigo-400/20 shadow-sm"
              animate={{
                x: mousePos.x * p.influence,
                y: mousePos.y * p.influence,
              }}
              transition={{
                type: "spring",
                stiffness: 40,
                damping: 12,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* 1. Page Header Introduction (Biography Profile Header) */}
      <section className="relative flex flex-col items-center gap-8 pt-4 w-full max-w-5xl z-10">
        
        {/* Simple friendly introduction header */}
        <div className="flex flex-col items-center space-y-6 w-full max-w-3xl animate-fade-in">
          <div className="space-y-4 flex flex-col items-center">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-center">
              Hi, I'm Pranav. Student founder, builder & creative developer.
            </h1>
            <p className="font-serif italic text-lg sm:text-xl text-slate-500 font-light max-w-xl text-center">
              Student founder of Stavex & creator of Kairo, crafting highly interactive digital environments.
            </p>
          </div>

          <p className="max-w-xl text-sm sm:text-base text-current/80 font-normal leading-relaxed text-center">
            Basically, I make websites. I believe each project is an opportunity to learn, experiment, and push my boundaries. I combine front-end engineering with dynamic animations, custom shaders, and modular architectures. Let's explore what I build below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab("ventures");
                const el = document.getElementById("main-scroll-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex justify-center items-center space-x-2 px-5 py-3 rounded text-xs font-mono uppercase bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-200 cursor-pointer border border-indigo-500 w-full sm:w-auto text-center"
            >
              <span>Explore My Showcases</span>
              <Compass className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab("about");
                const el = document.getElementById("main-scroll-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex justify-center items-center space-x-2 px-5 py-3 rounded text-xs font-mono uppercase bg-current/5 hover:bg-current/10 border border-current/10 transition-colors cursor-pointer w-full sm:w-auto text-center"
            >
              <span>Skills & Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Column: Code panel block in strict Monoscale */}
        <div className="flex flex-col justify-between h-full space-y-6 w-full max-w-md mx-auto z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-5 rounded-lg border font-mono text-[11px] leading-relaxed select-text ${
              isDarkMode ? "bg-stone-900/40 border-white/10" : "bg-white border-stone-200/80 shadow-sm"
            }`}
          >
            <div className="flex items-center justify-center border-b border-current/10 pb-2.5 mb-3 text-slate-400">
              <span className="font-bold uppercase tracking-wider text-indigo-500">profile.json</span>
            </div>
            
            <pre className="text-center whitespace-pre-wrap font-mono text-[11px]">
              <code>
                {"{\n"}
                {"  \"identity\": \"Pranav\",\n"}
                {"  \"focus\": \"Student Founder & Builder\",\n"}
                {"  \"ventures\": \"Stavex, Kairo AI\",\n"}
                {"  \"availability\": [\n"}
                {"    \"Available for Collaborations\",\n"}
                {"    \"Freelance Engineering\"\n"}
                {"  ],\n"}
                {"  \"stack\": [\"React/TypeScript\", \"Tailwind CSS\", \"Canvas API\"]\n"}
                {"}"}
              </code>
            </pre>

          </motion.div>

          <div className="grid grid-cols-2 gap-4 border-t border-current/10 pt-4 text-center">
            <div>
              <span className="block font-serif text-3xl font-mono text-indigo-500 font-bold">Active</span>
              <span className="text-[9px] uppercase tracking-widest font-mono opacity-50">Freelance Status</span>
            </div>
            <div>
              <span className="block font-serif text-3xl font-mono text-indigo-500 font-bold">Singapore</span>
              <span className="text-[9px] uppercase tracking-widest font-mono opacity-50">Location</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Project Gateways Selector Grid */}
      <ScrollReveal 
        staggerChildren={0.15}
        className="space-y-8 flex flex-col items-center w-full"
      >
        <RevealItem className="border-b border-current/10 pb-4 w-full text-center">
          <span className="font-mono text-[9px] text-indigo-500 uppercase tracking-widest block font-bold mb-1">VENTURE PORTS</span>
          <h3 className="font-serif text-3xl font-normal italic">Key Creative Solutions</h3>
        </RevealItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          
          {/* Stavex */}
          <RevealItem className="w-full">
            <motion.div
              whileHover={{ y: -8, scale: 1.015 }}
              whileTap={{ scale: 0.995 }}
              onClick={() => {
                setActiveTab("stavex");
                const el = document.getElementById("main-scroll-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between items-center min-h-[220px] shadow-sm hover:shadow-[0_12px_30px_rgba(99,102,241,0.06)] h-full ${
                isDarkMode 
                  ? "bg-stone-900/40 border-white/10 hover:border-indigo-500 hover:bg-neutral-900/80" 
                  : "bg-white border-stone-200/80 hover:border-indigo-500 hover:bg-stone-50"
              }`}
            >
              <div className="space-y-3 flex flex-col items-center w-full">
                <div className="flex justify-between items-center text-[9px] font-mono w-full">
                  <span className="opacity-60 text-left">STAVEX CREATOR HUB</span>
                  <div className="flex items-center gap-1.5">
                    {!readStates?.stavex && (
                      <span className="bg-indigo-555 text-white px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider animate-pulse text-[8px] bg-indigo-500">
                        NEW
                      </span>
                    )}
                    <span className={`${readStates?.stavex ? "text-emerald-500 bg-emerald-500/10" : "text-amber-500 bg-amber-500/10"} px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]`}>
                      {readStates?.stavex ? "Read" : "Unread"}
                    </span>
                  </div>
                </div>
                <h4 className="font-serif text-3xl font-normal italic text-center">Stavex</h4>
                <p className="text-xs opacity-75 leading-relaxed font-light text-center">
                  A teen founder platform helping ambitious students turn ideas into real projects with structured weekly tasks, peer validation, and verified progress profiles.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-1 text-[10px] font-mono text-indigo-500 pt-3 w-full font-bold">
                <span>EXPLORE PLATFORM MODEL</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          </RevealItem>

          {/* Kairo AI */}
          <RevealItem className="w-full">
            <motion.div
              whileHover={{ y: -8, scale: 1.015 }}
              whileTap={{ scale: 0.995 }}
              onClick={() => {
                setActiveTab("kairo");
                const el = document.getElementById("main-scroll-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between items-center min-h-[220px] shadow-sm hover:shadow-[0_12px_30px_rgba(99,102,241,0.06)] h-full ${
                isDarkMode 
                  ? "bg-stone-900/40 border-white/10 hover:border-indigo-500 hover:bg-neutral-900/80" 
                  : "bg-white border-stone-200/80 hover:border-indigo-500 hover:bg-stone-50"
              }`}
            >
              <div className="space-y-3 flex flex-col items-center w-full">
                <div className="flex justify-between items-center text-[9px] font-mono w-full">
                  <span className="opacity-60 text-left">KAIRO SCHEDULING THEORY</span>
                  <div className="flex items-center gap-1.5">
                    {!readStates?.kairo && (
                      <span className="bg-indigo-500 text-white px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider animate-pulse text-[8px]">
                        NEW
                      </span>
                    )}
                    <span className={`${readStates?.kairo ? "text-emerald-500 bg-emerald-500/10" : "text-amber-500 bg-amber-500/10"} px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]`}>
                      {readStates?.kairo ? "Read" : "Unread"}
                    </span>
                  </div>
                </div>
                <h4 className="font-serif text-3xl font-normal italic text-center">Kairo AI</h4>
                <p className="text-xs opacity-75 leading-relaxed font-light text-center">
                  A smart visual organizer built to align with your natural energy levels. Schedule balanced focus breaks, distribute task checklists elegantly, and track your daily builder milestones.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-1 text-[10px] font-mono text-indigo-500 pt-3 w-full font-bold">
                <span>EXPLORE SCHEDULING MODEL</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          </RevealItem>

        </div>
      </ScrollReveal>


      {/* 2.5 Interactive Showcase: Personal Hobbies */}
      <ScrollReveal className="w-full max-w-4xl space-y-8 pt-8 border-t border-current/10 flex flex-col items-center z-10 text-center">
        <RevealItem className="space-y-2 text-center">
          <span className="font-mono text-[10px] text-indigo-500 uppercase tracking-[0.25em] block font-bold">PLAYGROUND & LIFESTYLE</span>
          <h3 className="font-serif text-3xl sm:text-4xl font-normal italic">Hobbies & Classical Pursuits</h3>
          <p className="text-xs sm:text-sm opacity-75 max-w-xl mx-auto font-light text-center">
            Outside of coding interactive layout engines, I balance my builder mindset with discipline, tempo coordination, and fine craftsmanship on and off the field.
          </p>
        </RevealItem>

        <RevealItem className="w-full">
          <HobbiesDashboard isDarkMode={isDarkMode} />
        </RevealItem>
      </ScrollReveal>


      {/* Expanded section to make page longer: Philosophy of Craft */}
      <ScrollReveal 
        staggerChildren={0.12}
        className="space-y-8 pt-8 border-t border-current/10 flex flex-col items-center w-full"
      >
        <RevealItem className="max-w-xl space-y-4 text-center">
          <span className="font-mono text-[10px] text-indigo-500 uppercase tracking-widest block font-bold">Design Philosophy // 01</span>
          <h3 className="font-serif text-3xl sm:text-4xl font-normal italic">Interaction Leads Aesthetic</h3>
          <p className="text-sm opacity-85 leading-relaxed font-light text-center">
            A website is more than static text. It is a three-dimensional dialogue where typography, animations, sound loops, and responsive transitions coordinate to command interest and protect attention.
          </p>
        </RevealItem>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 w-full text-center">
          <RevealItem className="w-full">
            <motion.div 
              whileHover={{ y: -4 }}
              className="space-y-2 flex flex-col items-center p-4 rounded-xl border border-current/5 bg-current/[0.01]"
            >
              <span className="font-mono text-xs opacity-50 font-bold">I. PERFORMANCE FIRST</span>
              <p className="text-xs opacity-75 leading-relaxed font-light text-center">
                Staggered animations and visual elements must run at a smooth 60fps, even on low-end smartphones.
              </p>
            </motion.div>
          </RevealItem>
          <RevealItem className="w-full">
            <motion.div 
              whileHover={{ y: -4 }}
              className="space-y-2 flex flex-col items-center p-4 rounded-xl border border-current/5 bg-current/[0.01]"
            >
              <span className="font-mono text-xs opacity-50 font-bold">II. USER RESPONSIBILITY</span>
              <p className="text-xs opacity-75 leading-relaxed font-light text-center">
                We focus on intuitive touch dimensions, large active buttons, and legible typography pairings for stress-free reading.
              </p>
            </motion.div>
          </RevealItem>
          <RevealItem className="w-full">
            <motion.div 
              whileHover={{ y: -4 }}
              className="space-y-2 flex flex-col items-center p-4 rounded-xl border border-current/5 bg-current/[0.01]"
            >
              <span className="font-mono text-xs opacity-50 font-bold">III. EXPERIMENTAL SOUL</span>
              <p className="text-xs opacity-75 leading-relaxed font-light text-center">
                Each release should feature an interactive sandbox. Pushing boundaries through digital art feeds growth.
              </p>
            </motion.div>
          </RevealItem>
        </div>
      </ScrollReveal>


      {/* 3. Chill statement quote signoff */}
      <ScrollReveal className="py-12 border-y border-current/10 text-center relative w-full">
        <RevealItem>
          <p className="font-serif text-2xl sm:text-3xl max-w-2xl mx-auto leading-relaxed font-light italic text-slate-500">
            "The best way to predict the future is to invent it."
          </p>
        </RevealItem>
        <div className="absolute bottom-2 right-2 text-[8px] font-mono opacity-30 select-none">
          *15-year old student founder specializing in clean frontend layout frames & mock system compilers
        </div>
      </ScrollReveal>

    </div>
  );
}
