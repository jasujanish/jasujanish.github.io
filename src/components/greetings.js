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
    }, 3000); // change every 3 seconds

    return () => clearInterval(handle);
  }, []);

  return <div className="font-light ">
            <h1 className={`text-[4.5vw] mb-[-2vw] text-gray-300 font-mono transition-opacity duration-500 ${fade}`}> {phrases[idx]} </h1>
            <h1 className="text-[7.5vw] text-white mb-[1.5vw]"> <span className="hover:cursor-text">I'm  Nish. </span> </h1>
        </div>
};

export default Greeting;
