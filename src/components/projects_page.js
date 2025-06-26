import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function ProjectsPage() {
  // Content for the projects page
  const content = [
    {
      name: "LaTex Classifier", 
      description: "Developed May 2025\nBuilt a computer-vision tool to help me identify LaTex symbols from quick sketches. (More details coming soon!)",
      term: "May 2025"
    },
    {
      name: "Web Proxy",
      description: "Developed April 2025\nBuilt a simple web proxy in C that can handle HTTP requests and responses. (More details coming soon!)",
      term: "April 2025"
    },
    {
      name: "Custom Linux Shell",
      description: "Developed April 2025\nBuilt a custom Linux shell in C that supports basic commands, piping, and redirection. (More details coming soon!)",
      term: "April 2025"
    },
    {
      name: "Malloc",
      description: "Developed: march 2025\nBuilt a dynamic memory allocator in C that implements the malloc, free, and realloc functions using segregated free lists. (More details coming soon!)",
      term: "March 2025"
    },
    {
      name: "Cache Simulator",
      description: "Developed: February 2025\nBuilt a comand line tool in C that simulates a cache memory system. The tool allows users to specify cache parameters and trace files, and it outputs cache hit/miss statistics. (More details coming soon!)",
      term: "February 2025"
    },
    {
      name: "Virtual Machine",
      description: "Developed: Decemeber 2024\nBuilt a simple virtual memory machine as a final project for 15-122 Principles of Imperative Computation. (More details coming soon!)",
      term: "December 2024"
    },
    {
      name: "Wizard Chess",
      description: "Developed: October 2024\nUtilized the Python Chess library and the OpenAI API to create wizard chess from Harry Potter, a version of Chess in which players must convince pieces to make moves. (More details coming soon!)",
      term: "October 2024"
    },
    {
      name: "Text Editor",
      description: "Developed: October 2024\nAs a project for 15-122 Principles of Imperative Computation, I created a text editor in C. I utilized singly and doubly linked lists to implement a gap buffer data structure. This design choice allowed for constant amortized time insertions, deletions, and cursor movement.",
      term: "October 2024"
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(1); // manages selected item
  const navigate = useNavigate(); // manages navigation between pages
  const [collapsed, setCollapsed] = useState(false); // manages the sidebar
  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top
  }, []);

  const toggleSelection = (idx) => {
    setSelectedIndex(idx); // set selected index to selected item
  };
  const toggleCollapsed = () => setCollapsed((prev) => !prev); // toggle the sidebar
  const returnHome = () => { 
    navigate("/"); // return to home page
  };

  return (
    // Main container
    <div className="flex h-screen w-screen p-[5%] pl-[10%] pr-[10%] pt-[5%] bg-black text-white overflow-y-scroll font-mono"> 
      {/* Page if the sidebar is collapsed */}
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
      {/* Page if the sidebar is not collapsed */}
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
            <div className="h-full flex items-center justify-center">
              <p className="text-white text-balance text-[5vw] text-center font-thin">
                <p >Select & Deselect Items to Learn More</p>
                <br />
                <button className = "underline hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:bg-clip-text hover:text-transparent hover:scale-x-110 transition-all duration-300 hover:cursor-pointer" onClick={returnHome}>Return to Home</button>
              </p>
            </div>
          ) : (
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
