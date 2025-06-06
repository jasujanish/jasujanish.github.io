import React, { useState, useEffect } from "react";
import './Greeting.css';

const phrases = [
    'Hi,',
    'Bonjour,',
    'Hello,',
    'Hola,'
];

const Greeting = () => {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState('opacity-100');

  useEffect(() => {
    const handle = window.setInterval(() => {
      setFade('opacity-0'); // Fade out
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % phrases.length);
        setFade('opacity-100'); // Fade in
      }, 500); // Match the transition duration
    }, 5000); // change every 5 seconds

    return () => clearInterval(handle);
  }, []);

  return <div className="font-light mb-4 ">
            <h1 className={`lg:text-5xl xl:text-6xl text-gray-300 font-mono mb-2 transition-opacity duration-500 ${fade}`}> {phrases[idx]} </h1>
            <h1 className="text-7xl lg:text-8xl xl:text-9xl text-white "> <span className="hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:cursor-text hover:bg-clip-text hover:text-transparent">I'm  Nish. </span> </h1>
        </div>
};

export default Greeting;
