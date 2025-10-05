import React from 'react';
import './Vision.css';
import ScrollReveal from '../assets/ScrollReveal';

const Vision = () => {
  return (
    <section id="vision" className="vision">
      <div className="container">
        <ScrollReveal
          baseOpacity={0.7}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
          as="h2"
          containerClassName="section-title"
        >
          Our Vision
        </ScrollReveal>
        <div className="vision-content">
          <ScrollReveal
            baseOpacity={0.6}
            enableBlur={true}
            baseRotation={0}
            blurStrength={5}
            as="p"
            containerClassName="vision-statement"
          >
            "To see life from another perspective". At ALPHA PROJECT, we believe in uncovering stories, emotions, and ideas that often go unnoticed. Through our work, we strive to challenge the ordinary, offering fresh perspectives that inspire people to see life in new, meaningful ways.
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Vision;
