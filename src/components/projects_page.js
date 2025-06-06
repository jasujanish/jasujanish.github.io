import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function ProjectsPage() {
  const projects = [
    {
        name: "Latex Notebook",
        description: "Description Coming Soon!",
    },
      {
      name: "Web Proxy",
      description: "Description Coming Soon!",
    },
    {
      name: "Custom Linux Shell", 
      description: "Description Coming Soon!",
    },
    {
      name: "Malloc",
      description: "Description Coming Soon!",
    },
  ];

  // State to track which course is currently selected (null means “no selection”)
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  // Handler: click on a course name
  const toggleSelection = (idx) => {
    if (selectedIndex === idx) {
      // Deselect if clicking the same course again
      setSelectedIndex(null);
    } else {
      setSelectedIndex(idx);
    }
  };

  const returnHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen w-screen p-[5%] pl-[7%] pr-[7%] bg-black text-white overflow-y-scroll"> 
      <div className="w-1/4 h-full">
        <ul className="h-full p-4">
          {projects.map((project, idx) => (
            <li key={idx}>
              <button
                onClick={() => toggleSelection(idx)}
                className={`text-left text-balance rounded p-2 mb-8 text-[1.2vw] font-light
                  ${
                    selectedIndex === idx
                      ? "text-white bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 bg-clip-text text-transparent scale-110 transition-all duration-500 hover:cursor-pointer hover:scale-125 hover:text-white"
                      : "text-white hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:bg-clip-text hover:text-transparent hover:scale-125 transition-all duration-300 hover:cursor-pointer"
                  }`}
              >
                {project.name}
              </button>
            </li>
          ))}
            {selectedIndex !== null && (
                <li>
                    <button
                        onClick={returnHome}
                        className="underline text-left text-balance rounded p-2 mb-8 text-[1.4vw] font-light text-white hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:bg-clip-text hover:text-transparent hover:scale-125 transition-all duration-300 hover:cursor-pointer"
                    >
                        Return to Home
                    </button>
                </li>
            )}
        </ul>
      </div>
      <div className="flex-1 h-full p-6 sticky top-[0%] align-center">
        {selectedIndex === null ? (
          <div className="h-full flex items-center justify-center"> {/* Modified this div */}
            <p className="text-white text-balance text-[5vw] text-center font-thin">
              <p >Select & Deselect Projects to Learn More</p>
              <br />
              <button className = "underline hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:bg-clip-text hover:text-transparent hover:scale-110 transition-all duration-300 hover:cursor-pointer" onClick={returnHome}>Return to Home</button>
            </p>
          </div>
        ) : (
          <div className="h-full rounded-lg p-4 overflow-y-scroll no-scrollbar">
            <h2 className="text-[2vw] text-white font-semibold mb-4">
              {projects[selectedIndex].name}
            </h2>
            <p className="text-[1.5vw] text-gray-300 whitespace-pre-wrap text-balanced">
              {projects[selectedIndex].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
