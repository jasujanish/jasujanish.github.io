import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Fluid background, successfully vibe-coded (with minor performance/color tweaks by me)
const FluidBackground = ({ colorScheme = 0, speed = 1.0 }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const lastFrameTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup with performance optimizations  
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ 
      canvas,
      antialias: false,
      alpha: true,
    });
    
    // Dynamic resolution based on device capability
    const pixelRatio = 1;
    const scale = 0.75;
    
    renderer.setSize(window.innerWidth * scale, window.innerHeight * scale, false);
    renderer.setPixelRatio(pixelRatio);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // Simplified vertex shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `;
    
    // Enhanced fragment shader with more movement but same performance
    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_colorScheme;
      uniform float u_quality;
      varying vec2 vUv;
      
      vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
        return a + b * cos(6.28318 * (c * t + d));
      }
      
      // Fast noise approximation
      float fastNoise(vec2 st) {
        return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      // Simplified smooth noise
      float smoothNoise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = smoothstep(0.0, 1.0, fract(st));
        float a = fastNoise(i);
        float b = fastNoise(i + vec2(1.0, 0.0));
        float c = fastNoise(i + vec2(0.0, 1.0));
        float d = fastNoise(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      
      void main() {
        vec2 st = vUv;
        st.x *= u_resolution.x / u_resolution.y;
        
        float time = u_time * 0.5;
        vec2 pos = st * 2.5;
        
        // Enhanced movement with multiple flow directions (same cost)
        vec2 flow1 = vec2(sin(time * 0.3), cos(time * 0.4)) * 0.8;
        vec2 flow2 = vec2(cos(time * 0.2 + 1.5), sin(time * 0.35 + 2.0)) * 0.6;
        
        // Reduce complexity based on quality setting
        float finalNoise;
        float n1 = smoothNoise(pos + flow1 + time * 0.2);
        float n2 = smoothNoise(pos * 1.5 + flow2 + time * 0.3);
        finalNoise = n1 * 0.7 + n2 * 0.3;
        
        // Enhanced displacement with rotational movement
        float pulse = sin(u_time * 0.8) * 0.02 + 1.0;
        float angle = (time * 0.6 + finalNoise * 2.5) * pulse;

        vec2 displacement = vec2(
          sin(st.x * 4.0 + angle) * cos(st.y * 2.0 + time * 0.7) * 0.08,
          cos(st.y * 3.0 + angle) * sin(st.x * 2.5 + time * 0.9) * 0.08
        );
        
        // Add subtle breathing effect
        float breathe = sin(time * 0.8) * 0.02 + 1.0;
        displacement *= breathe;

        float ripple = sin((st.x+st.y)*20.0 + time*5.0)*0.005;
        displacement += vec2(ripple);

        finalNoise += length(displacement);
        
        // Enhanced time variation for color shifting
        float colorTime = time * 0.1 + sin(time * 0.3) * 0.05;
        
        vec3 color;
        if (u_colorScheme < 1.0) {
          // Soft pink scheme with enhanced movement
          color = palette(finalNoise + colorTime,
            vec3(0.8, 0.0, 0.7),  // was (0.8,0.6,0.7)
            vec3(0.2, 0.0, 0.15), // was (0.2,0.1,0.15)
            vec3(1.0, 0.0, 0.95), // was (1.0,0.9,0.95)
            vec3(0.1, 0.0, 0.05)
          );

          } else if (u_colorScheme < 2.0) {
          // Sunset scheme
          color = palette(finalNoise + colorTime,
            vec3(0.8, 0.0, 0.4),  // was (0.8,0.5,0.4)
            vec3(0.5, 0.0, 0.2),  // was (0.5,0.3,0.2)
            vec3(1.0, 0.0, 1.0),  // was (1.0,1.0,1.0)
            vec3(0.0, 0.0, 0.2)   // was (0.0,0.1,0.2)
          );
        } else {
          // Blue-Purple scheme
          color = palette(finalNoise + colorTime,
            vec3(0.5, 0.0, 0.8),  // was (0.5,0.5,0.8)
            vec3(0.4, 0.0, 0.4),  // was (0.4,0.2,0.4)
            vec3(1.0, 0.0, 0.8),  // was (1.0,1.0,0.8)
            vec3(0.2, 0.0, 0.6)   // was (0.2,0.4,0.6)
          );

        }
        
        // Enhanced shimmer with dual frequencies
        float shimmer1 = sin(finalNoise * 6.0 + time * 1.2) * 0.02;
        float shimmer2 = cos(finalNoise * 8.0 + time * 0.8) * 0.01;
        float sparkle = sin(finalNoise * 20.0 + u_time * 5.0) * 0.005;
        float totalShimmer = shimmer1 + shimmer2 + sparkle + 0.95;
        color *= totalShimmer;

        gl_FragColor = vec4(color, 0.25);
      }
    `;
    
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_colorScheme: { value: colorScheme },
        u_quality: { value: 0.5 }
      },
      transparent: true
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    sceneRef.current = scene;
    rendererRef.current = renderer;
    materialRef.current = material;
    
    // Throttled animation with FPS limiting
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime) => {
      // on the very first frame, seed lastFrameTime
      if (lastFrameTime.current === 0) {
        lastFrameTime.current = currentTime;
      }

      const delta = currentTime - lastFrameTime.current;
      if (delta >= frameInterval) {
        // update timeRef by exactly the delta we want
        timeRef.current += delta * 0.002 * speed;
        material.uniforms.u_time.value = timeRef.current;

        renderer.render(scene, camera);

        // carry over the “extra” beyond our desired frame interval,
        // so we don’t accumulate drift
        lastFrameTime.current = currentTime - (delta % frameInterval);
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    animate(0);


    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth * scale;
        const height = window.innerHeight * scale;
        renderer.setSize(width, height, false);
        material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
      }, 250);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationRef.current);
      } else {
        animate(performance.now());
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationRef.current);
      renderer.dispose();
    };
  }, [colorScheme, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default FluidBackground;