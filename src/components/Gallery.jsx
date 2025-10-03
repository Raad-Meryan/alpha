import React from 'react';
import './Gallery.css';

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
        <h2 className="section-title">Our Work</h2>
        <div className="gallery-grid">
          {projects.map((project) => (
            <div key={project.id} className="gallery-item">
              <div className="gallery-content">
                <div className="gallery-number">{String(project.id).padStart(2, '0')}</div>
                <h3 className="gallery-title">{project.title}</h3>
                <p className="gallery-category">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
