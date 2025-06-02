import './App.css';
import Greeting from "./components/greetings.js";
import photo from './images/basic_image.jpg';
import GridElement from './components/grid_element.js';

export default function App() {
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
            <p>Sophomore at Carnegie Mellon University</p>
            <p>Passionate about machine learning, deep learning, robotics, and computer systems</p>
          </div>
        </div>
      </header>

      {/* ======================================
          Grid of cards below
          ====================================== */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 p-0 mt-auto">
        <GridElement image_background={photo} text="About Me" />
        <GridElement image_background={photo} text="Projects" />
        <GridElement image_background={photo} text="Resume" />
        <GridElement image_background={photo} text="Courses" />
      </div>
    </div>
  );
}
