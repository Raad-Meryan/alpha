import React from 'react';
import './Team.css';
import ScrollReveal from '../assets/ScrollReveal';
import TrueFocus from '../assets/TrueFocus';
import SpotlightCard from '../assets/SpotlightCard';
import ShinyText from '../assets/ShinyText';

const Team = () => {
  const teamMembers = [
    { name: 'Shadi Jebril', role: 'CEO, Director, Director of Photography' },
    { name: 'Raad Meryan', role: 'Technical & Creative Director' },
    { name: 'Siwar Al Qasim', role: 'Screenwriter' },
    { name: 'Ali Al Rashaideh', role: 'Line Producer' },
    { name: 'Baraa Jebril', role: 'Post-Production Supervisor, Editor' },
    { name: 'Omar Zreqat', role: 'Motion Graphic Artist' },
    { name: 'Laith Jebril', role: 'CGI Artist' },
    { name: 'Obada Al Heyari', role: 'Set Production Assistant' }
  ];

  return (
    <div className="team">
      <div className="team-container">
        <ShinyText 
          text="Services"
          disabled={false}
          speed={1.7}
          className="section-title"
          baseColor="#ffffff" 
          highlightColor="#000000f2"
        />
        
        {/* 941414 */}
        {/* b10101ff */}
        <div className="services-section">
          <p className="services-description">
            At ALPHA PROJECT, we deliver<br /> {' '}
            <span style={{ color: "#ffffffff" }}>
              <strong>Short Films</strong> | <strong>Documentaries</strong> |
              <strong> TV Commercials </strong> | <strong>Projects and Products</strong>
              <br /><strong>Event Coverage</strong> | <strong>Website Development</strong>
            </span>
            <br /><br />All executed by our experienced team:
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-details">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
