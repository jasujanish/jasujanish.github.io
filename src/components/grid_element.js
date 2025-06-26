import React from "react";

// A single grid element, used on the home page
// Image background & text are passed as props
// Upon hover, the text is underlined, the background is blurred, and the element scales up slightly
const GridElement = ({ image_background, text }) => (
  <div
    className="
      relative w-full h-64 overflow-hidden
      bg-cover bg-center transition group
      hover:scale-105 hover:cursor-pointer
      text-[2vw] hover:text-[2.5vw]
    "
    style={{ backgroundImage: `url(${image_background})` }}
  >
    <div className="absolute inset-0 bg-black/40 group-hover:backdrop-blur-sm flex items-center justify-center transition-all duration-300">
      <span
        className="
          relative font-mono font-light text-gray-300
          after:content-[''] after:absolute after:left-0 after:bottom-0
          after:h-1 after:bg-white after:w-0 after:transition-all after:duration-300
          group-hover:after:w-full
        "
      >
        {text}
      </span>
    </div>
  </div>
);

export default GridElement;
