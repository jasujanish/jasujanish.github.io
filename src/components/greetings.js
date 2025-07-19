import React, { useState, useEffect } from "react";
import './Greeting.css';

const phrases = [
    'Hi,',
    'Bonjour,',
    'Hello,',
    'Hola,'
];

// Greeting component for the home page
// Displays a greeting with a fade-in and fade-out effect for each phrase
const Greeting = () => {
  const [idx, setIdx] = useState(0); // Manages which phrase to display
  const [fade, setFade] = useState('opacity-100'); // Manages the fade effect

  useEffect(() => {
    const handle = window.setInterval(() => {
      setFade('opacity-0'); // Fade out
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % phrases.length);
        setFade('opacity-100'); // Fade in
      }, 500); // Match the transition duration
    }, 2000); // change every 3 seconds

    return () => clearInterval(handle);
  }, []);

  return <div className="font-light mb-10">
            <h1 className={`text-[3.75vw] mb-[-1vw] text-stone-600 transition-opacity duration-500 ${fade}`}> {phrases[idx]} </h1>
            <h1 className="text-[8.5vw] text-black"> <span className="hover:cursor-text">I'm  Nish </span> </h1>
        </div>
};

export default Greeting;
