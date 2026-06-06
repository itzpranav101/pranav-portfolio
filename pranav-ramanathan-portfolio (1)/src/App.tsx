import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon, Menu, X, ArrowUpRight, Compass, Heart, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import VenturesView from "./components/VenturesView";
import StavexView from "./components/StavexView";
import KairoView from "./components/KairoView";
import ContactView from "./components/ContactView";
import TypewriterText from "./components/TypewriterText";
import { ViewTab } from "./types";
import NiceStuff from "./components/NiceStuff";

const getFaviconSvg = (tab: ViewTab, isDark: boolean): string => {
  const color = isDark ? "#6366f1" : "#4f46e5"; // Indigo accent color
  const bg = isDark ? "#000000" : "#f5f3ef";
  const fg = isDark ? "#ffffff" : "#1a1917";
  
  let svgContent = "";
  switch (tab) {
    case "home":
      svgContent = `
        <circle cx="16" cy="16" r="14" fill="${color}" opacity="0.15"/>
        <circle cx="16" cy="16" r="10" stroke="${color}" stroke-width="1.5" fill="none" stroke-dasharray="2 2"/>
        <text x="16" y="21" font-family="'Instrument Serif', Georgia, serif" font-weight="700" font-size="14" fill="${fg}" text-anchor="middle">P</text>
      `;
      break;
    case "about":
      svgContent = `
        <circle cx="16" cy="16" r="12" stroke="${color}" stroke-width="2" fill="none"/>
        <circle cx="16" cy="16" r="6" fill="${fg}"/>
      `;
      break;
    case "ventures":
      svgContent = `
        <path d="M16 4 L21 11 L28 16 L21 21 L16 28 L11 21 L4 16 L11 11 Z" fill="${color}"/>
        <circle cx="16" cy="16" r="3" fill="${fg}"/>
      `;
      break;
    case "stavex":
      svgContent = `
        <rect x="5" y="5" width="22" height="22" rx="5" fill="${fg}"/>
        <text x="16" y="21" font-family="Georgia, serif" font-weight="bold" font-size="15" fill="${bg}" text-anchor="middle">S</text>
      `;
      break;
    case "kairo":
      svgContent = `
        <circle cx="16" cy="16" r="12" stroke="${color}" stroke-width="2" fill="none"/>
        <line x1="16" y1="16" x2="16" y2="8" stroke="${fg}" stroke-width="2" stroke-linecap="round"/>
        <line x1="16" y1="16" x2="22" y2="16" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      `;
      break;
    case "contact":
      svgContent = `
        <rect x="5" y="7" width="22" height="18" rx="3.5" stroke="${color}" stroke-width="2" fill="none"/>
        <path d="M5 9 L16 16 L27 9" stroke="${fg}" stroke-width="1.5" fill="none"/>
      `;
      break;
    default:
      svgContent = `
        <circle cx="16" cy="16" r="10" fill="${color}"/>
      `;
  }
  
  const rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${svgContent}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`;
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>("home");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("pranav_theme");
    return saved ? saved === "dark" : false; // default to elegant light
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [laserTrigger, setLaserTrigger] = useState(0);
  const [readStates, setReadStates] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("pranav_read_states");
      return saved ? JSON.parse(saved) : { stavex: false, kairo: false };
    } catch (_) {
      return { stavex: false, kairo: false };
    }
  });
  const [sgtTime, setSgtTime] = useState<string>("");

  useEffect(() => {
    setLaserTrigger(prev => prev + 1);
  }, [activeTab]);

  // Synchronise Singapore Standard Time (SGT)
  useEffect(() => {
    const updateTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "Asia/Singapore",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        };
        const formatter = new Intl.DateTimeFormat("en-US", options);
        setSgtTime(formatter.format(new Date()));
      } catch (_) {
        setSgtTime(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync active reading states
  useEffect(() => {
    if (activeTab === "stavex" || activeTab === "kairo") {
      setReadStates(prev => {
        if (prev[activeTab]) return prev; // already marked as read
        const updated = { ...prev, [activeTab]: true };
        localStorage.setItem("pranav_read_states", JSON.stringify(updated));
        return updated;
      });
    }
  }, [activeTab]);

  // Handle resetting unread states for testability / playfulness
  const resetReadStates = () => {
    const initialized = { stavex: false, kairo: false };
    setReadStates(initialized);
    localStorage.setItem("pranav_read_states", JSON.stringify(initialized));
  };
  
  // Directly targeting the DOM element ref for high-performance visual feedback
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Custom high-performance smooth scroll utility using requestAnimationFrame with cubic-out deceleration
  const performSmoothScrollTo = (targetY: number, duration: number = 750) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (distance === 0) return;

    let startTime: number | null = null;

    // Cubic-bezier ease-out (fast start, gradual slow down)
    const cubicOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const scrollAnimation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = cubicOut(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    };

    requestAnimationFrame(scrollAnimation);
  };

  const handleScrollToAnchor = () => {
    const el = document.getElementById("main-scroll-anchor");
    if (el) {
      const rect = el.getBoundingClientRect();
      const targetY = rect.top + window.scrollY;
      performSmoothScrollTo(targetY, 750);
    }
  };

  // Monitor scroll height to calculate precise viewport depth percentage and animate with rAF
  useEffect(() => {
    let rAFId: number;
    let targetProgress = 0;
    let currentProgress = 0;
    const easeFactor = 0.15; // smooth damping factor

    const updateProgress = () => {
      // Damped spring-like interpolation
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.05) {
        currentProgress += diff * easeFactor;
      } else {
        currentProgress = targetProgress;
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${currentProgress}%`;
      }

      rAFId = requestAnimationFrame(updateProgress);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewHeight = window.innerHeight || 800;

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        targetProgress = (scrollY / totalHeight) * 100;
      } else {
        targetProgress = 0;
      }

      // Cinematic direct style injection
      const cinematicHero = document.getElementById("cinematic-hero");
      const cinematicText = document.getElementById("cinematic-text-wrap");
      const cinematicPrompt = document.getElementById("cinematic-prompt");
      const siteHeader = document.querySelector("header");

      if (activeTab === "home") {
        if (cinematicHero && cinematicText && cinematicPrompt) {
          const ratio = Math.min(scrollY / viewHeight, 1);
          
          const textTranslateY = ratio * -84;
          const textScale = 1 - ratio * 0.12;
          const textOpacity = Math.max(1 - ratio * 1.5, 0);

          cinematicText.style.transform = `translate3d(0, ${textTranslateY}px, 0) scale3d(${textScale}, ${textScale}, 1)`;
          cinematicText.style.opacity = `${textOpacity}`;

          cinematicPrompt.style.opacity = `${Math.max(1 - ratio * 4, 0)}`;

          if (ratio >= 0.99) {
            cinematicHero.style.visibility = "hidden";
          } else {
            cinematicHero.style.visibility = "visible";
          }

          if (siteHeader) {
            if (ratio > 0.1) {
              const headerOpacity = Math.min((ratio - 0.1) / 0.35, 1);
              siteHeader.style.opacity = `${headerOpacity}`;
              siteHeader.style.pointerEvents = "auto";
            } else {
              siteHeader.style.opacity = "0";
              siteHeader.style.pointerEvents = "none";
            }
          }
        }
      } else {
        if (siteHeader) {
          siteHeader.style.opacity = "1";
          siteHeader.style.pointerEvents = "auto";
        }
      }
    };

    // Listen to scroll events with passive configuration
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial evaluation
    handleScroll();
    currentProgress = targetProgress; // start immediately aligned
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${currentProgress}%`;
    }

    // Start rAF loop
    rAFId = requestAnimationFrame(updateProgress);

    // Dynamic readjustment when the active workspace height changes
    const timer = setTimeout(handleScroll, 150);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rAFId);
      clearTimeout(timer);
    };
  }, [activeTab]);

  // Sync theme changes with DOM and localStorage
  useEffect(() => {
    localStorage.setItem("pranav_theme", isDarkMode ? "dark" : "light");
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Synchronously update favicon on activeTab and isDarkMode changes
  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = getFaviconSvg(activeTab, isDarkMode);
  }, [activeTab, isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Helper page title strings
  const getPageTitleTelemetry = () => {
    switch (activeTab) {
      case "home": return "WELCOME";
      case "about": return "MY STORY";
      case "ventures": return "VENTURES";
      case "stavex": return "STAVEX OS";
      case "kairo": return "KAIRO AI PLANNER";
      case "contact": return "GET IN TOUCH";
      default: return "PRANAV PORTFOLIO";
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case "home":
        return <HomeView isDarkMode={isDarkMode} setActiveTab={setActiveTab} readStates={readStates} />;
      case "about":
        return <AboutView isDarkMode={isDarkMode} />;
      case "ventures":
        return <VenturesView isDarkMode={isDarkMode} setActiveTab={setActiveTab} readStates={readStates} />;
      case "stavex":
        return <StavexView isDarkMode={isDarkMode} />;
      case "kairo":
        return <KairoView isDarkMode={isDarkMode} />;
      case "contact":
        return <ContactView isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-300 select-none ${
      isDarkMode ? "bg-black text-white" : "bg-[#f5f3ef] text-[#1a1917]"
    }`}>
      {/* Editorial Scroll Progress Bar */}
      <div 
        ref={progressBarRef}
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-[3px] bg-indigo-500 z-50 pointer-events-none"
        style={{ width: "0%" }}
      />

      {/* Invisible non-blocking film noise grain layout overlay */}
      <div className="fixed inset-0 pointer-events-none grain-overlay z-50 opacity-30" />
      
      {/* Cinematic Cover Section (Only on Home View) */}
      {activeTab === "home" && (
        <section 
          id="cinematic-hero" 
          className="relative h-screen w-full flex flex-col justify-center items-center px-6 overflow-hidden select-none border-b border-current/10"
        >
          {/* Ambient organic light source behind the center text */}
          <div className="absolute inset-x-0 top-1/4 bottom-1/4 bg-radial-gradient from-indigo-500/5 via-transparent to-transparent opacity-80 pointer-events-none" />

          {/* Landing State Floating Theme Switcher Toggle (Top-Right) */}
          <div className="absolute top-6 right-6 z-30 flex items-center space-x-2">
            <span className="font-mono text-[9px] uppercase tracking-wider opacity-40 hidden sm:inline">
              {isDarkMode ? "cinematic dark mode" : "premium cream mode"}
            </span>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-current/15 bg-current/[0.03] hover:bg-current/10 hover:border-current/35 transition-all cursor-pointer shadow-xs"
              title={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-500" /> : <Moon className="w-4.5 h-4.5 text-indigo-500" />}
            </button>
          </div>

          <div 
            id="cinematic-text-wrap"
            className="text-center space-y-4 max-w-2xl z-10 transition-transform duration-75 ease-out flex flex-col items-center"
          >
            <span className="font-mono text-xs opacity-50 uppercase tracking-[0.35em] block">
              STUDENT DEVELOPER · PORTFOLIO DIRECTORY
            </span>
            <h1 className="font-serif text-[8vw] sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none italic select-text whitespace-nowrap overflow-visible block w-full text-center">
              <TypewriterText text="Hey, I'm Pranav." />
            </h1>
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl opacity-60 font-light max-w-lg mx-auto">
              this is my portfolio! check it out
            </p>

            {/* Direct Centered Landing Light/Dark Mode Action */}
            <div className="pt-2 flex justify-center items-center gap-2">
              <button
                onClick={toggleTheme}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-current/15 hover:border-indigo-500 hover:text-indigo-500 bg-current/[0.01] hover:bg-indigo-500/5 transition-all text-[11px] font-mono uppercase cursor-pointer"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Switch to Light default layout</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Switch to Dark layout</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div 
            id="cinematic-prompt"
            onClick={handleScrollToAnchor}
            className="absolute bottom-12 flex flex-col items-center space-y-3 cursor-pointer group z-10"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] opacity-40 group-hover:opacity-100 transition-opacity">
              Scroll to enter
            </span>
            <div className="w-[1.5px] h-10 bg-current/15 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-4 bg-indigo-500 animate-scroll-bounce" />
            </div>
          </div>
        </section>
      )}

      {/* 1. Header Navigation System */}
      <header 
        className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-all duration-300 ${
          isDarkMode ? "bg-black/90 border-white/10" : "bg-[#f5f3ef]/90 border-black/10"
        }`}
        style={activeTab === "home" ? { opacity: 0, pointerEvents: "none" } : undefined}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-12 py-5">
          
          {/* Brand/Identity Title Click reset */}
          <div 
            onClick={() => {
              setActiveTab("home");
              performSmoothScrollTo(0, 750);
            }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className={`w-8 h-8 flex items-center justify-center font-serif text-lg font-bold border transition-colors ${
              isDarkMode 
                ? "bg-white text-black border-white group-hover:bg-black group-hover:text-white" 
                : "bg-black text-white border-black group-hover:bg-white group-hover:text-black"
            }`}>
              P
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-sm font-bold tracking-wide">Pranav</span>
              <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest">Student Founder · 15</span>
            </div>
          </div>

          {/* Desktop Navigation Links (Underlined states, beautiful high fashion styles) */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation">
            {[
              { id: "home", label: "Dashboard" },
              { id: "about", label: "Identity" },
              { id: "ventures", label: "Ventures" },
              { id: "stavex", label: "Stavex" },
              { id: "kairo", label: "Kairo AI" },
              { id: "contact", label: "Contact" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  handleScrollToAnchor();
                }}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wide transition-all border-b-2 uppercase ${
                  activeTab === tab.id
                    ? "text-indigo-500 border-indigo-500 font-bold"
                    : "text-current/60 border-transparent hover:text-current hover:border-current/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Connect actions and Theme Switcher */}
          <div className="flex items-center space-x-3">
            {/* Theme switcher */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border border-current/15 hover:bg-current/10 transition-colors mr-1`}
              title={isDarkMode ? "Switch to light minimalist state" : "Switch to dark cinematic layout"}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Mobile toggles */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 opacity-70 hover:opacity-100"
              aria-label="Toggle mobile directory menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* 2. Mobile Drawer Navigation Overlay */}
      {menuOpen && (
        <div className={`fixed inset-0 z-50 flex flex-col justify-center px-10 transition-colors duration-300 ${
          isDarkMode ? "bg-black/98" : "bg-white/98"
        }`}>
          <div className="absolute top-6 right-6">
            <button onClick={() => setMenuOpen(false)} className="p-2 opacity-75 hover:opacity-100">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-6 flex flex-col items-center">
            {[
              { id: "home", label: "Dashboard" },
              { id: "about", label: "Identity" },
              { id: "ventures", label: "Ventures" },
              { id: "stavex", label: "Stavex" },
              { id: "kairo", label: "Kairo AI" },
              { id: "contact", label: "Contact" }
            ].map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setMenuOpen(false);
                  handleScrollToAnchor();
                }}
                className={`text-2xl font-serif tracking-normal transition-all uppercase ${
                  activeTab === tab.id ? "text-indigo-500 font-bold italic" : "opacity-60 hover:opacity-100"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Global Anchor Pointer Line */}
      <div id="main-scroll-anchor" className="h-px w-full max-w-7xl mx-auto bg-current/10" />

      {/* 4. Active dynamic view dispatcher */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 pb-24 min-h-[60vh] snap-y snap-proximity relative">
        {/* High-fashion subtle digital frame lines */}
        <div className="absolute inset-x-2 sm:inset-x-4 inset-y-4 pointer-events-none border border-current/5 rounded-3xl" />
        
        {/* Frame layout precise corner indicators */}
        <div className="absolute top-8 left-4 sm:left-6 md:left-12 w-2 h-2 border-t border-l border-indigo-500/50 pointer-events-none" />
        <div className="absolute top-8 right-4 sm:right-6 md:right-12 w-2 h-2 border-t border-r border-indigo-500/50 pointer-events-none" />
        <div className="absolute bottom-8 left-4 sm:left-6 md:left-12 w-2 h-2 border-b border-l border-indigo-500/50 pointer-events-none" />
        <div className="absolute bottom-8 right-4 sm:right-6 md:right-12 w-2 h-2 border-b border-r border-indigo-500/50 pointer-events-none" />

        {/* Dynamic header telemetry locator line */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:justify-between font-mono text-[9px] opacity-45 uppercase mb-8 pb-3 border-b border-current/5 gap-2 text-center sm:text-left w-full px-4 pt-4">
          <div className="flex items-center space-x-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>LOC: .../{activeTab.toUpperCase()}_VIEW.tsx</span>
          </div>
          <div className="flex items-center flex-wrap justify-center sm:justify-end gap-3 sm:gap-4">
            {sgtTime && (
              <span className="inline-flex items-center gap-1">
                <span className="text-indigo-400 font-bold">SGT TIME:</span> {sgtTime}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
              STATUS: {getPageTitleTelemetry()}
            </span>
            <button 
              onClick={resetReadStates}
              className="text-[8px] border border-current/25 hover:border-indigo-500/60 hover:text-indigo-500 px-1.5 py-0.5 rounded transition-all lowercase cursor-pointer"
              title="Reset all unread badges to explore again"
            >
              [reset unread badges]
            </button>
          </div>
        </div>

        {/* Ambient Laser Scan Sweep transition trigger */}
        <AnimatePresence mode="popLayout">
          {laserTrigger > 0 && (
            <motion.div
              key={`laser-${laserTrigger}`}
              initial={{ y: "-10vh", opacity: 0 }}
              animate={{ 
                y: ["0vh", "110vh"],
                opacity: [0, 0.8, 0.8, 0]
              }}
              transition={{ 
                duration: 0.85, 
                ease: "easeInOut" 
              }}
              className="fixed left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_15px_rgba(99,102,241,0.5)] pointer-events-none z-50"
            />
          )}
        </AnimatePresence>

        {/* High fashion transition slide-up and fade-in */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="relative z-10 px-4"
          >
            {/* Elegant Editorial Swipe Curtain Layer */}
            <motion.div
              initial={{ scaleX: 1, originX: "100%" }}
              animate={{ scaleX: 0, originX: "100%" }}
              exit={{ scaleX: 1, originX: "0%" }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className={`fixed inset-0 z-50 pointer-events-none ${
                isDarkMode ? "bg-[#141312]" : "bg-[#f2efe9]"
              }`}
            />

            {/* Staggered text content presentation */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderActiveView()}
            </motion.div>
            
            {/* Elegant, high-contrast motivational quote, cursor trailing, and margin doodle components */}
            <div className="mt-16 pb-4 relative z-20">
              <NiceStuff />
            </div>
          </motion.div>
        </AnimatePresence>
        
      </main>

      {/* 5. Minimalist Clean layout Footer */}
      <footer className={`border-t transition-colors ${
        isDarkMode ? "border-white/10" : "border-black/10"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center sm:justify-between gap-4 text-center sm:text-left">
          <div className="font-serif text-sm text-slate-500 italic">
            <span>Pranav · Copyright 2026. All Rights Reserved.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center space-x-6 text-xs font-mono opacity-60">
            <a href="https://pranavr.tech" target="_blank" rel="noopener noreferrer" className="hover:underline">pranavr.tech</a>
            <a href="https://x.com/stavexhq" target="_blank" rel="noopener noreferrer" className="hover:underline">@stavexhq</a>
            <a href="https://github.com/prx_50" target="_blank" rel="noopener noreferrer" className="hover:underline text-indigo-500 font-bold">@prx_50</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
