import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Mobile‑first version of the courses screen.
 * Use this component on a dedicated route (e.g. "/courses-mobile")
 * or render it conditionally when window.innerWidth < 768.
 */
export default function MobileBlogPage() {
  const navigate = useNavigate();

  // ---------------------------------------------------------------------------
  // Content
  // ---------------------------------------------------------------------------
  const content = [
    {
        name: "Coming Soon!",
        description: "Description Coming Soon!",
    },
    {
        name: "Coming Soon!",
        description: "Description Coming Soon!",
    },
    {
        name: "Coming Soon!",
        description: "Description Coming Soon!",
    },
    {
        name: "Coming Soon!",
        description: "Description Coming Soon!",
    },
    {
        name: "Coming Soon!",
        description: "Description Coming Soon!",
    },
  ];

  const [modalIndex, setModalIndex] = useState(null); // null = no modal

  const openModal = (idx) => setModalIndex(idx);
  const closeModal = () => setModalIndex(null);
  const returnHome = () => navigate("/");

  const CourseButton = ({ course, idx }) => (
    <button
      onClick={() => openModal(idx)}
      className="w-full text-left font-light text-[5vw] mb-6 transition-transform duration-200 transform hover:scale-105 hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:bg-clip-text hover:text-transparent"
    >
      {course.name}
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
