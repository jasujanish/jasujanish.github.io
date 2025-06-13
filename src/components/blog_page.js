import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function BlogPage() {
  const content = [
    {
        name: "Fun Facts",
        description: "I'm ~2000 ELO in bullet chess on chess.com\nI'm ~1600 ELO in blitz & rapid chess on chess.com\nI can type at ~115 words per minute\nI'm a really great Connect 4 player\nI've been on submarine and boat trips\nI've gone kayaking in Hawaii\n(More fun facts coming soon!)",
        term: "2025"
    },
    {
        name: "Background",
        description: `I'm Nishchay Jasuja. I'm originally from the bay area, though I'm now based in Pittsburgh as I attend Carnegie Mellon University (CMU). At CMU, I'm studying Statistics and Machine Learning with an additional major in Computer Science. I'm currently interested in exploring the fields of machine learning, deep learning, robotics, and computer systems. Outside of academic pursuits, I enjoy playing chess, creating quick sketches with my iPad, reading nonfiction novels, and following the NBA & La Liga.
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
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handler: click on a course name
  const toggleSelection = (idx) => {
    setSelectedIndex(idx);
  };
  const toggleCollapsed = () => setCollapsed((prev) => !prev);
  const returnHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen w-screen p-[5%] pl-[10%] pr-[10%] pt-[5%] bg-black text-white overflow-y-scroll font-mono"> 
      {!collapsed &&
      <div className="w-3/10 h-full">
        <ul className="h-full">
            <li>
                <div className="w-full h-full flex justify-between items-center p-2 align-items-center">
                  <button
                      onClick={returnHome}
                      className = "relative text-left text-[1.1vw] rounded-full border-2 hover:border-white p-4 mb-4 font-light text-white hover:scale-110 transition-transform duration-300 after:absolute after:bottom-2 after:left-4 after:right-4 after:w-0 after:h-1 after:bg-white after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)] hover:cursor-pointer"                  >
                      Return to Home
                  </button>
                  <button
                    onClick={toggleCollapsed}
                    className="text-[1.9vw] p-4 hover:scale-150 hover:text-white transition-transform duration-300 ml-8 p-4 mb-4 hover:cursor-pointer"
                  >
                    ▶
                  </button>
                </div>
            </li>
          {content.map((course, idx) => (
            <li key={idx}>
              <button
                onClick={() => toggleSelection(idx)}
                className={`w-full flex justify-between items-center text-left rounded-full p-4 mb-4 font-light text-white hover:scale-x-115 transition-transform duration-300
                  ${
                    selectedIndex === idx
                      ? "hover:cursor-no-drop relative after:absolute after:bottom-2 after:left-0 after:w-0 after:h-1 after:bg-white after:transition-all after:duration-300 after:w-full font-semibold"
                      : "relative after:absolute after:bottom-2 after:left-0 after:w-0 after:h-1 after:bg-white after:transition-all after:duration-300 hover:after:w-full transition-all duration-200 hover:cursor-pointer "
                  }`}
              >
                <span className="text-balance text-stone-100 text-[0.9vw]"> {course.name}</span>
                <span className="text-stone-200 text-[0.9vw] ml-8">{course.term}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      }
      {collapsed ?  
        <div className="flex-col justify-between h-full pl-[15%] pt-[2%] pr-[15%] sticky top-[0%] align-center"> 
            <div className="w-full flex justify-between items-center align-items-center max-w-1/3">
                <button
                    onClick={returnHome}
                    className = "relative text-left text-[1.1vw] rounded-full border-2 hover:border-white p-4 mb-4 font-light text-white hover:scale-110 transition-transform duration-300 after:absolute after:bottom-2 after:left-4 after:right-4 after:w-0 after:h-1 after:bg-white after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)] hover:cursor-pointer"                  >
                    Return to Home
                </button>
                <button
                  onClick={toggleCollapsed}
                  className="text-[1.9vw] p-4 hover:scale-150 hover:text-white transition-transform duration-300 ml-8 p-4 mb-4 hover:cursor-pointer"
                >
                  ◀
                </button>
            </div>
            <div className="h-full w-full rounded-lg p-4 overflow-y-scroll no-scrollbar pt-[5%]">
              <h2 className="text-[2.8vw] text-white font-semibold mb-4">
                {content[selectedIndex].name}
              </h2>
              <p className="text-[1.2vw] text-gray-300 whitespace-pre-wrap font-normal text-balance">
                {content[selectedIndex].description}
              </p>
            </div>
          
        </div>

        : 
        <div className="flex-1 h-full pl-[10%] pt-[7%] sticky top-[0%] pr-[7%] align-center"> 
          {selectedIndex === null ? ( 
            // Initial “welcome” / placeholder text
            <div className="h-full flex items-center justify-center"> {/* Modified this div */}
              <p className="text-white text-balance text-[5vw] text-center font-thin">
                <p >Select & Deselect Items to Learn More</p>
                <br />
                <button className = "underline hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:bg-clip-text hover:text-transparent hover:scale-x-110 transition-all duration-300 hover:cursor-pointer" onClick={returnHome}>Return to Home</button>
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
      }
    </div> 
  );
}
