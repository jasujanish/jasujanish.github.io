import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function CoursesPage() {
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
                      className="hover:bg-stone-900 text-left text-[1.1vw] rounded-full border-2 hover:border-white p-4 mb-4 font-light text-white hover:scale-110 transition-transform duration-300"
                  >
                      Return to Home
                  </button>
                  <button
                    onClick={toggleCollapsed}
                    title={collapsed ? "Expand list" : "Collapse list"}
                    className="text-[1.1vw] p-4 hover:scale-150 hover:text-white transition-transform duration-300 ml-8 p-4 mb-4"
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
                      : "relative after:absolute after:bottom-2 after:left-0 after:w-0 after:h-1 after:bg-white after:transition-all after:duration-300 hover:after:w-full transition-all duration-100 hover:cursor-pointer "
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
                  className="hover:bg-stone-900 text-left text-[1.1vw] rounded-full border-2 hover:border-white p-4 mb-4 font-light text-white hover:scale-110 transition-transform duration-300"
              >
                  Return to Home
              </button>
              <button
                onClick={toggleCollapsed}
                title={collapsed ? "Expand list" : "Collapse list"}
                className="text-[1.5vw] p-4 hover:scale-150 transition-transform duration-300 ml-8 p-4 mb-4"
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
