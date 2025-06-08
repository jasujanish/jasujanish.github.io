import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function BlogPage() {
  const content = [
    {
        name: "Fun Facts",
        description: "I'm ~2000 ELO in bullet chess on chess.com\nI'm a really great Connect 4 player\nI greatly enjoy playing with Legos\nI've been on a submarine trip\nI've gone kayaking in Hawaii\nI can sleep sitting upright\n(More fun facts coming soon!)",
        term: "2025"
    },
    {
        name: "Background",
        description: `I'm Nishchay Jasuja. I grew up in the bay area, but I'm currently living in Pittsburgh while I attend Carnegie Mellon University (CMU). At CMU, I'm a sophomore student studying Statistics and Machine Learning with an additional major in Computer Science. I'm currently interested in exploring the fields of machine learning, deep learning, robotics, and computer systems. Outside of academics, I enjoy playing chess, creating quick sketches with my iPad, reading, playing basketball & soccer, and following the NBA & La Liga.
      `,
        term: "2025"
    },
    {
        name: "Interesting Papers",
        description: "Coming Soon!",
        term: "2025"
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handler: click on a course name
  const toggleSelection = (idx) => {
    setSelectedIndex(idx);
  };

  const returnHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen w-screen p-[5%] pl-[10%] pr-[10%] pt-[5%] bg-black text-white overflow-y-scroll font-mono"> 
      <div className="w-3/10 h-full">
        <ul className="h-full p-4">
          {selectedIndex !== null && (
                <li>
                    <button
                        onClick={returnHome}
                        className="hover:bg-stone-900 text-left text-[1.1vw] rounded-full border-2 hover:border-white p-4 mb-4 font-light text-white hover:scale-110 transition-transform duration-300"
                    >
                        Return to Home
                    </button>
                </li>
            )}
          {content.map((course, idx) => (
            <li key={idx}>
              <button
                onClick={() => toggleSelection(idx)}
                className={`w-full flex justify-between items-center text-left rounded-full p-4 mb-4 font-light text-white hover:scale-115 transition-transform duration-300
                  ${
                    selectedIndex === idx
                      ? "bg-stone-800 scale-110 transition-all duration-100 hover:cursor-no-drop border-2 border-white"
                      : "hover:bg-stone-900 hover:border-2 hover:border-white hover:scale-110 transition-all duration-100 hover:cursor-pointer"
                  }`}
              >
                <span className="text-balance text-stone-100 text-[0.9vw]"> {course.name}</span>
                <span className="text-stone-200 text-[0.9vw] ml-8">{course.term}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/*
        Right pane: either initial placeholder text or the selected course description
        - flex-grow to fill remaining space
      */}
      <div className="flex-1 h-full pl-[10%] pt-[10%] sticky top-[0%] align-center">
        {selectedIndex === null ? (
          // Initial “welcome” / placeholder text
          <div className="h-full flex items-center justify-center"> {/* Modified this div */}
            <p className="text-white text-balance text-[5vw] text-center font-thin">
              <p >Select & Deselect Items to Learn More</p>
              <br />
              <button className = "underline hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:bg-clip-text hover:text-transparent hover:scale-110 transition-all duration-300 hover:cursor-pointer" onClick={returnHome}>Return to Home</button>
            </p>
          </div>
        ) : (
          // Display the selected course description inside a scrollable, bordered box
          <div className="h-full w-full rounded-lg p-4 overflow-y-scroll no-scrollbar">
            <h2 className="text-[2vw] text-white font-semibold mb-4">
              {content[selectedIndex].name}
            </h2>
            <p className="text-[1vw] text-gray-300 whitespace-pre-wrap font-normal text-balance">
              {content[selectedIndex].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
