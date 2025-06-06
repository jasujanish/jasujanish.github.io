import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function CoursesPage() {
  const courses = [
    {
      name: "10-701: Introduction to Machine Learning (PhD)",
      description: "Fall 2025\nUpcoming Course - Description Coming Soon.",
    },
    {
      name: "11-785: Introduction to Deep Learning (PhD)", 
      description: "Fall 2025\nUpcoming Course - Description Coming Soon.",
    },
    {
      name: "11-711: Advanced Natural Language Processing (PhD)",
      description: "Fall 2025\nUpcoming Course - Description Coming Soon.",
    },
    {
      name: "15-213: Introduction to Computer Systems",
      description: "Spring 2025\nDescription Coming Soon!",
    },
    {
      name: "15-150: Principles of Functional Programming",
      description: "Spring 2025\nDescription Coming Soon!",
    },
    {
      name: "15-122: Principles of Imperative Computation",
      description: "Fall 2024\nDescription Coming Soon!",
    },
    {
      name: "21-241: Matrices and Linear Transformations",
      description: "Spring 2025\nDescription Coming Soon!",
    },
    {
      name: "21-259: Calculus in Three Dimensions",
      description: "Spring 2025\nDescription Coming Soon!",
    },
    {
      name: "21-127: Concepts of Mathematics",
      description: "Fall 2024\nDescription Coming Soon!",
    },
    {
      name: "73-102: Principles of Microeconomics",
      description: "Fall 2024\nDescription Coming Soon!",
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
          {courses.map((course, idx) => (
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
                {course.name}
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

      {/*
        Right pane: either initial placeholder text or the selected course description
        - flex-grow to fill remaining space
      */}
      <div className="flex-1 h-full p-6 sticky top-[0%] align-center">
        {selectedIndex === null ? (
          // Initial “welcome” / placeholder text
          <div className="h-full flex items-center justify-center"> {/* Modified this div */}
            <p className="text-white text-balance text-[5vw] text-center font-thin">
              <p >Select & Deselect Courses to Learn More</p>
              <br />
              <button className = "underline hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:bg-clip-text hover:text-transparent hover:scale-110 transition-all duration-300 hover:cursor-pointer" onClick={returnHome}>Return to Home</button>
            </p>
          </div>
        ) : (
          // Display the selected course description inside a scrollable, bordered box
          <div className="h-full rounded-lg p-4 overflow-y-scroll no-scrollbar">
            <h2 className="text-[2vw] text-white font-semibold mb-4">
              {courses[selectedIndex].name}
            </h2>
            <p className="text-[1.5vw] text-gray-300 whitespace-pre-wrap text-balanced">
              {courses[selectedIndex].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
