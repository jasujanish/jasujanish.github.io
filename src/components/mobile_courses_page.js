import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Mobile version of the courses screen
 */
export default function MobileCoursesPage() {
  // Courses Content
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
      description: "Course Number: 15213\nTaken: Spring 2025\n15213 has been my favorite course at CMU so far.\nAcademically, the course imbued me with a deep understanding of core computer systems concepts, such as the assembly language, cache fundamentals & the memory hierarchy, compiler optimizations, linkers, system-level signals, multi-threading, multi-processing, virtual memory fundamentals, network programming, system I/O, concurrent programming, etc. Personally, the course's focus on projects challenged me to develop creative solutions, reason about design choices, and debug with intent — deepening my passion for building projects.",
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

  // Manage the pop-up item
  const [modalIndex, setModalIndex] = useState(null); // null = no modal
  const openModal = (idx) => setModalIndex(idx); 
  const closeModal = () => setModalIndex(null);
  
  // Manage navigation
  const navigate = useNavigate();
  const returnHome = () => navigate("/");

  // Button to select any item
  const CourseButton = ({ course, idx }) => (
    <button
      onClick={() => openModal(idx)}
      className="w-full flex justify-between items-center text-left p-4 mb-4 text-white"
    >
      <span className="ml-2 text-balance text-stone-700 text-xl font-normal"> {course.name}</span>
      <span className="mr-2 text-stone-700 text-xl ml-12 font-normal">{course.term}</span>
    </button>
  );

  return (
    <>
      <div className="min-h-screen w-full bg-[#F2F3F4] text-white">
        <div className="px-[5%] py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 p-4">
            <h1 className="text-4xl text-stone-700 font-semibold leading-tight">
              Tap to Learn More
            </h1>
            <button
              onClick={returnHome}
              className="text-stone-800 transition-colors duration-200 p-2"
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

      {/* Pop-up Item */}
      {modalIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative flex flex-col bg-stone-100 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh]">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-stone-800 transition-colors duration-200 p-4 z-10"
              aria-label="Close course details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Course Content */}
            <div className="p-10 overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4 text-stone-800">{content[modalIndex].name}</h2>
              <p className="text-stone-800 whitespace-pre-wrap text-xl text-balance">{content[modalIndex].description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}