import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import todayImage from '../images/today.jpeg';
import fall2024_image from '../images/fall2024.png';
import spring2025_image from '../images/spring2025.png';
import summer2025_image from '../images/summer2025.png';
import fall2025_image from '../images/fall2025.png'

const TIMELINE_ENTRIES = [
  {
    season: 'Present',
    image: todayImage,
    objectPosition: 'center center',
    imageCaption: 'Me // Source: Me',
    bullets: [
      "Currently working as a research assistant at CMU's Language Technologies Institute",
      'Currently trying to figure out how to improve speculative decoding throughput with reinforcement learning.',
    ],
  },
  {
    season: 'Fall + Winter 2025',
    image: fall2025_image,
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
    image: summer2025_image,
    objectPosition: '56% center',
    imageCaption: 'A bunny I randomly saw // Source: Me',
    bullets: [
      "Worked as a research assistant @ CMU over the summer and wrote multi-threaded code for large scale data engineering + analysis",
      "Had the opportunity to explore Pittsburgh and use high-performance computing resources at the Pittsburgh Supercomputing Center",
    ],
  },
  {
    season: 'Spring 2025',
    image: spring2025_image,
    objectPosition: 'center center',
    imageCaption: "My favorite systems textbook // Source: Bryant & O'Hallaron",
    bullets: [
      "Took computer systems @ CMU",
      "Implemented Malloc, a web proxy, a simple linux shell, and a cache simulator"
    ],
  },
  {
    season: 'Fall + Winter 2024',
    image: fall2024_image,
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

const WINDOW_EDGE_GAP = 8;

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

const getViewportSize = () => {
  if (typeof window === 'undefined') {
    return { width: 1024, height: 768 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const getDefaultWindowSize = () => {
  const viewport = getViewportSize();
  const isCompact = viewport.width < 768;

  return {
    width: isCompact ? Math.max(0, viewport.width - 16) : Math.min(viewport.width * 0.78, 860),
    height: isCompact ? Math.max(0, viewport.height * 0.72) : Math.min(viewport.height * 0.82, 760),
  };
};

const getInitialWindowPosition = (stackIndex) => {
  const viewport = getViewportSize();
  const defaultSize = getDefaultWindowSize();
  const offset = (stackIndex % 5) * 28;
  const isCompact = viewport.width < 768;
  const baseX = isCompact ? WINDOW_EDGE_GAP + offset * 0.35 : (viewport.width - defaultSize.width) / 2 + offset;
  const baseY = isCompact ? 48 + offset * 0.65 : (viewport.height - defaultSize.height) / 2 + offset;

  return {
    x: clamp(baseX, WINDOW_EDGE_GAP, Math.max(WINDOW_EDGE_GAP, viewport.width - defaultSize.width - WINDOW_EDGE_GAP)),
    y: clamp(baseY, WINDOW_EDGE_GAP, Math.max(WINDOW_EDGE_GAP, viewport.height - defaultSize.height - WINDOW_EDGE_GAP)),
  };
};

export default function NishchayPage() {
  const prefersReducedMotion = useReducedMotion();
  const currentLinkedIn = 'https://linkedin.com/in/nishchay-j/';
  const currentGitHub = 'https://github.com/jasujanish';
  const nextWindowZ = React.useRef(100);
  const dragState = React.useRef(null);
  const minitabNodes = React.useRef(new Map());
  const [openMinitabs, setOpenMinitabs] = React.useState([]);

  React.useEffect(() => {
    if (openMinitabs.length === 0) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenMinitabs((current) => {
          if (current.length === 0) {
            return current;
          }

          const topMinitab = current.reduce((top, minitab) => (
            minitab.zIndex > top.zIndex ? minitab : top
          ), current[0]);

          return current.filter((minitab) => minitab.id !== topMinitab.id);
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openMinitabs.length]);

  React.useEffect(() => {
    const keepWindowsInViewport = () => {
      const viewport = getViewportSize();

      setOpenMinitabs((current) => current.map((minitab) => {
        if (minitab.isExpanded) {
          return minitab;
        }

        const node = minitabNodes.current.get(minitab.id);
        const fallbackSize = getDefaultWindowSize();
        const width = node?.offsetWidth || fallbackSize.width;
        const height = node?.offsetHeight || fallbackSize.height;

        return {
          ...minitab,
          x: clamp(minitab.x, WINDOW_EDGE_GAP, Math.max(WINDOW_EDGE_GAP, viewport.width - width - WINDOW_EDGE_GAP)),
          y: clamp(minitab.y, WINDOW_EDGE_GAP, Math.max(WINDOW_EDGE_GAP, viewport.height - height - WINDOW_EDGE_GAP)),
        };
      }));
    };

    window.addEventListener('resize', keepWindowsInViewport);

    return () => {
      window.removeEventListener('resize', keepWindowsInViewport);
    };
  }, []);

  const setMinitabNode = React.useCallback((id, node) => {
    if (node) {
      minitabNodes.current.set(id, node);
      return;
    }

    minitabNodes.current.delete(id);
  }, []);

  const focusMinitab = React.useCallback((id) => {
    setOpenMinitabs((current) => current.map((minitab) => (
      minitab.id === id
        ? { ...minitab, zIndex: nextWindowZ.current++ }
        : minitab
    )));
  }, []);

  const openMinitab = React.useCallback((entry) => {
    const id = entry.season;

    setOpenMinitabs((current) => {
      const existingMinitab = current.find((minitab) => minitab.id === id);

      if (existingMinitab) {
        return current.map((minitab) => (
          minitab.id === id
            ? {
                ...minitab,
                isCollapsed: false,
                zIndex: nextWindowZ.current++,
              }
            : minitab
        ));
      }

      return [
        ...current,
        {
          id,
          entry,
          ...getInitialWindowPosition(current.length),
          isCollapsed: false,
          isExpanded: false,
          zIndex: nextWindowZ.current++,
        },
      ];
    });
  }, []);

  const closeMinitab = React.useCallback((id) => {
    setOpenMinitabs((current) => current.filter((minitab) => minitab.id !== id));
  }, []);

  const toggleMinitabCollapse = React.useCallback((id) => {
    setOpenMinitabs((current) => current.map((minitab) => (
      minitab.id === id
        ? {
            ...minitab,
            isCollapsed: !minitab.isCollapsed,
            isExpanded: false,
            zIndex: nextWindowZ.current++,
          }
        : minitab
    )));
  }, []);

  const toggleMinitabExpansion = React.useCallback((id) => {
    const node = minitabNodes.current.get(id);
    const rect = node?.getBoundingClientRect();
    const fallbackSize = getDefaultWindowSize();

    setOpenMinitabs((current) => current.map((minitab) => {
      if (minitab.id !== id) {
        return minitab;
      }

      if (minitab.isExpanded) {
        const restoreFrame = minitab.restoreFrame || {
          x: WINDOW_EDGE_GAP,
          y: WINDOW_EDGE_GAP,
          width: fallbackSize.width,
          height: fallbackSize.height,
        };

        return {
          ...minitab,
          ...restoreFrame,
          isExpanded: false,
          restoreFrame: null,
          zIndex: nextWindowZ.current++,
        };
      }

      const currentFrame = {
        x: minitab.x,
        y: minitab.y,
        width: rect?.width || minitab.width || fallbackSize.width,
        height: rect?.height || minitab.height || fallbackSize.height,
      };

      return {
        ...minitab,
        ...currentFrame,
        isCollapsed: false,
        isExpanded: true,
        restoreFrame: currentFrame,
        zIndex: nextWindowZ.current++,
      };
    }));
  }, []);

  const startMinitabDrag = React.useCallback((event, id) => {
    if (event.button !== 0) {
      return;
    }

    const minitab = openMinitabs.find((current) => current.id === id);

    if (!minitab || minitab.isExpanded) {
      return;
    }

    const node = minitabNodes.current.get(id);
    const rect = node?.getBoundingClientRect();
    const fallbackSize = getDefaultWindowSize();

    dragState.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      windowX: minitab.x,
      windowY: minitab.y,
      width: rect?.width || fallbackSize.width,
      height: rect?.height || fallbackSize.height,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }, [openMinitabs]);

  const dragMinitab = React.useCallback((event) => {
    const activeDrag = dragState.current;

    if (!activeDrag || activeDrag.pointerId !== event.pointerId) {
      return;
    }

    const viewport = getViewportSize();
    const nextX = activeDrag.windowX + event.clientX - activeDrag.startX;
    const nextY = activeDrag.windowY + event.clientY - activeDrag.startY;

    setOpenMinitabs((current) => current.map((minitab) => (
      minitab.id === activeDrag.id
        ? {
            ...minitab,
            x: clamp(nextX, WINDOW_EDGE_GAP, Math.max(WINDOW_EDGE_GAP, viewport.width - activeDrag.width - WINDOW_EDGE_GAP)),
            y: clamp(nextY, WINDOW_EDGE_GAP, Math.max(WINDOW_EDGE_GAP, viewport.height - activeDrag.height - WINDOW_EDGE_GAP)),
          }
        : minitab
    )));
  }, []);

  const stopMinitabDrag = React.useCallback((event) => {
    const activeDrag = dragState.current;

    if (!activeDrag || activeDrag.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragState.current = null;
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
                  onClick={() => openMinitab(entry)}
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
        {openMinitabs.length > 0 && (
          <div className="nishchay-window-layer">
            <AnimatePresence>
              {openMinitabs.map((minitab) => (
                <motion.div
                  key={minitab.id}
                  ref={(node) => setMinitabNode(minitab.id, node)}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.985 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  onPointerDown={() => focusMinitab(minitab.id)}
                  style={{
                    left: minitab.isExpanded ? 0 : minitab.x,
                    top: minitab.isExpanded ? 0 : minitab.y,
                    width: minitab.isExpanded ? '100vw' : minitab.width,
                    height: minitab.isExpanded ? '100dvh' : (minitab.isCollapsed ? undefined : minitab.height),
                    zIndex: minitab.zIndex,
                  }}
                  className={`nishchay-minitab ${minitab.isExpanded ? 'nishchay-minitab--expanded' : ''} ${minitab.isCollapsed ? 'nishchay-minitab--collapsed' : ''}`}
                >
                  <div
                    className="nishchay-minitab-titlebar flex items-center justify-between border-b border-[#E7E8E9] bg-white/88 px-4 py-3 backdrop-blur-xl md:px-5"
                    onPointerDown={(event) => startMinitabDrag(event, minitab.id)}
                    onPointerMove={dragMinitab}
                    onPointerUp={stopMinitabDrag}
                    onPointerCancel={stopMinitabDrag}
                  >
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                          event.stopPropagation();
                          closeMinitab(minitab.id);
                        }}
                        className="nishchay-window-control nishchay-window-control--close"
                        aria-label="Close window"
                      >
                        <span>&times;</span>
                      </button>
                      <button
                        type="button"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleMinitabCollapse(minitab.id);
                        }}
                        className="nishchay-window-control nishchay-window-control--warn"
                        aria-label={minitab.isCollapsed ? 'Show window content' : 'Collapse window'}
                      >
                        <span>&minus;</span>
                      </button>
                      <button
                        type="button"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleMinitabExpansion(minitab.id);
                        }}
                        className="nishchay-window-control nishchay-window-control--expand"
                        aria-label={minitab.isExpanded ? 'Restore window size' : 'Expand window'}
                      >
                        {minitab.isExpanded ? <span>&#x2199;</span> : <span>+</span>}
                      </button>
                    </div>

                    <p className="nishchay-minitab-window-label text-[#2F2F30]/62">
                      {minitab.entry.season}
                    </p>

                    <div className="w-[4.75rem]" aria-hidden="true" />
                  </div>

                  {!minitab.isCollapsed && (
                    <div className="nishchay-minitab-body flex min-h-0 flex-1 flex-col bg-[#FCFCFC] p-3 sm:p-4 md:p-6">
                      <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-[1.2rem] border border-[#E6E7E8] bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(247,248,249,0.92))] sm:rounded-[1.45rem]">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,255,255,0.95),transparent_26%),radial-gradient(circle_at_86%_14%,rgba(238,240,243,0.9),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0))]" />

                        <div className="relative flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 md:px-7 md:py-7 lg:grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-10">
                          <div className="relative z-10 order-2 max-w-[25rem] lg:order-1">
                            <p className="nishchay-minitab-eyebrow text-[#2F2F30]/54">
                              {minitab.entry.season} Snapshot
                            </p>
                            <ul className="nishchay-minitab-list mt-5 space-y-3 text-[#2F2F30]/82 sm:mt-6 sm:space-y-3.5">
                              {minitab.entry.bullets.map((bullet) => (
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
                                  src={minitab.entry.image}
                                  alt={minitab.entry.season}
                                  className="h-full w-full object-cover lg:object-contain"
                                  style={{ objectPosition: minitab.entry.objectPosition }}
                                />
                              </div>
                            </div>

                            <p className="nishchay-minitab-caption mt-2 px-1 text-[#2F2F30]/54 sm:mt-3">
                              {minitab.entry.imageCaption}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
