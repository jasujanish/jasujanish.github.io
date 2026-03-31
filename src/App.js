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
import TextType from './components/text_type.js';
import FluidBackgroundCSS from './sub_components/fluid_background_fast.js';
import ParticleImage from './components/ParticleImage';
import { PretextBlock } from './components/pretext_block.js';

// Not found page (in case of invalid route)
function NotFoundPage() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-fade text-stone-800 p-8">
      <PretextBlock
        as="p"
        measurementText={'Page Not Found Return Home'}
        className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center"
      >
        <Link
          to="/"
          className="text-stone-800 hover:text-blue-800 hover:cursor-pointer transition-all duration-300"
        >
          Page Not Found <br></br>
          Return Home
        </Link>
      </PretextBlock>
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
    "reinforcement learning",
    "LLM post-training",
    "computer vision",
    "robotics",
  ];

  const captions = [
    "(Interact With) Me",
    "(Interact With) My school",
    "(Interact With) My place of work",
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const interestMeasurementText = interests.map(
    (interest) => `Interested in ${interest}`
  );

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
      <FluidBackgroundCSS opacity={0.40} className="opacity-100" />
      <div className="fixed inset-0 bg-white/38 backdrop-blur-[72px] z-10"></div>
      <div className="fixed inset-0 z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.7),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.5),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.52))]"></div>

      {/* Content Wrapper */}
      <div className="relative z-20 flex-1 flex flex-col lg:flex-row min-h-screen max-w-[1380px] mx-auto w-full">

        {/* Left Column: Text & Content */}
        <div className="flex-[1.02] flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20 py-10 lg:py-0 order-2 lg:order-1 mt-8 lg:mt-0">
          <FadeIn opacity={0} delay={0.2} className="flex flex-col items-start text-left">

            <PretextBlock
              as="h1"
              measurementText="Nishchay Jasuja"
              className="text-4xl md:text-5xl lg:text-6xl xl:text-[5.25rem] font-bold mb-5 text-slate-800 tracking-tight leading-[0.95]"
            >
              Nishchay Jasuja
            </PretextBlock>

            <PretextBlock
              as="div"
              measurementText={interestMeasurementText}
              className="text-xl md:text-[1.65rem] lg:text-[2.1rem] font-light text-slate-700 mb-8 min-h-[4.5rem] md:min-h-[3.75rem] flex items-center flex-wrap leading-[1.35]"
            >
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
            </PretextBlock>

            {/* Mobile Animation Placement */}
            {isMobile && (
              <div className="w-full mb-10 flex flex-col items-center">
                <ResponsiveParticleImage onIndexChange={setActiveIndex} />
                <div className="mt-3 h-8 flex items-center justify-center">
                  <PretextBlock
                    as="p"
                    measurementText={captions}
                    className="text-slate-400 font-light tracking-widest text-xs uppercase"
                  >
                    {captions[activeIndex]}
                  </PretextBlock>
                </div>
              </div>
            )}

            <PretextBlock
              as="p"
              className="text-lg md:text-[1.34rem] text-slate-600 leading-[1.92] max-w-[39rem] mb-10 font-light"
            >
             Studying computer science and artificial intelligence at <span className="font-medium text-[#C41E3A]">Carnegie Mellon University</span>.

             Working on <Link to="/projects/all" className="font-medium text-slate-900 hover:text-blue-600 underline decoration-slate-300 underline-offset-4 transition-all duration-300 hover:decoration-blue-400">projects</Link>, <Link to="/courses/all" className="font-medium text-slate-900 hover:text-blue-600 underline decoration-slate-300 underline-offset-4 transition-all duration-300 hover:decoration-blue-400">coursework</Link>, and <Link to="/research" className="font-medium text-slate-900 hover:text-blue-600 underline decoration-slate-300 underline-offset-4 transition-all duration-300 hover:decoration-blue-400">research</Link>.
            </PretextBlock>

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
          <div className="flex-[0.98] relative min-h-[50vh] lg:min-h-auto lg:h-auto order-1 lg:order-2 flex flex-col items-center justify-center px-4 md:px-8 lg:px-0 pt-8 lg:pt-0">
            <div className="w-full h-full lg:max-w-[500px] xl:max-w-[560px] lg:max-h-[500px] xl:max-h-[560px] flex flex-col items-center justify-center relative">
              <ResponsiveParticleImage onIndexChange={setActiveIndex} />
              {/* Caption */}
              <div className="mt-5 h-8 flex items-center justify-center">
                <PretextBlock
                  as="p"
                  measurementText={captions}
                  className="text-slate-400 font-light tracking-widest text-xs uppercase"
                >
                  {captions[activeIndex]}
                </PretextBlock>
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
