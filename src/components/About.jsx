import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        <div className="about-content">
          <p className="about-text">
            We are a creative studio dedicated to crafting exceptional digital experiences. 
            Our team combines innovation with expertise to deliver solutions that inspire and engage.
          </p>
          <p className="about-text">
            With a focus on modern design principles and cutting-edge technology, 
            we transform ideas into reality, creating meaningful connections between brands and their audiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
