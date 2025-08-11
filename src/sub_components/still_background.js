
export default function StillBackgroundCSS({ className = "", opacity = 0.6 }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 -z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#ffffff_0%,#fafafa_35%,#f5f5f5_60%,#e7e5e4_100%)]" />

      {/* Static blobs container */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ filter: "blur(32px) saturate(1.2)", opacity }}
      >
        <span className="fb-blob fb-blob--a" />
        <span className="fb-blob fb-blob--b" />
        <span className="fb-blob fb-blob--c" />
        <span className="fb-blob fb-blob--d" />
        <span className="fb-blob fb-blob--e" />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.05) 70%, rgba(0,0,0,0.03) 100%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.1\"/></svg>')",
          backgroundSize: "256px 256px",
        }}
      />

      <style>{`
        .fb-blob {
          position: absolute;
          width: 48vmax;
          height: 48vmax;
          border-radius: 9999px;
          will-change: transform, opacity;
          mix-blend-mode: screen;
          opacity: 0.85;
        }

        /* Still positions for blobs */
        .fb-blob--a { left: -10vmax; top: -8vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(96,165,250,0.9) 0%, rgba(96,165,250,0.4) 35%, rgba(96,165,250,0.0) 60%); }
        .fb-blob--b { right: -12vmax; top: 10vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(59,130,246,0.9) 0%, rgba(59,130,246,0.4) 35%, rgba(59,130,246,0.0) 60%); }
        .fb-blob--c { left: 20vmax; bottom: -16vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(52,211,153,0.9) 0%, rgba(52,211,153,0.4) 35%, rgba(52,211,153,0.0) 60%); }
        .fb-blob--d { right: 18vmax; bottom: -14vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(251,146,60,0.9) 0%, rgba(251,146,60,0.4) 35%, rgba(251,146,60,0.0) 60%); }
        .fb-blob--e { left: -18vmax; bottom: 8vmax; background: radial-gradient(50% 50% at 50% 50%, rgba(251,113,133,0.9) 0%, rgba(251,113,133,0.4) 35%, rgba(251,113,133,0.0) 60%); }
      `}</style>
    </div>
  );
}

