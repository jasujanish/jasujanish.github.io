import './App.css'; // (Optional) any extra CSS you want
import Greeting from "./components/greetings.js";
import photo from './images/basic_image.jpg';
import GridElement from './components/grid_element.js';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white cursor-cell">
      {/* Main container */}
      <header
          className="
            relative
            flex flex-col items-start justify-center
            w-full h-3/5
            bg-cover bg-center
            p-8
          "
        >

          {/* Rotating greeting text */}
          <div className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 hover:cursor-text">
            <Greeting />
          </div>
          {/* Body text with contact link */}
          <div className="max-w-2xl text-lg md:text-xl leading-relaxed text-gray-300 hover:cursor-text">
          <p>
          I'm a freshman at Carnegie Mellon University majoring in Statistics & Machine Learning and Computer Science. I'm greatly interested in machine learning, deep learning, data science, robotics, and computer systems.
          </p>
          <p>
          I'm always interested in opportunities to learn and explore new ideas. Feel free to reach out and {' '}
            <a
              href="https://www.linkedin.com/in/nishchay-j/"
              className="font-bold underline hover:text-blue-300"
            >
              contact&nbsp;me
            </a>
            .
          </p>
          </div>
        </header>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 p-0 mt-auto">
          <GridElement    
          image_background= {photo}
          text="About Me" 
          />
          <GridElement    
          image_background= {photo}
          text="Projects" 
          />
          <GridElement    
          image_background= {photo}
          text="Resume" 
          />
          <GridElement    
          image_background= {photo}
          text="Courses" 
          />
        </div>
        {/* Bottom section: Four “About me” buttons 
        <nav className="w-full h-2/5 flex flex-wrap">
          {['About me', 'About me', 'About me', 'About me'].map((label, idx) => (
            <div key={idx} className="w-1/2 md:w-1/4 p-4">
              <button
                className="
                  w-full h-full
                  bg-gray-700/50
                  rounded-xl
                  flex items-center justify-center
                  text-xl font-medium
                  hover:bg-gray-600/70
                  transition
                "
              >
                {label}
              </button>
            </div>
          ))}
        </nav> 
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {cards.map((card, idx) => (
            <a
              key={idx}
              href={card.href}
              className="
                relative
                h-48
                sm:h-56
                md:h-64
                rounded-xl
                overflow-hidden
                group
                transform
                hover:scale-[1.02]
                transition
              "
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.imgSrc})` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <span className="text-white text-xl font-semibold px-2 py-1 bg-black bg-opacity-60 rounded">
                  {card.label}
                </span>
              </div>
            </a>
          ))}
        </div>

        */}
    </div>
  );
}
