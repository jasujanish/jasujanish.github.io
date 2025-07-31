import React, { useRef, useEffect, useState } from 'react';
import background from '../images/background_2.mp4';
import placeholderImage from '../images/background_2.png'; // Import your placeholder image

// Replacement for FluidBackground using a video element
const TailwindFluidBg = ({
  src = background,
  className = '',
  muted = true,
  autoPlay = true,
  ...props
}) => {
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false); // State to track video readiness

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play the video
    if (autoPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsVideoReady(true); // Set video as ready when playback starts
        }).catch((error) => {
          // Autoplay might be blocked; handle if needed
          console.warn('Video autoplay was prevented:', error);
          setIsVideoReady(true); // Still consider it ready to show controls
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
    <>
      {!isVideoReady && (
        <div
          className={`fixed top-0 left-0 w-full h-full object-cover z-0 ${className}`}
          style={{
            backgroundImage: `url(${placeholderImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <video
        ref={videoRef}
        src={src}
        muted={muted}
        autoPlay={autoPlay}
        controls={false}
        loop={false}
        playsInline
        className={`fixed top-0 left-0 w-full h-full object-cover z-0 ${className} ${
          isVideoReady ? '' : 'hidden' // Hide video until ready
        }`}
        {...props}
      />
    </>
  );
};

export default TailwindFluidBg;
