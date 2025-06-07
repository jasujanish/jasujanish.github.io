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

  return <div className="font-light ">
            <h1 className={`text-[9vw] mb-[-4vw] text-gray-300 font-mono transition-opacity duration-500 ${fade}`}> {phrases[idx]} </h1>
            <h1 className="text-[15vw] text-white mb-[2vw]"> <span className="hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:cursor-text hover:bg-clip-text hover:text-transparent">I'm  Nish. </span> </h1>
        </div>
};

export default Greeting;
