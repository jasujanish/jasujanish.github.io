import './App.css';
import CoursePage from "./components/courses_page.js";
import ProjectsPage from './components/projects_page.js';
import BlogPage from './components/blog_page.js';
import FadeIn from './components/fade_in.js';
import { Link } from "react-router-dom";
import { createHashRouter, RouterProvider } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiPaintFill } from "react-icons/ri";
import NavBarDesktop from './sub_components/nav_bar_desktop.js';
import FluidBackground from './sub_components/fluid_background.js';

// Text descriptions for grid elements
const currentTexts = ["About Me", "Projects", "LinkedIn", "Courses"];

// Links for grid elements
const currentRoutes = ['/about', '/projects', '/resume', '/courses'];

// Temporary page for development (will be replaced later)
function UnderConstructionPage() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-black text-white p-8">
      <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center">      
        <Link
        to="/"
        className="text-white hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:bg-clip-text hover:text-transparent hover:font-bold transition-all duration-300 hover:cursor-pointer"
      >
        Under Construction <br></br>
        Return Home
      </Link>
      </p>
    </div>
  );
}

// Not found page (in case of invalid route)
function NotFoundPage() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-fade text-stone-800 p-8">
      <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center">      
        <Link
        to="/"
        className="text-stone-800 hover:text-blue-800 hover:cursor-pointer transition-all duration-300"
      >
        Page Not Found <br></br>
        Return Home
      </Link>
      </p>
    </div>
  );
}

// Old Home Page with vw, kept for reference
/*
function HomePage() {
  const [colorScheme, setColorScheme] = useState(1.5);
  const currentLinkedIn = "https://linkedin.com/in/nishchay-jasuja"; // Replace with actual URL
  const currentGitHub = "https://github.com/jasujanish"; // Replace with actual URL

  return (
    <div className="min-h-screen flex flex-col font-inter text-gray-900 tracking-tight relative">
      <FluidBackground colorScheme={colorScheme} speed={1} />
      <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm z-10"></div>
      <NavBarDesktop index={0} />
      <main className="w-1/2 mx-auto flex-1 flex flex-col items-center justify-center text-center pb-[3%] relative z-10">
        <FadeIn>
          <h1 className="text-[3.75vw] mb-[-2vw] text-stone-700"> Hi, </h1>
          <h1 className="text-[8.5vw] text-black font-light"> <span className="hover:cursor-text">I'm  Nish </span> </h1>
          <div className="text-[2.5vw] font-light h-full text-stone-700 w-[30ch] bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-[3%] px-[2%] shadow-lg">
              <p className="hover:cursor-text tracking-normal">
                Carnegie Mellon University Sophomore Interested in machine learning, deep learning, computer systems, & robotics
              </p>
            </div>
            <div className="flex space-x-6 items-center justify-center mt-6">
              <a
                href={currentLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-40 transition duration-300 hover:cursor-pointer"
              > 
                <FaLinkedin className="w-8 h-8 text-stone-700" />
              </a>
              <a
                href={currentGitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-40 transition duration-300 hover:cursor-pointer"
              >
                <FaGithub className="w-8 h-8 text-stone-700" />
              </a>
              <button
              onClick={() => setColorScheme((prev) => (prev + 1) % 3)}
                className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-40 transition duration-300 hover:cursor-pointer"
              >
                <RiPaintFill className="w-8 h-8 text-stone-700" />
              </button>
            </div>
          </FadeIn>
        </main>
    </div>
  );
}
*/

// New Home Page with less vw, more responsive design
function HomePage() {
  const [colorScheme, setColorScheme] = useState(1.5);
  const currentLinkedIn = "https://linkedin.com/in/nishchay-jasuja"; 
  const currentGitHub = "https://github.com/jasujanish"; 

  return (
    <div className="min-h-screen flex flex-col font-inter text-gray-900 tracking-tight relative items-center justify-center">
      <FluidBackground colorScheme={colorScheme} speed={1.5} />
      <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm z-10"></div>
      <NavBarDesktop index={0} />
      <main className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto flex-1 flex flex-col items-center justify-center pb-4 md:pb-[3%] relative z-10 px-4 md:px-0">
        <FadeIn>
          <div className='flex flex-col items-center justify-center text-center'>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[3.75vw] mb-2 md:mb-4 text-stone-700"> Hi, </h1>
          <h1 className="text-8xl md:text-9xl xl:text-[8.5vw] text-black font-light mb-4 md:mb-6 lg:mb-10 xl:mb-12"> 
            <span className="hover:cursor-text">I'm  Nish </span> 
          </h1>
          <div className="text-center text-lg xl:text-[2.5vw] font-light text-stone-700 w-[30ch] bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-4 md:py-6 px-4 md:px-6 shadow-lg">
              <p className="hover:cursor-text tracking-normal leading-relaxed">
                Carnegie Mellon University Sophomore interested in machine learning, deep learning, computer systems, & robotics
              </p>
            </div>
            <div className="flex space-x-4 md:space-x-6 items-center justify-center mt-4 md:mt-6">
              <a
                href={currentLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-40 transition duration-300 hover:cursor-pointer"
              > 
                <FaLinkedin className="w-6 h-6 md:w-8 md:h-8 text-stone-700" />
              </a>
              <a
                href={currentGitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-40 transition duration-300 hover:cursor-pointer"
              >
                <FaGithub className="w-6 h-6 md:w-8 md:h-8 text-stone-700" />
              </a>
              <button
              onClick={() => setColorScheme((prev) => (prev + 1) % 3)}
                className="p-2 md:p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-40 transition duration-300 hover:cursor-pointer"
              >
                <RiPaintFill className="w-6 h-6 md:w-8 md:h-8 text-stone-700" />
              </button>
            </div>
            </div>
          </FadeIn>
        </main>
    </div>
  );
}

//
export default function App() {
  const router = createHashRouter([
    {
      path: '/',
      element:(<HomePage />)
    },
    {
      path: '/about/:slug',
      element: <BlogPage />
    },
    {
      path: '/courses/:slug',
      element: <CoursePage />
    },
    {
      path: '/projects/:slug',
      element: <ProjectsPage />
    },
    {
      path: '*',
      element: <NotFoundPage />
    },

  ]);
  return (<RouterProvider router={router} />);
}
