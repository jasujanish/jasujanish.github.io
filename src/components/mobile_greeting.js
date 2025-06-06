import React, { useState, useEffect } from "react";
import './Greeting.css'; // Import the CSS file

const phrases = [
    'Hi,',
    'Bonjour,',
    'Hey there,',
    'Hola,'
];

const MobileGreeting = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const handle = window.setInterval(() => {
      setIdx((prev) => (prev + 1) % phrases.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(handle);
  }, []);

  return <div className="font-light mb-4 ">
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-gray-300 font-mono"> {phrases[idx]} </h1>
            <h1 className="text-7xl md:text-8xl lg:text-9xl text-white "> <span className="hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:cursor-text hover:bg-clip-text hover:text-transparent">I'm  Nish. </span> </h1>
        </div>
};

export default MobileGreeting;