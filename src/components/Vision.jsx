import React from 'react';
import './Vision.css';
import ScrollReveal from '../assets/ScrollReveal';
import TrueFocus from '../assets/TrueFocus';

const Vision = () => {
  return (
    <div className="vision">
      <div className="vision-container">
        <TrueFocus
          sentence="Our Vision"
          manualMode={true}
          blurAmount={5}
          borderColor="#ff0000ff"
          animationDuration={0.5}
          pauseBetweenAnimations={1}
        />
        <div className="vision-content">
          <div className="vision-video-container">
            <iframe 
              src="https://player.vimeo.com/video/1126916129?autoplay=1&loop=1&autopause=0&muted=1&background=1"
              className="vision-video"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Vision Video"
            ></iframe>
          </div>
          <p className="vision-statement">
            At ALPHA PROJECT, we believe in uncovering stories,
            <br /> emotions, and ideas that often go unnoticed. 
            <br /> 
            <br /> Through our work, we strive to challenge the ordinary, 
            <br /> offering fresh perspectives that inspire people to see life 
            <br /> in new and meaningful ways.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vision;
