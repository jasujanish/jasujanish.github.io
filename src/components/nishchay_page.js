import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import todayImage from '../images/today.jpeg';
import photoOne from '../images/photo_1.jpeg';
import photoThree from '../images/photo_3.jpeg';
import bunnyImage from '../images/bunny.png';
import mambaImage from '../images/mamba.jpg';
import artImage from '../images/213.png';
import bookImage from '../images/21127.png';
import ocamlImage from '../images/ocaml.png'

const TIMELINE_ENTRIES = [
  {
    season: 'Present',
    image: todayImage,
    objectPosition: 'center center',
    imageCaption: 'Me // Source: Me',
    bullets: [
      "Currently working as a research assistant at CMU's Language Technologies Institute",
      'Currently trying to figure out how to improve speculative decoding throughput with reinforcement learning.',
      'Currently thinking about Kierkegaard and what it means to live correctly.',
    ],
  },
  {
    season: 'Fall + Winter 2025',
    image: ocamlImage,
    objectPosition: 'center center',
    imageCaption: 'OCaml Logo // Source: ocamlverse.net',
    bullets: [
      'Applied SFT and DPO on Qwen3-4B using filtered synthetic data to improve OCaml coding.',
      'Experimented with applying GRPO to Mamba models',
      'Took a few graduate ML courses at CMU',
    ],
  },
  {
    season: 'Summer 2025',
    image: bunnyImage,
    objectPosition: '56% center',
    imageCaption: 'A bunny I randomly saw // Source: Me',
    bullets: [
      "Worked as a research assistant @ CMU over the summer and wrote multi-threaded code for large scale data engineering + analysis",
      "Had the opportunity to explore Pittsburgh and use high-performance computing resources at the Pittsburgh Supercomputing Center",
    ],
  },
  {
    season: 'Spring 2025',
    image: artImage,
    objectPosition: 'center center',
    imageCaption: "My favorite systems textbook // Source: Bryant & O'Hallaron",
    bullets: [
      "Took computer systems @ CMU",
      "Implemented Malloc, a web proxy, a simple linux shell, and a cache simulator"
    ],
  },
  {
    season: 'Fall + Winter 2024',
    image: bookImage,
    objectPosition: 'center top',
    imageCaption: "My favorite discrete math textbook // Source: Clive Newstead",
    bullets: [
      'Completed my first semester at CMU',
    ],
  },
];

const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      delay: 0.06 + index * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function NishchayPage() {
  const prefersReducedMotion = useReducedMotion();
  const currentLinkedIn = 'https://linkedin.com/in/nishchay-j/';
  const currentGitHub = 'https://github.com/jasujanish';
  const [activeEntry, setActiveEntry] = React.useState(null);
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    if (!activeEntry) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveEntry(null);
        setIsExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeEntry]);

  const closeMinitab = React.useCallback(() => {
    setActiveEntry(null);
    setIsExpanded(false);
  }, []);

  return (
    <div className="nishchay-page min-h-screen overflow-x-hidden bg-[#FCFCFC]">
      <div className="mx-auto flex min-h-screen max-w-[1520px] flex-col lg:flex-row">
        <section className="flex items-start px-5 pb-10 pt-20 sm:px-8 md:px-14 lg:sticky lg:top-0 lg:h-screen lg:w-[43%] lg:px-20 lg:pt-36">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <div className="group relative inline-flex flex-col items-start">
              <div className="pointer-events-none absolute bottom-full left-0 mb-5 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-full border border-[#D4D5D6] bg-white/96 px-4 py-2 text-[0.72rem] font-medium tracking-[-0.01em] text-[#2F2F30]/78 shadow-[0_10px_30px_rgba(31,31,31,0.06)] backdrop-blur-sm md:text-[0.76rem]">
                  Artifical Intellgience @ Carnegie Mellon University // RL to the moon
                </div>
              </div>

              <h1 className="nishchay-name text-[#1F1F1F] underline decoration-[#1F1F1F] decoration-[4px] underline-offset-[0.18em]">
                Nishchay Jasuja
              </h1>
            </div>

            <div className="mt-8 flex items-center gap-5">
              <a
                href={currentLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#2F2F30]/62 transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-700"
              >
                <FaLinkedin size={22} />
              </a>
              <a
                href={currentGitHub}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[#2F2F30]/62 transition-all duration-200 hover:-translate-y-0.5 hover:text-black"
              >
                <FaGithub size={22} />
              </a>
            </div>
          </motion.div>
        </section>

        <section
          aria-label="Season timeline"
          className="nishchay-scroll-section px-5 pb-16 sm:px-8 md:px-14 lg:h-screen lg:w-[57%] lg:overflow-y-auto lg:px-8 lg:pb-24 lg:pt-14"
        >
          <div className="mx-auto flex max-w-[35rem] flex-col gap-14 lg:gap-16">
            {TIMELINE_ENTRIES.map((entry, index) => (
              <motion.article
                key={entry.season}
                custom={index}
                variants={cardReveal}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-3"
              >
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[#2F2F30]/64 md:text-[0.72rem]">
                  {entry.season}
                </p>

                <motion.button
                  type="button"
                  onClick={() => {
                    setActiveEntry(entry);
                    setIsExpanded(false);
                  }}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  className="block cursor-zoom-in overflow-hidden rounded-[1.35rem] border border-[#D4D5D6] bg-white text-left"
                >
                  <div className="aspect-[5/4]">
                    <img
                      src={entry.image}
                      alt={entry.season}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: entry.objectPosition }}
                    />
                  </div>
                </motion.button>
              </motion.article>
            ))}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {activeEntry && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(252,252,252,0.72)] p-3 backdrop-blur-[12px] md:p-5"
            onClick={closeMinitab}
          >
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className={`nishchay-minitab ${isExpanded ? 'nishchay-minitab--expanded' : ''}`}
            >
              <div className="flex items-center justify-between border-b border-[#E7E8E9] bg-white/88 px-4 py-3 backdrop-blur-xl md:px-5">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={closeMinitab}
                    className="nishchay-window-control nishchay-window-control--close"
                    aria-label="Close window"
                  >
                    <span>&times;</span>
                  </button>
                  <button
                    type="button"
                    onClick={closeMinitab}
                    className="nishchay-window-control nishchay-window-control--warn"
                    aria-label="Close window"
                  >
                    <span>&minus;</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsExpanded((current) => !current)}
                    className="nishchay-window-control nishchay-window-control--expand"
                    aria-label={isExpanded ? 'Restore window' : 'Expand window'}
                  >
                    <span>{isExpanded ? '−' : '+'}</span>
                  </button>
                </div>

                <p className="nishchay-minitab-window-label text-[#2F2F30]/62">
                  {activeEntry.season}
                </p>

                <div className="w-[4.75rem]" aria-hidden="true" />
              </div>

              <div className="nishchay-minitab-body flex min-h-0 flex-1 flex-col bg-[#FCFCFC] p-3 sm:p-4 md:p-6">
                <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-[1.2rem] border border-[#E6E7E8] bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(247,248,249,0.92))] sm:rounded-[1.45rem]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,255,255,0.95),transparent_26%),radial-gradient(circle_at_86%_14%,rgba(238,240,243,0.9),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0))]" />

                  <div className="relative flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 md:px-7 md:py-7 lg:grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-10">
                    <div className="relative z-10 order-2 max-w-[25rem] lg:order-1">
                      <p className="nishchay-minitab-eyebrow text-[#2F2F30]/54">
                        {activeEntry.season} Snapshot
                      </p>
                      <ul className="nishchay-minitab-list mt-5 space-y-3 text-[#2F2F30]/82 sm:mt-6 sm:space-y-3.5">
                        {activeEntry.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <span className="mt-[0.72rem] h-1.5 w-1.5 flex-none rounded-full bg-[#1F1F1F]/62" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative z-10 order-1 flex min-h-0 flex-col lg:order-2 lg:pl-4">
                      <div className="overflow-hidden rounded-[1rem] border border-[#E6E7E8] bg-[#F5F6F7] shadow-[0_18px_46px_rgba(31,31,31,0.06)] sm:rounded-[1.3rem]">
                        <div className="aspect-[1.14/1] sm:aspect-[1.08/1] md:aspect-[1.18/1]">
                          <img
                            src={activeEntry.image}
                            alt={activeEntry.season}
                            className="h-full w-full object-cover lg:object-contain"
                            style={{ objectPosition: activeEntry.objectPosition }}
                          />
                        </div>
                      </div>

                      <p className="nishchay-minitab-caption mt-2 px-1 text-[#2F2F30]/54 sm:mt-3">
                        {activeEntry.imageCaption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
