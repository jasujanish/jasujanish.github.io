import mountain_1 from '../images/mountain_1.png';
import mountain_2 from '../images/mountain_2.png';
import mountain_3 from '../images/mountain_3.png';
import mountain_4 from '../images/mountain_4.png';
import mountain_5 from '../images/mountain_5.png';
import mountain_6 from '../images/mountain_6.png';
import mountain_7 from '../images/mountain_7.png';
import mountain_8 from '../images/mountain_8.png';
import mountain_9 from '../images/mountain_9.png';

export const content = [
  {
    slug: 'ethics',
    name: 'Ethics Tracker',
    image: mountain_1,
    image_caption: 'Mount Everest | Highest Mountain on Earth | Source: Luca Galuzzi',
    date: 'Jul 2025',
    time: '3 minute read',
    summary: "LLM classification of a product's ethical considerations",
    description: (
      <div className="font-light text-gray-700  leading-7">
        <p>
          Developed May 2025<br />
          I developed a tool that takes in a product and determines how ethical the brand creating the product is. I utilized autonomous web scraping and an agentic workflow of 3 fine-tuned LLM agents (using Llama 3.1 8b) to autonomously collect information and analyze sources.
        </p>
      </div>
    ),
    tags:['ai', 'llms'],
    term: '2025',
    fade_in: 0.0
  },
  {
    slug: 'latex',
    name: 'LaTeX Classifier',
    image: mountain_2,
    image_caption: 'K2 | Second Highest Mountain on Earth | Source: Zacharie Grossen',
    date: 'May 2025',
    time: '1 minute read',
    summary: 'Computer-vision tool for LaTeX recognition',
    description: (
      <div className="font-light text-gray-700  leading-7">
        <p>
          Developed May 2025<br />
          Built a computer-vision tool to help me identify LaTeX symbols from quick sketches. (More details coming soon!)
        </p>
      </div>
    ),
    tags: ['ai', 'computer vision'],
    term: '2025',
    fade_in: 0.25
  },
  {
    slug: 'proxy',
    name: 'Web Proxy',
    image: mountain_3,
    image_caption: 'Kangchenjunga | Third Highest Mountain on Earth',
    date: 'Apr 2025',
    time: '1 minute read',
    summary: 'Simple web proxy in C',
    description: (
      <div className="font-light text-gray-700  leading-7">
        <p>
          Developed April 2025<br />
          Built a simple web proxy in C that can handle HTTP requests and responses. (More details coming soon!)
        </p>
      </div>
    ),
    tags: ['systems'],
    term: '2025',
    fade_in: 0.5
  },
  {
    slug: 'shell',
    name: 'Custom Linux Shell',
    image: mountain_4,
    image_caption: 'Lhotse | Fourth Highest Mountain on Earth | Source: Uwe Gille',
    date: 'Apr 2025',
    time: '2 minute read',
    summary: 'C-based shell with piping and redirection',
    description: (
      <div className="font-light text-gray-700  leading-7">
        <p>
          Developed April 2025<br />
          Built a custom Linux shell in C that supports basic commands, piping, and redirection. (More details coming soon!)
        </p>
      </div>
    ),
    tags: ['systems'],
    term: '2025',
    fade_in: 0.75
  },
  {
    slug: 'malloc',
    name: 'Malloc',
    image: mountain_5,
    image_caption: 'Makalu | Fifth Highest Mountain on Earth | Source: Ben Tubby',
    date: 'Mar 2025',
    time: '2 minute read',
    summary: 'Malloc implemented with segregated free lists',
    description: (
      <div className="font-light text-gray-700  leading-7">
        <p>
          Developed March 2025<br />
          Built a dynamic memory allocator in C that implements malloc, free, and realloc using segregated free lists. (More details coming soon!)
        </p>
      </div>
    ),
    tags: ['systems'],
    term: '2025',
    fade_in: 1.00
  },
  {
    slug: 'cache',
    name: 'Cache Simulator',
    image: mountain_6,
    image_caption: 'Cho Oyu | Sixth Highest Mountain on Earth | Source: Uwe Gille',
    date: 'Feb 2025',
    time: '2 minute read',
    summary: 'Command-line tool cache simulator',
    description: (
      <div className="font-light text-gray-700  leading-7">
        <p>
          Developed February 2025<br />
          Built a command-line tool in C that simulates a cache memory system. Allows specifying cache parameters and trace files, and outputs hit/miss stats. (More details coming soon!)
        </p>
      </div>
    ),
    tags: ['systems'],
    term: '2025',
    fade_in: 1.00
  },
  {
    slug: 'vm',
    name: 'Virtual Machine',
    image: mountain_7,
    image_caption: 'Dhaulagiri | Seventh Highest Mountain on Earth',
    date: 'Dec 2024',
    time: '2 minute read',
    summary: '15-122 final project, simple virtual memory machine',
    description: (
      <div className="font-light text-gray-700 leading-7">
        <p>
          Developed December 2024<br />
          Built a simple virtual memory machine as a final project for 15-122 Principles of Imperative Computation. (More details coming soon!)
        </p>
      </div>
    ),
    tags: ['systems'],
    term: '2024',
    fade_in: 1.00
  },
  {
    slug: 'wizard',
    name: 'Wizard Chess',
    image: mountain_8,
    image_caption: 'Manaslu | Eighth Highest Mountain on Earth | Source: Ben Tubby',
    date: 'Oct 2024',
    time: '2 minute read',
    summary: 'AI & Chess, inspired by Harry Potter',
    description: (
      <div className="font-light text-gray-700 leading-7">
        <p>
          Developed October 2024<br />
          Utilized the Python Chess library and OpenAI API to create Wizard Chess from Harry Potter, where players must convince pieces to move. (More details coming soon!)
        </p>
      </div>
    ),
    tags: ['ai', 'llms'],
    term: '2024',
    fade_in: 1.00
  },
  {
    slug: 'text-editor',
    name: 'Text Editor',
    image: mountain_9,
    image_caption: 'Nanga Parbat | Eighth Highest Mountain on Earth',
    date: 'Oct 2024',
    time: '2 minute read',
    summary: 'Gap-buffer text editor in C',
    description: (
      <div className="font-light text-gray-700 leading-7">
        <p>
          Developed October 2024<br />
          Created a text editor in C using singly and doubly linked lists to implement a gap buffer for constant amortized insertions, deletions, and cursor movement. (More details coming soon!)
        </p>
      </div>
    ),
    term: '2024',
    fade_in: 1.00
  }
];
