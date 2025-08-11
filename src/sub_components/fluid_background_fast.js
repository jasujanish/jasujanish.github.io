import React from "react";

/**
 * FluidBackgroundCSS — zero-video, pure CSS animated background.
 * - Fixed, full-viewport layer that sits behind your content
 * - Uses animated gradient blobs + a soft vignette + film grain texture
 * - Respectful of prefers-reduced-motion
 *
 * Props:
 *  className: extra classes to layer on top
 *  opacity: 0..1 overall opacity for the blob layer (default 0.6)
 */
export default function FluidBackgroundCSS({ className = "", opacity = 0.6 }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 -z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Base gradient wash - light mode only */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#ffffff_0%,#fafafa_35%,#f5f5f5_60%,#e7e5e4_100%)] transition-colors duration-700" />

      {/* Animated blobs container */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ filter: "blur(32px) saturate(1.2)", opacity }}
      >
        <span className="fb-blob fb-blob--a" />
        <span className="fb-blob fb-blob--b" />
        <span className="fb-blob fb-blob--c" />
        <span className="fb-blob fb-blob--d" />
        <span className="fb-blob fb-blob--e" />
        <span className="fb-blob fb-blob--f" />
        {/* New additional orb */}
        <span className="fb-blob fb-blob--g" />
      </div>

      {/* Subtle vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.05) 70%, rgba(0,0,0,0.03) 100%)",
        }}
      />

      {/* Soft grain texture (data URI) */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.1\"/></svg>')",
          backgroundSize: "256px 256px",
        }}
      />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .fb-blob { animation: none !important; transform: translate3d(0,0,0) scale(1) !important; }
        }

        .fb-blob {
          position: absolute;
          width: 48vmax;
          height: 48vmax;
          border-radius: 9999px;
          will-change: transform, opacity;
          mix-blend-mode: screen;
          opacity: 0.85;
          /* Slightly darker default blue core + stronger mid stop */
          background: radial-gradient(50% 50% at 50% 50%, rgba(59,130,246,0.9) 0%, rgba(59,130,246,0.4) 35%, rgba(59,130,246,0.0) 60%);
          filter: hue-rotate(0deg);
        }

        /* Slightly darker hues and slightly faster animations */
        .fb-blob--a { left: -10vmax; top: -8vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(96,165,250,0.9) 0%, rgba(96,165,250,0.4) 35%, rgba(96,165,250,0.0) 60%); animation: fb-path-a 22s ease-in-out infinite; }
        .fb-blob--b { right: -12vmax; top: 10vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(59,130,246,0.9) 0%, rgba(59,130,246,0.4) 35%, rgba(59,130,246,0.0) 60%); animation: fb-path-b 26s ease-in-out infinite; }
        .fb-blob--c { left: 20vmax; bottom: -16vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(52,211,153,0.9) 0%, rgba(52,211,153,0.4) 35%, rgba(52,211,153,0.0) 60%); animation: fb-path-c 30s ease-in-out infinite; }
        .fb-blob--d { right: 18vmax; bottom: -14vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(251,146,60,0.9) 0%, rgba(251,146,60,0.4) 35%, rgba(251,146,60,0.0) 60%); animation: fb-path-d 24s ease-in-out infinite; }
        .fb-blob--e { left: -18vmax; bottom: 8vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(251,113,133,0.9) 0%, rgba(251,113,133,0.4) 35%, rgba(251,113,133,0.0) 60%); animation: fb-path-e 34s ease-in-out infinite; }
        .fb-blob--f { right: -8vmax; top: -12vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(251,191,36,0.9) 0%, rgba(251,191,36,0.4) 35%, rgba(251,191,36,0.0) 60%); animation: fb-path-f 28s ease-in-out infinite; }
        .fb-blob--g { left: 8vmax; top: 22vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(192,132,252,0.9) 0%, rgba(192,132,252,0.4) 35%, rgba(192,132,252,0.0) 60%); animation: fb-path-g 29s ease-in-out infinite; }

        @keyframes fb-path-a {
          0%   { transform: translate3d(0,0,0) scale(1); }
          25%  { transform: translate3d(12vmax, 6vmax, 0) scale(1.1); }
          50%  { transform: translate3d(4vmax, 16vmax, 0) scale(0.95); }
          75%  { transform: translate3d(-8vmax, 8vmax, 0) scale(1.05); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes fb-path-b {
          0%   { transform: translate3d(0,0,0) scale(1.05); }
          20%  { transform: translate3d(-10vmax,-6vmax,0) scale(0.95); }
          55%  { transform: translate3d(-18vmax, 2vmax,0) scale(1.1); }
          100% { transform: translate3d(0,0,0) scale(1.05); }
        }
        @keyframes fb-path-c {
          0%   { transform: translate3d(0,0,0) scale(0.95); }
          30%  { transform: translate3d(-8vmax,-10vmax,0) scale(1.05); }
          65%  { transform: translate3d(6vmax, -16vmax,0) scale(1.15); }
          100% { transform: translate3d(0,0,0) scale(0.95); }
        }
        @keyframes fb-path-d {
          0%   { transform: translate3d(0,0,0) scale(1.1); }
          35%  { transform: translate3d(-12vmax, 8vmax,0) scale(0.9); }
          70%  { transform: translate3d(-4vmax, -10vmax,0) scale(1.05); }
          100% { transform: translate3d(0,0,0) scale(1.1); }
        }
        @keyframes fb-path-e {
          0%   { transform: translate3d(0,0,0) scale(1.05); }
          40%  { transform: translate3d(16vmax,-6vmax,0) scale(0.9); }
          85%  { transform: translate3d(8vmax, 10vmax,0) scale(1.1); }
          100% { transform: translate3d(0,0,0) scale(1.05); }
        }
        @keyframes fb-path-f {
          0%   { transform: translate3d(0,0,0) scale(0.9); }
          25%  { transform: translate3d(-10vmax, 12vmax,0) scale(1.05); }
          60%  { transform: translate3d(6vmax, 18vmax,0) scale(1.15); }
          100% { transform: translate3d(0,0,0) scale(0.9); }
        }
        @keyframes fb-path-g {
          0%   { transform: translate3d(0,0,0) scale(1.0); }
          30%  { transform: translate3d(10vmax, -8vmax,0) scale(1.08); }
          60%  { transform: translate3d(-6vmax, 10vmax,0) scale(1.12); }
          100% { transform: translate3d(0,0,0) scale(1.0); }
        }
      `}</style>
    </div>
  );
}
