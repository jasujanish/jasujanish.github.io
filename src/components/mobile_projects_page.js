import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Mobile‑first version of the courses screen.
 * Use this component on a dedicated route (e.g. "/courses-mobile")
 * or render it conditionally when window.innerWidth < 768.
 */
export default function MobileProjectsPage() {
  const navigate = useNavigate();

  // ---------------------------------------------------------------------------
  // Content
  // ---------------------------------------------------------------------------
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

  const [modalIndex, setModalIndex] = useState(null); // null = no modal

  const openModal = (idx) => setModalIndex(idx);
  const closeModal = () => setModalIndex(null);
  const returnHome = () => navigate("/");

  const CourseButton = ({ course, idx }) => (
    
    <button
      onClick={() => openModal(idx)}
      className="w-full flex justify-between items-center text-left p-4 mb-4 text-white transition-transform duration-200 transform hover:scale-115 transition-transform duration-300"
    >
      <span className="ml-2 text-balance text-stone-100 text-xl font-normal"> {course.name}</span>
      <span className="mr-2 text-stone-200 text-xl ml-12 font-normal">{course.term}</span>
    </button>
  );

  return (
    <>
      <div className="flex flex-col h-screen w-screen bg-black text-white p-[5%] overflow-y-scroll">
        {/* Header / instructions */}
        <div className="flex justify-between items-center mb-12 p-4">
          <h1 className="text-4xl text-gray-200 font-semibold leading-tight">
            Tap to Learn More
          </h1>
          <button
            onClick={returnHome}
            className="text-gray-300 hover:text-white transition-colors duration-200 p-2"
            aria-label="Return to Home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Course list */}
        <ul>
          {content.map((course, idx) => (
            <li key={idx}>
              <CourseButton course={course} idx={idx} />
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {modalIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md no-scrollbar">
          <div className="relative flex flex-col bg-stone-800 rounded-2xl shadow-2xl min-w-[75vw] max-w-[80vw] max-h-[95vh] overflow-y-scroll no-scrollbar">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-300 transition-colors duration-200 p-4"
              aria-label="Close course details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Course Content */}
            <div className="p-10 overflow-y-auto no-scrollbar">
              <h2 className="text-2xl font-semibold mb-4 text-white">{content[modalIndex].name}</h2>
              <p className="text-gray-300 whitespace-pre-wrap text-xl text-balance">{content[modalIndex].description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
