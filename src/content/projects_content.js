
import sublime from '../images/sublime.png';
import systems from '../images/213.png';
import ffn from '../images/ffn.png';
import mamba from '../images/mamba.jpg';

export const content = [
  {
    slug: 'w2025_projects',
    name: 'Winter 2025 Projects',
    image: mamba,
    image_caption: 'Black Mamba! | Source: Hendrik van den Berg',
    date: 'Winter 2025',
    time: '4 minute read',
    summary: "Advanced Qwen's OCaml benchmarks through multi-stage training and applied RL to optimize long-context performance in Mamba models",
    description: (
      <div className="font-light text-gray-700 leading-7">
        <p className="font-medium">
          OCaml Coding Agent · October - December 2025
        </p>
        <ul style={{ listStyleType: 'circle' }}>
          <li>Engineered a data-pruning pipeline for OCaml data, leveraging embedding-based clustering and diversity pruning to isolate the top 50 percent most unique examples to boost dataset quality and reduce compute costs during training.</li>
          <li>Developing a multi-stage post-training framework consisting of parameter efficient fine-tuning followed by reinforcement learning to improve OCaml coding performance by an expected 15 percent.</li>
        </ul>
        <p>
          
        </p>
        <br />
        <p className="font-medium">
          Text Editor · October - December 2025
        </p>
        <ul style={{ listStyleType: 'circle' }}>
          <li>Conducted a novel independent research project applying Group Relative Policy Optimization (GRPO) to State Space Models (SSMs) using curriculum-based learning</li>
          <li>Improved long-context performance (15k+ tokens) by approximately 10 percent through efficient post-training</li>
        </ul>
      </div>
    ),
    term: '2025',
    tags: ['ai'],
    fade_in: 0
  },
  {
    slug: 'f2025_projects',
    name: 'Summer, Fall 2025 Projects',
    image: ffn,
    image_caption: 'Feed-Forward Neural Net | Source: upGrad',
    date: '2025',
    time: '5 minute read',
    summary: 'Built a RAG system, a simple lm, a neural-net-based speech classifier, and an autonomous pipeline of ai agents',
    description: (
      <div className="font-light text-gray-700 leading-7">
        <p className="font-medium">
          Custom Retrieval Augmented Generation (RAG) · September 2025
        </p>
        <p>
        I developed an autonomous web scraper using BeautifulSoup4 to clean and extract approximately 2 million tokens of structured text data from HTML web pages to build my datastore. From here, I engineered a custom dense retrieval pipeline and integrated it with Llama 3.1 to build a RAG system from scratch.
        </p>
        <br />
        <p className="font-medium">
          Small Language Model · September 2025
        </p>
        <p>
        Implemented transformer blocks with multi-head attention, rotary position embeddings, and AdamW optimization in PyTorch to build a simple small language model.
        </p>
        <br />
        <p className="font-medium">
          Speech Classifier · September 2025
        </p>
        <p>
          I designed and implemented a custom multi-layer perceptron architecture for mel-spectrogram-based speech classification using PyTorch. Utilizing cloud computing resources and hyperparameter tuning, I was able to reach 87 percent accuracy with this architecture.
        </p>
        <br />
        <p className="font-medium">
          Ethics Tracker · July 2025
        </p>
        <p>
          I developed a tool that takes in a product and determines how ethical the brand creating the product is. I utilized autonomous web scraping and an agentic workflow of 3 fine-tuned LLM agents (using Qwen2.5-1.5B) to autonomously collect information and analyze sources.
        </p>
      </div>
    ),
    term: '2025',
    tags: ['ai'],
    fade_in: 0.50
  },
    {
    slug: 's2025_projects',
    name: 'Spring 2025 Projects',
    image: systems,
    image_caption: 'CSAPP Cover (Memory Mountain) | Source: Bryant & O\'Hallaron',
    date: 'Spring 2025',
    time: '4 minute read',
    summary: "Builty a cache simulator, a dynamic memory allocator (malloc), a linux shell, and a web proxy for CMU's computer systems class",
    description: (
      <div className="font-light text-gray-700 leading-7">
        <p className="font-medium">
          Web Proxy · April 2025
        </p>
        <p>
          Built a simple web proxy in C that can handle HTTP requests and responses.
        </p>
        <br />
        <p className="font-medium">
          Custom Linux Shell · April 2025
        </p>
        <p>
          Created a lightweight shell with reliable signal handling, I/O redirection, and support for basic commands; used multi-processing to enable concurrent execution of multiple background jobs.
        </p>
        <br />
        <p className="font-medium">
          Malloc · March 2025
        </p>
        <p>
          Built a dynamic memory allocator in C that implements malloc, free, and realloc using segregated free lists with special handling for 16-byte memory chunks.
        </p>
        <br />
        <p className="font-medium">
          Cache Simulator · February 2025
        </p>
        <p>
          Built a command-line tool in C that simulates a cache memory system. Allows specifying cache parameters and trace files, and outputs hit/miss stats.
        </p>
      </div>
    ),
    term: '2025',
    tags: ['systems'],
    fade_in: 0.75
  },
  {
    slug: 'f2024_projects',
    name: 'Fall 2024, Winter 2024 Projects',
    image: sublime,
    image_caption: 'Sublime | My favorite note-taking app',
    date: 'Fall, Winter 2024',
    time: '2 minute read',
    summary: 'Built a simple text editor and virtual memory machine',
    description: (
      <div className="font-light text-gray-700 leading-7">
        <p className="font-medium">
          C0 Virtual Memory Machine · December 2024
        </p>
        <p>
          Built a simple virtual memory machine for the C0 language as a final project for 15-122 Principles of Imperative Computation.
        </p>
        <br />
        <p className="font-medium">
          Text Editor · October 2024
        </p>
        <p>
          Created a text editor in C using singly and doubly linked lists to implement a gap buffer for constant amortized insertions, deletions, and cursor movement.
        </p>
      </div>
    ),
    term: '2024',
    tags: ['systems', 'dsa'],
    fade_in: 1.00
  }
];
