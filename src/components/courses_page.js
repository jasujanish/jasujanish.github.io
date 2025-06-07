import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function CoursesPage() {
  const content = [
    {
      name: "Intro to Deep Learning (PhD)", 
      description: "Fall 2025\nUpcoming Course - Description Coming Soon.",
      term: "F25"
    },
    {
      name: "Intro to Machine Learning (PhD)",
      description: "Fall 2025\nUpcoming Course - Description Coming Soon.",
      term: "F25"
    },
    {
      name: "Advanced Natural Language Processing (PhD)",
      description: "Fall 2025\nUpcoming Course - Description Coming Soon.",
      term: "F25"
    },
    {
      name: "Intro to Computer Systems",
      description: "Spring 2025\nDescription Coming Soon!",
      term: "S25"
    },
    {
      name: "Principles of Functional Programming",
      description: "Spring 2025\nDescription Coming Soon!",
      term: "S25"
    },
    {
      name: "Principles of Imperative Computation",
      description: "Fall 2024\nDescription Coming Soon!",
      term: "F24"
    },
    {
      name: "Probability",
      description: "Fall 2025\nDescription Coming Soon!",
      term: "S25"
    },
    {
      name: "Matrices and Linear Transformations",
      description: "Spring 2025\nDescription Coming Soon!",
      term: "S25"
    },
    {
      name: "Calculus in Three Dimensions",
      description: "Spring 2025\nDescription Coming Soon!",
      term: "S25"
    },
    {
      name: "Concepts of Mathematics",
      description: "Fall 2024\nDescription Coming Soon!",
      term: "F24"
    },
    {
      name: "Principles of Microeconomics",
      description: "Fall 2024\nDescription Coming Soon!",
      term: "F24"
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(1);
  const navigate = useNavigate();

  // Handler: click on a course name
  const toggleSelection = (idx) => {
    setSelectedIndex(idx);
  };

  const returnHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen w-screen p-[5%] pl-[10%] pr-[10%] pt-[5%] bg-stone-900 text-white overflow-y-scroll"> 
      <div className="w-3/10 h-full">
        <ul className="h-full p-4">
          {selectedIndex !== null && (
                <li>
                    <button
                        onClick={returnHome}
                        className="text-left text-[1.1vw] rounded-full border-2 hover:border-white p-4 mb-4 font-light text-white hover:scale-110 transition-transform duration-300"
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
                      ? "bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 scale-110 transition-all duration-100 hover:cursor-no-drop border-2 border-white"
                      : "hover:border-2 hover:border-white hover:scale-110 transition-all duration-100 hover:cursor-pointer"
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
          <div className="h-full rounded-lg p-4 overflow-y-scroll no-scrollbar">
            <h2 className="text-[2vw] text-white font-semibold mb-4">
              {content[selectedIndex].name}
            </h2>
            <p className="text-[1.5vw] text-gray-300 whitespace-pre-wrap text-balanced">
              {content[selectedIndex].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
