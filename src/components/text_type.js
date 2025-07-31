// src/components/TextType.js
"use client";

import { useEffect, useRef, useState, createElement } from "react";
import { gsap } from "gsap";

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 500,
  deletingSpeed = 10,
  pauseDuration = 0,
  loop = true,
  className = "",
  showCursor = true,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  ...props
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  const textArray = Array.isArray(text) ? text : [text];

  // GSAP Cursor Animation Effect
  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  // Main Typing and Looping Effect
  useEffect(() => {
    let timeout;
    const currentSentence = textArray[currentTextIndex];

    // Typing logic
    if (!isDeleting && displayedText.length < currentSentence.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentSentence.substring(0, displayedText.length + 1));
      }, typingSpeed);
    
    // Switch to deleting after pause
    } else if (!isDeleting && displayedText.length === currentSentence.length) {
        if (loop || currentTextIndex < textArray.length - 1) {
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, pauseDuration);
        }
    
    // Deleting logic
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentSentence.substring(0, displayedText.length - 1));
      }, deletingSpeed);
    
    // Switch to next sentence after deleting
    } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }

    return () => clearTimeout(timeout);

  }, [displayedText, isDeleting, currentTextIndex, textArray, loop, typingSpeed, deletingSpeed, pauseDuration]);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props,
    },
    <span className="inline">{displayedText}</span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`ml-1 inline-block opacity-100 ${cursorClassName}`}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;