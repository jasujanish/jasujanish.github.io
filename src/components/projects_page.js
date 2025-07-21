import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import {content} from '../content/projects_content';
import StandardSubPage from "./standard_sub_page";

function OldProjectsPage() {

  // Content for the projects page

  const content = [
    {
      name: "Ethics Tracker", 
      description: "Developed May 2025\nBuilt a computer-vision tool to help me identify LaTex symbols from quick sketches. (More details coming soon!)",
      date: "July 2025"
    },
    {
      name: "LaTex Classifier", 
      description: "Developed May 2025\nBuilt a computer-vision tool to help me identify LaTex symbols from quick sketches. (More details coming soon!)",
      date: "May 2025"
    },
    {
      name: "Web Proxy",
      description: "Developed April 2025\nBuilt a simple web proxy in C that can handle HTTP requests and responses. (More details coming soon!)",
      date: "April 2025"
    },
    {
      name: "Custom Linux Shell",
      description: "Developed April 2025\nBuilt a custom Linux shell in C that supports basic commands, piping, and redirection. (More details coming soon!)",
      date: "April 2025"
    },
    {
      name: "Malloc",
      description: "Developed: march 2025\nBuilt a dynamic memory allocator in C that implements the malloc, free, and realloc functions using segregated free lists. (More details coming soon!)",
      date: "March 2025"
    },
    {
      name: "Cache Simulator",
      description: "Developed: February 2025\nBuilt a comand line tool in C that simulates a cache memory system. The tool allows users to specify cache parameters and trace files, and it outputs cache hit/miss statistics. (More details coming soon!)",
      date: "February 2025"
    },
    {
      name: "Virtual Machine",
      description: "Developed: Decemeber 2024\nBuilt a simple virtual memory machine as a final project for 15-122 Principles of Imperative Computation. (More details coming soon!)",
      date: "December 2024"
    },
    {
      name: "Wizard Chess",
      description: "Developed: October 2024\nUtilized the Python Chess library and the OpenAI API to create wizard chess from Harry Potter, a version of Chess in which players must convince pieces to make moves. (More details coming soon!)",
      date: "October 2024"
    },
    {
      name: "Text Editor",
      description: "Developed: October 2024\nAs a project for 15-122 Principles of Imperative Computation, I created a text editor in C. I utilized singly and doubly linked lists to implement a gap buffer data structure. This design choice allowed for constant amortized time insertions, deletions, and cursor movement.",
      date: "October 2024"
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
    <div className="min-h-screen w-screen flex flex-col bg-[#fffefc] font-inter">
      <header className="flex-none sticky top-0 backdrop-blur px-[10%] py-3 z-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="hover:cursor-pointer tracking-normal text-[1.24vw] font-normal relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 hover:after:w-full">
            Nishchay Jasuja
          </Link>
          <div className="flex flex-wrap gap-x-[5vw]">
            <Link
              to="/about/main"
              className="hover:cursor-pointer text-[1.24vw] font-extralight relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 hover:after:w-full"
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
              className="hover:cursor-no-drop text-[1.24vw] font-extralight relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 after:w-full"
            >
              PROJECTS
            </Link>
          </div>

        </div>
      </header>
      <div className="flex py-[5%] px-[10%] overflow-y-scroll z-2"> 
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

export default function ProjectsPage() {
  return (
    <StandardSubPage page_name="projects" content={content} idx={3} />
  );
}