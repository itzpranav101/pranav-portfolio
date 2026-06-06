import React from "react";
import { motion } from "motion/react";
import { 
  Music, 
  Volume2, 
  Zap, 
  Target, 
  Activity, 
  Compass, 
  Bot, 
  Cpu, 
  Terminal, 
  Trophy 
} from "lucide-react";

interface HobbiesDashboardProps {
  isDarkMode: boolean;
}

export default function HobbiesDashboard({ isDarkMode }: HobbiesDashboardProps) {
  // Stagger animation setup
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const hobbiesData = [
    {
      id: "violin",
      title: "Violin Mechanics",
      icon: <Music className="w-5 h-5 text-indigo-500" />,
      tag: "Classical String Masterclass",
      desc: "",
      metrics: [],
      footnote: "Focuses on muscular memory, timing cadence, and dynamic posture."
    },
    {
      id: "badminton",
      title: "Badminton Kinematics",
      icon: <Zap className="w-5 h-5 text-indigo-500" />,
      tag: "High-Speed Court Rallies",
      desc: "",
      metrics: [
        { label: "PEAK SMASH VELOCITY", value: "400+ km/h" },
        { label: "RACQUET LINE POWER", value: "28 lbs Tension" },
        { label: "SWEET SPOT PRECISION", value: "Optimal Axis" }
      ],
      footnote: "Builds high-frequency reactions, footwork balance, and cardio capacity."
    },
    {
      id: "golf",
      title: "Golf Trajectory Physics",
      icon: <Target className="w-5 h-5 text-indigo-500" />,
      tag: "Precision Drive Calibrations",
      desc: "",
      metrics: [
        { label: "PEAK DRIVER LAUNCH", value: "250+ Yards" },
        { label: "AVERAGE TEMPO RATIO", value: "3:1 Rhythm" },
        { label: "CLUB LOFT DEGREES", value: "10.5° (Driver)" }
      ],
      footnote: "Rewards patience, atmospheric alignment, and core balance control."
    },
    {
      id: "robotics",
      title: "Robotics & Firmware",
      icon: <Bot className="w-5 h-5 text-indigo-500" />,
      tag: "Low-Level System Hardware",
      desc: "",
      metrics: [
        { label: "CORE CHIPSET CONTROLS", value: "nvda jetson nano" },
        { label: "SERIAL TELEMETRY", value: "115200 bps" },
        { label: "INTERFACE COM BUS", value: "I2C / SPI Node" }
      ],
      footnote: "Bypasses high-level layers to interface directly with logic-gates."
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto px-1 sm:px-2"
    >
      {hobbiesData.map((hobby) => (
        <motion.div
          key={hobby.id}
          variants={itemVariants}
          className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
            isDarkMode 
              ? "bg-stone-900/40 border-white/5 hover:border-indigo-500/30 hover:bg-stone-950/20" 
              : "bg-white border-stone-200 hover:border-indigo-500/30 shadow-sm"
          }`}
        >
          {/* Header segment */}
          <div className="space-y-3.5 mb-6 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-indigo-500/5 select-none">
                  {hobby.icon}
                </div>
                <span className="font-mono text-[9px] text-indigo-500 font-bold uppercase tracking-wider">
                  {hobby.tag}
                </span>
              </div>
            </div>

            <h3 className="font-serif text-2xl font-light text-current leading-tight">
              {hobby.title}
            </h3>

            {hobby.desc && (
              <p className="text-xs opacity-75 leading-relaxed font-light font-sans">
                {hobby.desc}
              </p>
            )}
          </div>

          {/* Technical specification metrics */}
          <div className="space-y-4 pt-3 border-t border-current/5">
            {hobby.metrics && hobby.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {hobby.metrics.map((m) => (
                  <div key={m.label} className="text-center sm:text-left space-y-1">
                    <span className="block font-mono text-[8px] opacity-50 uppercase tracking-tight">
                      {m.label}
                    </span>
                    <span className="block font-mono text-[10px] sm:text-xs font-bold text-indigo-500">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Micro-footnote layout */}
            <div className="flex items-center space-x-1.5 opacity-55">
              <Activity className="w-3 h-3 text-indigo-500 shrink-0" />
              <p className="text-[9px] font-mono leading-none">
                {hobby.footnote}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
