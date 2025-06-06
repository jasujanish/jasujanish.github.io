// src/App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Greeting from './components/greetings.js';
import GridElement from './components/grid_element.js';
import MobileElement from './components/mobile_element.js';

// Import your images
import photo1 from './images/basic_image.jpg';
import photo2 from './images/photo2.jpeg';
import photo3 from './images/photo3.jpeg';
import photo4 from './images/photo4.jpg';
import photo5 from './images/photo5.jpg';
import photo6 from './images/photo6.jpg';
import photo7 from './images/photo7.jpg';
import photo8 from './images/photo8.jpg';

// Image sets for grid (randomized)
const image_paths = [
  [photo2, photo4, photo3, photo1],
  [photo7, photo5, photo8, photo6]
];

// Mobile breakpoint
const switch_grid = 1024;

// The labels we want to show on each box
const currentTexts = ['About Me', 'Projects', 'Resume', 'Courses'];

// Instead of external links, we now point to internal routes:
const currentRoutes = ['/about', '/projects', '/resume', '/courses'];

// ---- HomePage: header + grid/mobile view ----
function HomePage() {
  const [currentImages, setCurrentImages] = useState(image_paths[0]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < switch_grid);

  useEffect(() => {
    // Randomly pick one of the two image sets on mount
    const randomIndex = Math.floor(Math.random() * image_paths.length);
    setCurrentImages(image_paths[randomIndex]);

    // Listen for window resize to toggle between grid/mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < switch_grid);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white cursor-cell font-mono overflow-hidden">
      {/* ===== Header ===== */}
      <header
        className="
          relative
          flex items-start justify-start
          w-full h-2/5
          bg-cover bg-center
          p-10
          mt-4
          text-left
        "
      >
        <div
          className="
            max-w-2xl
            w-full
            md:w-1/2
            lg:w-1/3
            pl-4 md:pl-8 lg:pl-16
          "
        >
          <h1 className="font-semibold font-sans mb-12">
            <Greeting />
          </h1>

          <div className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed font-light">
            <p className="hover:cursor-text">
              Sophomore at Carnegie Mellon University
            </p>
            <p className="hover:cursor-text">
              Passionate about machine learning, deep learning, robotics, and
              computer systems
            </p>
          </div>
        </div>
      </header>

      {/* ===== Grid or Mobile List ===== */}
      {isMobile ? (
        <div className="w-full p-0 mt-auto">
          {/* MobileElement expects props: image_background and arrays of texts+links */}
          <MobileElement
            image_background={photo7}
            list_of_texts={currentTexts}
            list_of_links={currentRoutes}
          />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 p-0 mt-auto">
          {currentImages.map((imgSrc, idx) => (
            <Link
              to={currentRoutes[idx]}
              key={currentRoutes[idx]}
              className="block"
            >
              <GridElement
                image_background={imgSrc}
                text={currentTexts[idx]}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Placeholder Subpage Components ----
function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-semibold mb-4">About Me</h2>
      <p className="text-lg">
        {/* Replace with your actual “About Me” content */}
        This is where you can write all about yourself.
      </p>
      <Link
        to="/"
        className="mt-6 text-blue-400 hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

function ProjectsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-semibold mb-4">Projects</h2>
      <p className="text-lg">
        {/* List or describe your projects here */}
        Here are some of my projects...
      </p>
      <Link
        to="/"
        className="mt-6 text-blue-400 hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

function ResumePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-semibold mb-4">Resume</h2>
      <p className="text-lg">
        {/* Embed or link to your resume PDF, etc. */}
        You can download my resume here.
      </p>
      <Link
        to="/"
        className="mt-6 text-blue-400 hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

function CoursesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-semibold mb-4">Courses</h2>
      <p className="text-lg">
        {/* List courses you’re taking or have taken */}
        These are the courses I’m enrolled in...
      </p>
      <Link
        to="/"
        className="mt-6 text-blue-400 hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

// ---- Main App: define routes ----
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home page (grid + header) */}
        <Route path="/" element={<HomePage />} />

        {/* Subpages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/courses" element={<CoursesPage />} />

        {/* (Optional) a “catch-all” 404 page if you want */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}
