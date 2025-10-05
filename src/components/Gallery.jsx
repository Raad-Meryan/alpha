import React from 'react';
import './Gallery.css';
import ScrollReveal from '../assets/ScrollReveal';

const Gallery = () => {
  const projects = [
    { id: 1, title: 'Project Alpha', category: 'Web Design' },
    { id: 2, title: 'Project Beta', category: 'Branding' },
    { id: 3, title: 'Project Gamma', category: 'Development' },
    { id: 4, title: 'Project Delta', category: 'UI/UX' },
    { id: 5, title: 'Project Epsilon', category: 'Mobile App' },
    { id: 6, title: 'Project Zeta', category: 'Web Design' },
  ];

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          as="h2"
          containerClassName="section-title"
        >
          Our Work
        </ScrollReveal>
        <div className="gallery-grid">
          {projects.map((project) => (
            <div key={project.id} className="gallery-item">
              <div className="gallery-content">
                <div className="gallery-number">{String(project.id).padStart(2, '0')}</div>
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={5}
                  blurStrength={10}
                  as="h3"
                  containerClassName="gallery-title"
                >
                  {project.title}
                </ScrollReveal>
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={5}
                  blurStrength={10}
                  as="p"
                  containerClassName="gallery-category"
                >
                  {project.category}
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
