import React from "react";
import { 
  Award, 
  BookOpen, 
  Sparkles, 
  Clock, 
  Target, 
  Users, 
  Flame, 
  Trophy, 
  TrendingUp, 
  Globe
} from "lucide-react";
import { motion } from "motion/react";

interface StavexViewProps {
  isDarkMode: boolean;
}

export default function StavexView({ isDarkMode }: StavexViewProps) {
  // Stagger variants for elegant content reveal
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

  const systemSpecs = [
    { label: "Venture Milestones", value: "Guided Idea Roadmap", desc: "A progressive path mapping ideas from initial validation and prototyping to active launch, metrics, and pitches." },
    { label: "Community Proof", value: "Weekly Show & Tell Logs", desc: "Earn public accountability metrics by uploading weekly proof of action and progress snapshots." },
    { label: "Support Network", value: "Expert Committee Review", desc: "Acquire high-quality advisory guidance, validation, and constructive design notes from experienced builders." },
    { label: "Incentive Hub", value: "Points & Custom Rewards", desc: "Succeed at build milestones, accumulate points, unlock badges, and highlight your visual portfolio." }
  ];

  const architecturalPillars = [
    {
      icon: <Target className="w-5 h-5 text-indigo-500" />,
      title: "Clean Goal Structure",
      desc: "Keeps builders aligned with simple daily and weekly objectives, helping you move from raw concepts to complete projects."
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-500" />,
      title: "Dynamic Co-Working",
      desc: "Sync up with other creative teen founders, share resources, and bounce ideas around in safe, dedicated spaces."
    },
    {
      icon: <Trophy className="w-5 h-5 text-indigo-500" />,
      title: "Real Progress Proof",
      desc: "Stop leaving scripts unfinished. Build a visible, reviewable timeline showing genuine, high-quality progress."
    },
    {
      icon: <Flame className="w-5 h-5 text-indigo-500" />,
      title: "Ignite Accountability",
      desc: "Automatically tracks weekly streaks, ensuring you maintain optimal builder momentum without burning out."
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={containerVariants}
      className="space-y-16 md:space-y-24 w-full select-text text-center sm:text-left max-w-5xl mx-auto px-2"
    >
      {/* 1. Luxurious Page Banner */}
      <motion.section variants={itemVariants} className="text-center space-y-4 max-w-3xl mx-auto py-4">
        <div className="flex items-center space-x-2 justify-center">
          <Award className="w-4 h-4 text-indigo-500" />
          <span className="font-mono text-xs text-indigo-500 font-bold tracking-widest uppercase">The Teen Founder Engine</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-center leading-tight">
          Stavex <span className="italic block mt-1">Unleash Your Maker Potential.</span>
        </h2>
        <p className="font-serif italic text-lg sm:text-xl text-slate-500 text-center max-w-2xl mx-auto">
          The ultimate platform helping teen founders turn great ideas into real, validated projects with absolute focus.
        </p>
        <div className="pt-2 flex justify-center">
          <a
            href="https://stavex.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-indigo-500 text-white font-mono text-xs uppercase tracking-wider rounded-lg font-bold hover:bg-indigo-600 transition-colors cursor-pointer shadow-sm"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Visit Stavex (stavex.org)</span>
          </a>
        </div>
      </motion.section>
      
      {/* 2. Panoramic Visual Overview Grid */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
        <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest text-center md:text-left">ABOUT THE PLATFORM_</span>
          <h3 className="font-serif text-3xl md:text-4xl font-normal leading-tight text-center md:text-left w-full">
            Stop dreaming. Start launching.
          </h3>
          <p className="opacity-80 text-sm sm:text-base leading-relaxed font-light text-center md:text-left">
            Stavex is a teen founder platform that helps ambitious students turn ideas into real projects through structure, accountability, proof, and recognition. Instead of leaving teens alone with vague inspiration, Stavex gives them a guided path from idea to validation, prototype, launch, growth, metrics, and pitch.
          </p>
          <p className="opacity-80 text-sm sm:text-base leading-relaxed font-light text-center md:text-left">
            Inside Stavex, builders complete weekly tasks, submit proof of progress, receive feedback from a review committee, earn points, unlock rewards, and build public profiles that show their journey. The goal is to become the operating system for teen builders: helping them stop leaving ideas unfinished and start building visible, reviewable progress every week. Find out more at <a href="https://stavex.org" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline font-bold">stavex.org</a>!
          </p>
        </div>

        {/* Visual Mock Card / Telemetry Diagram resembling a sleek control dashboard */}
        <div className={`p-6 sm:p-8 rounded-2xl border ${
          isDarkMode ? "bg-stone-900/35 border-white/5" : "bg-white border-stone-200"
        } relative overflow-hidden space-y-6 shadow-sm`}>
          {/* Decorative frame grid ticks */}
          <div className="absolute top-4 right-4 text-[9px] font-mono opacity-30">BUILDER METRICS</div>
          
          <div className="flex items-center space-x-3 border-b border-current/10 pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">Live Workspace Performance_</span>
          </div>

          <div className="space-y-4 font-mono text-xs text-left">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="opacity-60">Active Project Pulse:</span>
                <span className="text-indigo-400">Highly Engaged Builders</span>
              </div>
              <div className="h-1.5 bg-current/5 rounded overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: "92%" }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="opacity-60">Idea-to-Prototype Rate:</span>
                <span className="text-emerald-400">Excellent Success Speed</span>
              </div>
              <div className="h-1.5 bg-current/5 rounded overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "87%" }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-current/5 text-[10px]">
              <div>
                <span className="opacity-50 block uppercase">Review Speed:</span>
                <span className="font-bold text-sm text-current">24-48 Hours</span>
              </div>
              <div>
                <span className="opacity-50 block uppercase">Teen Creators:</span>
                <span className="font-bold text-sm text-current">Hundreds Worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Architectural Pillars Bento Grid */}
      <motion.section variants={itemVariants} className="space-y-8">
        <div className="border-b border-current/10 pb-4 text-center sm:text-left">
          <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest block mb-1">PROGRAM BENEFITS</span>
          <h3 className="font-serif text-3xl font-normal italic">Key Builder Goals</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {architecturalPillars.map((pillar, idx) => (
            <motion.div 
              key={pillar.title}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isDarkMode 
                  ? "bg-zinc-900/30 border-white/5 hover:border-indigo-500/50 hover:bg-[#0c0c0e]" 
                  : "bg-white border-stone-200 hover:border-indigo-500/50 hover:shadow-lg"
              }`}
            >
              <div className="space-y-4 flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="p-3 rounded-xl bg-indigo-500/5 w-fit mx-auto sm:mx-0">
                  {pillar.icon}
                </div>
                <h4 className="font-serif text-xl font-normal italic w-full">{pillar.title}</h4>
                <p className="text-xs opacity-75 leading-relaxed font-light">{pillar.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 4. Technical Specifications Sheet */}
      <motion.section variants={itemVariants} className="space-y-8">
        <div className="border-b border-current/10 pb-4 text-center sm:text-left">
          <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest block mb-1 font-bold">PLATFORM STRUCTURE</span>
          <h3 className="font-serif text-3xl font-normal italic">Daily Accountability Cycle</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {systemSpecs.map((spec) => (
            <div 
              key={spec.label}
              className={`p-6 rounded-2xl border ${
                isDarkMode ? "border-white/5 bg-zinc-900/10" : "border-stone-200 bg-white"
              } flex flex-col space-y-2 text-center md:text-left items-center md:items-start hover:bg-current/[0.01] transition-all`}
            >
              <span className="font-mono text-indigo-500 font-bold tracking-widest text-[10px] uppercase text-center md:text-left">
                {spec.label}
              </span>
              <h4 className="font-serif text-xl font-normal text-current leading-snug text-center md:text-left w-full">
                {spec.value}
              </h4>
              <p className="text-xs opacity-70 leading-relaxed font-light pt-1 text-center md:text-left">
                {spec.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 5. Minimal Editorial Callout Footer */}
      <motion.section variants={itemVariants} className={`p-8 rounded-2xl border text-center relative ${
        isDarkMode ? "bg-stone-900/20 border-white/5" : "bg-white border-stone-100"
      }`}>
        <p className="font-serif italic text-lg opacity-85 leading-relaxed max-w-2xl mx-auto">
          "Stavex is built on a very simple dream: that software should be light, fast, tidy, and built purely to help you create great things."
        </p>
        <span className="font-mono text-[9px] opacity-40 uppercase tracking-[0.25em] block mt-4">PRANAV · PROJECT BUILDER</span>
      </motion.section>
    </motion.div>
  );
}

