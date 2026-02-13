import './App.css';
import React from 'react';
import CoursePage from "./components/courses_page.js";
import ProjectsPage from './components/projects_page.js';
import BlogPage from './components/blog_page.js';
import ResearchPage from './components/research_page.js';
import FadeIn from './components/fade_in.js';
import { Link } from "react-router-dom";
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import NavBarDesktop from './sub_components/nav_bar_desktop.js';
import TextType from './components/text_type.js';
import StillBackgroundCSS from './sub_components/still_background.js';
import ParticleImage from './components/ParticleImage';

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

// Helper component to handle responsive sizing for ParticleImage
function ResponsiveParticleImage({ onIndexChange }) {
  const containerRef = React.useRef(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const updateSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        // Optimization: only update if dimensions change significantly
        setSize(prev => {
          if (Math.abs(prev.width - offsetWidth) < 2 && Math.abs(prev.height - offsetHeight) < 2) return prev;
          return { width: offsetWidth, height: offsetHeight };
        });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    // Force a square aspect ratio or strict height on mobile to ensure it has size before canvas loads
    // On desktop, it fills the parent. On mobile, we give it a class or style.
    // Using w-full and aspect-square ensures it takes space.
    <div ref={containerRef} className="w-full aspect-square max-w-[500px] lg:max-w-full lg:aspect-auto lg:h-full flex items-center justify-center relative">
      {mounted && size.width > 0 && (
        <ParticleImage
          width={size.width}
          height={size.height}
          onIndexChange={onIndexChange}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
      )}
    </div>
  );
}

// New Home Page with two-column layout
function HomePage() {
  const currentLinkedIn = "https://linkedin.com/in/nishchay-j/";
  const currentGitHub = "https://github.com/jasujanish";

  const interests = [
    "data science",
    "reinforcement learning",
    "multi-stage training",
    "robotics",
    "continuous learning",
  ];

  const captions = [
    "(Play With) Me",
    "My school",
    "My place of work",
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  // Mobile detection
  const [isMobile, setIsMobile] = React.useState(false); // Default false, update on mount

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint is 1024px
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-inter text-gray-900 tracking-tight relative overflow-x-hidden">
      <StillBackgroundCSS className="opacity-90" />
      {/* Make the overlay more subtle/glassy to show the background colors */}
      <div className="fixed inset-0 bg-white/40 backdrop-blur-3xl z-10"></div>

      {/* Content Wrapper */}
      <div className="relative z-20 flex-1 flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto w-full">

        {/* Left Column: Text & Content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-8 lg:py-0 order-2 lg:order-1 mt-8 lg:mt-0">
          <FadeIn opacity={0} delay={0.2} className="flex flex-col items-start text-left">

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 text-slate-800 tracking-tight">
              Nishchay Jasuja
            </h1>

            <div className="text-xl md:text-2xl lg:text-3xl font-light text-slate-700 mb-6 h-16 md:h-12 flex items-center flex-wrap">
              <span>Interested in&nbsp;</span>
              <span className="font-medium text-slate-900 min-w-[300px]">
                <TextType
                  text={interests}
                  loop={true}
                  typingSpeed={100}
                  deletingSpeed={50}
                  pauseDuration={1500}
                  cursorClassName="text-slate-900"
                />
              </span>
            </div>

            {/* Mobile Animation Placement */}
            {isMobile && (
              <div className="w-full mb-8 flex flex-col items-center">
                <ResponsiveParticleImage onIndexChange={setActiveIndex} />
                <div className="mt-2 h-8 flex items-center justify-center">
                  <p className="text-slate-400 font-light tracking-widest text-xs uppercase">
                    {captions[activeIndex]}
                  </p>
                </div>
              </div>
            )}

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mb-8 font-light">
              I'm currently studying computer science and machine learning at <span className="font-medium text-[#C41E3A]">Carnegie Mellon University</span>.
              My work spans across <Link to="/projects/all" className="font-medium text-slate-900 hover:text-blue-600 underline decoration-slate-300 underline-offset-4 transition-all duration-300 hover:decoration-blue-400">projects</Link>, <Link to="/courses/all" className="font-medium text-slate-900 hover:text-blue-600 underline decoration-slate-300 underline-offset-4 transition-all duration-300 hover:decoration-blue-400">coursework</Link>, and <Link to="/research" className="font-medium text-slate-900 hover:text-blue-600 underline decoration-slate-300 underline-offset-4 transition-all duration-300 hover:decoration-blue-400">research</Link>.
            </p>

            {/* Social & Contact */}
            <div className="flex space-x-6 mb-12">
              <a href={currentLinkedIn} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-700 transition-all transform hover:scale-110 duration-300">
                <FaLinkedin size={30} />
              </a>
              <a href={currentGitHub} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-black transition-all transform hover:scale-110 duration-300">
                <FaGithub size={30} />
              </a>
            </div>

          </FadeIn>
        </div>

        {/* Right Column: Particle Animation (Desktop Only) */}
        {!isMobile && (
          <div className="flex-1 relative min-h-[50vh] lg:min-h-auto lg:h-auto order-1 lg:order-2 flex flex-col items-center justify-center p-4 lg:p-0">
            <div className="w-full h-full lg:max-w-[600px] lg:max-h-[600px] flex flex-col items-center justify-center relative">
              <ResponsiveParticleImage onIndexChange={setActiveIndex} />
              {/* Caption */}
              <div className="mt-4 h-8 flex items-center justify-center">
                <p className="text-slate-400 font-light tracking-widest text-xs uppercase">
                  {captions[activeIndex]}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: (<HomePage />)
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
      path: '/research',
      element: <ResearchPage />
    },
    {
      path: '*',
      element: <NotFoundPage />
    },

  ]);
  return (<RouterProvider router={router} />);
}