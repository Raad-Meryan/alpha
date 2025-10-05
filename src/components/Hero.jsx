import React from 'react';
import './Hero.css';
import alphaLogo from '../assets/alpha_logo_transparent.png';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="logo">
          <img src={alphaLogo} alt="Alpha Project" className="logo-image" />
          <h1 className="logo-text">ALPHA PROJECT</h1>
        </div>
        <h2 className="hero-title">Creative Studio</h2>
        <p className="hero-subtitle">Building Digital Experiences</p>
      </div>
    </section>
  );
};

export default Hero;
