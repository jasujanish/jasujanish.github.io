import React from 'react';
import selfieImage from '../images/nish.jpeg';
import summer2025Image from '../images/summer2025_2.png';
import fall2025Image from '../images/fall2025.jpg';
import spring2026Image from '../images/spring2026.png'
const FADE_DURATION_MS = 260;

const TIMELINE_ENTRIES = [
  {
    season: 'About Me',
    image: selfieImage,
    objectPosition: 'center center',
    imageCaption: 'me',
    content: [
      [
        "I'm Nishchay Jasuja. I'm an incoming software development engineering intern at Amazon, and I'm studying computer science and artificial intelligence at Carnegie Mellon University. I'm highly interested in reinforcement learning and intelligent autonomous agents.",
      ],
    ],
  },
  {
    season: 'Spring 2026',
    image: spring2026Image,
    objectPosition: 'center center',
    imageCaption: 'flowers I saw after winter finally ended',
    content: [
      [
        "During Spring 2026, my primary academic focus was studying reinforcement learning. I also worked as a research assistant at ",
        { text: "CMU's Language Technologies Institute", href: "https://www.lti.cs.cmu.edu/research/index.html" },
        " where I studied Mixture of Experts (MoE) models. Further, I worked on improving LLM inference throughput by ",
        { text: "learning adaptive controllers for tree-based speculative decoding.", href: "https://github.com/jasujanish/speculative_decoding_speedup" },
      ]
    ],
  },
  {
    season: '2025',
    image: fall2025Image,
    objectPosition: 'center center',
    imageCaption: 'snowfall at cmu',
    content: [
      [
      'During Fall 2025, I collaborated with a few friends to ',
      { text: 'post-train Qwen3-4B for OCaml coding using filtered synthetic data.', href: 'https://github.com/jasujanish/701_final' },
      ' I also explored applying GRPO to Mamba-based models (with mixed success).'      ],
      [
        'During Summer 2025, I worked as a research assistant at Carnegie Mellon University over the summer. I developed multi-threaded software leveraging high-performance computing resources at the Pittsburgh Supercomputing Center for large-scale data engineering and analysis.'
      ],

    ],
  },

  // {
  //   season: 'Fall, Winter 2025',
  //   image: fall2025Image,
  //   objectPosition: 'center center',
  //   imageCaption: 'snowfall at cmu',
  //   content: [
  //     [
  //     'I collaborated with a few friends on a project focused on ',
  //     { text: 'post-training Qwen3-4B for OCaml coding using filtered synthetic data.', href: 'https://github.com/jasujanish/701_final' },
  //     ' I also explored applying GRPO to Mamba-based models (with mixed success).'      ],
  //   ],
  // },
  // {
  //   season: 'Summer 2025',
  //   image: summer2025Image,
  //   objectPosition: '56% center',
  //   imageCaption: 'a bunny I ran into on a walk',
  //   content: [
  //     [
  //       'I worked as a research assistant at Carnegie Mellon University over the summer, where I developed multi-threaded software leveraging high-performance computing resources at the Pittsburgh Supercomputing Center for large-scale data engineering and analysis.'
  //     ],
  //   ],
  // },
  // {
  //   season: 'Spring 2025',
  //   image: spring2025Image,
  //   objectPosition: 'center center',
  //   imageCaption: "My favorite systems textbook // Source: Bryant & O'Hallaron",
  //   content: [
  //     [
  //       'Took computer systems @ CMU and implemented malloc, a web proxy, a simple linux shell, and a cache simulator.',
  //     ],
  //   ],
  // },
];

const renderContentSegment = (segment, index) => {
  if (typeof segment === 'string') {
    return segment;
  }

  return (
    <a key={`${segment.text}-${index}`} href={segment.href} target="_blank" rel="noopener noreferrer">
      {segment.text}
    </a>
  );
};

export default function NishchayPage() {
  const currentLinkedIn = 'https://linkedin.com/in/nishchay-j/';
  const currentGitHub = 'https://github.com/jasujanish';
  const clearDetailTimer = React.useRef(null);
  const [selectedEntry, setSelectedEntry] = React.useState(null);
  const [showDetail, setShowDetail] = React.useState(false);

  React.useEffect(() => (
    () => {
      window.clearTimeout(clearDetailTimer.current);
    }
  ), []);

  const openEntry = (entry) => {
    window.clearTimeout(clearDetailTimer.current);
    setSelectedEntry(entry);
    window.setTimeout(() => setShowDetail(true), 20);
  };

  const returnHome = () => {
    setShowDetail(false);
    clearDetailTimer.current = window.setTimeout(() => {
      setSelectedEntry(null);
    }, FADE_DURATION_MS);
  };

  return (
    <main className={`nishchay-page ${showDetail ? 'nishchay-page--detail' : ''}`}>
      <section className="nishchay-home" aria-hidden={showDetail}>
        <h1 className="nishchay-name">
          <span>Nishchay</span>
          <span>Jasuja</span>
        </h1>

        <nav className="nishchay-link-list" aria-label="Timeline and social links">
          {TIMELINE_ENTRIES.map((entry) => (
            <button
              key={entry.season}
              type="button"
              onClick={() => openEntry(entry)}
              className="nishchay-link-item"
            >
              {entry.season}
            </button>
          ))}
          <a className="nishchay-link-item" href={currentLinkedIn} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="nishchay-link-item" href={currentGitHub} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
      </section>

      {selectedEntry && (
        <section className="nishchay-detail" aria-hidden={!showDetail}>
          <div className="nishchay-detail-content">
            <div className="nishchay-detail-text">
              <div className="nishchay-detail-copy">
                {selectedEntry.content.map((paragraph, paragraphIndex) => (
                  <p key={`${selectedEntry.season}-${paragraphIndex}`}>
                    {paragraph.map(renderContentSegment)}
                  </p>
                ))}
              </div>

              <button type="button" className="nishchay-return" onClick={returnHome}>
                Return Home
              </button>
            </div>

            <figure className="nishchay-detail-figure">
              <img
                src={selectedEntry.image}
                alt=""
                style={{ objectPosition: selectedEntry.objectPosition }}
              />
              <figcaption>{selectedEntry.imageCaption}</figcaption>
            </figure>
          </div>
        </section>
      )}
    </main>
  );
}
