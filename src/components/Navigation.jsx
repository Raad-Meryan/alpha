import React, { useState, useEffect } from 'react';
import './Navigation.css';
import alphaLogo from '../assets/alpha_logo_transparent.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'vision', label: 'Vision' },
    { id: 'logos', label: 'Brands' },
    { id: 'team', label: 'Team' },
    { id: 'clients', label: 'Clients' },
    { id: 'gallery', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => scrollToSection('hero')}>
          <img src={alphaLogo} alt="Alpha" className="nav-logo-image" />
          <span className="nav-logo-text">ALPHA PROJECT</span>
        </div>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button onClick={() => scrollToSection(item.id)} className="nav-link">
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
