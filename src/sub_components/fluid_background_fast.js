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
      <div className="absolute inset-0 bg-[radial-gradient(140%_110%_at_50%_0%,#ffffff_0%,#f7fbff_28%,#eef6ff_52%,#edf8f7_72%,#fff9ef_100%)] transition-colors duration-700" />
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(40%_34%_at_50%_12%,rgba(255,255,255,0.96),rgba(255,255,255,0)_72%),radial-gradient(32%_28%_at_82%_22%,rgba(191,219,254,0.44),rgba(191,219,254,0)_76%),radial-gradient(26%_22%_at_20%_74%,rgba(167,243,208,0.34),rgba(167,243,208,0)_78%)]" />

      {/* Animated blobs container */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ filter: "blur(42px) saturate(1.3)", opacity }}
      >
        <span className="fb-blob fb-blob--a" />
        <span className="fb-blob fb-blob--b" />
        <span className="fb-blob fb-blob--c" />
        <span className="fb-blob fb-blob--d" />
        <span className="fb-blob fb-blob--e" />
        <span className="fb-blob fb-blob--f" />
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
          width: 52vmax;
          height: 52vmax;
          border-radius: 9999px;
          will-change: transform, opacity;
          mix-blend-mode: screen;
          opacity: 0.82;
          background: radial-gradient(50% 50% at 50% 50%, rgba(59,130,246,0.82) 0%, rgba(59,130,246,0.32) 38%, rgba(59,130,246,0.06) 56%, rgba(59,130,246,0.0) 72%);
          filter: hue-rotate(0deg);
        }

        .fb-blob--a { left: -12vmax; top: -12vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(125,211,252,0.92) 0%, rgba(125,211,252,0.4) 36%, rgba(125,211,252,0.08) 56%, rgba(125,211,252,0) 74%); animation: fb-path-a 30s ease-in-out infinite; }
        .fb-blob--b { right: -16vmax; top: 4vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(96,165,250,0.9) 0%, rgba(96,165,250,0.38) 36%, rgba(96,165,250,0.06) 58%, rgba(96,165,250,0) 74%); animation: fb-path-b 34s ease-in-out infinite; }
        .fb-blob--c { left: 18vmax; bottom: -18vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(110,231,183,0.88) 0%, rgba(110,231,183,0.34) 36%, rgba(110,231,183,0.08) 56%, rgba(110,231,183,0) 74%); animation: fb-path-c 38s ease-in-out infinite; }
        .fb-blob--d { right: 12vmax; bottom: -16vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(253,186,116,0.86) 0%, rgba(253,186,116,0.32) 34%, rgba(253,186,116,0.05) 54%, rgba(253,186,116,0) 72%); animation: fb-path-d 32s ease-in-out infinite; }
        .fb-blob--e { left: -20vmax; bottom: 2vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(244,114,182,0.78) 0%, rgba(244,114,182,0.28) 34%, rgba(244,114,182,0.04) 54%, rgba(244,114,182,0) 72%); animation: fb-path-e 42s ease-in-out infinite; }
        .fb-blob--f { right: 24vmax; top: -10vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.34) 34%, rgba(255,255,255,0.08) 54%, rgba(255,255,255,0) 72%); animation: fb-path-f 28s ease-in-out infinite; }

        @keyframes fb-path-a {
          0%   { transform: translate3d(0,0,0) scale(1); }
          25%  { transform: translate3d(14vmax, 5vmax, 0) scale(1.08); }
          50%  { transform: translate3d(9vmax, 18vmax, 0) scale(0.94); }
          75%  { transform: translate3d(-6vmax, 8vmax, 0) scale(1.04); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes fb-path-b {
          0%   { transform: translate3d(0,0,0) scale(1.03); }
          30%  { transform: translate3d(-12vmax,-4vmax,0) scale(0.96); }
          65%  { transform: translate3d(-20vmax, 5vmax,0) scale(1.1); }
          100% { transform: translate3d(0,0,0) scale(1.03); }
        }
        @keyframes fb-path-c {
          0%   { transform: translate3d(0,0,0) scale(0.98); }
          30%  { transform: translate3d(-10vmax,-10vmax,0) scale(1.04); }
          65%  { transform: translate3d(8vmax, -18vmax,0) scale(1.14); }
          100% { transform: translate3d(0,0,0) scale(0.98); }
        }
        @keyframes fb-path-d {
          0%   { transform: translate3d(0,0,0) scale(1.08); }
          35%  { transform: translate3d(-14vmax, 6vmax,0) scale(0.92); }
          70%  { transform: translate3d(-2vmax, -12vmax,0) scale(1.03); }
          100% { transform: translate3d(0,0,0) scale(1.08); }
        }
        @keyframes fb-path-e {
          0%   { transform: translate3d(0,0,0) scale(1.04); }
          40%  { transform: translate3d(18vmax,-4vmax,0) scale(0.9); }
          85%  { transform: translate3d(12vmax, 12vmax,0) scale(1.08); }
          100% { transform: translate3d(0,0,0) scale(1.04); }
        }
        @keyframes fb-path-f {
          0%   { transform: translate3d(0,0,0) scale(0.92); }
          30%  { transform: translate3d(-8vmax,8vmax,0) scale(1.02); }
          60%  { transform: translate3d(-16vmax,2vmax,0) scale(0.96); }
          100% { transform: translate3d(0,0,0) scale(0.92); }
        }
      `}</style>
    </div>
  );
}
