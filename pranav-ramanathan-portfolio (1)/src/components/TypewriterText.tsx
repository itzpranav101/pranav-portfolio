import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // MS per character
  delay?: number; // MS before starting the typing animation
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 90,
  delay = 500,
  className = "",
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let startTimeout: NodeJS.Timeout;
    let typingInterval: NodeJS.Timeout;
    let charIndex = 0;

    startTimeout = setTimeout(() => {
      typingInterval = setInterval(() => {
        if (charIndex < text.length) {
          // Add next character
          setDisplayText(text.substring(0, charIndex + 1));
          charIndex++;
        } else {
          // Done typing
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(typingInterval);
    };
  }, [text, speed, delay]);

  // Handle caret blinking behavior (only blink after typing completes, stay solid during typing)
  useEffect(() => {
    if (!isTypingComplete) {
      setShowCursor(true);
      return;
    }

    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(blinkInterval);
    };
  }, [isTypingComplete]);

  return (
    <span className={`${className} inline-flex items-baseline select-text`}>
      <span>{displayText}</span>
      <span
        id="typewriter-caret"
        className={`inline-block w-[3px] sm:w-[4px] md:w-[5px] h-[0.75em] bg-indigo-500 ml-1.5 self-center rounded-sm transition-opacity duration-150 ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
        style={{ verticalAlign: "middle" }}
      />
    </span>
  );
}
