import React from 'react';
import './About.css';
import ScrollReveal from '../assets/ScrollReveal';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur={true}
          baseRotation={0}
          blurStrength={4}
          as="h2"
          containerClassName="section-title"
        >
          About Us
        </ScrollReveal>
        <div className="about-content">
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={5}
            blurStrength={4}
            as="p"
            containerClassName="about-text"
          >
            A cinematic production company
          </ScrollReveal>

          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={5}
            blurStrength={4}
            as="p"
            containerClassName="about-text"
          >
            founded in Amman, Jordan in 2021.
          </ScrollReveal>

          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={5}
            blurStrength={4}
            as="p"
            containerClassName="about-content-size"
          >
            We breathe life into stories, ignite inspiration within people, and transport you into new worlds, filled with emotions, wonder, and hope.
          </ScrollReveal>
          
        </div>
      </div>
    </section>
  );
};

export default About;
