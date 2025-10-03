import React from 'react';
import './LogoSection.css';

const LogoSection = () => {
  const logos = [
    { name: 'Brand A', text: 'BRAND A' },
    { name: 'Brand B', text: 'BRAND B' },
    { name: 'Brand C', text: 'BRAND C' },
    { name: 'Brand D', text: 'BRAND D' },
  ];

  return (
    <section id="logos" className="logo-section">
      <div className="container">
        <h2 className="section-title">Our Brands</h2>
        <div className="logo-grid">
          {logos.map((logo, index) => (
            <div key={index} className="logo-item">
              <div className="logo-box">
                <span className="logo-name">{logo.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
