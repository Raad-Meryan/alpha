import React from 'react';
import './Vision.css';

const Vision = () => {
  return (
    <section id="vision" className="vision">
      <div className="container">
        <h2 className="section-title">Our Vision</h2>
        <div className="vision-content">
          <div className="vision-card">
            <div className="vision-icon">🎯</div>
            <h3>Innovation</h3>
            <p>Pushing boundaries with creative solutions and emerging technologies</p>
          </div>
          <div className="vision-card">
            <div className="vision-icon">✨</div>
            <h3>Excellence</h3>
            <p>Delivering quality that exceeds expectations in every project</p>
          </div>
          <div className="vision-card">
            <div className="vision-icon">🤝</div>
            <h3>Collaboration</h3>
            <p>Building strong partnerships to achieve remarkable results together</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
