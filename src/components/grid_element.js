import React from "react";

const GridElement = ({ image_background, text }) => {
  return (
    <div
      className="
        relative
        w-full
        bg-cover
        bg-center
        border-2
        border-gray-600
        hover:border-white
        hover:cursor-alias
        transition
        cursor-pointer
        rounded-none
        overflow-hidden
        h-64
        hover:border-4
        hover:z-50
        hover:text-2xl
        text-xl font-semibold
        text-gray-300 
        hover:text-white
        hover:font-bold
        group
      "
      style={{
        backgroundImage: `url(${image_background})`
      }}
    >
      {/* Background overlay with blur effect */}
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:backdrop-blur-sm transition-all duration-300">
        {/* Text container that stays clear */}
        <div className="relative h-full flex items-center justify-center">
          <span className="">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GridElement;
