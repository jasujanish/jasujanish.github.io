import './App.css';
import Greeting from "./components/greetings.js";
import photo1 from './images/basic_image.jpg';
import photo2 from './images/photo2.jpeg';
import photo3 from './images/photo3.jpeg';
import photo4 from './images/photo4.jpg';
import photo5 from './images/photo5.jpg';
import photo6 from './images/photo6.jpg';
import photo7 from './images/photo7.jpg';
import photo8 from './images/photo8.jpg';

import GridElement from './components/grid_element.js';
import { useState, useEffect } from 'react';
import MobileElement from './components/mobile_element.js';

const image_paths = [[photo2, photo4, photo3, photo1], [photo7, photo5, photo8,photo6]];
const currentTexts = ["About Me", "Projects", "Resume", "Courses"];
const currentLinks = ["https://www.linkedin.com/in/sam-rozansky/", "https://www.linkedin.com/in/sam-rozansky/", "https://www.linkedin.com/in/sam-rozansky/", "https://www.linkedin.com/in/sam-rozansky/"];

export default function App() {
  const [currentImages, setCurrentImages] = useState(image_paths[0]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Randomly select a set of images on component mount
    const randomIndex = Math.floor(Math.random() * image_paths.length);
    setCurrentImages(image_paths[randomIndex]);

        // handler to update isMobile on resize
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);    
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white cursor-cell font-mono overflow-hidden">
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
        {/* 
          Give this inner div a max-width and left padding so it never spans  
          the full width, but still sits a bit in from the left edge. 
        */}
        <div className="
            max-w-2xl           /* cap how wide the text block can grow */
            w-full
            md:w-1/2            /* on medium screens, block is 50% of header width */
            lg:w-1/3            /* on large screens, block is 33% of header width */
            pl-4 md:pl-8 lg:pl-16   /* padding-left pushes the text in from the edge */
        ">
          <h1 className="font-semibold font-sans mb-12">
            <Greeting />
          </h1>

          <div className="text-gray-300 text-2xl leading-relaxed font-light">
            <p className="hover:cursor-text">Sophomore at Carnegie Mellon University</p>
            <p className="hover:cursor-text">Passionate about machine learning, deep learning, robotics, and computer systems</p>
          </div>
        </div>
      </header>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 p-0 mt-auto">
      {isMobile ? (
          /* If viewport < 768px, render MobileGrid instead */
          <>
            <MobileElement image_background={photo7} list_of_texts = {currentTexts} list_of_links={currentLinks}/>
          </>
        ) : (
          /* Otherwise, render the regular GridElement */
          <>
            <GridElement image_background={currentImages[0]} text={currentTexts[0]} />
            <GridElement image_background={currentImages[1]} text={currentTexts[1]} />
            <GridElement image_background={currentImages[2]} text={currentTexts[2]} />
            <GridElement image_background={currentImages[3]} text={currentTexts[3]} />
          </>
        )}
      </div>
    </div>
  );
}
