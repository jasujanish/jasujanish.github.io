import React, { useEffect, useState } from "react"

const FadeIn = ({ children, delay = 0 }) => {
  const [animate, setAnimate] = useState("opacity-0 translate-y-10");

  useEffect(() => {
    // Scroll to bottom (optional) and trigger animation after delay
    window.scrollTo(0, document.body.scrollHeight);
    const timer = setTimeout(() => {
      setAnimate("opacity-100 translate-y-0");
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transition-all ease-out duration-1000 ${animate}`}>  
      {children}
    </div>
  );
};

export default FadeIn;
