import React, { useState, useEffect } from "react";

const phrases = [
    'Hi,',
    'Bonjour,',
    'Hey there,',
    'Hola,'
];

const Greeting = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const handle = window.setInterval(() => {
      setIdx((prev) => (prev + 1) % phrases.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(handle);
  }, []);

  return <div className="font-light mb-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-gray-300"> {phrases[idx]} </h1>
            <h1 className="text-6xl md:text-7xl lg:text-8xl text-white "> <span className="hover:cursor-text">I'm  Nish. </span> </h1>
        </div>
};

export default Greeting;
