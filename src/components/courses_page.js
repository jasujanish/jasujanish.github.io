import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FadeIn from "./fade_in";

export default function CoursesPage() {
  // Content for the courses page
  const content = [
  {
    name: "Intro to Deep Learning (PhD)",
    term: "F25",
    description: (
      <>
        <p>
          <strong>Course Number:</strong> 11785<br/>
          <strong>Taken:</strong> Fall 2025
        </p>
        <p>
          Upcoming Course - Description Coming Soon.
        </p>
      </>
    ),
  },
  {
    name: "Intro to Machine Learning (PhD)",
    term: "F25",
    description: (
      <>
        <p>
          <strong>Course Number:</strong> 10701<br/>
          <strong>Taken:</strong> Fall 2025
        </p>
        <p>Upcoming Course - Description Coming Soon.</p>
      </>
    ),
  },
  {
    name: "Natural Language Processing (PhD)",
    term: "F25",
    description: (
      <>
        <p>
          <strong>Course Number:</strong> 11711<br/>
          <strong>Taken:</strong> Fall 2025
        </p>
        <p>Upcoming Course - Description Coming Soon.</p>
      </>
    ),
  },
  {
    name: "Intro to Computer Systems",
    term: "S25",
    description: (
      <>
        <p>
          <strong>Course Number:</strong> 15213<br/>
          <strong>Taken:</strong> Spring 2025
        </p>
        <p>
          15213 has been my favorite course at CMU so far. The course introduced me to numerous core computer systems concepts, such as        </p>
          <ul className="list-disc list-inside ml-4">
            <li>Assembly</li>
            <li>Cache fundamentals & memory hierarchy</li>
            <li>Compiler optimizations & linkers</li>
            <li>System - level signals, and multi - processing</li>
            <li>Virtual memory fundamentals</li>
            <li>Network programming & system I/O</li>
            <li>Concurrency & multi-threading </li>
          </ul>
          <p>
            Further
            The project-focused assignments challenged me to reason about design
            choices and debug with intent—deepening my passion for building
            systems.
          </p>
      </>
    ),
  },
  {
    name: "Principles of Functional Programming",
    term: "S25",
    description: (
      <>
        <p>
          <strong>Course Number:</strong> 15150<br/>
          <strong>Taken:</strong> Spring 2025
        </p>
        <p>
          Functional programming is a type-oriented programming paradigm that emphasizes reasoning about problems mathematically, breaking up code into modular sections, and desigining elegant solutions. This course introduced me to numerous functional programming concepts, but the most significant lesson I learned was the importance of visualizing more abstract concepts, such as infinite sequences or trees, when tackling problems.
        </p>
      </>
    ),
  },
  {
    name: "Probability Theory",
    term: "S25",
    description: (
      <>
        <p>
          <strong>Course Number:</strong> 21325<br/>
          <strong>Taken:</strong> Summer 2025
        </p>
        <p>
        Since I was working as a reserach assistant at CMU over the summer, I took 21325 to prepare for future machine learning courses, and I ended up greatly enjoying the course's mathematically rigorous approach to probability theory. Further, due to this course, I've finally started attending professor office hours </p>
      </>
    ),
  },
  {
    name: "Matrices and Linear Transformations",
    term: "S25",
    description: (
      <>
        <p>
          <strong>Course Number:</strong> 21241<br/>
          <strong>Taken:</strong> Spring 2025
        </p>
        <p>
          A well-paced introduction to linear algebra with a great balance of computational and proof-based exercises. Greatly enjoyable!
        </p>
      </>
    ),
  },
  {
    name: "Calculus in Three Dimensions",
    term: "S25",
    description: (
      <>
        <p>
          <strong>Course Number:</strong> 21259<br/>
          <strong>Taken:</strong> Spring 2025
        </p>
        <p>
          A strong introduction to foundational multivariable and vector calculus topics with a focus on computational questions. Greatly enjoyable!
        </p>
      </>
    ),
  },
  {
    name: "Principles of Imperative Computation",
    term: "F24",
    description: (
      <>
        <p>
          <strong>Course Number:</strong> 15122<br/>
          <strong>Taken:</strong> Fall 2024
        </p>
        <p>
          15-122 is a standard introductory data structures & algorithms course; 15-122 covers fundamental computer science concepts, familiarizes students with the C programming language, emphasizes the importance of verifying the correctness of code, and helps students adjust to the rigor of CMU's CS curriculum.
        </p>
      </>
    ),
  },
  {
    name: "Concepts of Mathematics",
    term: "F24",
    description: (
      <>
        <p>
          <strong>Course Number:</strong> 21127<br/>
          <strong>Taken:</strong> Fall 2024
        </p>
        <p>
          My first proof-based math course—covering logic, set theory,
          combinatorics, and induction. Highly interesting & invaluable for later classes, such as probability and functional programming.
        </p>
      </>
    ),
  },
  ];

  const [selectedIndex, setSelectedIndex] = useState(1); // manages selected itemcle
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
