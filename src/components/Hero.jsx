import React, { useRef, useEffect, useState } from 'react';
import './Hero.css';
import MuxVideo from '@mux/mux-video-react';

const Hero = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [shadowColor, setShadowColor] = useState('rgba(100, 108, 255, 0.5)');
  const [isMuted, setIsMuted] = useState(true);
  const lastScrollY = useRef(0);

  const toggleMute = () => {
    if (videoRef.current) {
      const next = !isMuted;
      videoRef.current.muted = next;
      setIsMuted(next);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroSection = document.querySelector('#hero');
      if (!heroSection) return;
      const heroRect = heroSection.getBoundingClientRect();
      const isHeroVisible = heroRect.top <= window.innerHeight && heroRect.bottom >= 0;
      if (!isHeroVisible) {
        if (videoRef.current && !isMuted) {
          videoRef.current.muted = true;
          setIsMuted(true);
        }
        return;
      }
      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        if (videoRef.current && !isMuted) {
          videoRef.current.muted = true;
          setIsMuted(true);
        }
      } else if (currentScrollY < 50 && currentScrollY < lastScrollY.current) {
        if (videoRef.current && isMuted) {
          videoRef.current.muted = false;
          setIsMuted(false);
        }
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const extractColor = () => {
      if (video.paused || video.ended) return;
      try {
        canvas.width = 160;
        canvas.height = 90;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 16) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        r = Math.min(255, Math.floor((r / count) * 1.5));
        g = Math.min(255, Math.floor((g / count) * 1.5));
        b = Math.min(255, Math.floor((b / count) * 1.5));
        setShadowColor(`rgba(${r}, ${g}, ${b}, 0.9)`);
      } catch {}
      raf = requestAnimationFrame(extractColor);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(extractColor);
    };
    video.addEventListener('loadeddata', start);
    video.addEventListener('play', start);
    return () => {
      video.removeEventListener('loadeddata', start);
      video.removeEventListener('play', start);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="video-container" style={{ '--shadow-color': shadowColor }}>
          <MuxVideo
            ref={videoRef}
            playbackId={import.meta.env.VITE_MUX_HERO_PLAYBACK_ID}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className="hero-video"
            style={{ width: '100%', height: 'auto', maxHeight: '75vh', objectFit: 'contain' }}
          />
          <button onClick={toggleMute} className="mute-button" aria-label={isMuted ? 'Unmute video' : 'Mute video'}>
            {isMuted ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            )}
          </button>
          <canvas ref={canvasRef} className="color-canvas" />
        </div>
      </div>
    </section>
  );
};

export default Hero;


// import React, { useRef, useEffect, useState } from 'react';
// import './Hero.css';
// import MuxVideo from '@mux/mux-video-react';
// // import apsr2025Video from '/home/alpha/alpha-1/src/assets/ALPHA PROJECT Showreel 2025.mp4';

// const Hero = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [shadowColor, setShadowColor] = useState('rgba(100, 108, 255, 0.5)');
//   const [isMuted, setIsMuted] = useState(false);
//   const lastScrollY = useRef(0);

//   const toggleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   // Auto-mute/unmute based on scroll direction
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollContainer = document.querySelector('.app');
//       const currentScrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
      
//       // Only handle mute logic when on the hero section
//       const heroSection = document.querySelector('#hero');
//       if (!heroSection) return;
      
//       const heroRect = heroSection.getBoundingClientRect();
//       const isHeroVisible = heroRect.top <= window.innerHeight && heroRect.bottom >= 0;
      
//       if (!isHeroVisible) {
//         // Auto-mute when hero is not visible
//         if (videoRef.current && !isMuted) {
//           videoRef.current.muted = true;
//           setIsMuted(true);
//         }
//         return;
//       }
      
//       // Only manage auto-mute within the hero section
//       if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
//         if (videoRef.current && !isMuted) {
//           videoRef.current.muted = true;
//           setIsMuted(true);
//         }
//       } else if (currentScrollY < 50 && currentScrollY < lastScrollY.current) {
//         if (videoRef.current && isMuted) {
//           videoRef.current.muted = false;
//           setIsMuted(false);
//         }
//       }
      
//       lastScrollY.current = currentScrollY;
//     };

//     const scrollContainer = document.querySelector('.app');
//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
//       return () => scrollContainer.removeEventListener('scroll', handleScroll);
//     } else {
//       window.addEventListener('scroll', handleScroll, { passive: true });
//       return () => window.removeEventListener('scroll', handleScroll);
//     }
//   }, [isMuted]);

//   useEffect(() => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
    
//     if (!video || !canvas) return;

//     const ctx = canvas.getContext('2d');
//     let animationFrameId;

//     const extractColor = () => {
//       if (video.paused || video.ended) return;

//       // Set canvas size to sample area (smaller for performance)
//       canvas.width = 160;
//       canvas.height = 90;

//       // Draw current video frame to canvas
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//       // Get image data from center area
//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//       const data = imageData.data;

//       let r = 0, g = 0, b = 0;
//       let count = 0;

//       // Sample every few pixels for performance
//       for (let i = 0; i < data.length; i += 16) {
//         r += data[i];
//         g += data[i + 1];
//         b += data[i + 2];
//         count++;
//       }

//       // Calculate average color
//       r = Math.floor(r / count);
//       g = Math.floor(g / count);
//       b = Math.floor(b / count);

//       // Increase contrast by boosting the color values
//       r = Math.min(255, Math.floor(r * 1.5));
//       g = Math.min(255, Math.floor(g * 1.5));
//       b = Math.min(255, Math.floor(b * 1.5));

//       // Set the shadow color with enhanced values and higher opacity
//       setShadowColor(`rgba(${r}, ${g}, ${b}, 0.9)`);

//       animationFrameId = requestAnimationFrame(extractColor);
//     };

//     video.addEventListener('play', extractColor);

//     return () => {
//       video.removeEventListener('play', extractColor);
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
//     };
//   }, []);

//   return (
//     <section id="hero" className="hero">
//       <div className="hero-content">
//         <div 
//           className="video-container"
//           style={{ '--shadow-color': shadowColor }}
//         >
//           <MuxVideo 
//             ref={videoRef}
//             playbackId={import.meta.env.VITE_MUX_HERO_PLAYBACK_ID}
//             autoPlay 
//             loop
//             muted={isMuted}
//             playsInline
//             className="hero-video"
//             style={{
//               width: '100%',
//               height: 'auto',
//               maxHeight: '75vh',
//               objectFit: 'contain'
//             }}
//           />
//           <button 
//             onClick={toggleMute} 
//             className="mute-button"
//             aria-label={isMuted ? "Unmute video" : "Mute video"}
//           >
//             {isMuted ? (
//               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M11 5L6 9H2v6h4l5 4V5z"/>
//                 <line x1="23" y1="9" x2="17" y2="15"/>
//                 <line x1="17" y1="9" x2="23" y2="15"/>
//               </svg>
//             ) : (
//               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M11 5L6 9H2v6h4l5 4V5z"/>
//                 <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
//               </svg>
//             )}
//           </button>
//           <canvas ref={canvasRef} className="color-canvas" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

