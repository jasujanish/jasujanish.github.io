import './App.css';
import CoursePage from "./components/courses_page.js";
import ProjectsPage from './components/projects_page.js';
import BlogPage from './components/blog_page.js';
import FadeIn from './components/fade_in.js';
import { Link } from "react-router-dom";
import { createHashRouter, RouterProvider } from 'react-router-dom';
import React, { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiPaintFill } from "react-icons/ri";
import NavBarDesktop from './sub_components/nav_bar_desktop.js';
import FluidBackground from './sub_components/fluid_background.js';
import TailwindFluidBg from './sub_components/fluid_background_compatible.js';

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

// New Home Page with less vw, more responsive design
function HomePage() {
  const [colorScheme, setColorScheme] = useState(0);
  const currentLinkedIn = "https://linkedin.com/in/nishchay-jasuja"; 
  const currentGitHub = "https://github.com/jasujanish"; 

  return (
    <div className="min-h-screen flex flex-col font-inter text-gray-900 tracking-tight relative items-center justify-center">
      <TailwindFluidBg/>
      <div className="fixed inset-0 bg-opacity-70 backdrop-blur-sm z-10"></div>
      <NavBarDesktop index={0} />
      <main className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto flex-1 flex flex-col items-center justify-center pb-4 md:pb-[3%] relative z-10 px-4 md:px-0">
        <FadeIn>
          <div className='flex flex-col items-center justify-center text-center'>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[3.75vw] mb-2 md:mb-4 text-stone-700"> Hi, </h1>
          <h1 className="text-8xl md:text-9xl xl:text-[8.5vw] text-black font-light mb-4 md:mb-6 lg:mb-10 xl:mb-12"> 
            <span className="hover:cursor-text">I'm  Nish </span> 
          </h1>
          <div className="text-center text-lg xl:text-[2.5vw] font-light text-stone-700 w-[30ch] bg-white bg-opacity-40 backdrop-blur-sm rounded-2xl py-4 md:py-6 px-4 md:px-6 shadow-lg">
              <p className="hover:cursor-text tracking-normal leading-relaxed">
                Carnegie Mellon University Sophomore interested in machine learning, deep learning, computer systems, & robotics
              </p>
            </div>
            <div className="flex space-x-4 md:space-x-6 items-center justify-center mt-4 md:mt-6">
              <a
                href={currentLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 bg-white bg-opacity-40 backdrop-blur-sm rounded-full hover:bg-opacity-80 transition duration-300 hover:cursor-pointer"
              > 
                <FaLinkedin className="w-6 h-6 md:w-8 md:h-8 text-stone-700" />
              </a>
              <a
                href={currentGitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 bg-white bg-opacity-40 backdrop-blur-sm rounded-full hover:bg-opacity-80 transition duration-300 hover:cursor-pointer"
              >
                <FaGithub className="w-6 h-6 md:w-8 md:h-8 text-stone-700" />
              </a>
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
