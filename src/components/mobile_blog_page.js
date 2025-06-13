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
  const [modalIndex, setModalIndex] = useState(null); // null = no modal

  const openModal = (idx) => setModalIndex(idx);
  const closeModal = () => setModalIndex(null);
  const returnHome = () => navigate("/");

  const CourseButton = ({ course, idx }) => (
    <button
      onClick={() => openModal(idx)}
      className="w-full flex justify-between items-center text-left p-4 mb-4 text-white"
    >
      <span className="ml-2 text-balance text-stone-100 text-xl font-normal"> {course.name}</span>
      <span className="mr-2 text-stone-200 text-xl ml-12 font-normal">{course.term}</span>
    </button>
  );

  return (
    <>
      <div className="min-h-screen w-full bg-black text-white">
        <div className="px-[5%] py-8">
          {/* Header / instructions */}
          <div className="flex justify-between items-center mb-12 p-4">
            <h1 className="text-4xl text-gray-200 font-semibold leading-tight">
              Tap to Learn More
            </h1>
            <button
              onClick={returnHome}
              className="text-gray-300 transition-colors duration-200 p-2"
              aria-label="Return to Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Course list */}
          <ul className="pb-8">
            {content.map((course, idx) => (
              <li key={idx}>
                <CourseButton course={course} idx={idx} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      {modalIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="relative flex flex-col bg-stone-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh]">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-300 transition-colors duration-200 p-4 z-10"
              aria-label="Close course details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Course Content */}
            <div className="p-10 overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4 text-white">{content[modalIndex].name}</h2>
              <p className="text-gray-300 whitespace-pre-wrap text-xl text-balance">{content[modalIndex].description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}