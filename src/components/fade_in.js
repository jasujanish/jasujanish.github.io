import React, { useEffect, useState } from "react"

const opacityMap = {
  0: "opacity-0",
  25: "opacity-25",
  50: "opacity-50",
  75: "opacity-75",
  100: "opacity-100",
};

const FadeIn = ({ children, delay = 0, opacity = 0 }) => {
  const [animate, setAnimate] = useState(`${opacityMap[opacity]} translate-y-10`);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate("opacity-100 translate-y-0");
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transition-all ease-out duration-500 ${animate}`}>
      {children}
    </div>
  );
};

export default FadeIn;
