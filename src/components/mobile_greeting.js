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
            <h1 className={`text-5xl md:text-6xl lg:text-7xl text-gray-300 font-mono mb-4 transition-opacity duration-500 ${fade}`}> {phrases[idx]} </h1>
            <h1 className="text-7xl md:text-8xl lg:text-9xl text-white "> <span className="">I'm  Nish. </span> </h1>
        </div>
};

export default Greeting;
