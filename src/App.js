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
import photo1 from './images/basic_image.jpg';
import photo2 from './images/photo2.jpeg';
import photo3 from './images/photo3.jpeg';
import photo4 from './images/photo4.jpg';
import photo5 from './images/photo5.jpg';
import photo6 from './images/photo6.jpg';
import photo7 from './images/photo7.jpg';
import photo8 from './images/photo8.jpg';
import GridElement from './components/grid_element.js';
import {useState, useEffect} from 'react';
import MobileElement from './components/mobile_element.js';
// import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

/** TO DO LIST
 * 1. Build courses, projects, and about me pages
 * 2. Fix tailwind CSS so it works from mobile to giant screens
 *  2a. (use screen resolution changer to ensure it works for large screens)
 * 3. Fix tailwind CSS so margins and everything else defined by constants are defined by percentages instead
 */

// Image sources for grid elements
const image_paths = [[photo2, photo4, photo3, photo1], [photo7, photo5, photo8,photo6]];


// Text descriptions for grid elements
const currentTexts = ["About Me", "Projects", "Resume", "Courses"];

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
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-black text-white p-8">
      <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center">      
        <Link
        to="/"
        className="text-white hover:bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:bg-clip-text hover:text-transparent hover:font-bold transition-all duration-300 hover:cursor-pointer"
      >
        Page Not Found <br></br>
        Return Home
      </Link>
      </p>
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
function HomePage() {
  // State to randomly choose a set of images
  const [currentImages, setCurrentImages] = useState(image_paths[0]);

  useEffect(() => {
    // Randomly select a set of images on component mount
    const randomIndex = Math.floor(Math.random() * image_paths.length);
    setCurrentImages(image_paths[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white cursor-cell font-mono overflow-hidden">
      <header
        className="
          relative
          flex items-center justify-center   
          w-full h-2/5
          bg-cover bg-center
          p-16
          xl:p-20
          2xl:p-36
          text-left    
          flex-grow                     
        "
      >
        <div className="
            w-full
            sm:w-3/4
            md:w-3/4            
            lg:pl-8 xl:pl-12 2xl:pl-16
        ">
          {/* Rotating Greeting, Hover Gradient */}
          <h1 className="font-sans mb-8 2xl:mb-12 text-balance">
            <Greeting />
          </h1>

          {/* Description */}
          <div className="text-balance text-gray-300 text-lg xl:text-xl 2xl:text-3xl leading-relaxed font-light">
            <p className="hover:cursor-text">Sophomore at Carnegie Mellon University</p>
            <p className="hover:cursor-text">Passionate about machine learning, deep learning, robotics, and computer systems</p>
          </div>
        </div>
      </header>
      <>
      <div  className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 p-0 mt-auto">
            <Link
              to={currentRoutes[0]}
              key={currentRoutes[0]}
              className="block"
            >
              <GridElement
                image_background={currentImages[0]}
                text={currentTexts[0]}
              />
            </Link>
            <Link
              to={currentRoutes[1]}
              key={currentRoutes[1]}
              className="block"
            >
              <GridElement
                image_background={currentImages[1]}
                text={currentTexts[1]}
              />
            </Link>
            <a href={currentLinkedIn} target="_blank" rel="noopener noreferrer">
              <GridElement image_background={currentImages[2]} text={currentTexts[2]} />
            </a>
            <Link
              to={currentRoutes[3]}
              key={currentRoutes[3]}
              className="block"
            >
              <GridElement
                image_background={currentImages[3]}
                text={currentTexts[3]}
              />
            </Link>
        </div>
      </>
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
function MobilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white cursor-cell font-mono overflow-hidden">
      <header
        className="
          relative
          flex items-center justify-center   
          w-full h-2/5
          bg-cover bg-center
          p-10
          mt-4
          text-left                         
        "
      >
        <div className="
            w-full
            sm:w-3/4
            md:w-3/4            
            pl-4 md:pl-8 lg:pl-16   /* padding-left pushes the text in from the edge */
        ">
          {/* Rotating Greeting, Hover Gradient */}
          <h1 className="font-semibold font-sans mb-12">
            <MobileGreeting />
          </h1>

          {/* Description */}
          <div className="text-balance text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed font-light">
            <p className="hover:cursor-text">Sophomore at Carnegie Mellon University</p>
            <p className="hover:cursor-text">Passionate about machine learning, deep learning, robotics, and computer systems</p>
          </div>
        </div>
      </header>
      <div className="w-full p-0 mt-auto">
            <MobileElement image_background={photo7} list_of_texts = {currentTexts} list_of_links={currentRoutes}/>
      </div>
    </div>
  );
}

/**
 * Sets up routing, returns home page to start
 * @Returns Home page with subpage routing
 */
export default function App() {
  const isMobile = useIsMobile(1024);

  return (
    <Router>
      <Routes>
        {/* Home page (grid + header) */}
        <Route path="/" element={isMobile ? (<MobilePage />) : <HomePage />} />

        {/* Subpages */}
        <Route path="/about" element= {isMobile ? (<MobileBlogPage />) : <BlogPage />} />
        <Route path="/projects" element= {isMobile ? (<MobileProjectsPage />) : <ProjectsPage />} />
        <Route path="/resume" element={<UnderConstructionPage />} />
        <Route path="/courses" element= {isMobile ? (<MobileCoursesPage />) : <CoursePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
