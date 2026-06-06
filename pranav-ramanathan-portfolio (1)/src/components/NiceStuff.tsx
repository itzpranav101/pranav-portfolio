import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, RefreshCw, Layers } from "lucide-react";

interface TrailItem {
  id: number;
  x: number;
  y: number;
}

export default function NiceStuff() {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [quoteIdx, setQuoteIdx] = useState(0);

  // Elite, clean motivational quotes from a builder's perspective
  const builderQuotes = [
    { text: "Build things that you wish existed in the world.", author: "The Artisan's Creed" },
    { text: "True mastercraft is doing it right even when nobody is looking.", author: "Software Ethos" },
    { text: "Simplicity is the ultimate sophistication of modern software.", author: "The Minimalist Builder" },
    { text: "Great products are not thrown together; they are patiently grown line by line.", author: "Creative Architecture" },
    { text: "The clean layout is silent. It does not boast, it simply supports.", author: "Visual Principle" },
    { text: "Focus is saying no to a hundred other great ideas to make one truly shine.", author: "Focus Theory" },
    { text: "We are what we build. Make it honest, make it simple, make it lasting.", author: "The Digital Stonemason" }
  ];

  // Pick a random quote index on launch
  useEffect(() => {
    setQuoteIdx(Math.floor(Math.random() * builderQuotes.length));
  }, []);

  const randomizeQuote = () => {
    setQuoteIdx((prev) => {
      let next = Math.floor(Math.random() * builderQuotes.length);
      while (next === prev && builderQuotes.length > 1) {
        next = Math.floor(Math.random() * builderQuotes.length);
      }
      return next;
    });
  };

  // Capture global mousemove events for custom spark trails (max 8 points to preserve memory)
  useEffect(() => {
    let count = 0;
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mousemove slightly for performance
      count++;
      if (count % 3 !== 0) return;

      const newItem = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setTrail((prev) => {
        const keeps = prev.slice(-6); // keep last 6 items for a short subtle trail
        return [...keeps, newItem];
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Filter trail list frequently as old items expire
  useEffect(() => {
    const timer = setInterval(() => {
      setTrail((prev) => {
        if (prev.length === 0) return prev;
        return prev.slice(1); // remove oldest
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const activeQuote = builderQuotes[quoteIdx];

  return (
    <>
      {/* 1. Global Subtle Mouse following light trails */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {trail.map((pt, idx) => (
            <motion.div
              key={pt.id}
              initial={{ opacity: 0.75, scale: 1 }}
              animate={{ opacity: 0, scale: 0.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                left: pt.x,
                top: pt.y,
                transform: "translate(-50%, -50%)"
              }}
              className="absolute w-2 h-2 rounded-full bg-indigo-500/70"
            />
          ))}
        </AnimatePresence>
      </div>

      {/* 2. Micro CSS doodles sporadically floating in margins */}
      <div className="fixed inset-y-0 left-4 w-12 pointer-events-none z-30 hidden lg:flex flex-col justify-around items-center opacity-15">
        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDuration: "3s" }} />
        <div className="w-2.5 h-2.5 border border-indigo-500 rotate-45 animate-spin" style={{ animationDuration: "8s" }} />
        <div className="font-serif text-lg italic text-indigo-500 select-none animate-pulse">✦</div>
      </div>
      <div className="fixed inset-y-0 right-4 w-12 pointer-events-none z-30 hidden lg:flex flex-col justify-around items-center opacity-15">
        <div className="font-serif text-lg italic text-indigo-500 select-none animate-pulse" style={{ animationDelay: "1s" }}>✦</div>
        <div className="w-2 h-2 border-l border-t border-indigo-500 rotate-12 animate-bounce" style={{ animationDuration: "5s" }} />
        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
      </div>

      {/* 3. Quote box layout wrapper */}
      <div className="w-full max-w-xl mx-auto p-5 rounded-2xl border border-indigo-500/10 bg-indigo-500/[0.01] backdrop-blur-[1px] flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
          <span className="font-mono text-[9px] text-indigo-500 font-bold uppercase tracking-[0.25em]">DAILY BUILDER INSPIRATION</span>
        </div>
        
        <div className="min-h-[50px] flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIdx}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="space-y-1.5"
            >
              <p className="font-serif italic text-base sm:text-lg text-current/90 font-light">
                "{activeQuote.text}"
              </p>
              <span className="block font-mono text-[9px] opacity-45 uppercase tracking-wide">
                — {activeQuote.author}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={randomizeQuote}
          className="cursor-pointer inline-flex items-center space-x-1 font-mono text-[9px] border border-current/10 px-2 py-1 rounded-md tracking-wider hover:border-indigo-500 hover:text-indigo-500 transition-colors bg-current/[0.01]"
        >
          <RefreshCw className="w-3 h-3" />
          <span>RANDOMIZE QUOTE</span>
        </button>
      </div>
    </>
  );
}
