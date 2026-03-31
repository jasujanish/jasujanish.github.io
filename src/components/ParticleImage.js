import React, { useRef, useEffect, useMemo } from 'react';
import photo1 from '../images/photo_1.jpeg';
import photo2 from '../images/photo_2.jpeg';
import photo3 from '../images/photo_3.jpeg';

const ParticleImage = ({
    width,
    height,
    className = "",
    style = {},
    onIndexChange
}) => {
    const canvasRef = useRef(null);

    // Refs (no re-render churn)
    const imagesRef = useRef([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef(null);

    // Two-layer crossfade
    const activeParticlesRef = useRef([]);     // incoming / current layer
    const outgoingParticlesRef = useRef(null); // previous layer fading out

    // Cache particle target positions so transitions are instant and cheap
    const positionsCacheRef = useRef(new Map());

    // Keep “current index” in a ref so click logic never suffers from stale closures
    const currentIndexRef = useRef(0);

    // Images
    const imageSources = useMemo(() => [photo1, photo2, photo3], []);

    // Responsive particle config
    const getParticleConfig = (w) => {
        if (w < 768) return { gap: 4, size: 5 };       // mobile
        if (w > 1600) return { gap: 6, size: 6 };      // large screens
        return { gap: 5, size: 5 };                    // default
    };

    const particleConfigRef = useRef(getParticleConfig(width));
    useEffect(() => {
        particleConfigRef.current = getParticleConfig(width);
    }, [width]);

    const MOUSE_RADIUS = particleConfigRef.current.gap * particleConfigRef.current.size * 5;

    const loadImage = (src) =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(e);
        });

    // Generate target positions for a square grid
    // Image is centered; remaining space is "padding"
    const getParticlePositions = (img, wCanvas, hCanvas) => {
        const tempCanvas = document.createElement('canvas');
        const ctx = tempCanvas.getContext('2d', { willReadFrequently: true });
        const { gap } = getParticleConfig(wCanvas);

        // 1. Define Square Size & Position
        // "Make sure all images take up the same space" -> square based on smallest dimension
        // REMOVED 0.8 scaling to reduce padding
        const size = Math.min(wCanvas, hCanvas);
        const startX = (wCanvas - size) / 2;
        const startY = (hCanvas - size) / 2;

        // 2. Calculate Image Scale & Position within Square
        const imgScale = Math.min(size / img.width, size / img.height);
        const imgW = img.width * imgScale;
        const imgH = img.height * imgScale;
        const imgX = startX + (size - imgW) / 2;
        const imgY = startY + (size - imgH) / 2;

        // 3. Draw Image to Temp Canvas
        // We set canvas size to full w/h so coordinates match the main canvas
        tempCanvas.width = wCanvas;
        tempCanvas.height = hCanvas;
        ctx.clearRect(0, 0, wCanvas, hCanvas);
        ctx.drawImage(img, imgX, imgY, imgW, imgH);

        const imageData = ctx.getImageData(0, 0, wCanvas, hCanvas);
        const data = imageData.data;
        const positions = [];

        // 4. Iterate strictly over the SQUARE region
        // We use Math.floor/ceil to be safe with floating point steps
        for (let y = startY; y < startY + size; y += gap) {
            for (let x = startX; x < startX + size; x += gap) {

                // BRIGHTER padding color (light gray instead of dark gray)
                let r = 220, g = 220, b = 220;
                let isImage = false;

                // Check if index is within the drawn image bounds
                if (x >= imgX && x < imgX + imgW && y >= imgY && y < imgY + imgH) {
                    const px = Math.floor(x);
                    const py = Math.floor(y);
                    const i = (py * wCanvas + px) * 4;

                    // Simple alpha/brightness check to verify it matches drawn pixels
                    if (data[i + 3] > 20) {
                        r = data[i];
                        g = data[i + 1];
                        b = data[i + 2];
                        isImage = true;
                    }
                }

                // If it's image content, push as image particle.
                // If not, it's padding.
                positions.push({
                    x,
                    y,
                    r,
                    g,
                    b,
                    isPadding: !isImage,
                });
            }
        }

        // Stable order
        positions.sort((a, b) => a.y - b.y || a.x - b.x);
        return positions;
    };

    const cacheKey = (index, w, h, gap) => `${index}-${w}x${h}-g${gap}`;

    const getCachedPositions = (index) => {
        const { gap } = getParticleConfig(width);
        const key = cacheKey(index, width, height, gap);

        const cached = positionsCacheRef.current.get(key);
        if (cached) return cached;

        const img = imagesRef.current[index];
        if (!img) return [];

        const positions = getParticlePositions(img, width, height);
        positionsCacheRef.current.set(key, positions);
        return positions;
    };

    const buildParticlesFromPositions = (positions, { startAlpha, targetAlpha, fadeSpeed }) => {
        return positions.map((pos) => {
            // "95% opacity" -> 0.95 alpha for image
            // "90% transparent padding" -> 0.10 alpha for padding
            const baseAlpha = pos.isPadding ? 0.10 : 0.95;

            // If we are commanding "visible" (1), use baseAlpha. 
            // If "invisible" (0), use 0.
            const finalStart = startAlpha === 1 ? baseAlpha : startAlpha;
            const finalTarget = targetAlpha === 1 ? baseAlpha : targetAlpha;

            return {
                x: pos.x,
                y: pos.y,
                targetX: pos.x,
                targetY: pos.y,
                vx: 0,
                vy: 0,
                r: pos.r,
                g: pos.g,
                b: pos.b,
                baseAlpha, // Store base alpha for reference
                alpha: finalStart,
                targetAlpha: finalTarget,
                fadeSpeed,
            };
        });
    };

    const initParticles = (index, { keepVisible = false } = {}) => {
        const positions = getCachedPositions(index);
        const fadeInSpeed = 0.15;

        activeParticlesRef.current = buildParticlesFromPositions(positions, {
            startAlpha: keepVisible ? 1 : 0,
            targetAlpha: 1,
            fadeSpeed: fadeInSpeed,
        });

        // Ensure outgoing is cleared
        outgoingParticlesRef.current = null;

        currentIndexRef.current = index;
        if (onIndexChange) onIndexChange(index);

        if (!animationRef.current) animate();
    };

    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Background - Transparent or subtle
        ctx.clearRect(0, 0, width, height);
        // Optional: Draw a very faint background if requested, but 'transparent' is best for "brighter" 
        // if the container has a color. If not, we can do this:
        // ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'; 
        // ctx.fillRect(0, 0, width, height);

        const mouse = mouseRef.current;
        const { size } = particleConfigRef.current;

        // Physics params (kept outside loops)
        const ease = 0.4;
        const friction = 0.85;
        const repulsionForce = 15;
        const r2 = MOUSE_RADIUS * MOUSE_RADIUS;

        const stepLayer = (particles, interactive) => {
            if (!particles) return true;

            let allGone = true;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Fade
                const da = p.targetAlpha - p.alpha;
                if (Math.abs(da) > 0.01) p.alpha += da * p.fadeSpeed;
                else p.alpha = p.targetAlpha;

                if (p.alpha > 0.01) allGone = false;

                // If basically invisible, skip physics + draw (saves CPU)
                if (p.alpha <= 0.01) continue;

                // Ease toward target
                const dx = p.targetX - p.x;
                const dy = p.targetY - p.y;
                p.vx += dx * ease;
                p.vy += dy * ease;

                // Mouse repulsion only for active layer
                if (interactive) {
                    const mdx = p.x - mouse.x;
                    const mdy = p.y - mouse.y;
                    const distSq = mdx * mdx + mdy * mdy;
                    if (distSq < r2) {
                        const dist = Math.sqrt(distSq) || 1;
                        const f = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                        const force = f * repulsionForce;
                        p.vx += (mdx / dist) * force;
                        p.vy += (mdy / dist) * force;
                    }
                }

                // Integrate
                p.vx *= friction;
                p.vy *= friction;
                p.x += p.vx;
                p.y += p.vy;

                // Draw
                ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`;
                ctx.fillRect(p.x, p.y, size, size);
            }

            return allGone;
        };

        // Draw outgoing first, then active on top
        const outgoingGone = stepLayer(outgoingParticlesRef.current, false);
        stepLayer(activeParticlesRef.current, true);

        if (outgoingParticlesRef.current && outgoingGone) {
            outgoingParticlesRef.current = null;
        }

        animationRef.current = requestAnimationFrame(animate);
    };

    const handleClick = () => {
        if (!imagesRef.current.length) return;

        // Prevent double-click transitions
        if (outgoingParticlesRef.current) return;

        const nextIndex = (currentIndexRef.current + 1) % imagesRef.current.length;

        // OUTGOING layer = current active
        outgoingParticlesRef.current = activeParticlesRef.current;

        // Fade outgoing fast
        for (let i = 0; i < outgoingParticlesRef.current.length; i++) {
            outgoingParticlesRef.current[i].targetAlpha = 0;
            outgoingParticlesRef.current[i].fadeSpeed = 0.15;
        }

        // INCOMING layer = new active, start invisible and fade in
        const nextPositions = getCachedPositions(nextIndex);
        activeParticlesRef.current = buildParticlesFromPositions(nextPositions, {
            startAlpha: 0,
            targetAlpha: 1,
            fadeSpeed: 0.15,
        });

        currentIndexRef.current = nextIndex;
        if (onIndexChange) onIndexChange(nextIndex);
    };

    // Initial load + mouse listeners
    useEffect(() => {
        let cancelled = false;

        Promise.all(imageSources.map(loadImage))
            .then((imgs) => {
                if (cancelled) return;
                imagesRef.current = imgs;
                // initial render: show image immediately (no “loading fade”)
                initParticles(0, { keepVisible: true });
            })
            .catch(() => {
                // ignore
            });

        const handleMouseMove = (e) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            // Handle both mouse and touch events
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            mouseRef.current = {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        };
        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        // Attach listeners to the CANVAS instead of WINDOW for better scoped interaction
        // OR keep on window but check boundaries. 
        // For particle effects usually window is better for "drag in" effect, but we need relative coords.
        // Let's stick to window listener but use the rect.
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleMouseMove); // Add touch support

        window.addEventListener('mouseout', handleMouseLeave);
        window.addEventListener('touchend', handleMouseLeave); // Add touch support

        return () => {
            cancelled = true;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);

            window.removeEventListener('mouseout', handleMouseLeave);
            window.removeEventListener('touchend', handleMouseLeave);

            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Re-init on resize (no flash): rebuild current as visible, clear cache
    useEffect(() => {
        if (!imagesRef.current.length) return;

        positionsCacheRef.current.clear();
        initParticles(currentIndexRef.current, { keepVisible: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, height]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onClick={handleClick}
            className={className}
            style={{
                display: 'block', // avoid inline-block spacing
                cursor: 'pointer',
                ...style
            }}
        />
    );
};

export default ParticleImage;
