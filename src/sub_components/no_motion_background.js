import React from "react";

/**
 * NoMotionBackground — truly static background.
 * - Fixed, full-viewport layer behind your content
 * - Light gradient + static color blobs + subtle vignette
 * - Absolutely NO animations or transitions anywhere
 *
 * Props:
 *  className: extra classes to layer on top
 *  opacity: 0..1 opacity for the blob layer (default 0.6)
 */
export default function NoMotionBackground({ className = "", opacity = 0.6 }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 -z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Base gradient wash (static) */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#ffffff_0%,#fafafa_35%,#f5f5f5_60%,#e7e5e4_100%)]" />

      {/* Static blobs (no animation, no transition) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ filter: "blur(32px) saturate(1.2)", opacity }}
      >
        <span className="nm-blob nm-blob--a" />
        <span className="nm-blob nm-blob--b" />
        <span className="nm-blob nm-blob--c" />
        <span className="nm-blob nm-blob--d" />
        <span className="nm-blob nm-blob--e" />
      </div>

      {/* Subtle vignette (static) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.05) 70%, rgba(0,0,0,0.03) 100%)",
        }}
      />

      <style>{`
        .nm-blob {
          position: absolute;
          width: 48vmax;
          height: 48vmax;
          border-radius: 9999px;
          mix-blend-mode: screen;
          opacity: 0.85;
        }
        .nm-blob--a { left: -10vmax; top: -8vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(96,165,250,0.9) 0%, rgba(96,165,250,0.4) 35%, rgba(96,165,250,0) 60%); }
        .nm-blob--b { right: -12vmax; top: 10vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(59,130,246,0.9) 0%, rgba(59,130,246,0.4) 35%, rgba(59,130,246,0) 60%); }
        .nm-blob--c { left: 20vmax; bottom: -16vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(52,211,153,0.9) 0%, rgba(52,211,153,0.4) 35%, rgba(52,211,153,0) 60%); }
        .nm-blob--d { right: 18vmax; bottom: -14vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(251,146,60,0.9) 0%, rgba(251,146,60,0.4) 35%, rgba(251,146,60,0) 60%); }
        .nm-blob--e { left: -18vmax; bottom: 8vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(251,113,133,0.9) 0%, rgba(251,113,133,0.4) 35%, rgba(251,113,133,0) 60%); }
      `}</style>
    </div>
  );
}
