import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Compass, Cpu, BrainCircuit, Activity, Command, HelpCircle, Radio, Sparkles, X, Users, Layers, TrendingUp, CheckCircle2, Sliders, Milestone } from "lucide-react";
import { motion, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from "motion/react";
import { ViewTab } from "../types";

interface VenturesViewProps {
  isDarkMode: boolean;
  setActiveTab: (tab: ViewTab) => void;
  readStates?: Record<string, boolean>;
}

interface TiltCardProps {
  children: React.ReactNode;
  className: string;
  onMouseEnter?: () => void;
  isDarkMode: boolean;
  onClick?: () => void;
}

function TiltCard({ children, className, onMouseEnter, isDarkMode, onClick }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // High performance hardware-accelerated style interpolators
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const pX = useMotionValue(0);
  const pY = useMotionValue(0);
  
  // Spotlight cursor coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smoothly animated spotlight opacity
  const spotlightOpacity = useSpring(0, { stiffness: 180, damping: 24 });

  // Damping springs for smooth momentum
  const springConfig = { stiffness: 120, damping: 20, mass: 0.5 };
  const rotateX = useSpring(x, springConfig);
  const rotateY = useSpring(y, springConfig);
  const springParallaxX = useSpring(pX, springConfig);
  const springParallaxY = useSpring(pY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates between -0.5 and 0.5 for 3D tilt
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Direct spring rotation ratios (maximum 12 degrees pitch/yaw)
    x.set(-relativeY * 12);
    y.set(relativeX * 12);

    // Parallax background glow displacement (maximum 24px)
    pX.set(relativeX * 24);
    pY.set(relativeY * 24);

    // Absolute coordinates for spotlight effect
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    spotlightOpacity.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    pX.set(0);
    pY.set(0);
    spotlightOpacity.set(0);
  };

  const handleMouseEnter = () => {
    spotlightOpacity.set(1);
    if (onMouseEnter) onMouseEnter();
  };

  // Generate dynamic gradient that follows mouse coordinates in real-time
  const spotlightBg = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${
    isDarkMode 
      ? "rgba(99, 102, 241, 0.15)" 
      : "rgba(99, 102, 241, 0.09)"
  }, transparent 80%)`;

  return (
    <div style={{ perspective: "1000px" }} className="h-full w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className={`${className} relative overflow-hidden cursor-pointer group`}
      >
        {/* Layer 1: Ambient Parallax Glow Accent (shifts opposite to cursor at translateZ(5px)) */}
        <motion.div 
          style={{ 
            x: springParallaxX, 
            y: springParallaxY, 
            transform: "translateZ(5px)",
            pointerEvents: "none"
          }}
          className="absolute -inset-10 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent opacity-60 rounded-full"
        />

        {/* Dynamic Spotlight Follow Layer */}
        <motion.div 
          style={{
            background: spotlightBg,
            opacity: spotlightOpacity,
            pointerEvents: "none"
          }}
          className="absolute inset-0 z-10"
        />

        {/* Click indicator helper pill */}
        <div className="absolute top-4 inset-x-0 mx-auto w-fit z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="font-mono text-[8px] bg-indigo-500/10 text-indigo-500 px-2 py-1 rounded-full border border-indigo-500/25 tracking-wide uppercase">
            Click to expand blueprint specs
          </span>
        </div>

        {/* Layer 2: Main content cards with high translateZ depth */}
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full flex flex-col justify-between relative z-20">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default function VenturesView({ isDarkMode, setActiveTab, readStates }: VenturesViewProps) {
  const [activeModal, setActiveModal] = useState<"stavex" | "kairo" | null>(null);

  // Lock scrolling when fullscreen specifications blueprint modal is active
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  // Pure Framer Motion Editorial Scroll-Stagger Specs
  const sectionStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const cardReveal = {
    hidden: { opacity: 0, y: 35, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 55,
        damping: 15,
        mass: 0.82
      }
    }
  };

  // Custom high-fashion synthesized audio hum utilizing oscillator frequency ramp
  const playSubtleHoverSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      // high fashion sub harmonic hum
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.18);

      gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (_) {
      // Audio block safeguards
    }
  };

  return (
    <div className="space-y-16 md:space-y-24 animate-fade-in text-center flex flex-col items-center">
      
      {/* Visual Header introduction */}
      <section className="space-y-6 flex flex-col items-center text-center max-w-3xl">
        <div className="flex items-center space-x-2 justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest font-bold">/ DEVELOPMENT VENTURES</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-tight text-center">
          Projects and modular <span className="italic block mt-1">technical showpieces.</span>
        </h2>
        <p className="font-serif italic text-xl text-slate-500 max-w-xl text-center">
          A hand-picked directory of digital interfaces, animation engines, and technical concepts.
        </p>
      </section>

      {/* Dual Content Venture Panels */}
      <motion.section 
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-4xl mx-auto"
      >
        
        {/* Venture 1: Stavex */}
        <motion.div variants={cardReveal} className="h-full flex flex-col">
          <TiltCard 
            isDarkMode={isDarkMode}
            onMouseEnter={playSubtleHoverSound}
            onClick={() => setActiveModal("stavex")}
            className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between items-center text-center space-y-8 h-full transition-all duration-300 backdrop-blur-md hover:shadow-indigo-500/[0.04] hover:shadow-2xl ${
              isDarkMode ? "border-white/10 bg-stone-900/10 hover:border-indigo-400" : "border-black/10 bg-neutral-50/75 hover:border-indigo-500"
            }`}
          >
            <div className="space-y-6 flex flex-col items-center w-full">
              <div className="flex items-center justify-between w-full text-[11px] font-mono">
                <div className="flex items-center space-x-2">
                  <span className="opacity-50">VENTURE // 01</span>
                  {!readStates?.stavex && (
                    <span className="text-[8px] font-mono px-1.5 py-0.5 bg-indigo-500 text-white rounded font-bold animate-pulse">NEW</span>
                  )}
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 border rounded uppercase ${readStates?.stavex ? "text-emerald-500 border-emerald-500/10 bg-emerald-500/5" : "text-amber-500 border-amber-500/10 bg-amber-500/5"}`}>
                  {readStates?.stavex ? "read" : "unread"}
                </span>
              </div>

              <div className="space-y-3 flex flex-col items-center w-full">
                <h3 className="font-serif text-3xl font-normal italic text-center uppercase tracking-wide">Stavex</h3>
                <p className="text-sm opacity-80 leading-relaxed font-light text-center">
                  A teen founder platform helping ambitious students turn ideas into real projects with structured weekly tasks, peer validation, and verified progress profiles.
                </p>
              </div>

              <ul className="space-y-2.5 text-[11px] font-mono opacity-80 text-center w-full flex flex-col items-center justify-center">
                <li className="flex items-center justify-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                  <span>Guided Roadmap: Idea to Launch</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                  <span>Evidence-based Weekly Peer Proof</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                  <span>Points & Gamified Reward Circles</span>
                </li>
              </ul>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab("stavex");
                const el = document.getElementById("main-scroll-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center space-x-2 text-[10px] font-mono border border-current px-3.5 py-2 rounded w-full sm:w-auto hover:bg-current hover:text-[#faf9f5] transition-colors uppercase cursor-pointer text-center mt-6 z-30 relative"
            >
              <span>Explore Stavex</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </TiltCard>
        </motion.div>

        {/* Venture 2: Kairo AI */}
        <motion.div variants={cardReveal} className="h-full flex flex-col">
          <TiltCard 
            isDarkMode={isDarkMode}
            onMouseEnter={playSubtleHoverSound}
            onClick={() => setActiveModal("kairo")}
            className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between items-center text-center space-y-8 h-full transition-all duration-300 backdrop-blur-md hover:shadow-indigo-500/[0.04] hover:shadow-2xl ${
              isDarkMode ? "border-white/10 bg-stone-900/10 hover:border-indigo-400" : "border-black/10 bg-neutral-50/75 hover:border-indigo-500"
            }`}
          >
            <div className="space-y-6 flex flex-col items-center w-full">
              <div className="flex items-center justify-between w-full text-[11px] font-mono">
                <div className="flex items-center space-x-2">
                  <span className="opacity-50">VENTURE // 02</span>
                  {!readStates?.kairo && (
                    <span className="text-[8px] font-mono px-1.5 py-0.5 bg-indigo-500 text-white rounded font-bold animate-pulse">NEW</span>
                  )}
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 border rounded uppercase ${readStates?.kairo ? "text-emerald-500 border-emerald-500/10 bg-emerald-500/5" : "text-amber-500 border-amber-500/10 bg-amber-500/5"}`}>
                  {readStates?.kairo ? "read" : "unread"}
                </span>
              </div>

              <div className="space-y-3 flex flex-col items-center w-full">
                <h3 className="font-serif text-3xl font-normal italic text-center uppercase tracking-wide">Kairo AI</h3>
                <p className="text-sm opacity-80 leading-relaxed font-light text-center">
                  A cognitive priority daily task layout. Understand mental peak curves, adapt stress-preventive buffer hours, and explore workload harmonization mechanics.
                </p>
              </div>

              <ul className="space-y-2.5 text-[11px] font-mono opacity-80 text-center w-full flex flex-col items-center justify-center">
                <li className="flex items-center justify-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                  <span>Cognitive stamina load mapping</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                  <span>Stress-free focus buffer models</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                  <span>Circadian chronology scheduling</span>
                </li>
              </ul>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab("kairo");
                const el = document.getElementById("main-scroll-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center space-x-2 text-[10px] font-mono border border-current px-3.5 py-2 rounded w-full sm:w-auto hover:bg-current hover:text-[#faf9f5] transition-colors uppercase cursor-pointer text-center mt-6 z-30 relative"
            >
              <span>Explore Kairo Planner</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </TiltCard>
        </motion.div>

      </motion.section>



      {/* 6. Fullscreen Modal Blueprint Specs Overlay */}
      <AnimatePresence>
        {activeModal && (() => {
          const isStavex = activeModal === "stavex";
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md overflow-y-auto select-none"
              onClick={() => setActiveModal(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full max-w-4xl rounded-3xl border p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto text-left ${
                  isDarkMode 
                    ? "bg-stone-950 border-white/10 text-white" 
                    : "bg-[#f5f3ef] border-black/10 text-[#1a1917]"
                }`}
              >
                {/* Background decorative grid layout */}
                <div className="absolute inset-0 bg-neutral-500/[0.03] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

                {/* Header segment with layout and design */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-current/10 pb-6 gap-4 relative z-10">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[9px] text-indigo-500 font-bold uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {isStavex ? "SYSTEM BLUEPRINT // 01" : "SYSTEM BLUEPRINT // 02"}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl font-light italic mt-1.5">
                      {isStavex ? "Stavex OS Technical Blueprint" : "Kairo AI Cognitive Blueprint"}
                    </h3>
                    <p className="font-serif italic text-base opacity-60">
                      {isStavex 
                        ? "The peer-to-peer teen development operating system" 
                        : "Chronological alignment and stress-preventive daily planning"}
                    </p>
                  </div>
                  
                  {/* Close button with high-contrast label */}
                  <button
                    onClick={() => setActiveModal(null)}
                    className="group ml-auto sm:ml-0 inline-flex items-center space-x-2 border border-current/15 hover:border-indigo-500 hover:text-indigo-500 px-3 py-1.5 rounded-full bg-current/[0.01] hover:bg-indigo-500/5 transition-all text-[11px] font-mono uppercase cursor-pointer"
                  >
                    <span>Close Spec Sheet</span>
                    <X className="w-3.5 h-3.5 transition-transform group-hover:rotate-90" />
                  </button>
                </div>

                {/* Core Grid content splits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 relative z-10">
                  
                  {/* Column 1: Detailed Specifications */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Layers className="w-4 h-4 text-indigo-500" />
                        <h4 className="font-mono text-xs uppercase tracking-wider font-bold">Project Specifications</h4>
                      </div>
                      <p className="text-xs opacity-85 leading-relaxed font-light">
                        {isStavex
                          ? "A customized gamified experience linking progress validation directly with global communities. Young founders complete weekly development sprints, submit dynamic evidence logs, complete peer reviews, and earn network validation points."
                          : "An intelligent timeline planning system that maps cognitive stamina states rather than raw hourly lists. Automatically calculates morning/afternoon bandwidth drops, schedules creative buffers, and syncs calendar pipelines seamlessly."}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Internal Stack Details</h5>
                      <div className="space-y-3">
                        {isStavex ? (
                          <>
                            <div className="p-3.5 rounded-xl border border-current/5 bg-current/[0.02] space-y-1">
                              <span className="block font-mono text-[9px] opacity-65 uppercase">Client Architecture</span>
                              <p className="text-xs font-light">React 18, Vite Bundler, Framer Motion springs, modular multi-axis coordinate layouts, custom local synchronization hooks.</p>
                            </div>
                            <div className="p-3.5 rounded-xl border border-current/5 bg-current/[0.02] space-y-1">
                              <span className="block font-mono text-[9px] opacity-65 uppercase">State & Validation Mechanics</span>
                              <p className="text-xs font-light">Structured weekly peer-evaluation metrics, automated gamified milestone progress logs, streak verification rules.</p>
                            </div>
                            <div className="p-3.5 rounded-xl border border-current/5 bg-current/[0.02] space-y-1">
                              <span className="block font-mono text-[9px] opacity-65 uppercase">Network Infrastructure</span>
                              <p className="text-xs font-light">Edge content replication, distributed serverless cloud clusters, regional high-performance media storage buckets for evidence files.</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="p-3.5 rounded-xl border border-current/5 bg-current/[0.02] space-y-1">
                              <span className="block font-mono text-[9px] opacity-65 uppercase">LLM & Intelligence Pipeline</span>
                              <p className="text-xs font-light">Gemini Integration via @google/genai SDK, stress-preventive schedule synthesis, automatic task duration estimators.</p>
                            </div>
                            <div className="p-3.5 rounded-xl border border-current/5 bg-current/[0.02] space-y-1">
                              <span className="block font-mono text-[9px] opacity-65 uppercase">Visual Chronology Engine</span>
                              <p className="text-xs font-light">Dynamic vector grid overlay matching custom user focus models, non-blocking asynchronous event charts, sound wave frequency loaders.</p>
                            </div>
                            <div className="p-3.5 rounded-xl border border-current/5 bg-current/[0.02] space-y-1">
                              <span className="block font-mono text-[9px] opacity-65 uppercase">Workspace Integration</span>
                              <p className="text-xs font-light">Secure external calendar pipelines using OAuth 2.0 refresh flow, multi-user sync loops with local offline caching layers.</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Team and Dev Status */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-indigo-500" />
                        <h4 className="font-mono text-xs uppercase tracking-wider font-bold">Team & Contributors</h4>
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-xs font-mono border-b border-current/5 pb-2">
                          <span className="font-bold text-indigo-500">Pranav Ramanathan</span>
                          <span className="opacity-75">{isStavex ? "Founder & Lead Architect" : "Creator & Lead Dev"}</span>
                        </div>
                        {isStavex && (
                          <div className="flex justify-between items-center text-xs font-mono border-b border-current/5 pb-2">
                            <span className="font-bold">Design Committee</span>
                            <span className="opacity-75">Swiss Typography & Fine Motion</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center text-xs font-mono border-b border-current/5 pb-2">
                          <span className="font-semibold">Community Guilds</span>
                          <span className="opacity-75">14 Active Peer Nodes</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-indigo-500" />
                        <h4 className="font-mono text-xs uppercase tracking-wider font-bold">Development Status</h4>
                      </div>
                      
                      <div className="p-4 rounded-xl border border-current/5 bg-current/[0.02] space-y-4">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span>CORE ENGINE METRIC:</span>
                          <span className="text-indigo-500 font-bold">{isStavex ? "86%" : "92%"} READY</span>
                        </div>
                        
                        {/* Custom visual sliding progress bar */}
                        <div className="h-2 w-full bg-current/10 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isStavex ? "86%" : "92%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute inset-y-0 left-0 bg-indigo-500 rounded-full"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2">
                          <div>
                            <span className="block text-[8px] opacity-50 uppercase">Current Stage</span>
                            <span className="font-bold text-indigo-500 uppercase">{isStavex ? "Public Beta Seed" : "Private Production"}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] opacity-50 uppercase">Active Guilds / Hours</span>
                            <span className="font-bold text-indigo-500 uppercase">{isStavex ? "14 guilds verified" : "400+ tracking hours"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Milestones / Future Work timeline overview */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Milestone className="w-4 h-4 text-indigo-500" />
                        <h4 className="font-mono text-xs uppercase tracking-wider font-bold">Upcoming Milestones</h4>
                      </div>
                      <ul className="space-y-2 text-xs font-light">
                        {isStavex ? (
                          <>
                            <li className="flex items-start space-x-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                              <span>Custom user-authored directory profiles with proof chains.</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full shrink-0 mt-2 ml-1" />
                              <span className="opacity-80">Full-stack multi-user chat and verification loops (Upcoming).</span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-start space-x-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                              <span>Stamina forecasting algorithms tuned on user responses.</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full shrink-0 mt-2 ml-1" />
                              <span className="opacity-80">Sync directly with Outlook 365 / Microsoft ToDo (Upcoming).</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>

                  </div>

                </div>

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
