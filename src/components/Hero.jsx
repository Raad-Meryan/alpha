import React, { useRef, useEffect, useState } from 'react';
import './Hero.css';
import MuxVideo from '@mux/mux-video-react';

const Hero = () => {
  const playbackId = (import.meta.env.VITE_MUX_HERO_PLAYBACK_ID ?? '').trim();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [shadowColor, setShadowColor] = useState('rgba(100, 108, 255, 0.5)');
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastScrollY = useRef(0);
  const loadTimeoutRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      const next = !isMuted;
      videoRef.current.muted = next;
      setIsMuted(next);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector('.app');
      const currentScrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
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

    const scrollContainer = document.querySelector('.app');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const enforceSize = () => {
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';
      };
      video.addEventListener('loadedmetadata', enforceSize);
      video.addEventListener('canplay', enforceSize);
      video.addEventListener('resize', enforceSize);
      return () => {
        video.removeEventListener('loadedmetadata', enforceSize);
        video.removeEventListener('canplay', enforceSize);
        video.removeEventListener('resize', enforceSize);
      };
    }
  }, []);

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

  useEffect(() => {
    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="video-container" style={{ '--shadow-color': shadowColor }}>
          {playbackId ? (
            <MuxVideo
              key={playbackId}
              ref={videoRef}
              playbackId={playbackId}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              streamType="on-demand"
              crossOrigin="anonymous"
              poster={`https://image.mux.com/${playbackId}/thumbnail.jpg?time=1`}
              className="hero-video"
              style={{ width: '100%', height: '100%', maxHeight: '75vh', objectFit: 'contain' }}
              onCanPlay={() => {
                setIsLoading(false);
                setError(null);
                if (loadTimeoutRef.current) {
                  clearTimeout(loadTimeoutRef.current);
                  loadTimeoutRef.current = null;
                }
              }}
              onLoadStart={() => {
                setIsLoading(true);
                setError(null);
                if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
                loadTimeoutRef.current = setTimeout(() => {
                  setError('Video is taking too long to load.');
                  setIsLoading(false);
                }, 30000);
              }}
              onLoadedData={() => {
                setIsLoading(false);
              }}
              onPlaying={() => {
                setIsLoading(false);
              }}
              onWaiting={() => {
                setIsLoading(true);
              }}
              onError={() => {
                setError('Video failed to load.');
                setIsLoading(false);
              }}
              onStalled={() => {
                setError('Video loading is slow.');
              }}
            />
          ) : (
            <div className="video-loading">
              <div style={{ color: '#ff6b6b', fontSize: '18px' }}>⚠️</div>
              <p style={{ color: '#ff6b6b' }}>Missing VITE_MUX_HERO_PLAYBACK_ID.</p>
            </div>
          )}
          <button onClick={toggleMute} className="mute-button" aria-label={isMuted ? 'Unmute video' : 'Mute video'}>
            {isMuted ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
          <canvas ref={canvasRef} className="color-canvas" />
          {isLoading && !error && (
            <div className="video-loading">
              <div className="loading-spinner"></div>
              <p>Loading video...</p>
              <small>Playback ID: {playbackId}</small>
            </div>
          )}
          {error && (
            <div className="video-loading">
              <div style={{ color: '#ff6b6b', fontSize: '18px' }}>⚠️</div>
              <p style={{ color: '#ff6b6b' }}>{error}</p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: '#646cff',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;


// import React, { useRef, useEffect, useState } from 'react';
// import './Hero.css';
// import MuxVideo from '@mux/mux-video-react';

// const Hero = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [shadowColor, setShadowColor] = useState('rgba(100, 108, 255, 0.5)');
//   const [isMuted, setIsMuted] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const lastScrollY = useRef(0);
//   const loadTimeoutRef = useRef(null);

//   const toggleMute = () => {
//     if (videoRef.current) {
//       const next = !isMuted;
//       videoRef.current.muted = next;
//       setIsMuted(next);
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollContainer = document.querySelector('.app');
//       const currentScrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
//       const heroSection = document.querySelector('#hero');
      
//       if (!heroSection) return;
      
//       const heroRect = heroSection.getBoundingClientRect();
//       const isHeroVisible = heroRect.top <= window.innerHeight && heroRect.bottom >= 0;
      
//       if (!isHeroVisible) {
//         if (videoRef.current && !isMuted) {
//           videoRef.current.muted = true;
//           setIsMuted(true);
//         }
//         return;
//       }
      
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

//     // Force consistent video size
//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       const enforceSize = () => {
//         video.style.width = '100%';
//         video.style.height = '100%';
//         video.style.objectFit = 'contain';
//       };
      
//       video.addEventListener('loadedmetadata', enforceSize);
//       video.addEventListener('canplay', enforceSize);
//       video.addEventListener('resize', enforceSize);
      
//       return () => {
//         video.removeEventListener('loadedmetadata', enforceSize);
//         video.removeEventListener('canplay', enforceSize);
//         video.removeEventListener('resize', enforceSize);
//       };
//     }
//   }, []);

//   useEffect(() => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     if (!video || !canvas) return;
//     const ctx = canvas.getContext('2d');
//     let raf;
//     const extractColor = () => {
//       if (video.paused || video.ended) return;
//       try {
//         canvas.width = 160;
//         canvas.height = 90;
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//         const data = imageData.data;
//         let r = 0, g = 0, b = 0, count = 0;
//         for (let i = 0; i < data.length; i += 16) {
//           r += data[i];
//           g += data[i + 1];
//           b += data[i + 2];
//           count++;
//         }
//         r = Math.min(255, Math.floor((r / count) * 1.5));
//         g = Math.min(255, Math.floor((g / count) * 1.5));
//         b = Math.min(255, Math.floor((b / count) * 1.5));
//         setShadowColor(`rgba(${r}, ${g}, ${b}, 0.9)`);
//       } catch {}
//       raf = requestAnimationFrame(extractColor);
//     };
//     const start = () => {
//       cancelAnimationFrame(raf);
//       raf = requestAnimationFrame(extractColor);
//     };
//     video.addEventListener('loadeddata', start);
//     video.addEventListener('play', start);
//     return () => {
//       video.removeEventListener('loadeddata', start);
//       video.removeEventListener('play', start);
//       cancelAnimationFrame(raf);
//     };
//   }, []);

//   // Cleanup timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (loadTimeoutRef.current) {
//         clearTimeout(loadTimeoutRef.current);
//       }
//     };
//   }, []);

//   return (
//     <section id="hero" className="hero">
//       <div className="hero-content">
//         <div className="video-container" style={{ '--shadow-color': shadowColor }}>
//           <MuxVideo
//             ref={videoRef}
//             playbackId={import.meta.env.VITE_MUX_HERO_PLAYBACK_ID}
//             autoPlay
//             loop
//             muted={isMuted}
//             playsInline
//             preload="metadata"
//             priority
//             streamType="on-demand"
//             loading="eager"
//             poster={`https://image.mux.com/${import.meta.env.VITE_MUX_HERO_PLAYBACK_ID}/thumbnail.jpg?time=1`}
//             className="hero-video"
//             style={{ width: '100%', height: '100%', maxHeight: '75vh', objectFit: 'contain' }}
//             onCanPlay={() => {
//               console.log('Video can play');
//               setIsLoading(false);
//               setError(null);
//               if (loadTimeoutRef.current) {
//                 clearTimeout(loadTimeoutRef.current);
//                 loadTimeoutRef.current = null;
//               }
//             }}
//             onLoadStart={() => {
//               console.log('Video load started');
//               setIsLoading(true);
//               setError(null);
              
//               // Set a timeout for loading
//               if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
//               loadTimeoutRef.current = setTimeout(() => {
//                 setError('Video is taking too long to load. Please check your connection and try again.');
//                 setIsLoading(false);
//               }, 30000); // 30 second timeout
//             }}
//             onLoadedData={() => {
//               console.log('Video data loaded');
//               setIsLoading(false);
//             }}
//             onPlaying={() => {
//               console.log('Video is playing');
//               setIsLoading(false);
//             }}
//             onWaiting={() => {
//               console.log('Video is waiting/buffering');
//               setIsLoading(true);
//             }}
//             onError={(e) => {
//               console.error('Video error:', e);
//               setError('Video failed to load. Please refresh the page.');
//               setIsLoading(false);
//             }}
//             onStalled={() => {
//               console.log('Video stalled');
//               setError('Video loading is slow. Check your connection.');
//             }}
//           />
//           <button onClick={toggleMute} className="mute-button" aria-label={isMuted ? 'Unmute video' : 'Mute video'}>
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
//           {isLoading && !error && (
//             <div className="video-loading">
//               <div className="loading-spinner"></div>
//               <p>Loading video...</p>
//               <small>Playback ID: {import.meta.env.VITE_MUX_HERO_PLAYBACK_ID}</small>
//             </div>
//           )}
//           {error && (
//             <div className="video-loading">
//               <div style={{ color: '#ff6b6b', fontSize: '18px' }}>⚠️</div>
//               <p style={{ color: '#ff6b6b' }}>{error}</p>
//               <button 
//                 onClick={() => window.location.reload()} 
//                 style={{ 
//                   background: '#646cff', 
//                   color: 'white', 
//                   border: 'none', 
//                   padding: '8px 16px', 
//                   borderRadius: '4px', 
//                   cursor: 'pointer' 
//                 }}
//               >
//                 Retry
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

