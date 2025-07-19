import './App.css';
import Greeting from "./components/greetings.js";
import MobileGreeting from "./components/mobile_greeting.js";
import CoursePage from "./components/courses_page.js";
import MobileCoursesPage from './components/mobile_courses_page.js';
import ProjectsPage from './components/projects_page.js';
import MobileProjectsPage from './components/mobile_projects_page.js';
import BlogPage from './components/blog_page.js';
import MobileBlogPage from './components/mobile_blog_page.js';
import useIsMobile from './components/is_mobile.js';
import GridElement from './components/grid_element.js';
import MobileElement from './components/mobile_element.js';
import FadeIn from './components/fade_in.js';
import { Link } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Text descriptions for grid elements
const currentTexts = ["About Me", "Projects", "LinkedIn", "Courses"];

// Links for grid elements
const currentLinkedIn = "https://www.linkedin.com/in/nishchay-j/";
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

function HomePage2() {
  return (
    <div className="min-h-screen flex flex-col bg-fade-cream font-inter text-gray-900 tracking-tight">
      <header className="flex-none sticky top-0 backdrop-blur px-[10%] py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="hover:cursor-no-drop tracking-normal text-[1.24vw] font-normal relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 after:w-full">
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
              className="hover:cursor-pointer text-[1.24vw] font-extralight relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 hover:after:w-full"
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

      {/* ── Main Content ─────────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-[5%] pb-[3%]">
        {/* Added top padding on main to avoid being hidden behind fixed navbar */}
        <FadeIn>
        <Greeting className='mt-0'/>
        </FadeIn>
        <FadeIn delay={0.5}>
        {<div className="text-[2.5vw] font-light text-stone-600 w-[30ch]">
            <p className="hover:cursor-text tracking-normal">Sophomore at Carnegie Mellon University Interested in artifical intelligence, machine learning, computer systems, and robotics</p>
        </div>}

        </FadeIn>
      </main>
    </div>
  );
}


/**
 * Home Page component
 * 1. Rotating greeting
 * 2. Name with hover gradient
 * 3. Description text
 * 4. Grid of subpages (or list for mobile)
 * @returns HomePage component
 */
function MobilePage1() {
  return (
    <div className="h-screen w-full py-[10%] px-[15%] flex flex-col bg-fade-cream font-inter justify-center text-center align-center">
      <h1 className="mb-5">
          <MobileGreeting />
      </h1>
      {/* <div className = "w-full flex-col"> */}
        <div className="text-balance text-stone-600 text-lg md:text-xl lg:text-2xl leading-relaxed font-light mb-5">
          <p>Sophomore at Carnegie Mellon University</p>
          <p>Passionate about machine & deep learning, robotics, and computer systems</p>
        </div>
<div className="grid grid-cols-2 gap-4 w-full max-w-[30ch] justify-between mx-auto">
  {currentRoutes.map((route, idx) => (
    <Link
      to={route}
      key={idx}
      className="
        text-balance text-stone-600 text-lg md:text-xl lg:text-2xl leading-relaxed font-light
        border border-gray-300 rounded-xl px-4 py-2 flex items-center justify-center
        mb-0
      "
    >
      {currentTexts[idx]}
    </Link>
  ))}
</div>
    </div>
  );
}

// Variant 6: Tech-focused monospace links
function MobilePage3() {
  return (
    <div className="h-screen w-full flex flex-col bg-fade-cream font-inter justify-center items-center text-center">
      <p className="mb-10">
        <MobileGreeting />
      </p>
      <div className="text-2xl md:text-3xl lg:text-4xl text-stone-600 font-inter font-light mb-5 max-w-[75%] text-balance w-[30ch]">
        <p>Sophomore at Carnegie Mellon Passionate about machine learning, computer systems, and robotics</p>
      </div>
      <div className="flex flex-col w-full min-w-[50%] max-w-[75%] w-[30ch]">
        {currentRoutes.map((route, idx) => (
          <Link
            to={route}
            key={idx}
            className="text-2xl md:text-3xl lg:text-4xl text-stone-600 font-inter font-light px-4 py-2 border border-gray-300 rounded-lg mb-2"
          >
            {currentTexts[idx]}
          </Link>
        ))}
      </div>
    </div>
  );
}

//
//
export default function App() {
  const isMobile = useIsMobile(1024);
  const router = createBrowserRouter([
    {
      path: '/',
      element: (isMobile ? (<MobilePage3 />) : <HomePage2 />)
    },
    {
      path: '/about/:slug',
      element: isMobile ? <MobileCoursesPage /> : <BlogPage />
    },
    {
      path: '/courses',
      element: (isMobile ? (<MobileCoursesPage />) : <CoursePage/>)
    },
    {
      path: '/projects',
      element: (isMobile ? (<MobileProjectsPage />) : <ProjectsPage />)
    },
    {
      path: '*',
      element: <NotFoundPage />
    },

  ]);
  return (<RouterProvider router={router} />);
}
