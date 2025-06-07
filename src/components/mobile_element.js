import React from "react";
import { Link } from "react-router-dom";
const currentLinkedIn = "https://www.linkedin.com/in/nishchay-j/";
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
        <Link
            to={list_of_links[0]}
            key={0}
            className="
              text-white
              font-mono
              text-[2vw]
              hover:text-[2.5vw]
              text-center
              hover:bg-gradient-to-r
              from-purple-500
              via-pink-500
              to-amber-500
              hover:bg-clip-text
              hover:text-transparent
              transition-all
              duration-300
              mb-4
            "
          >
            {list_of_texts[0]}
          </Link>
          <Link
            to={list_of_links[1]}
            key={1}
            className="
              text-white
              font-mono
              text-[2vw]
              hover:text-[2.5vw]
              text-center
              hover:bg-gradient-to-r
              from-purple-500
              via-pink-500
              to-amber-500
              hover:bg-clip-text
              hover:text-transparent
              transition-all
              duration-300
              mb-4
            "
          >
            {list_of_texts[1]}
          </Link>
          <a href={currentLinkedIn} target="_blank" rel="noopener noreferrer"
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
            {list_of_texts[2]}
          </a>
          <Link
            to={list_of_links[3]}
            key={3}
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
            {list_of_texts[3]}
          </Link>

      </div>
    </div>
  );
};

export default MobileElement;
