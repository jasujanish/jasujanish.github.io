import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function BlogPage() {
  // Content for the blog page
  const content = [
    {
        name: "Fun Facts",
        description: "I'm ~2000 ELO in bullet chess on chess.com (99th percentile globally)\nI'm ~1600 ELO in blitz chess on chess.com (97th percentile globally)\nI'm ~1600 ELO in rapid chess on chess.com (97th percentile globally)\nI can type at ~115 words per minute\nI'm a really great Connect 4 player\nI've been on submarines, boats, and kayaks\n(More fun facts coming soon!)",
        term: "2025"
    },
    {
        name: "Background",
        description: `I'm Nishchay Jasuja. I'm originally from the bay area, though I'm now based in Pittsburgh as I attend Carnegie Mellon University (CMU). At CMU, I'm studying Statistics and Machine Learning with an additional major in Computer Science. I'm currently interested in exploring the fields of machine learning, deep learning, robotics, and computer systems. Outside of academic pursuits, I enjoy playing chess, creating quick sketches with my iPad, reading nonfiction novels, and following the NBA & La Liga.
      `,
        term: "2025"
    },
    {
        name: "Interesting Articles",
        description: 'Designing better interfaces as AI continues to progress: https://deepmind.google/research/publications/106025/\n(More coming soon!)',
        term: "2025"
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
  const currentLinkedIn = "https://www.linkedin.com/in/nishchay-j/";
  return (
    <div className="min-h-screen w-screen flex flex-col bg-[#F2F3F4] font-inter">
      <header className="flex-none sticky top-0 bg-[#F2F3F4] backdrop-blur px-[10%] py-3 z-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="hover:cursor-pointer tracking-normal text-[1.24vw] font-normal relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 hover:after:w-full">
            Nishchay Jasuja
          </Link>
          <div className="flex flex-wrap gap-x-[5vw]">
            <Link
              to="/about"
              className="hover:cursor-no-drop text-[1.24vw] font-extralight relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 after:w-full"
            >
              BLOG
            </Link>
            <a
              href={currentLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:cursor-pointer text-[1.24vw] font-extralight relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 hover:after:w-full"
            >
              LINKEDIN
            </a>
            <Link
              to="/courses"
              className="hover:cursor-pointer text-[1.24vw] font-extralight relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 hover:after:w-full"
            >
              COURSES
            </Link>
            <Link
              to="/projects"
              className="hover:cursor-pointer text-[1.24vw] font-extralight relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 hover:after:w-full"
            >
              PROJECTS
            </Link>
          </div>

        </div>
      </header>
      <div className="flex py-[5%] px-[10%] bg-[#F2F3F4] overflow-y-scroll z-2"> 
        {/* Page if the sidebar is collapsed */}
        {!collapsed && 
        <div className="h-full">
          <ul className="h-full">
            {content.map((course, idx) => (
              <li key={idx}>
                <button
                  onClick={() => toggleSelection(idx)}
                  className={`w-full flex justify-between items-center text-left mb-10 font-light
                    ${
                      selectedIndex === idx
                        ? "hover:cursor-no-drop relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 after:w-full text-black"
                        : "relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 hover:after:w-full transition-all duration-200 hover:cursor-pointer text-gray-600"
                    }`}
                >
                  <span className="text-balance text-[0.9vw]"> {course.name}</span>
                  <span className="text-[0.9vw] ml-[5vw]">{course.term}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        }
        {/* Page if the sidebar is not collapsed */}
        {collapsed ?  
          <div className="flex-col justify-between h-full w-full"> 
            <div className="flex justify-between w-full mb-10">
              <p className="text-[2.4vw] text-gray-800 font-normal">
                {content[selectedIndex].name}
              </p>
              <button
                onClick={toggleCollapsed}
                className="text-[2.4vw] hover:scale-150 hover:text-gray-800 transition-transform duration-300 hover:cursor-pointer"
              >
                ◀
              </button>
            </div>
            
            <p className="text-[1.24vw] text-gray-600 font-normal whitespace-pre-wrap text-balance">
              {content[selectedIndex].description}
            </p>       
          </div>
          : 
          <div className="flex-1 h-full pl-[15%]"> 
              <div className="h-full w-full rounded-lg overflow-y-scroll no-scrollbar">
                <h2 className="text-[1.5vw] text-gray-800 font-normal">
                  {content[selectedIndex].name}                   
                    <button
                      onClick={toggleCollapsed}
                      className="text-[1.5vw] hover:scale-150 hover:text-gray-800 transition-transform duration-300 ml-10 mb-5 hover:cursor-pointer"
                    >
                      ▶
                    </button>
                </h2>
                <p className="text-[1vw] text-gray-600 whitespace-pre-wrap font-normal text-balance">
                  {content[selectedIndex].description}
                </p>
              </div>
          </div>
        }
      </div> 
    </div>
  );
}
