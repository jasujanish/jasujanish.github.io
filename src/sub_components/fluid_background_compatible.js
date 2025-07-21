import React, { useRef, useEffect } from 'react';
import background from '../images/background.mp4';

/*
export const TailwindFluidBg = () => (
  <>
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
    </div>

    <style>{`
      .blob {
        position: absolute;
        width: 60vmax;
        height: 60vmax;
        filter: blur(200px);
        mix-blend-mode: screen;
        animation:
          morph var(--morph-d) ease-in-out infinite,
          move  var(--move-d)  ease-in-out infinite,
          hue   var(--hue-d)   linear     infinite;
      }


      .blob-1 {
        --morph-d: 10s;
        --move-d:  25s;
        --hue-d:   12s;
        top:   -20%; left: -15%;
        background: radial-gradient(circle at 30% 30%, #F472B6, transparent 60%);
      }
      .blob-2 {
        --morph-d: 12s;
        --move-d:  30s;
        --hue-d:   18s;
        top:   -15%; right: -10%;
        opacity: 0.6;
        background: radial-gradient(circle at 70% 30%, #FB923C, transparent 60%);
      }
      .blob-3 {
        --morph-d: 14s;
        --move-d:  35s;
        --hue-d:   20s;
        bottom: -20%; left: -20%;
        opacity: 0.5;
        background: radial-gradient(circle at 40% 70%, #60A5FA, transparent 60%);
      }


      @keyframes morph {
        0%,100% {
          border-radius: 40% 60% 60% 40% / 50% 40% 60% 50%;
        }
        25% {
          border-radius: 60% 40% 50% 50% / 30% 60% 30% 60%;
        }
        50% {
          border-radius: 50% 60% 40% 60% / 60% 40% 50% 30%;
        }
        75% {
          border-radius: 60% 50% 60% 40% / 40% 50% 30% 50%;
        }
      }


      @keyframes move {
        0%   { transform: translate(  0,    0  ) scale(1);   }
        25%  { transform: translate(20vw, 10vh) scale(1.1); }
        50%  { transform: translate(-15vw,15vh) scale(0.9); }
        75%  { transform: translate(10vw,-20vh) scale(1.05);}
        100% { transform: translate(  0,    0  ) scale(1);   }
      }


      @keyframes hue {
        0%   { filter: hue-rotate(0deg);   }
        100% { filter: hue-rotate(360deg); }
      }
    `}</style>
  </>
);
*/

const TailwindFluidBg = ({
  src = background,
  className = '',
  muted = true,
  autoPlay = true,
  ...props
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play the video
    if (autoPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Autoplay might be blocked; handle if needed
          console.warn('Video autoplay was prevented:', error);
        });
      }
    }

    // When the video ends, pause and remain on last frame
    const handleEnded = () => {
      video.pause();
      video.currentTime = video.duration;
    };
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted={muted}
      autoPlay={autoPlay}
      controls={false}
      loop={false}
      playsInline
      className={`fixed top-0 left-0 w-full h-full object-cover ${className}`}
      {...props}
    />
  );
};

export default TailwindFluidBg;


// An array of color schemes. Each scheme is an array of Tailwind CSS gradient classes for the blobs.
// Now with 7 blobs per scheme for a richer effect.
/*
const colorSchemes = [
  // 0: Soft Pink/Purple
  [
    "from-pink-300 via-purple-300 to-indigo-400",
    "from-pink-300 via-red-300 to-yellow-200",
    "from-green-200 via-teal-200 to-blue-300",
    "from-purple-300 via-pink-300 to-red-400",
    "from-yellow-200 via-green-200 to-teal-300",
    "from-red-300 via-pink-300 to-purple-400",
    "from-blue-200 via-indigo-300 to-purple-300",
  ],
  // 1: Sunset
  [
    "from-yellow-300 via-orange-400 to-red-500",
    "from-orange-200 via-red-300 to-pink-300",
    "from-red-400 via-pink-400 to-purple-500",
    "from-yellow-200 via-amber-300 to-orange-400",
    "from-pink-300 via-red-400 to-orange-500",
    "from-purple-400 via-pink-400 to-red-400",
    "from-amber-200 via-orange-300 to-red-300",
  ],
  // 2: Blue/Purple
  [
    "from-blue-300 via-purple-400 to-indigo-500",
    "from-sky-300 via-cyan-300 to-blue-400",
    "from-indigo-300 via-violet-400 to-purple-400",
    "from-cyan-300 via-blue-400 to-indigo-400",
    "from-purple-300 via-indigo-400 to-blue-500",
    "from-violet-300 via-purple-300 to-indigo-400",
    "from-sky-200 via-blue-300 to-indigo-300",
  ],
  // 3: Emerald Water
  [
    "from-emerald-300 via-teal-400 to-cyan-500",
    "from-green-300 via-lime-300 to-emerald-400",
    "from-teal-200 via-cyan-200 to-sky-300",
    "from-lime-300 via-emerald-400 to-teal-500",
    "from-cyan-300 via-teal-400 to-green-400",
    "from-green-200 via-emerald-300 to-teal-300",
    "from-sky-300 via-cyan-400 to-teal-400",
  ],
  // 4: Monochromatic
  [
    "from-gray-400 via-gray-500 to-gray-600",
    "from-slate-400 via-slate-500 to-slate-600",
    "from-stone-400 via-stone-500 to-stone-600",
    "from-neutral-400 via-neutral-500 to-neutral-600",
    "from-gray-300 via-gray-400 to-gray-500",
    "from-slate-300 via-slate-400 to-slate-500",
    "from-stone-300 via-stone-400 to-stone-500",
  ],
];
const TailwindFluidBg = ({ colorScheme = 0, className = '', speed = 5.0 }) => {
  const selectedScheme = colorSchemes[colorScheme] || colorSchemes[0];
  const blobRefs = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef();

  useEffect(() => {
    const blobs = blobRefs.current.map((ref) => {
      if (!ref) return null;
      const angle = Math.random() * 2 * Math.PI;
      return {
        ref,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: Math.cos(angle) * 0.2,
        vy: Math.sin(angle) * 0.2,
        sinOffX: Math.random() * 1000,
        sinOffY: Math.random() * 1000,
        sinAmpX: 150 + Math.random() * 200,
        sinAmpY: 150 + Math.random() * 200,
        sinFreqX: 0.0005 + Math.random() * 0.001,
        sinFreqY: 0.0005 + Math.random() * 0.001,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        scale: 0.8 + Math.random() * 0.4,
      };
    }).filter(Boolean);

    const handleMouseMove = (event) => {
      mousePos.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = (time) => {
      blobs.forEach(blob => {
        const dx = mousePos.current.x - blob.x;
        const dy = mousePos.current.y - blob.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 1 - dist / (window.innerWidth / 2)) * 0.05 * speed;
        blob.vx += dx * force * 0.01;
        blob.vy += dy * force * 0.01;

        // Organic sine wave movement (speed multiplier)
        const sinX = Math.sin(blob.sinOffX + time * blob.sinFreqX * speed) * blob.sinAmpX;
        const sinY = Math.sin(blob.sinOffY + time * blob.sinFreqY * speed) * blob.sinAmpY;

        blob.vx *= 0.99;
        blob.vy *= 0.99;

        const targetX = window.innerWidth / 2 + sinX;
        const targetY = window.innerHeight / 2 + sinY;
        blob.x += (targetX - blob.x) * 0.001 * speed + blob.vx;
        blob.y += (targetY - blob.y) * 0.001 * speed + blob.vy;

        blob.rotation += blob.rotationSpeed * speed;

        blob.ref.style.transform = `translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale})`;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [colorScheme, speed]);

  return (
    <div className={`fixed inset-0 -z-10 w-full h-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl"></div>
      <div className="relative h-full w-full">
        {selectedScheme.map((gradient, index) => (
          <div
            key={index}
            ref={el => blobRefs.current[index] = el}
            className={`
              absolute -translate-x-1/2 -translate-y-1/2
              w-[40vmax] h-[40vmax] max-w-[500px] max-h-[500px]
              rounded-full bg-gradient-to-r ${gradient}
              opacity-40 mix-blend-multiply filter blur-3xl
              will-change-transform
            `}
          ></div>
        ))}
      </div>
    </div>
  );
};
export default TailwindFluidBg;*/