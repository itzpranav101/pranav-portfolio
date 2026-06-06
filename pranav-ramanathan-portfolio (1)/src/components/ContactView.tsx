import React, { useState } from "react";
import { Mail, Github, Instagram, Globe, ExternalLink, Compass } from "lucide-react";

interface ContactViewProps {
  isDarkMode: boolean;
}

export default function ContactView({ isDarkMode }: ContactViewProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("ramjipranavji@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactList = [
    {
      id: "email",
      name: "Direct Email Address",
      value: "ramjipranavji@gmail.com",
      url: "mailto:ramjipranavji@gmail.com",
      icon: <Mail className="w-5 h-5 text-indigo-500" />,
      desc: "For general queries, business chats, or quick messages."
    },
    {
      id: "personal_insta",
      name: "Personal Instagram",
      value: "prx_50",
      url: "https://instagram.com/prx_50",
      icon: <Instagram className="w-5 h-5 text-indigo-500" />,
      desc: "Catch my personal updates, workouts, and random snapshots."
    },
    {
      id: "stavex_insta",
      name: "Stavex Instagram",
      value: "stavexhq",
      url: "https://instagram.com/stavexhq",
      icon: <Instagram className="w-5 h-5 text-indigo-500" />,
      desc: "Stay updated on operating system progress and software launches."
    },
    {
      id: "github",
      name: "GitHub Profile",
      value: "itzpranav101",
      url: "https://github.com/itzpranav101",
      icon: <Github className="w-5 h-5 text-indigo-500" />,
      desc: "Check out my repositories, simple code templates, and active releases."
    },
    {
      id: "stavex_web",
      name: "Stavex Website",
      value: "stavex.org",
      url: "https://stavex.org",
      icon: <Globe className="w-5 h-5 text-indigo-500" />,
      desc: "The main page of the fast, lightweight operating system I build."
    }
  ];

  return (
    <div className="space-y-12 md:space-y-16 animate-fade-in text-center flex flex-col items-center w-full px-2 max-w-4xl mx-auto">
      
      {/* Editorial Profile Header */}
      <section className="space-y-4 flex flex-col items-center text-center w-full">
        <div className="flex items-center space-x-2 justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest font-bold">/ CONTACT DIRECTORY</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-tight text-center">
          Let's connect, <span className="italic block mt-1">reach me anytime.</span>
        </h2>
        <p className="font-serif italic text-lg sm:text-xl text-slate-500 max-w-xl text-center font-light leading-relaxed">
          I am always happy to chat. Feel free to reach out via any of my personal or Stavex links below!
        </p>
      </section>

      {/* Symmetric Centered Directory */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full items-stretch justify-center">
        {contactList.map((contact) => (
          <div
            key={contact.id}
            className={`p-6 rounded-2xl border text-center flex flex-col justify-between items-center transition-all duration-300 ${
              isDarkMode 
                ? "border-white/10 bg-stone-900/10 hover:border-indigo-400" 
                : "border-stone-200 bg-white hover:border-indigo-500 hover:shadow-md"
            }`}
          >
            <div className="space-y-4 flex flex-col items-center w-full">
              <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-stone-800/40 w-fit flex items-center justify-center animate-pulse">
                {contact.icon}
              </div>
              <div className="space-y-1">
                <span className="opacity-50 font-mono text-[9px] font-bold uppercase block tracking-wider">{contact.name}</span>
                <a
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1 text-indigo-500 font-mono text-base hover:underline font-bold"
                >
                  <span>{contact.value}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-xs opacity-75 font-light leading-relaxed max-w-xs">{contact.desc}</p>
            </div>

            {contact.id === "email" && (
              <button
                onClick={copyEmail}
                className={`mt-4 inline-flex items-center space-x-1.5 px-3 py-1.5 border rounded-lg font-mono text-[10px] uppercase transition-colors hover:bg-current/5 cursor-pointer ${
                  isDarkMode ? "border-white/10" : "border-stone-200"
                }`}
              >
                {copied ? (
                  <span className="text-emerald-500 font-bold">Copied!</span>
                ) : (
                  <span>Copy email address</span>
                )}
              </button>
            )}
          </div>
        ))}
      </section>

      {/* Symmetric footer note */}
      <section className="p-6 rounded-2xl border border-current/10 font-mono text-[11px] opacity-65 text-center flex flex-col items-center justify-center gap-3 w-full max-w-xl">
        <Compass className="w-4 h-4 text-indigo-500 shrink-0" />
        <p className="leading-relaxed">
          I usually reply to requests within a couple of days. Looking forward to connecting!
        </p>
      </section>

    </div>
  );
}
