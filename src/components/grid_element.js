import React from "react";


const GridElement = ({ image_background, text }) => {
    // if (isMobile) {
    // }
    // else{
    return (
        <div
        className="
            relative
            w-full
            bg-cover
            bg-center
            border-0
            hover:border-white
            hover:cursor-alias
            transition
            cursor-pointer
            rounded-none
            overflow-hidden
            h-64
            hover:border-0
            hover:z-50
            hover:scale-105
            text-2xl
            hover:text-3xl
            group
        "
        style={{
            backgroundImage: `url(${image_background})`
        }}
        >
        {/* Background overlay with blur effect */}
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:backdrop-blur-sm transition-all duration-300 flex items-center justify-center">
            {/* Text container that stays clear */}
            <span className="text-gray-300 font-mono  font-light group-hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {text}
            </span>
        </div>
        </div>
    );
    // }
    };
export default GridElement;
