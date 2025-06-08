import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Mobile‑first version of the courses screen.
 * Use this component on a dedicated route (e.g. "/courses-mobile")
 * or render it conditionally when window.innerWidth < 768.
 */
export default function MobileCoursesPage() {
  const navigate = useNavigate();

  // ---------------------------------------------------------------------------
  // Content
  // ---------------------------------------------------------------------------
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
      name: "Probability Theory",
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

  const [modalIndex, setModalIndex] = useState(null); // null = no modal

  const openModal = (idx) => setModalIndex(idx);
  const closeModal = () => setModalIndex(null);
  const returnHome = () => navigate("/");

  const CourseButton = ({ course, idx }) => (
    <button
      onClick={() => openModal(idx)}
      className="hover:scale-110 w-full flex justify-between items-center text-left rounded-full p-8 mb-16 border-white border-2 font-light text-white transition-transform duration-200 transform hover:scale-115 transition-transform duration-300"
    >
      <span className="ml-2 text-balance text-stone-100 text-[6vw] font-thin"> {course.name}</span>
      <span className="mr-2 text-stone-200 text-[6vw] ml-8 font-thin">{course.term}</span>
    </button>
  );

  return (
    <>
      <div className="flex flex-col h-screen w-screen bg-black text-white p-[5%] overflow-y-scroll no-scrollbar">
        {/* Header / instructions */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[6vw] text-gray-300 font-thin leading-tight">
            Tap to Learn More
          </h1>
          <button
            onClick={returnHome}
            className="text-gray-400 hover:text-gray-300 transition-colors duration-200 p-2"
            aria-label="Return to Home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/60 backdrop-blur-md no-scrollbar">
          <div className="relative flex flex-col bg-stone-800 rounded-2xl shadow-2xl max-h-[90vh] w-full max-w-md overflow-hidden no-scrollbar">
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
              <p className="text-gray-300 whitespace-pre-wrap text-lg text-balance">{content[modalIndex].description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
