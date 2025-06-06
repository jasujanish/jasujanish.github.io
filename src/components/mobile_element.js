import React from "react";
import { Link } from "react-router-dom";

const MobileElement = ({ image_background, list_of_texts, list_of_links }) => {
  return (
    <div
      className="
        relative
        w-full
        h-64
        bg-cover
        bg-center
        overflow-hidden
        group
      "
      style={{
        backgroundImage: `url(${image_background})`
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center">
        {/* List of texts */}
        {list_of_texts.map((text, index) => (
          <Link
            to={list_of_links[index]}
            key={index}
            className="
              text-white
              font-mono
              text-lg
              text-center
              hover:bg-gradient-to-r
              from-purple-500
              via-pink-500
              to-amber-500
              hover:bg-clip-text
              hover:text-transparent
              transition-all
              duration-300
              hover:text-2xl
              mb-4
            "
          >
            {text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileElement;
