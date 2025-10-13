import React, { useState, useEffect } from 'react';
import './Navigation.css';
import alphaLogo from '../assets/ALPHALogo.png';

const Navigation = ({ onNavigate, ids }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector('.app');
      const scrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    const scrollContainer = document.querySelector('.app');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const sectionIndex = ids.indexOf(sectionId);
    if (sectionIndex !== -1 && onNavigate) {
      onNavigate(sectionIndex);
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'team', label: 'Services' },
    { id: 'clients', label: 'Portfolio' },
  ];

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => scrollToSection('hero')}>
          <img src={alphaLogo} alt="Alpha" className="nav-logo-image" />
        </div>
        
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button 
                onClick={() => scrollToSection(item.id)} 
                className="nav-link"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="nav-separator">|</li>
        </ul>

        <div className="nav-contact">
          <button onClick={() => scrollToSection('contact')} className="nav-link contact-link">
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
