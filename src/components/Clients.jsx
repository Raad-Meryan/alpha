import React from 'react';
import './Clients.css';
import ScrollReveal from '../assets/ScrollReveal';

const Clients = () => {
  const clients = [
    { name: 'Client A', text: 'CLIENT A' },
    { name: 'Client B', text: 'CLIENT B' },
    { name: 'Client C', text: 'CLIENT C' },
    { name: 'Client D', text: 'CLIENT D' },
    { name: 'Client E', text: 'CLIENT E' },
    { name: 'Client F', text: 'CLIENT F' },
    { name: 'Client G', text: 'CLIENT G' },
  ];

  return (
    <section id="clients" className="clients">
      <div className="container">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          as="h2"
          containerClassName="section-title"
        >
          Our Clients
        </ScrollReveal>
        <div className="clients-grid">
          {clients.map((client, index) => (
            <div key={index} className="client-item">
              <div className="client-logo">
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={5}
                  blurStrength={10}
                  as="span"
                  containerClassName="client-name"
                >
                  {client.text}
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
