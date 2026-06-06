import React from "react";
import { 
  Sparkles, 
  Brain, 
  Clock, 
  Layers, 
  ShieldAlert, 
  Compass, 
  TrendingUp, 
  Cpu
} from "lucide-react";
import { motion } from "motion/react";

interface KairoViewProps {
  isDarkMode: boolean;
}

export default function KairoView({ isDarkMode }: KairoViewProps) {
  // Stagger animation variables
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.05 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const cognitiveFeatures = [
    {
      icon: <Brain className="w-5 h-5 text-indigo-500" />,
      title: "Mental Energy Analysis",
      desc: "Analyzes task difficulty, and suggests planning your most intense study or code sessions during your fresh morning hours."
    },
    {
      icon: <Clock className="w-5 h-5 text-indigo-500" />,
      title: "Smart Break Times",
      desc: "Leaves empty breathing spaces in your schedule to help you rest and keep you from getting overwhelmed by endless tasks."
    },
    {
      icon: <Layers className="w-5 h-5 text-indigo-500" />,
      title: "Task Grouping",
      desc: "Groups similarly focused tasks together, separating structural writing from color styling so you stay in a smooth work state."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
      title: "Gentle Rescheduling",
      desc: "Checks on your completed items and balances future tasks so you meet your goals without having to rush."
    }
  ];

  const simulatedDaySchedule = [
    { time: "08:30 AM", category: "Morning Focus", label: "Brainstorming & Project Writing", desc: "The fresh energy window. Dedicated to writing clean planning documents, outlines, and initial code frameworks." },
    { time: "11:00 AM", category: "Creative Flow", label: "Interface Layout Design & Graphic Art", desc: "Drafting mockups, styling color collections, and organizing beautiful typography spacing in Figma." },
    { time: "02:30 PM", category: "Admin State", label: "Code File Review & Speed Testing", desc: "Reviewing script files, optimizing asset folders, and making sure local application builds load instantly." },
    { time: "05:00 PM", category: "Decompression", label: "Badminton Court Session & Relaxation", desc: "Playing an energetic badminton rally, resting, and stretching to keep my builder mind happy and clear." }
  ];

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={containerVariants}
      className="space-y-16 md:space-y-24 w-full select-text text-center sm:text-left max-w-5xl mx-auto px-2"
    >
      {/* 1. Page Title Narrative Banner */}
      <motion.section variants={itemVariants} className="text-center space-y-4 max-w-3xl mx-auto py-4">
        <div className="flex items-center space-x-2 justify-center">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="font-mono text-xs text-indigo-500 font-bold tracking-widest uppercase">Intellectual Engine #2</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-center leading-tight">
          Kairo AI <span className="italic block mt-1">Smarter Daily Chronology.</span>
        </h2>
        <p className="font-serif italic text-lg sm:text-xl text-slate-500 text-center max-w-2xl mx-auto">
          A design-centric cognitive scheduling model built to capture complex goals and balance daily developer performance with necessary decompression.
        </p>
      </motion.section>

      {/* 2. Concept Overview Row */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
        <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest text-center md:text-left">PHILOSOPHY_</span>
          <h3 className="font-serif text-3xl md:text-4xl font-normal leading-tight text-center md:text-left">
            Stop filling grids. Start planning cognitive states.
          </h3>
          <p className="opacity-80 text-sm sm:text-base leading-relaxed font-light text-center md:text-left">
            Modern calendars encourage a dangerous habit: scheduling every single minute of your day back-to-back with zero margin for error. This leads directly to stress, missed targets, and sub-optimal output.
          </p>
          <p className="opacity-80 text-sm sm:text-base leading-relaxed font-light text-center md:text-left">
            <strong>Kairo AI</strong> is a task management architecture. Instead of treating time like linear blocks, Kairo models days around mental stamina waves and focus thresholds, organizing tasks where they belong based on cognitive load.
          </p>
        </div>

        {/* Cognitive Wave Visual Mock Card */}
        <div className={`p-6 sm:p-8 rounded-2xl border ${
          isDarkMode ? "bg-stone-900/35 border-white/5" : "bg-indigo-50/10 border-black/10"
        } relative overflow-hidden space-y-6 shadow-sm`}>
          <div className="absolute top-4 right-4 text-[9px] font-mono opacity-30">KAIRO_MODEL_v1.2</div>
          
          <div className="flex items-center space-x-3 border-b border-current/10 pb-4">
            <Cpu className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">COGNITIVE LOAD DISTRIBUTION TYPE</span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {/* Visual focus curves representing human limits */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="opacity-60">EARLY PEAK (09:00 - 12:00):</span>
                <span className="text-indigo-400 font-bold">100% Stamina Cap</span>
              </div>
              <div className="h-2 bg-current/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400" style={{ width: "95%" }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="opacity-60">AFTERNOON SLOPE (14:00 - 17:00):</span>
                <span className="text-amber-500 font-bold">62% (Ideal Creative Flow)</span>
              </div>
              <div className="h-2 bg-current/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400" style={{ width: "62%" }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="opacity-60">INTELLIGENT BUFFER SLOTS:</span>
                <span className="text-emerald-500 font-bold">25% (Mandatory Healing)</span>
              </div>
              <div className="h-2 bg-current/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: "25%" }} />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Architectural Pillars Grid */}
      <motion.section variants={itemVariants} className="space-y-8">
        <div className="border-b border-current/10 pb-4 text-center sm:text-left">
          <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest block mb-1">DESIGN ANATOMY</span>
          <h3 className="font-serif text-3xl font-normal italic">Planner Components</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cognitiveFeatures.map((feature, idx) => (
            <motion.div 
              key={feature.title}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isDarkMode 
                  ? "bg-zinc-900/30 border-white/5 hover:border-indigo-500/50 hover:bg-[#0c0c0e]" 
                  : "bg-white border-black/5 hover:border-indigo-500/50 hover:shadow-lg"
              }`}
            >
              <div className="space-y-4 flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="p-3 rounded-xl bg-indigo-500/5 w-fit mx-auto sm:mx-0">
                  {feature.icon}
                </div>
                <h4 className="font-serif text-xl font-normal italic w-full">{feature.title}</h4>
                <p className="text-xs opacity-75 leading-relaxed font-light">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 4. Elegant Timeline Example Section */}
      <motion.section variants={itemVariants} className="space-y-8">
        <div className="border-b border-current/10 pb-4 text-center sm:text-left">
          <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest block mb-1">HARMONIZED CHRONOLOGY</span>
          <h3 className="font-serif text-3xl font-normal italic">An Ideal Kairo Distribution</h3>
        </div>

        <div className="space-y-4">
          {simulatedDaySchedule.map((item, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl border border-current/5 bg-current/[0.01] flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 hover:bg-current/[0.02] transition-colors`}
            >
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 shrink-0">
                <span className="font-mono text-sm text-indigo-500 font-bold whitespace-nowrap">{item.time}</span>
                <span className="text-[9px] font-mono border border-current/10 px-2 py-0.5 rounded-full uppercase tracking-wider text-current/60 bg-current/5">
                  {item.category}
                </span>
              </div>
              <div className="flex-grow space-y-1 text-center sm:text-left flex flex-col items-center sm:items-start w-full">
                <h4 className="font-serif text-xl font-normal text-current leading-snug w-full">
                  {item.label}
                </h4>
                <p className="text-xs opacity-75 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* AI Schedule Synthesis Core Explanation */}
      <motion.section variants={itemVariants} className="space-y-8">
        <div className="border-b border-current/10 pb-4 text-center sm:text-left">
          <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest block mb-1">COGNITIVE ENGINE INTEGRATION</span>
          <h3 className="font-serif text-3xl font-normal italic">How Kairo Uses AI for Complete Schedule Synclink</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Phase 1: Natural Task Dump */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode ? "bg-stone-900/20 border-white/5" : "bg-white border-black/5"
          } flex flex-col justify-between text-center sm:text-left h-full`}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <span className="font-mono text-[9px] border border-current/10 px-2 py-0.5 rounded bg-current/5 font-bold">01_INPUT</span>
                <span className="font-mono text-[9px] uppercase tracking-wider opacity-60">Raw Task Dump</span>
              </div>
              <h4 className="font-serif text-xl font-normal italic">Natural Language Input</h4>
              <p className="text-xs opacity-75 font-light leading-relaxed">
                Users dump unformatted thoughts: <span className="italic">"finish writing pitch deck, style the button headers in react, review analytics, practice violin."</span> The engine accepts raw textual syntax without forcing neat forms.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-current/5 font-mono text-[10px] text-indigo-500 font-bold block w-full text-center sm:text-left">
              Task Stream → Captured
            </div>
          </div>

          {/* Phase 2: Cognitive Classifier Engine */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode ? "bg-indigo-950/15 border-indigo-500/20" : "bg-indigo-500/5 border-indigo-500/10"
          } flex flex-col justify-between text-center sm:text-left h-full relative overflow-hidden`}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <span className="font-mono text-[9px] bg-indigo-500 text-white px-2 py-0.5 rounded font-bold">02_BRAIN</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-indigo-500 font-bold">Gemini Cognitive Sync</span>
              </div>
              <h4 className="font-serif text-xl font-normal italic">Stamina-Aware Scheduling</h4>
              <p className="text-xs opacity-75 font-light leading-relaxed">
                A customized Gemini model parses task priorities, filters duplicate items, predicts overall mental friction, and cluster-groups relevant chores together. High-load writing tasks are mapped to morning stamina spikes automatically.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-current/5 font-mono text-[10px] text-indigo-500 font-bold block w-full text-center sm:text-left">
              Core Optimization Active ⚡
            </div>
          </div>

          {/* Phase 3: Seamless Workspace Sync */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode ? "bg-stone-900/20 border-white/5" : "bg-white border-black/5"
          } flex flex-col justify-between text-center sm:text-left h-full`}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <span className="font-mono text-[9px] border border-current/10 px-2 py-0.5 rounded bg-current/5 font-bold">03_OUT</span>
                <span className="font-mono text-[9px] uppercase tracking-wider opacity-60">Integrated Workspace Link</span>
              </div>
              <h4 className="font-serif text-xl font-normal italic">Integrated Live Master Calendar</h4>
              <p className="text-xs opacity-75 font-light leading-relaxed">
                Outputs an interactive, responsive chronology synced elegantly with standard third-party tools. Changes in Kairo propagate instantly to Google Calendar & Outlook, securing a fluid source of daily direction on all screens.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-current/5 font-mono text-[10px] text-indigo-500 font-bold block w-full text-center sm:text-left">
              Global Synchronization Enabled
            </div>
          </div>

        </div>
      </motion.section>

      {/* 5. Clean layout footer callout */}
      <motion.section variants={itemVariants} className={`p-8 rounded-2xl border text-center relative ${
        isDarkMode ? "bg-stone-900/20 border-white/5" : "bg-indigo-50/5 border-black/5"
      }`}>
        <p className="font-serif italic text-lg opacity-85 leading-relaxed max-w-2xl mx-auto">
          "By syncing workloads with naturally occurring circadian focus waves, Kairo turns traditional schedules from checklists into harmonized daily narratives."
        </p>
        <span className="font-mono text-[9px] opacity-40 uppercase tracking-[0.25em] block mt-4">PRANAV · AI DESIGN ASSOCIATE</span>
      </motion.section>
    </motion.div>
  );
}
