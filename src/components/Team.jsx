import React from 'react';
import './Team.css';

const Team = () => {
  const teamMembers = [
    { name: 'John Doe', role: 'Creative Director', initials: 'JD' },
    { name: 'Jane Smith', role: 'Lead Designer', initials: 'JS' },
    { name: 'Mike Johnson', role: 'Developer', initials: 'MJ' },
    { name: 'Sarah Williams', role: 'Project Manager', initials: 'SW' },
  ];

  return (
    <section id="team" className="team">
      <div className="container">
        <h2 className="section-title">Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-avatar">
                <span className="member-initials">{member.initials}</span>
              </div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
