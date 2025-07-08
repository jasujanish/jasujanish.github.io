import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function CoursesPage() {
  // Content for the courses page
  const content = [
    {
      name: "Intro to Deep Learning (PhD)", 
      description: "Course Number: 11785\nTaken: Fall 2025\nUpcoming Course - Description Coming Soon.",
      term: "F25"
    },
    {
      name: "Intro to Machine Learning (PhD)",
      description: "Course Number: 10701\nTaken: Fall 2025\nUpcoming Course - Description Coming Soon.",
      term: "F25"
    },
    {
      name: "Natural Language Processing (PhD)",
      description: "Course Number: 11711\nTaken: Fall 2025\nUpcoming Course - Description Coming Soon.",
      term: "F25"
    },
    {
      name: "Intro to Computer Systems",
      description: "Course Number: 15213\nTaken: Spring 2025\n15213 has been my favorite course at CMU so far.\nAcademically, the course imbued me with a deep understanding of core computer systems concepts, such as the assembly language, cache fundamentals & the memory hierarchy, compiler optimizations, linkers, system-level signals, multi-threading, multi-processing, virtual memory fundamentals, network programming, system I/O, concurrent programming, etc. Personally, the course's focus on projects challenged me to develop creative solutions, reason about design choices, and debug with intent \u2014 deepening my passion for building projects.",
      term: "S25"
    },
    {
      name: "Principles of Functional Programming",
      description: "Course Number: 15150\nTaken: Spring 2025\n15150 is one of the most interesting courses I've taken so far.\nFunctional programming is a disciplined and type-oriented programming paradigm that emphasizes immutability, modularity, and mathematical reasoning. This course introduced me to numerous functional programming concepts, but the most significant lesson I learned was the importance of visualizing more abstract concepts, such as infinite sequences or trees, when writing algorithms. As such, this course greatly improved my ability to reason about and elegantly solve problems.",
      term: "S25"
    },
    {
      name: "Probability Theory",
      description: "Course Number: 21325\nTaken: Summer 2025\n21325 was a surprisingly fun course.\nI initially took the course to fulfill a pre-requisite for future machine learning courses while conducting research at CMU over the summer. However, I ended up greatly enjoying the course's mathematically rigorous approach to probability theory. Additionally, the course has greatly strengthened my proof-writing skills and mathematical intuition, making it one of the most valuable courses I've taken at CMU.",
      term: "S25"
    },
    {
      name: "Matrices and Linear Transformations",
      description: "Course Number: 21241\nTaken: Spring 2025\n21241 was my first exposure to linear algebra.\nThe course's focus on both computational problems and theoretical concepts helped me develop a strong foundation in linear algebra, which has been invaluable as I've aimed to learn more about machine learning.",
      term: "S25"
    },
    {
      name: "Calculus in Three Dimensions",
      description: "Course Number: 21259\nTaken: Spring 2025\n21259 was a highly enjoable course.\nThe course primarily focused on multivariable calculus, but the course delved into more advanced topics in vector calculus in the final third of the semester. Overall, I found the course's emphasis on visualizing concepts in three dimmensions and computational problems greatly enjoyable.",
      term: "S25"
    },
    {
      name: "Principles of Imperative Computation",
      description: "Course Number: 15122\nTaken: Fall 2024\n15122 is a standard introductory data structures and algorithms course; the course covers fundametal topics in computer science, familiarizes students with the C programming language, and helps students adjust to the rigor of CMU's cs curriculum.",
      term: "F24"
    },
    {
      name: "Concepts of Mathematics",
      description: "Course Number: 21127\nTaken: Fall 2024\n21127 was my first exposure to proof-based mathematics.\nThe course provided me with a strong and firm foundation in discrete mathematics and proof writing. This foundation has been invaluable in later classes, such as 21325 (Probability) and 15150 (Functional Programming).",
      term: "F24"
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
              className="hover:cursor-no-drop text-[1.24vw] font-extralight relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 after:w-full"
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
