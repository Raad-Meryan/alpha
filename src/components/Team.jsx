import React from 'react';
import './Team.css';
import ScrollReveal from '../assets/ScrollReveal';

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
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          as="h2"
          containerClassName="section-title"
        >
          Our Team
        </ScrollReveal>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-avatar">
                <span className="member-initials">{member.initials}</span>
              </div>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                as="h3"
                containerClassName="member-name"
              >
                {member.name}
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                as="p"
                containerClassName="member-role"
              >
                {member.role}
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
